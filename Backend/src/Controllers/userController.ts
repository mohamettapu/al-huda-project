// userController.ts
import { Request, Response } from "express";
import { PrismaClient, role } from "@prisma/client";
import argon2 from "argon2";
import { giveTokens } from "../helpers/jwt";

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
      where: { OR: [{ phone }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const usernameTaked = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    if (usernameTaked) {
      return res.status(400).json({
        message: "username is taked choose another username",
      });
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
        firstname, // Fix the property name here
        lastname,
        phone: fullphone,
      },
    });

    return res.status(201).json({
      msg: "User created successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        // password: newUser.password,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userid = req.user.id;

    if (!userid) {
      return res.status(403).json({
        msg: "Unauthorized",
      });
    }

    const { email, username, password, phone } = req.body as {
      email?: string;
      username?: string;
      password?: string;
      phone?: string;
    };

    const user = await prisma.users.findFirst({
      where: {
        id: userid,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }
    const checkifUsernameExist = await prisma.users.findFirst({
      where: {
        username: username,
        id: {
          not: user.id,
        },
      },
    });

    if (checkifUsernameExist) {
      return res.status(400).json({
        msg: `The username '${username}' is already in use!`,
      });
    }
    const updatedData = {
      ...(username && { username }),
      ...(password && { password: await argon2.hash(password) }),
      ...(email && { email }),
      ...(phone && { phone }),
    };

    if (Object.keys(updatedData).length > 0) {
      const editUser = await prisma.users.update({
        where: {
          id: user.id,
        },
        data: updatedData,
      });

      const { password: pass, ...rest } = editUser;

      return res.status(200).json({
        msg: "Success",
        user: rest,
      });
    } else {
      return res.status(400).json({
        msg: "No valid fields provided for update",
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      msg: "Some thing went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      return res.status(400).json({
        msg: "Enter your credentials to login your account",
      });
    }

    const checkUser = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    if (!checkUser) {
      return res.status(401).json({
        msg: "Invalid login username",
      });
    }

    const verifyPassword = await argon2.verify(checkUser?.password, password);
    if (!verifyPassword) {
      return res.status(401).json({
        msg: "invalid login password",
      });
    }
    // giving access toke  and refresh token
    const { accessToken, refreshToken } = giveTokens(checkUser.id);

    res.status(200).json({
      msg: "Success",
      phone: checkUser.phone,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export const whoAmI = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userInfo = req.user;
    res.json({
      messagge: "success",
      user: userInfo,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unathorized",
    });
  }
};
export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({});

    if (!users) {
      return res.status(404).json({
        msg: "no users available",
      });
    }

    res.status(200).json({
      msg: "Success",
      data: users,
    });
  } catch (error) {
    console.log("error of fetching teachers is " + error);
    return res.status(500).json({
      msg: "some thing went wrong",
    });
  }
};

export const changeRole = async (req: Request, res: Response) => {
  try {
    const { userid, role } = req.body as { userid: number; role: role };
    // @ts-ignore
    const id = req.user.id;
    if (!userid || !role) {
      return res.status(400).json({
        msg: "please provide userid and role",
      });
    }
    const checkUser = await prisma.users.findFirst({
      where: {
        id: userid,
      },
    });

    // check if user is updating its role
    if (id === userid) {
      return res.status(400).json({
        msg: "sorry you can't update your role",
      });
    }
    // check if user no found

    if (!checkUser) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    const updateRole = await prisma.users.update({
      where: {
        id: userid,
      },
      data: {
        role: role,
      },
    });
    const { password, ...rest } = updateRole;
    res.status(200).json({
      msg: "success",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "some error occurred",
    });
  }
};
