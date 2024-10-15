import { AssessmentArea, Criteria, PrismaClient, Rating } from "@prisma/client";
import e, { Request, Response } from "express";

const prisma = new PrismaClient();

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const { phone, assessmentArea, criteria, rating } = req.body as {
      phone: string;
      assessmentArea: AssessmentArea[];
      criteria: Criteria[];
      rating: Rating[];
    };
    if (!assessmentArea || !criteria || !rating) {
      return res.status(400).json({
        msg: "please provid required data",
      });
    }
    if (!phone) {
      return res.status(400).json({
        msg: "Enter the teacher phone",
      });
    }

    if (typeof phone !== "string") {
      return res.status(400).json({
        msg: "provid valid phone number",
      });
    }

    const teacherExist = await prisma.teacher.findFirst({
      where: {
        phone: `+252${phone}`,
      },
    });

    if (!teacherExist) {
      return res.status(404).json({
        msg: `No teacher found with this phone: ${phone}`,
      });
    }

    if (assessmentArea.length !== 1) {
      return res.status(400).json({
        msg: "maximum Evaluation allowed is 1",
      });
    }

    if (
      !Array.isArray(assessmentArea) ||
      !Array.isArray(criteria) ||
      !Array.isArray(rating)
    ) {
      return res.status(400).json({
        msg: "Assessment area, criteria, and Rating must be arrays.",
      });
    }
    if (
      assessmentArea.length !== criteria.length ||
      assessmentArea.length !== rating.length
    ) {
      return res.status(400).json({
        msg: "The lengths of assessmentArea, criteria, and Rating must match.",
      });
    }

    const validAssessmentAreas = Object.values(AssessmentArea);
    for (const area of assessmentArea) {
      if (!validAssessmentAreas.includes(area)) {
        return res.status(400).json({
          msg: `Invalid assessment area: ${area}.`,
        });
      }
    }

    const validCriteria = Object.values(Criteria);

    for (const criteriaaa of criteria) {
      if (!validCriteria.includes(criteriaaa)) {
        return res.status(400).json({
          msg: `Invalid criteria : ${criteriaaa}.`,
        });
      }
    }

    const validRatings = Object.values(Rating);
    for (const rate of rating) {
      if (!validRatings.includes(rate)) {
        return res.status(400).json({
          msg: `Invalid rating: ${rate}.`,
        });
      }
    }
    let point = 0;
    rating.forEach((rate, index) => {
      switch (rate) {
        case "EXCEEDS_EXPECTATION":
          point = 100;
          break;
        case "MEETS_EXPECTATION":
          point = 80;
          break;
        case "NEEDS_IMPROVEMENT":
          point = 50;
          break;
        case "UNSATISFACTORY":
          point = 20;
          break;
        default:
          break;
      }
    });
    const numberOfEvaluationOftheTeacher = await prisma.evaluations.count({
      where: {
        teacherId: teacherExist.id,
      },
    });
    console.log(numberOfEvaluationOftheTeacher);
    const evaluation = await prisma.evaluations.create({
      data: {
        teacherId: teacherExist.id,
        phone: `+252${phone}`,
        assessmentArea,
        criteria,
        rating,
        points: point,
        evaluation_No: (numberOfEvaluationOftheTeacher + 1).toString(),
      },
    });

    return res.status(201).json({
      msg: "Evaluation created successfully",
      data: {
        evaluation,
        point,
      },
    });
  } catch (error) {
    console.log("creating evaluation error is " + error);
    return res.status(500).json({
      msg: "Some thing went wrong",
    });
  }
};
export const updateEvaluation = async (req: Request, res: Response) => {
  try {
    const { phone, assessmentArea, evaluation_no, criteria, rating } =
      req.body as {
        phone: string;
        assessmentArea: AssessmentArea[];
        criteria: Criteria[];
        rating: Rating[];
        evaluation_no: string;
      };
    if (!assessmentArea || !criteria || !rating || !evaluation_no) {
      return res.status(400).json({
        msg: "please provid required data",
      });
    }
    if (!phone) {
      return res.status(400).json({
        msg: "Enter the teacher phone",
      });
    }

    if (typeof phone !== "string") {
      return res.status(400).json({
        msg: "provid valid phone number",
      });
    }

    const teacherExist = await prisma.teacher.findFirst({
      where: {
        phone: `+252${phone}`,
      },
    });

    if (!teacherExist) {
      return res.status(404).json({
        msg: `No teacher found with this phone: ${phone}`,
      });
    }
    if (
      !Array.isArray(assessmentArea) ||
      !Array.isArray(criteria) ||
      !Array.isArray(rating)
    ) {
      return res.status(400).json({
        msg: "Assessment area, criteria, and Rating must be arrays.",
      });
    }
    if (
      assessmentArea.length !== criteria.length ||
      assessmentArea.length !== rating.length
    ) {
      return res.status(400).json({
        msg: "The lengths of assessmentArea, criteria, and Rating must match.",
      });
    }

    const validAssessmentAreas = Object.values(AssessmentArea);
    for (const area of assessmentArea) {
      if (!validAssessmentAreas.includes(area)) {
        return res.status(400).json({
          msg: `Invalid assessment area: ${area}.`,
        });
      }
    }

    const validCriteria = Object.values(Criteria);

    for (const criteriaaa of criteria) {
      if (!validCriteria.includes(criteriaaa)) {
        return res.status(400).json({
          msg: `Invalid criteria : ${criteriaaa}.`,
        });
      }
    }

    const validRatings = Object.values(Rating);
    for (const rate of rating) {
      if (!validRatings.includes(rate)) {
        return res.status(400).json({
          msg: `Invalid rating: ${rate}.`,
        });
      }
    }

    let point = 0;
    rating.forEach((rate, index) => {
      const currentRating = rating[index];

      switch (rate) {
        case "EXCEEDS_EXPECTATION":
          point = 100;

          break;
        case "MEETS_EXPECTATION":
          point = 80;
          break;
        case "NEEDS_IMPROVEMENT":
          point = 50;

          break;
        case "UNSATISFACTORY":
          point = 20;
          break;
        default:
          break;
      }
    });
    const evaluations = await prisma.evaluations.findFirst({
      where: {
        teacherId: teacherExist.id,
        evaluation_No: evaluation_no,
      },
    });
    if (!evaluations) {
      return res.status(400).json({
        msg: "This Evaluation doesn't exist",
      });
    }
    console.log(point);
    const updateEvaluation = await prisma.evaluations.update({
      where: {
        id: evaluations.id,
      },
      data: {
        teacherId: teacherExist.id,
        phone: `+252${phone}`,
        assessmentArea,
        criteria,
        rating,
        points: point,
      },
    });

    return res.status(201).json({
      msg: "Evaluation created successfully",
      data: {
        updateEvaluation,
        point,
      },
    });
  } catch (error) {
    console.log("creating evaluation error is " + error);
    return res.status(500).json({
      msg: "Some thing went wrong",
    });
  }
};

export const listTeachersEvaluation = async (req: Request, res: Response) => {
  {
    try {
      const teachersEvalution = await prisma.evaluations.findMany({
        select: {
          teacher: {
            select: {
              fullName: true,
              phone: true,
            },
          },
          evaluation_No: true,
          assessmentArea: true,
          updatedAt: true,
          criteria: true,
          rating: true,
          points: true,
          createdAt: true,
        },
      });

      if (!teachersEvalution || teachersEvalution.length === 0) {
        return res.status(404).json({
          msg: "No teachersEvalution found.",
        });
      }

      return res.status(200).json({
        msg: "Evaluations fetched successfully.",
        data: teachersEvalution,
      });
    } catch (error) {
      console.error("Error fetching teacher evaluations: ", error);
      return res.status(500).json({
        msg: "An error occurred while fetching evaluations.",
      });
    }
  }
};
