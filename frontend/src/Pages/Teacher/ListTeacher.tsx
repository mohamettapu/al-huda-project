import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { listTeacherFN } from "../../Redux/Slices/teacher/listTeacherSLice";
import { PiListChecksFill } from "react-icons/pi";

const ListTeacher = () => {
  const listTeacherSlice = useSelector((state: RootState) => state.listTeacher);
  const [searchName, setsearchName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listTeacherFN());
  }, [dispatch]);

  if (listTeacherSlice.isLoading) {
    return (
      <h1 className="w-full py-5 rounded-md bg-[#97979742] animate-pulse"></h1>
    );
  }

  console.log("Full listTeacherSlice data:", listTeacherSlice.data.data.length);
  console.log("Full listTeacherSlice data:", listTeacherSlice.data);

  if (!listTeacherSlice.data.data) {
    return <h1>there is no teacher list </h1>;
  }
  const filterTeacher =
    listTeacherSlice.data.data.filter((teacher) =>
      teacher.fullName.includes(searchName)
    ) || [];
  console.log(filterTeacher.length);

  return (
    <div className="w-full border">
      <div className="labels">
        <h1 className="text-black font-geist text-3xl font-bold border-black pl-2 flex items-center gap-3">
          <PiListChecksFill className="text-2xl bg-black text-white  p-1 rounded-md w-7 h-7" />{" "}
          Evaluation List
        </h1>
        <input
          type="text"
          onChange={(e) => setsearchName(e.target.value)}
          value={searchName}
          className="text-[14px] leading-5 font-normal my-4 font-geist py-2 px-10 w-72 rounded-[6px]  duration-300 border-2 border-[#00000027]  text-[#000000] bg-[#ffffff]  hover:bg-[#ffffff31]"
          placeholder="search by name..."
        />
      </div>

      <div className="mainList w-full">
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

              {filterTeacher.map((teacher, index) => (
                <div
                  key={index}
                  className="hover:bg-[#d5e7f3] duration-500 w-[99.7%] px-4 border-b border-[#1a1d1f29]  rounded-lg"
                >
                  <div className="lbl grid grid-cols-3 justify-start items-center gap-9">
                    <h1 className=" font-geist font-bold text-lg">
                      {teacher.id}
                    </h1>
                    <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                      {teacher.fullName}
                    </h1>
                    <h1 className=" text-xs font-geist font-semibold leading-4 text-[14px]">
                      {teacher.phone.replace("+252", "+252     ")}
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

export default ListTeacher;
