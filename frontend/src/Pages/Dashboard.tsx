import { useEffect, useState } from "react";
import "../.././src/styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { listTeacherFN } from "../Redux/Slices/teacher/listTeacherSLice";
import { FaPollH, FaUserTie } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { ImPhone } from "react-icons/im";

import hellpng from "../../public/hello.png";
import {
  listEvaluationFN,
  // listEvaluationSlice,
} from "../Redux/Slices/Evaluation/ListEvaluation";
import { Link, useNavigate } from "react-router-dom";
import { userListFN } from "../Redux/Slices/users/userListSlice";
import { CiEdit } from "react-icons/ci";
const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const logiState = useSelector((state: RootState) => state.login);
  const listTeacherSlice = useSelector((state: RootState) => state.listTeacher);

  const ListEvaluationState = useSelector(
    (state: RootState) => state.listEvaluations
  );
  const userListState = useSelector((state: RootState) => state.listUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
    dispatch(listTeacherFN());
    dispatch(listEvaluationFN());
    dispatch(userListFN());
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

  // const countEvaluationTeachersNotTakedYet =
  //   Number(t?.length) - Number(e?.length);
  // console.log("Teachers Array:", teacher);
  const firstName = teacher ? teacher.fullName.split(" ")[0] : "guest";
  const countEvaluation = ListEvaluationState.data?.data?.length || 0;
  const countTeacher = listTeacherSlice.data?.data?.length || 0;
  const countUser = userListState.data?.data?.length || 0;
  const navigateToEvaluationList = () => {
    navigate("/dashboard/fetch-evaluations");
  };
  const navigateToUserList = () => {
    navigate("/dashboard/fetch-users");
  };
  const handleEditClick = (evaluation_no: string, phone: string) => {
    navigate("/dashboard/edit-evaluations", {
      state: { evaluation_no, phone },
    });
  };
  return (
    <div
      className={`transition-opacity duration-1000 transform ${
        isVisible
          ? "translate-y-0 opacity-100 grid grid-cols-2 gap-6 p-8 h-full min-w-[70%]"
          : "translate-y-56 opacity-0 grid grid-cols-2 gap-6 p-8 h-full min-w-[70%]"
      }`}
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
          <div className="icon ">
            <img
              className="w-60  mb-8 h-50 p-4 rounded-full"
              src={hellpng}
              alt=""
            />
          </div>
        </div>
        <div className="bg-slate-200 h-[5rem] rounded-lg flex justify-between items-center gap-4 px-5">
          <div className="desc flex gap-2">
            <FaCircleUser className="text-4xl font-bold" />
            <div
              className="flex flex-col
            "
            >
              <h1 className="text-black font-bold font-geist">
                {countUser === 1 ? `${countUser} user` : `${countUser} users`}
              </h1>
              <h3 className="text-[#131313c7] font-geist text-xs font-medium">
                user that use the system
              </h3>
            </div>
          </div>

          <div className="btn">
            <button
              onClick={navigateToUserList}
              className="bg-black text-white font-geist hover:bg-[#000000dd] duration-700 font-bold py-2 px-4 rounded-md w-[10rem] "
            >
              Manage
            </button>
          </div>
        </div>
        <div className=" h-full rounded-lg mt-3 gap-4 flex flex-col items-start justify-start ">
          <div className="labels">
            <h1 className="text-[15px] font-bold font-geist">
              Last Evaluations
            </h1>
          </div>
          <ul className="flex flex-col w-full gap-3 max-h-[460px] bg-slate-300 p-1 rounded-lg overflow-y-auto scrollbar-thin">
            {ListEvaluationState.data?.data
              ?.slice()
              .reverse()
              .map((eva, index) => (
                <div
                  className="flex border-l-2  border-l-black  text-xs w-full items-center justify-between gap-6 px-3 py-6  border bg-slate-200 rounded-md"
                  key={index}
                >
                  <li>{eva.teacher.fullName.split(" ")[0]}</li>
                  <li>
                    {eva.assessmentArea.map((area) => (
                      <span>{area.replace("_", " ").toLowerCase()}</span>
                    ))}
                  </li>
                  <li>
                    {eva.criteria.map((cri) => (
                      <span>{cri.replace("_", " ").toLowerCase()}</span>
                    ))}
                  </li>
                  <li className="font-geist font-medium">
                    {eva.rating.map((rate) => (
                      <span>{rate.replace("_", " ").toLowerCase()}</span>
                    ))}
                  </li>
                  <li>{eva.points}</li>
                  <h1>
                    <CiEdit
                      className="bg-black text-white w-7 h-7 rounded-md p-1 cursor-pointer"
                      onClick={() =>
                        handleEditClick(
                          eva.evaluation_No,
                          eva.teacher.phone.replace(/\+252/g, "")
                        )
                      }
                    />
                  </h1>
                </div>
              ))}
          </ul>
        </div>
      </div>
      <div className=" rounded-lg flex flex-col  gap-3 ">
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
        <Link
          to={"/dashboard/list-teacher"}
          className="teacherList bg-slate-300 h-[570px] p-5 rounded-lg w-full flex flex-col gap-4 overflow-y-auto scrollbar-thin"
        >
          <div className="labels">
            <h1 className="text-xl font-geist font-bold">Teachers</h1>
          </div>
          <div className="data flex flex-col gap-3 ">
            {listTeacherSlice.data?.data
              ?.slice(0, 7)
              .reverse()
              .map((teach, index) => (
                <div
                  key={index}
                  className=" flex justify justify-between p-4 font-geist  bg-slate-200 border-4 hover:bg-slate-100 duration-700 border-slate-300 rounded-lg"
                >
                  <FaUserTie className="text-[14px]  p-2 rounded-md bg-black text-white w-8 h-8" />
                  <h1 className="w-[14px] ">{teach.id}</h1>
                  <h1 className="w-[230px] ">{teach.fullName}</h1>
                  <h1 className="flex items-center gap-3 ">
                    <span>
                      <ImPhone className="text-[14px] p-2 rounded-md bg-black text-white w-8 h-8" />
                    </span>
                    {teach.phone.replace("+252", "")}
                  </h1>
                </div>
              ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
