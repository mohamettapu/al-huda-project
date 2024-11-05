import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
// import { useNavigate } from "react-router-dom";
import { listEvaluationFN } from "../Redux/Slices/Evaluation/ListEvaluation";
import { useReactToPrint } from "react-to-print";
import { EvaluationResult } from "../types/evaluationInterfaces";

const EvalutionReport = () => {
  const ListEvaluationState = useSelector(
    (state: RootState) => state.listEvaluations
  );
  const evaluationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  //   const navigate = useNavigate();
  useEffect(() => {
    dispatch(listEvaluationFN());
  }, [dispatch]);
  const evalutionPrint = useReactToPrint({
    contentRef: evaluationRef,
    documentTitle: "Evaluation Data",
    onAfterPrint: () => console.log("Evaluation print complete"),
  });
  const [searchName, setsearchName] = useState<string>("");
  const filterTeacher =
    ListEvaluationState.data?.data?.filter((teacher: EvaluationResult) =>
      teacher.teacher.fullName.includes(searchName)
    ) || [];
  const today = new Date();
  const getDate = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    return `${day}/${month}/${year}`;
  };
  return (
    <div>
      <div className="labels flex items-center justify-between">
        <div className="">
          <h1 className="text-black font-geist text-2xl font-bold border-l-2 border-black pl-2">
            {" "}
            Print Evaluation Info
          </h1>
          <input
            type="text"
            onChange={(e) => setsearchName(e.target.value)}
            value={searchName}
            className="bg-slate-200 rounded-lg py-2 my-5 font-geist text-black border border-[#0000001c] px-3 w-[20rem]"
            placeholder="search by name..."
          />
        </div>

        <div className="print">
          <button
            onClick={() => evalutionPrint()}
            className="bg-black font-geist font-bold text-white px-4 py-2 rounded-md mt-3"
          >
            Print Teacher List
          </button>
        </div>
      </div>

      <div
        className="mainList w-full  flex flex-col items-center h-full border gap-6  py-10"
        ref={evaluationRef}
      >
        <div className="labels">
          <h1 className="text-2xl font-geist font-bold">Teacher Evaluation</h1>
          <h1 className="text-xs text-center text-[#000000a3] font-geist font-bold">
            {" "}
            alhuda Teachers Evaluation
          </h1>
          <h1 className="text-xs text-center text-[#000000a3] font-geist font-bold">
            {" "}
            {getDate()}
          </h1>
        </div>
        <div className="table w-full">
          <table className="w-full border flex flex-col ">
            <thead>
              <tr className="border px-10 flex w-full">
                <th className="text-xs font-geist border border-black w-[5%] text-center">
                  No
                </th>
                <th className="text-xs font-geist border border-black w-[16%]">
                  Teacher
                </th>
                <th className="text-xs font-geist border border-black w-[5%] text-center">
                  Evaluation No.
                </th>
                <th className="text-xs font-geist border border-black w-[15%] text-center">
                  Phone
                </th>
                <th className="text-xs font-geist border border-black text-center w-[20%]">
                  Assessment Area
                </th>
                <th className="text-xs font-geist border border-black  text-center w-[20%]">
                  Criteria
                </th>
                <th className="text-xs font-geist border border-black   text-center w-[20%]">
                  Rating
                </th>
                <th className="text-xs font-geist border border-black w-[5%] text-center">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="  gap-2  flex-wrap border   px-10    w-[100%] ">
              {filterTeacher.map((teacher, index) => (
                <tr key={index} className="border flex w-full">
                  <td className="text-xs font-geist border border-black w-[5%] text-center">
                    {index + 1}
                  </td>
                  <td className="text-xs font-geist border border-black w-[16%]">
                    {teacher.teacher.fullName}
                  </td>
                  <td className="text-xs font-geist border border-black w-[5%] text-center">
                    {teacher.evaluation_No}
                  </td>
                  <td className="text-xs font-geist border border-black w-[15%] text-center">
                    {teacher.teacher.phone}
                  </td>
                  <td className="text-xs font-geist border border-black text-center w-[20%]">
                    {teacher.assessmentArea.map((area) => (
                      <h1 className="text-xs text-wrap">
                        {area.toLowerCase()}
                      </h1>
                    ))}
                  </td>
                  <td className="text-xs font-geist border border-black  text-center w-[20%]">
                    {teacher.criteria.map((cri) => (
                      <h1 className="text-xs text-wrap">{cri.toLowerCase()}</h1>
                    ))}
                  </td>
                  <td className="text-xs font-geist border border-black   text-center w-[20%]">
                    {teacher.rating.map((rate) => (
                      <h1 className="text-xs text-wrap">
                        {rate.toLowerCase()}
                      </h1>
                    ))}
                  </td>
                  <td className="text-xs font-geist border border-black w-[5%] text-center">
                    {teacher.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EvalutionReport;
