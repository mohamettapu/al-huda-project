import { Prisma } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client"; // Assuming you're using Prisma
const prisma = new PrismaClient();
export const giveTokens = (
  userid: number
): { accessToken: string; refreshToken: string } => {
  const payload = {
    userid,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KAY as string, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

export const giveNewAccesstoken = async (req: Request, res: Response) => {
  try {
    const { refreshtoken } = req.body;

    if (!refreshtoken) {
      return res.status(401).json({
        msg: "Refresh token is required",
      });
    }

    jwt.verify(
      refreshtoken,
      process.env.JWT_REFRESH_SECRET_KEY as string,
      async (error: any, decoded: any) => {
        if (error) {
          return res.status(401).json({
            msg: "Invalid refresh Token",
          });
        }
        const user = await prisma.users.findFirst({
          where: { id: decoded.userid },
        });
        if (!user) {
          return res.status(403).json({ msg: "User not found" });
        }
        const newToken = jwt.sign(
          { userid: user.id },
          process.env.JWT_SECRET_KAY as string,
          {
            expiresIn: "1m",
          }
        );
        res.json({ NewAccessToken: newToken });
      }
    );
  } catch (error) {
    console.log(`error of refreshing token is ${error}`);
    return res.status(500).json({ msg: "Some error occurred" });
  }
};
