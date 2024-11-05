import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { listEvaluationFN } from "../../Redux/Slices/Evaluation/ListEvaluation";
import { CiEdit } from "react-icons/ci";

import { EvaluationResult } from "../../types/evaluationInterfaces";
import { useNavigate } from "react-router-dom";

const ListEvaluation = () => {
  const ListEvaluationState = useSelector(
    (state: RootState) => state.listEvaluations
  );
  const [searchName, setsearchName] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [setIsVisible]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listEvaluationFN());
  }, [dispatch]);

  if (ListEvaluationState.isLoading) {
    return (
      <h1 className="w-full py-5 rounded-md bg-[#97979742] animate-pulse"></h1>
    );
  }

  console.log("Full ListEvaluationState data:", ListEvaluationState.data);

  if (!ListEvaluationState.data.data) {
    return <h1>there is no evaluations </h1>;
  }
  const filterTeacher =
    ListEvaluationState.data.data.filter((teacher: EvaluationResult) =>
      teacher.teacher.fullName.includes(searchName)
    ) || [];

  const handleEditClick = (evaluation_no: string, phone: string) => {
    navigate("/dashboard/edit-evaluations", {
      state: { evaluation_no, phone },
    });
  };
  return (
    <div
      className={`w-full border transition-opacity duration-1000  transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-56 opacity-0"
      }`}
    >
      <div className="labels">
        <h1 className="text-black font-geist text-2xl font-bold border-l-2 border-black pl-2">
          {" "}
          Evaluation List
        </h1>
        <input
          type="text"
          onChange={(e) => setsearchName(e.target.value)}
          value={searchName}
          className="bg-slate-200 rounded-lg py-2 my-5 font-geist text-black border border-[#0000001c] px-3 w-[20rem]"
          placeholder="search by name..."
        />
      </div>

      <div className="mainList w-full  flex items-center h-full">
        <div className="table w-full">
          <table className="w-full border ">
            <tbody className=" grid grid-cols-3 gap-2  flex-wrap   justify-start   w-full ">
              {filterTeacher.map((teacher: EvaluationResult) => (
                <div className="bg-slate-300 hover:bg-slate-200 duration-500   p-5 flex flex-col gap-4  rounded-lg">
                  <div className="flex items-center justify-between  ">
                    <div className="lbl flex flex-col gap-1">
                      <h1 className=" font-geist font-bold  text-xs">
                        {teacher.teacher.fullName}
                      </h1>
                      <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                        {teacher.teacher.phone}
                      </h1>
                    </div>
                    <div className="edit  p-1 rounded-full flex items-center gap-4">
                      <h1 className="  font-geist font-semibold leading-4 text-[16px]">
                        evaluation number {teacher.evaluation_No}
                      </h1>
                      <CiEdit
                        onClick={() =>
                          handleEditClick(
                            teacher.evaluation_No,
                            teacher.teacher.phone.replace(/\+252/g, "")
                          )
                        }
                        className="bg-black text-white w-7 h-7 rounded-md p-1 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between  ">
                    <h1 className="flex flex-col justify-center h-full gap-3 ">
                      {teacher.assessmentArea.map((area, index) => (
                        <h2 className="font-geist text-[14px] " key={index}>
                          {area.toLowerCase()}
                        </h2>
                      ))}
                    </h1>
                    <h1 className="flex flex-col justify-center h-full gap-3">
                      {teacher.criteria.map((criteria, index) => (
                        <h2 className="font-geist text-[14px] " key={index}>
                          {criteria.toLowerCase()}
                        </h2>
                      ))}
                    </h1>
                    <h1 className="flex flex-col justify-center h-full gap-3">
                      {teacher.rating.map((rating, index) => (
                        <h2 className="font-geist text-[14px] " key={index}>
                          {rating.toLowerCase()}
                        </h2>
                      ))}
                    </h1>
                    <h1 className="flex flex-col justify-center h-full gap-3">
                      {teacher.points}
                    </h1>
                  </div>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEvaluation;
