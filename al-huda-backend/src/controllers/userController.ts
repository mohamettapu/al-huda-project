// userController.ts
import { Request, Response } from "express-serve-static-core";

import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, firstname, lastname, phone } = req.body;

    if (!username || !password || !email || !firstname || !lastname || !phone) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields." });
    }

    const existingUser = await prisma.users.findFirst({
      where: { OR: [{ username }, { phone }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const countryCode = "+252";
    const fullphone = `${countryCode}${phone}`;
    const hashedPassword = await argon2.hash(password);

    // Create new user
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email: email.toLowerCase(),
        firtsname: firstname, // Fix the property name here
        lastname,
        phone: fullphone,
      },
    });

    return res.status(201).json({
      msg: "User created successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstname: newUser.firtsname, // Fix property name
        lastname: newUser.lastname,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
