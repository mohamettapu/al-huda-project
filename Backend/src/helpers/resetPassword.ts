import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Request, Response } from "express";
import nodemailer, { Transporter } from "nodemailer";

// Load environment variables
dotenv.config();
const prisma = new PrismaClient();
// Function to generate a 6-digit reset code
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
      html: `<p>Your reset code is: <b>${resetCode}</b></p>`,
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

// Function to handle the email sending request (Express route handler)
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

    // Send reset code to the provided email address
    await sendResetCode(clientEmail);

    return res.status(200).json({
      msg: `Reset code sent to ${clientEmail}`,
    });
  } catch (error) {
    console.error("Error processing email request:", error);
    return res.status(500).json({
      msg: "An error occurred while sending the reset code",
    });
  }
};
