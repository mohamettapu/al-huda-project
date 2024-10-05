import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <div className="flex items-center justify-between w-[90%]  mx-auto border border-[#11030338] mt-2 rounded-[0.4rem]  px-14 py-2">
      <div className="">
        <label htmlFor="" className="text-[#fff] font-geist text-xl font-bold ">
          Stark bank
        </label>
      </div>
      <div className="flex flex-row  gap-3   h-full  rounded-md   px-4  border shadow-[0_5px_60px_-15px_rgba(0,0,10,10.3)] ">
        <Link className="text-[14xpx]   font-bold" to={"/auth/signUp"}>
          Sign Up
        </Link>
        <Link className="" to={"/auth/login"}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
