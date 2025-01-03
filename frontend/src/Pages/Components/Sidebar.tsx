import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/Auth/loginSLice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { PiHandWithdrawFill, PiListChecksFill } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { FaChevronDown, FaChevronUp, FaPollH } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { IoMdPrint } from "react-icons/io";

const Sidebar = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login"); // Navigate to the welcome page after logout
  };
  const toggleShowLinks = () => {
    setShowLinks((prevState) => !prevState);
  };
  return (
    <div className="  px-3 flex flex-col justify-between border  py-3  rounded-[1rem]  bg-[#F0F9FF] items-center  w-[240px] pt-6">
      <div className="la text-[#000] font-geist  flex flex-col gap-1 items-center ">
        <h1 className="text-black font-bold text-3xl ">Al-Huda</h1>
        <h1 className="text-black font-medium text-xs ">
          Evaluation Management
        </h1>
      </div>
      <div className="links flex flex-col gap-3 flex-grow px-3 py-5 mt-6">
        <Link
          to={"/dashboard"}
          onClick={onLinkClick}
          className="text-[14px] flex items-center gap-3 font-geist font-bold hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <RxDashboard className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          Dashboard
        </Link>
        <Link
          onClick={onLinkClick}
          to={"fetch-users"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <FaCircleUser className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          users
        </Link>
        <Link
          onClick={onLinkClick}
          to={"create-evaluation"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <FaPollH className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          Add Evaluation
        </Link>
        <Link
          onClick={onLinkClick}
          to={"edit-evaluations"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <RiEditBoxFill className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          Edit Evaluation
        </Link>
        <Link
          onClick={onLinkClick}
          to={"fetch-evaluations"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <PiListChecksFill className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          Evaluation List
        </Link>
        <Link
          onClick={onLinkClick}
          to={"create-teacher"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <BiSolidMessageSquareAdd className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          add teacher
        </Link>
        <Link
          onClick={onLinkClick}
          to={"update-teacher"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <RiEditBoxFill className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          edit teacher
        </Link>
        <Link
          onClick={onLinkClick}
          to={"list-teacher"}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <PiListChecksFill className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          List Teacher
        </Link>
        <button
          onClick={toggleShowLinks}
          className="text-[14px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 px-6 rounded-md duration-500"
        >
          <PiListChecksFill className="text-xl bg-black text-white  p-1 rounded-md w-7 h-7" />
          Reports {showLinks ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {showLinks && (
          <div className="flex flex-col gap-3 mt-3 ml-3 px-6">
            <Link
              onClick={onLinkClick}
              to={"teacher-report"}
              className="text-[11px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 rounded-md duration-500"
            >
              <IoMdPrint className="text-xs bg-black text-white p-1 rounded-md w-6 h-6" />
              Print teachers
            </Link>
            <Link
              onClick={onLinkClick}
              to={"evaluation-report"}
              className="text-[11px] font-geist font-bold flex items-center gap-3 hover:bg-[#d5e7f3] py-2 rounded-md duration-500"
            >
              <IoMdPrint className="text-xs bg-black text-white p-1 rounded-md w-6 h-6" />
              Print Evaluation
            </Link>
          </div>
        )}
      </div>
      <div className="logout bg-slate-300 h-[7rem] w-[90%] flex rounded-lg py-4 px-7 items-center justify-center hover:bg-[#d5e7f3] duration-500">
        <button
          onClick={handleLogout}
          className="text-[14px] leading-5 flex flex-col items-center gap-4 font-bold font-geist text-black  "
        >
          <PiHandWithdrawFill
            className={`text-black bg-[#fff]  p-2 rounded-full w-10 h-10 text-xl $`}
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
