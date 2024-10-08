import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import { FaTrash } from "react-icons/fa";
import { AppDispatch, RootState } from "../../store";
import {
  AssessmentArea,
  Criteria,
  EvaluationRequest,
  Rating,
} from "../../../types/evaluationInterfaces";
import { createEvaluationFN, resetData } from "./createEvaluationSLice";

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
        assessmentArea: evaluationData.assessmentArea, // From state
        criteria: evaluationData.criteria, // From state
        rating: evaluationData.rating, // From state
      };

      console.log("Final evaluation data to send:", finalEvaluationData);
      dispatch(createEvaluationFN(finalEvaluationData));
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .required("Enter phone number of teacher")
        .matches(/^[0-9]+$/, "Phone number must be a number"),
    }),
  });

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AssessmentArea;
    setSelectedArea(value);
    setSelectedCriteria(""); // Reset criteria when area changes
  };

  const handleAddToLetter = () => {
    if (selectedArea && selectedCriteria && selectedRating) {
      setEvaluationData((prev) => ({
        ...prev,
        assessmentArea: [...prev.assessmentArea, selectedArea],
        criteria: [...prev.criteria, selectedCriteria],
        rating: [...prev.rating, selectedRating],
      }));

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
              type="submit"
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
