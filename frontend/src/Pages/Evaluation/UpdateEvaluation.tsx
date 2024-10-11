import { useEffect, useState } from "react";
import {
  AssessmentArea,
  Criteria,
  IUpdateEvaluationPayload,
  Rating,
} from "../../types/evaluationInterfaces";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import {
  editEvaluationFN,
  resetData,
} from "../../Redux/Slices/Evaluation/editEvaluation";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateEvaluation = () => {
  const [selectedArea, setSelectedArea] = useState<AssessmentArea | "">("");
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | "">("");

  const [selectedRating, setSelectedRating] = useState<Rating | "">("");

  const [editEvaluationData, setEditEvaluationData] =
    useState<IUpdateEvaluationPayload>({
      phone: "",
      evaluation_no: "",
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

  const UpdateEvaluationState = useSelector(
    (state: RootState) => state.editEvaluationSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { phone, evaluation_no } = location.state;
      setEditEvaluationData((prev) => ({
        ...prev,
        phone: phone || "",
        evaluation_no: evaluation_no || "",
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (UpdateEvaluationState.isSuccess) {
      toast.success(UpdateEvaluationState.data.msg || "successfuly updated");
      dispatch(resetData());
      navigate("/dashboard/fetch-evaluations");
    }

    if (UpdateEvaluationState.isError) {
      toast.error(UpdateEvaluationState.errorMsg || "error");
      dispatch(resetData());
    }
  }, [dispatch, UpdateEvaluationState, navigate]);

  const formik = useFormik({
    initialValues: {
      phone: "",
      evaluation_no: "",
      assessmentArea: [],
      criteria: [],
      rating: [],
    },
    onSubmit(values) {
      const finalEditEvaluation: IUpdateEvaluationPayload = {
        phone: editEvaluationData.phone,
        evaluation_no: editEvaluationData.evaluation_no,
        assessmentArea: editEvaluationData.assessmentArea,
        criteria: editEvaluationData.criteria,
        rating: editEvaluationData.rating,
      };
      console.log(values);
      dispatch(editEvaluationFN(finalEditEvaluation));
    },
  });

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AssessmentArea;

    setSelectedArea(value);
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
    if (editEvaluationData.assessmentArea.length >= 4) {
      toast.error("maximum Evaluation allowed is 4");
      return;
    }
    if (selectedArea && selectedCriteria && selectedRating) {
      if (editEvaluationData.assessmentArea.includes(selectedArea)) {
        toast.error(`${selectedArea} is already added`);
        return;
      }

      const Points = ratingPoints[selectedRating] || 0;

      setEditEvaluationData((prev) => ({
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
    setEditEvaluationData((prev) => ({
      ...prev,
      assessmentArea: prev.assessmentArea.filter((_, i) => i !== index),
      criteria: prev.criteria.filter((_, i) => i !== index),
      rating: prev.rating.filter((_, i) => i !== index),
    }));
  };
  return (
    <div>
      <div className="all">
        <div className="labels">
          <h1 className="font-geist text-2xl ">Edit Evaluation</h1>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="main flex gap-4 justify-center"
        >
          <div className="form w-[40%] border-black border  flex flex-col gap-2 px-12 pt-8 pb-6 rounded-lg">
            <div className="inputContainer flex w-[100%] flex-col gap-2">
              <h1 className="text-[18px] font-geist font-medium">
                phone number
              </h1>
              <input
                type="text"
                placeholder="Enter teacher phone"
                className="border w-full p-4 rounded-md font-geist hover:bg-[#b1c2f5] duration-500 "
                name="phone"
                onChange={(e) =>
                  setEditEvaluationData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                value={editEvaluationData.phone}
              />

              <p className="text-red-500">
                {formik.touched.phone
                  ? formik.errors.phone
                    ? formik.errors.phone
                    : null
                  : null}
              </p>
            </div>
            <div className="inputContainer flex w-[100%] flex-col gap-2">
              <h1 className="text-[18px] font-geist font-medium">
                Evaluation number
              </h1>
              <input
                type="text"
                placeholder="Enter Evaluation number"
                className="border w-full p-4 rounded-md font-geist hover:bg-[#b1c2f5] duration-500"
                name="evaluation_no"
                value={editEvaluationData.evaluation_no}
                onChange={(e) =>
                  setEditEvaluationData((prev) => ({
                    ...prev,
                    evaluation_no: e.target.value,
                  }))
                }
              />

              <p className="text-red-500">
                {formik.touched.evaluation_no
                  ? formik.errors.evaluation_no
                    ? formik.errors.evaluation_no
                    : null
                  : null}
              </p>
            </div>

            <div className="flex w-[100%] flex-col gap-2">
              <h1 className="text-[18px] font-geist font-medium">
                Assessment Area
              </h1>

              <select
                name="AssessmentArea"
                id=""
                value={selectedArea}
                onChange={handleAreaChange}
                className="border w-full p-4 rounded-md font-geist hover:bg-[#b1c2f5] duration-500"
              >
                <option value="">select area</option>
                {Object.values(AssessmentArea).map((area) => (
                  <option className="text-black" value={area} key={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputContainer flex w-[100%] flex-col gap-2">
              <h1 className="text-[18px] font-geist font-medium">Criteria</h1>
              <input
                type="text"
                readOnly
                value={selectedCriteria}
                placeholder="Criteria"
                className="border w-full p-4 rounded-md  dura font-geist hover:bg-[#b1c2f5] duration-500"
              />

              <p className="text-[#ed0909] text-xs">error</p>
            </div>
            <div className="flex w-[100%] flex-col gap-2">
              <h1 className="text-[18px] font-geist font-medium">Rating</h1>

              <select
                name="Rating"
                id=""
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value as Rating)}
                className="border w-full p-4 rounded-md font-geist hover:bg-[#b1c2f5] duration-500"
              >
                <option value="">select rating</option>
                {Object.values(Rating).map((rate) => (
                  <option className="text-black" value={rate} key={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>

            <div className="button mt-4">
              <button
                type="button"
                onClick={handleAddToLetter}
                className=" bg-black font-geist text-white w-full py-3 rounded-lg font-bold"
              >
                Add to letter
              </button>
            </div>
          </div>
          {/* letter of evaluations  */}
          <div className="letter border-black border w-[48%]">
            <div className="labels">
              <h1>name:</h1>
              <h1>phone:{editEvaluationData.phone}</h1>
              <h1>phone:{editEvaluationData.evaluation_no}</h1>
            </div>

            <div className="text-black">
              <div className="grid grid-cols-5 gap-3 items-center w-full    ">
                <h1 className="text-xl font-geist">Assessment Areas</h1>

                <h1 className="text-xl font-geist">Criteria</h1>
                <h1 className="text-xl font-geist ml-8">Rating</h1>
                <h1 className="text-xl font-geist ml-8">Point</h1>
                <h1 className="text-xl font-geist">Action</h1>
              </div>
              {editEvaluationData.assessmentArea.map((area, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center  gap-10  px-5 w-full py-3  rounded  bg-slate-950  border text-white "
                >
                  <p className="text-[14px]  flex-1">{area.toLowerCase()}</p>

                  <p className="text-[14px]  flex-1">
                    {editEvaluationData.criteria[index].toLowerCase()}
                  </p>
                  <p className="text-[14px]  flex-1">
                    {editEvaluationData.rating[index].toLowerCase()}
                  </p>
                  <p className="text-[14px]  flex-1">{point[index]}</p>
                  <span
                    className="text-[#f00]  flex-1"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvaluation;
