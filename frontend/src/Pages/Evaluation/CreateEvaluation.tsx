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
    <div className="p-0">
      <form
        onSubmit={formik.handleSubmit} // This submits the final accumulated data
        className="flex flex-col  justify-center items-center border-black   gap-7   w-full "
      >
        <div className="main w-[45%] shadow flex flex-col bg-[#F0F9FF]  gap-3 items-center   px-10 py-5 rounded-xl">
          <h2 className="text-4xl font-geist font-bold">Create Evaluation</h2>
          <div className="inputContainers  w-[100%] p-5 flex flex-col gap-3">
            <div className="inputContainer flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="font-geist text-[20px] font-medium "
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter teacher phone number"
                className=" w-full p-4 rounded-md xl border-l-2 border-slate-900 bg-[#e2e7f369] font-geist "
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
            <div className="input flex  flex-col gap-1">
              <h1 className="font-geist text-[20px] font-medium ">Area</h1>
              <select
                className=" w-full p-4 border-l-2 border-slate-900 rounded-md bg-[#e2e7f369] xl font-geist "
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

            <div className="input flex flex-col gap-1">
              <h1 className="font-geist text-[20px] font-medium ">Criteria</h1>
              <input
                type="text"
                readOnly
                value={selectedCriteria}
                className=" w-full p-4 rounded-md xl border-l-2 border-slate-900 bg-[#e2e7f369] font-geist "
              />
            </div>

            <div className="input flex flex-col gap-1">
              <h1 className="font-geist text-[20px] font-medium ">Rating</h1>
              <select
                className=" w-full p-4 border-l-2 border-slate-900 rounded-md bg-[#e2e7f369] xl font-geist "
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
          </div>
          <div className="butn w-full px-4  ">
            <button
              type="button"
              onClick={handleAddToLetter}
              className="bg-black text-white px-10 py-3 mt-2 w-[100%] mx-auto rounded-md xl font-geist"
            >
              Add to Paper
            </button>
          </div>
        </div>

        {/* Display the letter of evaluation */}
        <div className="letterOFTeacherEvaluation rounded-md xl mt-1 w-full h-full p-4   flex flex-col items-baseline bg-black">
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
            <h1 className="text-xl font-geist"> Areas</h1>

            <h1 className="text-xl font-geist">Criteria</h1>
            <h1 className="text-xl font-geist ml-8">Rating</h1>
            <h1 className="text-xl font-geist ml-8">Point</h1>
            <h1 className="text-xl font-geist">Action</h1>
          </div>

          {evaluationData.assessmentArea.map((area, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-10 items-center w-full py-3  rounded-md px-2  border-2  border-slate-800 mt-2 text-white "
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
              className="bg-slate-200 font-geist text-slate-900 font-bold mt-4 px-14 rounded-md py-2"
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
