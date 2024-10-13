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
    <div className="w-full border">
      <div className="labels">
        <h1 className="text-black font-geist text-2xl font-bold border-l-2 border-black pl-2">
          {" "}
          Evaluation List
        </h1>
        <input
          type="text"
          onChange={(e) => setsearchName(e.target.value)}
          value={searchName}
          className="text-[14px] leading-5 font-normal my-4 font-geist py-2 px-10 w-72 rounded-[6px]  duration-300 border-2 border-[#768df46d]  text-[#000000] bg-[#7bb8f530]  hover:bg-[#ffffff31]"
          placeholder="search by name..."
        />
      </div>

      <div className="mainList w-full">
        <div className="table w-full">
          <table className="w-full  ">
            <tbody className=" flex   flex-wrap gap-2   justify-center   w-full ">
              {filterTeacher.map((teacher: EvaluationResult) => (
                <div className="bg-[#679bf527] hover:bg-[#679bf59b] duration-500 w-[49.7%] p-8 h-[15rem] rounded-lg">
                  <div className="flex items-center justify-between pr-5">
                    <div className="lbl">
                      <h1 className=" font-geist font-bold text-lg">
                        {teacher.teacher.fullName}
                      </h1>
                      <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                        {teacher.teacher.phone}
                      </h1>
                      <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                        {teacher.evaluation_No}
                      </h1>
                    </div>
                    <div className="edit bg-[#b8c1f7] p-1 rounded-full">
                      <CiEdit
                        onClick={() =>
                          handleEditClick(
                            teacher.evaluation_No,
                            teacher.teacher.phone.replace(/\+252/g, "")
                          )
                        }
                        className="text-[38px] cursor-pointer bg-[#b9d3f7] hover:text-[40px] duration-300 shadow-lg rounded-full p-2"
                      />
                    </div>
                  </div>

                  <div className="eva flex  items-center  h-[80%] justify-between">
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
                      {teacher.points.map((points, index) => (
                        <h2 className="font-geist text-[14px] " key={index}>
                          {points}%
                        </h2>
                      ))}
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
