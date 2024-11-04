import { useEffect, useState } from "react";
import "../.././src/styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { listTeacherFN } from "../Redux/Slices/teacher/listTeacherSLice";
import { FaPollH } from "react-icons/fa";
import {
  listEvaluationFN,
  // listEvaluationSlice,
} from "../Redux/Slices/Evaluation/ListEvaluation";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const logiState = useSelector((state: RootState) => state.login);
  const listTeacherSlice = useSelector((state: RootState) => state.listTeacher);

  const ListEvaluationState = useSelector(
    (state: RootState) => state.listEvaluations
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
    dispatch(listTeacherFN());
    dispatch(listEvaluationFN());
    console.log(logiState.data);
    return () => setIsVisible(false);
  }, [setIsVisible, dispatch, logiState]);
  const userPhone = logiState.data.phone;
  // console.log(typeof userPhone);
  const teacher = listTeacherSlice.data?.data?.find(
    (t) => t.phone === userPhone
  );

  // const teachersNotEvaluatedYet=
  const t = listTeacherSlice.data?.data;
  const e = ListEvaluationState.data?.data;
  console.log("teachers array", t);
  console.log("evaluation array", e);

  const countEvaluationTeachersNotTakedYet =
    Number(t?.length) - Number(e?.length);
  // console.log("Teachers Array:", teacher);
  const firstName = teacher ? teacher.fullName.split(" ")[0] : "guest";
  const countEvaluation = ListEvaluationState.data?.data?.length || 0;
  const countTeacher = listTeacherSlice.data?.data?.length || 0;
  const navigateToEvaluationList = () => {
    navigate("/dashboard/fetch-evaluations");
  };
  return (
    <div
      className={`text-black ${
        isVisible ? "dashboard-animate" : ""
      } grid grid-cols-2 gap-6 p-8 h-full min-w-[70%]`}
    >
      <div className="mainLabel border  rounded-lg flex flex-col gap-4">
        <div className="bg-slate-300 h-32 rounded-lg p-6 flex items-center justify-start gap-52">
          <div className="labels flex flex-col items-start justify-center">
            <h1 className=" font-geist text-3xl font-bold  text-black">
              Hello {firstName}
            </h1>
            <h2 className="text-xs font-bold font-geist">
              its good to see you again
            </h2>
          </div>
          <div className="icon">icon</div>
        </div>
        <div className="bg-slate-300 h-full rounded-lg  flex flex-col items-start justify-start ">
          <div className="labels">
            <h1 className="text-[15px] font-bold font-geist">
              Last Evaluations
            </h1>
          </div>
          <ul className="flex flex-col w-full gap-3">
            {ListEvaluationState.data?.data?.map((eva, index) => (
              <div
                className="flex text-xs w-full justify-between gap-6 px-3 py-4 border rounded-lg"
                key={index}
              >
                <li>{eva.teacher.fullName.split(" ")[0]}</li>
                <li>{eva.assessmentArea}</li>
                <li>{eva.criteria}</li>
                <li>{eva.rating}</li>
                <li>{eva.points}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="border border-black rounded-lg">
        <div className=" h-40 rounded-lg  grid grid-cols-2 items-center justify-start  gap-6">
          <Link
            to={"/dashboard/fetch-evaluations"}
            className="bg-black text-white h-40 rounded-lg p-6 gap-5 flex flex-col text-center items-start justify-start"
          >
            <div className="div flex justify-between w-full">
              <h1 className="text-3xl font-bold font-geist">
                {countEvaluation}
              </h1>
              <FaPollH
                onClick={navigateToEvaluationList}
                className="text-xl bg-white cursor-pointer text-black  p-1 rounded-md w-7 h-7"
              />
            </div>
            <div
              className=" flex flex-col justify-start
          "
            >
              <h1 className="text-2xl font-bold font-geist">Evalution taked</h1>
              <h1 className="text-xs font-bold font-geist">
                enter to make new evaluations
              </h1>
            </div>
          </Link>
          <Link
            to={"/dashboard/list-teacher"}
            className="bg-black text-white h-40 rounded-lg p-6 gap-5 flex flex-col text-center items-start justify-start"
          >
            <div className="div flex justify-between w-full">
              <h1 className="text-3xl font-bold font-geist">{countTeacher}</h1>
              <FaPollH
                onClick={navigateToEvaluationList}
                className="text-xl bg-white cursor-pointer text-black  p-1 rounded-md w-7 h-7"
              />
            </div>
            <div
              className=" flex flex-col justify-start
          "
            >
              <h1 className="text-2xl font-bold font-geist">teachers</h1>
              <h1 className="text-xs font-bold font-geist">
                teachers of alhuda
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
