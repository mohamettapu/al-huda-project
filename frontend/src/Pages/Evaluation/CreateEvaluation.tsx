import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
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

  const [point, setPoint] = useState<number[]>([]);
  const ratingPoints = {
    EXCEEDS_EXPECTATION: 100,
    MEETS_EXPECTATION: 80,
    NEEDS_IMPROVEMENT: 50,
    UNSATISFACTORY: 20,
  };

  useEffect(() => {
    if (CreateEvaluationState.isSuccess) {
      toast.success(CreateEvaluationState.data.msg);
      dispatch(resetData());
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
        phone: evaluationData.phone,
        assessmentArea: evaluationData.assessmentArea,
        criteria: evaluationData.criteria,
        rating: evaluationData.rating,
      };
      console.log(values);
      dispatch(createEvaluationFN(finalEvaluationData));
    },
    validationSchema: yup.object({
      phone: yup.string(),
    }),
  });

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AssessmentArea;
    setSelectedArea(value);

    switch (value) {
      case AssessmentArea.SUPERVISION_FEEDBACK:
        setSelectedCriteria(Criteria.INSTRUCTIONAL_STRATEGIES);
        break;

      default:
        setSelectedCriteria("");
    }

    setSelectedRating(""); // Reset rating when area changes
  };

  const handleAddToLetter = () => {
    if (evaluationData.assessmentArea.length >= 4) {
      toast.error("maximum Evaluation allowed is 4");
      return;
    }
    if (selectedArea && selectedCriteria && selectedRating) {
      if (evaluationData.assessmentArea.includes(selectedArea)) {
        toast.error(`${selectedArea} is already added`);
        return;
      }

      const Points = ratingPoints[selectedRating] || 0;

      setEvaluationData((prev) => ({
        ...prev,
        assessmentArea: [...prev.assessmentArea, selectedArea],
        criteria: [...prev.criteria, selectedCriteria],
        rating: [...prev.rating, selectedRating],
      }));

      setPoint((prev) => [...prev, Points]);

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
    setPoint((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-geist font-bold">Create Evaluation</h2>
      <form
        onSubmit={formik.handleSubmit} // This submits the final accumulated data
        className="flex  gap-7   w-full border border-black"
      >
        <div className="main w-[50%] border border-black px-5 py-5 rounded-md">
          <div className="inputContainers flex flex-col gap-2">
            <div className="inputContainer">
              <label
                htmlFor="phone"
                className="font-geist text-[17px] font-medium "
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter teacher phone number"
                className="border w-full p-4 rounded-md font-geist shadow-md"
                onChange={(e) =>
                  setEvaluationData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                value={evaluationData.phone}
              />
              <p className="text-red-500">
                {formik.touched.phone
                  ? formik.errors.phone
                    ? formik.errors.phone
                    : null
                  : null}
              </p>
            </div>
            <div className="input">
              <h1 className="font-geist text-[17px] font-medium ">
                Assessment Areas
              </h1>
              <select
                className="border w-full p-4 rounded-md font-geist shadow-md"
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
            </div>

            <div className="input">
              <h1 className="font-geist text-[17px] font-medium ">Criteria</h1>
              <input
                type="text"
                readOnly
                value={selectedCriteria}
                className="border w-full p-4 rounded-md font-geist shadow-md"
              />
            </div>

            <div className="input">
              <h1 className="font-geist text-[17px] font-medium ">Rating</h1>
              <select
                className="border w-full p-4 rounded-md font-geist shadow-md"
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
            </div>

            <button
              type="button"
              onClick={handleAddToLetter}
              className="bg-black text-white px-10 py-3 mt-2 rounded-md font-geist"
            >
              Add to Paper
            </button>
          </div>
        </div>

        {/* Display the letter of evaluation */}
        <div className="letterOFTeacherEvaluation rounded-md mt-1 w-full p-4 border border-black flex flex-col items-baseline  bg-slate-900">
          <div className="info flex  justify-between w-full gap-1">
            <div className="labels">
              <h1 className="text-white font-geist text-xl">
                Teacher Evaluation
              </h1>
              <h1 className="text-white  text-[14px] font-acumin">
                Name: Farhaan abdi ali
              </h1>
              <h1 className="text-white font-geist text-xs">
                Teacher Phone: {evaluationData.phone}
              </h1>
            </div>

            <div className="date text-white">
              <h1 className="font-geist">
                {" "}
                {dayjs(new Date().toString()).format("DD.MM.YYYY")}
              </h1>
              <h1 className="font-geist text-xs">
                {" "}
                {dayjs(new Date().toString()).format("HH.MM a")}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 items-center w-full   text-white  ">
            <h1 className="text-xl font-geist">Assessment Areas</h1>

            <h1 className="text-xl font-geist">Criteria</h1>
            <h1 className="text-xl font-geist ml-8">Rating</h1>
            <h1 className="text-xl font-geist ml-8">Point</h1>
            <h1 className="text-xl font-geist">Action</h1>
          </div>

          {evaluationData.assessmentArea.map((area, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-10 items-center w-full py-3  rounded  border text-white "
            >
              <p className="text-[14px] ">{area.toLowerCase()}</p>

              <p className="text-[14px] ">
                {evaluationData.criteria[index].toLowerCase()}
              </p>
              <p className="text-[14px] ml-4">
                {evaluationData.rating[index].toLowerCase()}
              </p>
              <p className="text-[14px] ml-4">{point[index]}</p>
              <span
                className="text-[#f00] ml-5"
                onClick={() => handleDeleteRow(index)}
              >
                <FaTrash />
              </span>
            </div>
          ))}

          <div className="butt">
            <button
              className="bg-black font-geist text-white px-14 rounded py-2"
              type="submit" // Submit the form data
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
