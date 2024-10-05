import { Link } from "react-router-dom";
import "../.././styles/shadow.css";
const Login = () => {
  return (
    <div className="  rounded-md mt-6 ">
      <div className="form  shadow rounded-[1rem] bg-[#e2e7f33e] w-[33%] h-[35rem] px-10 py-14 mx-auto flex flex-col gap-8 items-center">
        <div className="labels flex flex-col text-center ">
          <label
            htmlFor=""
            className="font-geist font-bold text-2xl text-[#1e1e20dd]"
          >
            Welcome Back!
          </label>
          <label htmlFor="" className="font-geist  text-[#38383b]">
            Enter your credentials to login your account
          </label>
        </div>

        <div className=" inputs w-[100%] flex flex-col gap-3">
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Username
            </h1>
            <input
              type="text"
              placeholder="Enter your username"
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f369]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#b00c0c]">error</p>
          </div>
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Password
            </h1>
            <input
              type="text"
              placeholder="Enter your Password"
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f384]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">error</p>
          </div>
          <div className="text-right mt-2">
            {" "}
            {/* Added this div to align button */}
            <Link
              to={"/auth/send-reset-code"}
              className="text-[14px] leading-5 font-medium font-geist rounded-[6px] duration-300 mb-5  text-[#000000]  hover:text-[#fafafaef]"
            >
              forget password?
            </Link>
          </div>
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <button className="py-3 font-geist rounded-[.4rem]  border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]">
              Sign In
            </button>
          </div>

          <div className="signup flex  text-center w-[100%] justify-center items-center gap-2">
            <p className="font-geist text-[14px] text-[#000]">
              don't have an account?
            </p>
            <Link
              className="font-geist text-[16px] text-[#000] border-b-2"
              to={"/auth/signUp"}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// 93435
