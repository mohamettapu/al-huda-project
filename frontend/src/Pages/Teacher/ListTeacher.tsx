import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { listTeacherFN } from "../../Redux/Slices/teacher/listTeacherSLice";

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

  console.log("Full listTeacherSlice data:", listTeacherSlice.data);

  if (!listTeacherSlice.data.data) {
    return <h1>there is no teacher list </h1>;
  }
  const filterTeacher =
    listTeacherSlice.data.data.filter((teacher) =>
      teacher.fullName.includes(searchName)
    ) || [];

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

              {filterTeacher.map((teacher) => (
                <div className="bg-[#679bf527] hover:bg-[#679bf59b] duration-500 w-[99.7%] p-4 border-4 border-[#c1c1fabf]  rounded-lg">
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
