import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  AssessmentArea,
  Criteria,
  EvaluationRequest,
  Rating,
} from "../../types/evaluationInterfaces";

import { FaTrash } from "react-icons/fa";
import {
  createEvaluationFN,
  resetData,
} from "../../Redux/Slices/Evaluation/createEvaluationSLice";

const CreateEvaluation: React.FC = () => {
  const CreateEvaluationState = useSelector(
    (state: RootState) => state.EvaluationSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  const [selectedArea, setSelectedArea] = useState<AssessmentArea | "">("");
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | "">("");
  const [selectedRating, setSelectedRating] = useState<Rating | "">("");

  const [evaluationData, setEvaluationData] = useState<EvaluationRequest>({
    phone: "",
    assessmentArea: [],
    criteria: [],
    rating: [],
  });

  useEffect(() => {
    if (CreateEvaluationState.isSuccess) {
      toast.success(CreateEvaluationState.data.msg);
      dispatch(resetData());
      // Reset the evaluation data after success
      setEvaluationData({
        phone: "",
        assessmentArea: [],
        criteria: [],
        rating: [],
      });
    }
    if (CreateEvaluationState.isError) {
      toast.error(CreateEvaluationState.errorMsg);
      dispatch(resetData());
    }
  }, [dispatch, CreateEvaluationState]);
  const formik = useFormik({
    initialValues: {
      phone: "",
      assessmentArea: [],
      criteria: [],
      rating: [],
    },
    onSubmit(values) {
      const finalEvaluationData: EvaluationRequest = {
        phone: values.phone,
        assessmentArea: values.assessmentArea,
        criteria: values.criteria,
        rating: values.rating,
      };

      console.log("Submitting values:", evaluationData);
      console.log("Final evaluation data to send:", finalEvaluationData); // Log the evaluation data
      console.log(evaluationData);
      dispatch(createEvaluationFN(finalEvaluationData)); // S
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .required("Enter phone number of teacher")
        .matches(/^[0-9]+$/, "Phone number must be a number"),
      assessmentArea: yup
        .array()
        .of(yup.mixed<AssessmentArea>().oneOf(Object.values(AssessmentArea)))
        .required("Assessment area is required")
        .min(1, "Select at least one"),
      criteria: yup
        .array()
        .of(yup.mixed<Criteria>().oneOf(Object.values(Criteria)))
        .required("Criteria is required")
        .min(1, "Select at least one criteria"),
      rating: yup
        .array()
        .of(yup.mixed<Rating>().oneOf(Object.values(Rating)))
        .required("Rating is required")
        .min(1, "Select at least one rating"),
    }),
  });

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AssessmentArea;
    setSelectedArea(value);
    setSelectedCriteria(""); // Reset criteria when area changes
    switch (value) {
      case AssessmentArea.SUPERVISION_FEEDBACK:
        setSelectedCriteria(Criteria.INSTRUCTIONAL_STRATEGIES);
        break;
      case AssessmentArea.ACADEMIC_PERFORMANCE:
        setSelectedCriteria(Criteria.AVERAGE_CLASS_GRADES);
        break;
      case AssessmentArea.EXTERNAL_SUPERVISION:
        setSelectedCriteria(Criteria.CLASSROOM_MANAGEMENT);
        break;
      case AssessmentArea.STUDENT_FEEDBACK:
        setSelectedCriteria(Criteria.POSITIVE_STUDENT_INTERACTIONS);
        break;
      default:
        setSelectedCriteria("");
    }
  };

  const handleAddToLetter = () => {
    if (selectedArea && selectedCriteria && selectedRating) {
      setEvaluationData((prev) => ({
        phone: prev.phone, // Ensure phone is passed
        assessmentArea: [...prev.assessmentArea, selectedArea],
        criteria: [...prev.criteria, selectedCriteria],
        rating: [...prev.rating, selectedRating],
      }));

      // Reset selected values after adding
      setSelectedArea("");
      setSelectedCriteria("");
      setSelectedRating("");
    }
  };

  const handleDeleteRow = (index: number) => {
    setEvaluationData((prev) => ({
      ...prev,
      assessmentArea: prev.assessmentArea.filter((_, i) => i !== index),
      criteria: prev.criteria.filter((_, i) => i !== index),
      rating: prev.rating.filter((_, i) => i !== index),
    }));
  };

  //   const handleSubmitData = () => {
  //     formik.handleSubmit();
  //     // console.log(evaluationData); // Call Formik's handleSubmit
  //   };

  return (
    <div>
      <h2 className="text-xl font-geist font-bold">Create Evaluation</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-between px-20"
      >
        <div className="main">
          <div className="inputContainer">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <p className="text-red-500">
              {formik.touched.phone && formik.errors.phone}
            </p>
          </div>
          <div className="inputContainer">
            <h1>Assessment Areas</h1>
            <select
              className="border w-full p-4 shadow-md"
              value={selectedArea}
              onChange={handleAreaChange}
              name="AssessmentArea"
            >
              <option value="">Select area</option>
              {Object.values(AssessmentArea).map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <h1>Criteria</h1>
            <input type="text" readOnly value={selectedCriteria} />

            <h1>Rating</h1>
            <select
              className="border w-full p-4 shadow-md"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value as Rating)}
              name="Rating"
            >
              <option value="">Select rating</option>
              {Object.values(Rating).map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>

            <button type="button" onClick={handleAddToLetter}>
              Add to Paper
            </button>
          </div>
        </div>
        <div className="letterOFTeacherEvaluation">
          <div className="labels flex flex-row justify-between border border-b-2">
            <h1 className="text-xl font-geist">Assessment Areas</h1>
            <h1 className="text-xl font-geist">Criteria</h1>
            <h1 className="text-xl font-geist">Rating</h1>
            <h1 className="text-xl font-geist">Action</h1>
          </div>
          <div>
            {evaluationData.assessmentArea.map((area, index) => (
              <div key={index} className="flex flex-row justify-between">
                <p>{area}</p>
                <p>{evaluationData.phone}</p>
                <p>{evaluationData.criteria[index]}</p>
                <p>{evaluationData.rating[index]}</p>
                <span onClick={() => handleDeleteRow(index)}>
                  <FaTrash />
                </span>
              </div>
            ))}
          </div>
          <div className="butt">
            <button
              // Change this to 'button' to prevent default form submission

              className="bg-black font-geist text-white px-14 rounded py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvaluation;
