import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
const prisma = new PrismaClient();
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "There is no token",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KAY as string);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ msg: "token expired" });
      } else if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ msg: "token is malformed or changed" });
      } else {
        return res.status(401).json({ msg: "Token verification failed" });
      }
    }
    if (!decoded) {
      return res.status(401).json({
        msg: "Failed to decode token",
      });
    }

    const user = await prisma.users.findFirst({
      where: {
        // @ts-ignore
        id: decoded.userid,
      },
    });
    if (!user) {
      return res.status(401).json({
        msg: "User not found",
      });
    }
    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
