// Define valid values for assessmentArea, criteria, and rating
export enum AssessmentArea {
  SUPERVISION_FEEDBACK = "SUPERVISION_FEEDBACK",
  ACADEMIC_PERFORMANCE = "ACADEMIC_PERFORMANCE",
  EXTERNAL_SUPERVISION = "EXTERNAL_SUPERVISION",
  STUDENT_FEEDBACK = "STUDENT_FEEDBACK",
}

export enum Criteria {
  INSTRUCTIONAL_STRATEGIES = "INSTRUCTIONAL_STRATEGIES",
  AVERAGE_CLASS_GRADES = "AVERAGE_CLASS_GRADES",
  CLASSROOM_MANAGEMENT = "CLASSROOM_MANAGEMENT",
  POSITIVE_STUDENT_INTERACTIONS = "POSITIVE_STUDENT_INTERACTIONS",
}

export enum Rating {
  EXCEEDS_EXPECTATION = "EXCEEDS_EXPECTATION",
  MEETS_EXPECTATION = "MEETS_EXPECTATION",
  NEEDS_IMPROVEMENT = "NEEDS_IMPROVEMENT",
  UNSATISFACTORY = "UNSATISFACTORY",
}

export interface EvaluationRequest {
  phone: string;
  assessmentArea: AssessmentArea[];
  criteria: Criteria[];
  rating: Rating[];
}

export interface EvaluationResponse {
  msg: string;
  data: {
    evaluation: {
      id: number;
      teacherId: number;
      phone: string;
      assessmentArea: AssessmentArea[];
      criteria: Criteria[];
      rating: Rating[];
      points: number[];
      evaluation_No: string;
      createdAt: string;
      updatedAt: string;
    };
    pointsArray: number[];
  };
}
export interface IListEvaluations {
  msg: string;
  data: EvaluationResult[];
}

export interface EvaluationResult {
  teacher: Teacher;
  evaluation_No: string;
  assessmentArea: string[];
  updatedAt: Date;
  criteria: string[];
  rating: string[];
  points: number[];
  createdAt: Date;
}

export interface Teacher {
  fullName: string;
  phone: string;
}
