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
    const countryCode = "+252";
    const fullphone = `${countryCode}${phone}`;
    const checkTeacher = await prisma.teacher.findFirst({
      where: {
        phone: fullphone,
      },
    });

    if (!checkTeacher) {
      return res.status(404).json({
        msg: "only teachers of alhuda can use this system",
        msg1: "you are not teachers of alhuda ",
      });
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
    res.status(500).json({ msg: "Something went wrong" });
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
    res.status(400).json({ msg: "Something went wrong" });
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
    const users = await prisma.users.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        phone: true,
        role: true,
      },
    });

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
    const { phone, role } = req.body as { phone: string; role: role };
    // @ts-ignore
    const id = req.user.id;
    if (!phone || !role) {
      return res.status(400).json({
        msg: "please provide phone and role",
      });
    }
    const countryCode = `+252`;
    const fullPhone = `${countryCode}${phone}`;
    const checkUser = await prisma.users.findFirst({
      where: {
        phone: fullPhone,
      },
    });

    // const whoIsUpdating=await prisma.users.findFirst({
    //   where:{
    //     id
    //   }
    // })
    // if(!whoIsUpdating)
    // {
    //   return res.status(401).json({
    //     msg:"un authorized"
    //   })
    // }

    // check if user no found

    if (!checkUser) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    if (id === checkUser.id) {
      return res.status(400).json({
        msg: "you can't change you role",
      });
    }

    const updateRole = await prisma.users.update({
      where: {
        id: checkUser.id,
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
