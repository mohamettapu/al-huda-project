import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import nodemailer, { Transporter } from "nodemailer";
import argon2 from "argon2";
// Load environment variables
dotenv.config();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET_KAY || "your-secret";

const generateUnverifiedToken = (userEmail: string): string => {
  return jwt.sign({ email: userEmail, verified: false }, JWT_SECRET, {
    expiresIn: "15m",
  });
};
const generateVerifiedToken = (userEmail: string): string => {
  return jwt.sign({ email: userEmail, verified: true }, JWT_SECRET, {
    expiresIn: "15m",
  });
};
const generateResetCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendResetCode = async (email: string): Promise<void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use true for port 465 (SSL/TLS)
      auth: {
        user: process.env.GMAIL_USER, // Your email address
        pass: process.env.GMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    const resetCode = generateResetCode();

    const mailOptions = {
      from: {
        name: "al-huda",
        address: process.env.GMAIL_USER as string,
      },
      to: email,
      subject: "Reset Code",
      text: `Your reset code is: ${resetCode}`,
      html: `<p>Your reset code is: <b>${resetCode}</b> </br> This code is expiring in 3 minutes use befor it expire</p>`,
    };

    await transporter.sendMail(mailOptions);
    await prisma.resetPasswordCodes.create({
      data: {
        code: parseInt(resetCode), // Convert string to integer
        isUsed: false,
        userEmail: email,
        sentDate: new Date(),
      },
    });
    console.log(`Reset code has been sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { clientEmail } = req.body;

    if (!clientEmail) {
      return res.status(400).json({
        msg: "Please provide an email address",
      });
    }

    const checkUser = await prisma.users.findFirst({
      where: {
        email: clientEmail,
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        msg: "Invalid Email",
      });
    }

    await sendResetCode(clientEmail);
    const token = generateUnverifiedToken(clientEmail);

    return res.status(200).json({
      msg: `Reset code sent to ${clientEmail}`,
      token,
    });
  } catch (error) {
    console.error("Error processing email request:", error);
    return res.status(500).json({
      msg: "An error occurred while sending the reset code",
    });
  }
};

//   const token =
//     req.headers.authorization?.startsWith("Bearer") &&
//     req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(403).json({ msg: "Authorization token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // @ts-ignore
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ msg: "Invalid or expired token" });
//   }
// };

export const checkResetCode = async (req: Request, res: Response) => {
  try {
    const { resetCode } = req.body;
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization?.split(" ")[1];

    if (!resetCode || !token) {
      return res.status(400).json({ msg: "Reset code and token is required" });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ msg: "token expired" });
      } else if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ msg: "token is malformed or changed" });
      } else {
        return res.status(401).json({ msg: "Token verification failed" });
      }
    }
    const userEmail = decoded.email;

    const codeEntry = await prisma.resetPasswordCodes.findFirst({
      where: { userEmail, code: resetCode, isUsed: false },
    });

    if (!codeEntry) {
      return res.status(400).json({ msg: "Invalid or expired reset code" });
    }

    await prisma.resetPasswordCodes.update({
      where: { id: codeEntry.id },
      data: { isUsed: true },
    });

    const verifiedToken = generateVerifiedToken(userEmail);

    return res.status(200).json({
      msg: "Reset code verified successfully",
      token: verifiedToken,
    });
  } catch (error) {
    console.error("Error checking reset code:", error);
    return res
      .status(500)
      .json({ msg: "An error occurred while checking the reset code" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!newPassword || !token) {
      return res
        .status(400)
        .json({ msg: "New password and token are required" });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ msg: "token expired" });
      } else if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ msg: "token is malformed or changed" });
      } else {
        return res.status(401).json({ msg: "Token verification failed" });
      }
    }

    if (!decoded.verified) {
      return res.status(403).json({ msg: "Reset code has not been verified" });
    }

    const userEmail = decoded.email;

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.users.update({
      where: { email: userEmail },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ msg: "An error occurred while updating the password" });
  }
};
