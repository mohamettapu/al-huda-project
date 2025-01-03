import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef, useState } from "react";

import { PiListChecksFill } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { TeacherResult } from "../types/TeacherInterfaces";
import { listTeacherFN } from "../Redux/Slices/teacher/listTeacherSLice";
import { AppDispatch, RootState } from "../Redux/store";
const ReportTeacher = () => {
  const listTeacherSlice = useSelector((state: RootState) => state.listTeacher);
  const [searchName, setsearchName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Teacher List",
    onAfterPrint: () => console.log("Print complete"),
  });
  useEffect(() => {
    dispatch(listTeacherFN());
  }, [dispatch]);

  if (listTeacherSlice.isLoading) {
    return (
      <h1 className="w-full py-5 rounded-md bg-[#97979742] animate-pulse"></h1>
    );
  }

  // console.log("Full listTeacherSlice data:", listTeacherSlice.data.data.length);
  // console.log("Full listTeacherSlice data:", listTeacherSlice.data);

  if (!listTeacherSlice.data.data) {
    return <h1>there is no teacher list </h1>;
  }
  const filterTeacher =
    listTeacherSlice.data.data.filter((teacher: TeacherResult) =>
      teacher.fullName.includes(searchName)
    ) || [];
  // console.log(filterTeacher.length);

  return (
    <div className="w-full border">
      <div className="labels">
        <h1 className="text-black font-geist text-3xl font-bold border-black pl-2 flex items-center gap-3">
          <PiListChecksFill className="text-2xl bg-black text-white  p-1 rounded-md w-7 h-7" />{" "}
          Teacher Information
        </h1>
        <input
          type="text"
          onChange={(e) => setsearchName(e.target.value)}
          value={searchName}
          className="bg-slate-200 rounded-lg py-2 font-geist mt-3 text-black border border-[#0000001c] px-3 w-[20rem]"
          placeholder="search by name..."
        />
      </div>
      <button
        onClick={() => handlePrint()}
        className="bg-black font-geist font-bold text-white px-4 py-2 rounded-md mt-3"
      >
        Print Teacher List
      </button>

      <div className="mainList w-full " ref={componentRef}>
        <div className="table w-full">
          <table className="w-full  ">
            <tbody className=" flex   flex-wrap gap-2   justify-center   w-full ">
              <div className=" duration-500 w-[99.7%] p-8 h-[1rem] rounded-lg">
                <div className="lbl grid grid-cols-3 justify-start items-center gap-9">
                  <h1 className=" font-geist font-bold text-lg">ID</h1>
                  <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                    Full Name
                  </h1>
                  <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                    Mobile Phone
                  </h1>
                </div>
              </div>

              {filterTeacher.map((teacher: TeacherResult, index: number) => (
                <div className="hover:bg-[#d5e7f3] duration-500  flex-col flex w-[99.7%] gap-8 px-4 border-b border-[#1478ba29]  rounded-lg">
                  <tr
                    key={index}
                    className="lbl grid grid-cols-3 justify-start border-black border  text-center items-center gap-9"
                  >
                    <td className=" font-geist font-bold text-lg border-r border-black">
                      {teacher.id}
                    </td>
                    <td className=" font-geist font-bold text-lg border-r border-black">
                      {teacher.fullName}
                    </td>
                    <td className=" font-geist font-bold text-lg ">
                      {teacher.phone.replace("+252", "+252     ")}
                    </td>
                  </tr>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportTeacher;
