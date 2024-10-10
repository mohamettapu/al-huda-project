import { useState } from "react";
import {
  AssessmentArea,
  Criteria,
  IUpdateEvaluationPayload,
  Rating,
} from "../../types/evaluationInterfaces";

const UpdateEvaluation = () => {
  const [selectedArea, setSelectedArea] = useState<AssessmentArea | "">("");
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | "">("");

  const [selectedRating, setSelectedRating] = useState<Rating | "">("");

  const [editEvaluationData,setEditEvaluationData]=useState<IUpdateEvaluationPayload>({
    phone:"",
    evaluation_no:"",
    assessmentArea:[],
    criteria:[],
    rating:[]
  })
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
  return (
    <div>
      <div className="all">
        <div className="labels">
          <h1 className="font-geist text-2xl ">Edit Evaluation</h1>
        </div>

        <div className="form w-[40%] border-black border  flex flex-col gap-2 px-12 pt-8 pb-6 rounded-lg">
          <div className="inputContainer flex w-[100%] flex-col gap-2">
            <h1 className="text-[18px] font-geist font-medium">phone number</h1>
            <input
              type="text"
              placeholder="Enter teacher phone"
              className="border w-full p-4 rounded-md font-geist hover:bg-[#b1c2f5] duration-500 "
              name="phone"
              onChange={(e)=>setEditEvaluationData((prev)=>({
                ...prev,phone:e.target.value
              }))}
              value={editEvaluationData.phone}
            />

            <p className="text-[#ed0909] text-xs">error</p>
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
              onChange={(e)=>setEditEvaluationData((prev)=>({...prev,evaluation_no:e.target.value}))}
            />

            <p className="text-[#ed0909] text-xs">error</p>
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
              name=""
              id=""
              onChange={(e) => setSelectedRating(e.target.value as Rating)}
              className="border w-full p-4 rounded-md font-geist hover:bg-[#b1c2f5] duration-500"
            >
              <option value="">select rating</option>
              {Object.values(Rating).map((rate) => (
                <option className="text-black" value="rate" key={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>

          <div className="button mt-4">
            <button className=" bg-black font-geist text-white w-full py-3 rounded-lg font-bold">
              Add to letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvaluation;
