import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import "../.././styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LoginFN } from "../../Redux/Slices/Auth/loginSLice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginstate = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const togglePassworVisibility = () => {
    setShowPassword((firstState) => !firstState);
  };
  useEffect(() => {
    if (loginstate.isSuccess) {
      toast.success(loginstate.data.msg);
      console.log(loginstate.data.msg);
      navigate("/dashboard");
    }
    if (loginstate.isError) {
      console.log(loginstate.errorMsg);
      toast.error(loginstate.errorMsg);
    }
  }, [navigate, loginstate]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit(values) {
      console.log("submitd  " + values.username);
      dispatch(LoginFN(values));
    },
    validationSchema: yup.object({
      username: yup.string().required("enter your username "),
      password: yup.string().required("enter your  password"),
    }),
  });
  return (
    <div className="  rounded-md mt-6 ">
      <form
        onSubmit={formik.handleSubmit}
        className="form  shadow rounded-[1rem] bg-[#F0F9FF] w-[33%] h-[35rem] px-10 py-14 mx-auto flex flex-col gap-8 items-center"
      >
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
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f369]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.username
                ? formik.touched.username
                  ? formik.errors.username
                  : null
                : null}
            </p>
          </div>
          <div className="inputContainer relative flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Password
            </h1>
            <input
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              placeholder="Enter your Password"
              value={formik.values.password}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f384]  px-3 w-[100%]"
            />
            <span
              onClick={togglePassworVisibility}
              className="absolute right-4 top-12 transform  cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <FaRegEyeSlash className="w-6 h-6  text-[#00000098]" />
              ) : (
                <FaRegEye className="w-6 h-6 text-[#00000098]" />
              )}
            </span>
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.password
                ? formik.touched.password
                  ? formik.errors.password
                  : null
                : null}
            </p>
          </div>
          <div className="text-right mt-2">
            {" "}
            {/* Added this div to align button */}
            <Link
              to={"/send-reset-code"}
              className="text-[14px] leading-5 font-medium font-geist rounded-[6px] duration-300 mb-5  text-[#000000]  hover:text-[#fafafaef]"
            >
              forget password?
            </Link>
          </div>
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <button
              disabled={!formik.isValid}
              className="py-3 font-geist rounded-[.4rem]  border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]"
            >
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
      </form>
    </div>
  );
};

export default Login;
// 93435
