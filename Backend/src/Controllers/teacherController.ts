import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const CreateTeacher = async (req: Request, res: Response) => {
  try {
    const { fullName, phone } = req.body as { fullName: string; phone: string };
    if (!fullName || !phone) {
      return res.status(400).json({
        msg: "provide required data",
      });
    }
    const countryCode = "+252";
    const fullPhone = `${countryCode}${phone}`;
    const teacherExist = await prisma.teacher.findFirst({
      where: {
        phone: fullPhone,
      },
    });
    if (teacherExist) {
      return res.status(400).json({
        msg: `the teacher with this phone number ${phone} is exists`,
      });
    }

    const createTeacher = await prisma.teacher.create({
      data: {
        fullName,
        phone: fullPhone,
      },
    });

    res.status(201).json({
      msg: "Success",
      data: createTeacher,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "some thing went wrong",
    });
  }
};

export const UpdateTeacher = async (req: Request, res: Response) => {
  try {
    const { fullName, phone, id } = req.body as {
      fullName?: string;
      phone?: string;
      id: number;
    };
    if (typeof id !== "number") {
      return res.status(400).json({
        msg: "please provid valid id ",
      });
    }
    if (!fullName || !phone || !id) {
      return res.status(400).json({
        msg: "provide id fullname and phone",
      });
    }
    const countryCode = "+252";
    const fullPhone = `${countryCode}${phone}`;
    const teacherExist = await prisma.teacher.findFirst({
      where: {
        id,
      },
    });
    if (!teacherExist) {
      return res.status(400).json({
        msg: `not found`,
      });
    }

    const updateTeacher = await prisma.teacher.update({
      where: {
        id: teacherExist.id,
      },
      data: {
        fullName,
        phone: fullPhone,
      },
    });

    res.status(201).json({
      msg: "Success",
      data: updateTeacher,
    });
  } catch (error) {
    console.log("update error is " + error);
    return res.status(500).json({
      msg: "Some thing went wrong",
    });
  }
};

export const allTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany({});

    if (!teachers) {
      return res.status(404).json({
        msg: "no teachers available",
      });
    }

    res.status(200).json({
      msg: "Success",
      data: teachers,
    });
  } catch (error) {
    console.log("error of fetching teachers is " + error);
    return res.status(500).json({
      msg: "some thing went wrong",
    });
  }
};
