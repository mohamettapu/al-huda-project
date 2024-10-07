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
    <div className=" fixed px-3 flex flex-col justify-between border h-[97%] py-3  items-center  w-[280px] pt-6">
      <div className="la text-[#000] font-geist font-bold text-xl">al-huda</div>
      <div className="links ">
        <Link to={"create-evaluation"} className="text-[14px] font-geist">
          Evaluation
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
