import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/Auth/loginSLice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { PiHandWithdrawFill } from "react-icons/pi";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login"); // Navigate to the welcome page after logout
  };
  return (
    <div className=" fixed px-3 flex flex-col justify-between border h-[97%] py-3  rounded-[1rem]  bg-[#F0F9FF] items-center  w-[240px] pt-6">
      <div className="la text-[#000] font-geist font-bold text-xl">al-huda</div>
      <div className="links flex flex-col gap-2 flex-grow px-3 py-5">
        <Link
          to={"create-evaluation"}
          className="text-[14px] font-geist font-bold"
        >
          Add Evaluation
        </Link>
        <Link
          to={"edit-evaluations"}
          className="text-[14px] font-geist font-bold"
        >
          Edit Evaluation
        </Link>
        <Link
          to={"fetch-evaluations"}
          className="text-[14px] font-geist font-bold"
        >
          Evaluation List
        </Link>
      </div>
      <div className="logout">
        <button
          onClick={handleLogout}
          className="text-[14px] leading-5 flex gap-4 font-bold font-geist text-[#000000cc] hover:text-[#fafafae0] text-white"
        >
          <PiHandWithdrawFill className={`text-black text-xl $`} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
