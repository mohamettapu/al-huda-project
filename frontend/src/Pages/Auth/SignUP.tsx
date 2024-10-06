import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import "../.././styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { signUpFN } from "../../Redux/Slices/Auth/signUpSlice";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const SingUpState = useSelector((state: RootState) => state.SingUpState);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const togglePassworVisibility = () => {
    setShowPassword((firstState) => !firstState);
  };
  useEffect(() => {
    if (SingUpState.isSuccess) {
      toast.success(SingUpState.data.msg);
      console.log(SingUpState.data.msg);
      navigate("/dashboard");
    }
    if (SingUpState.isError) {
      console.log(SingUpState.errorMsg);
      toast.error(SingUpState.errorMsg);
    }
  }, [navigate, SingUpState]);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    },
    onSubmit(values) {
      console.log("submitd  " + values.username);
      dispatch(signUpFN(values));
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Enter your firstname "),
      lastname: yup.string().required("Enter your lastname "),
      email: yup.string().required("Enter your Email address "),
      phone: yup.string().required("Enter your mobile phone "),
      username: yup.string().required("create new username "),
      password: yup.string().required("create new strong  password"),
    }),
  });
  return (
    <div className="  rounded-md mt-6 ">
      <form
        onSubmit={formik.handleSubmit}
        className="form  shadow rounded-[1rem] bg-[#F0F9FF] w-[49%] relative h-[43rem] px-20 py-14 mx-auto flex flex-col gap-8 items-center"
      >
        <div className="labels flex flex-col text-center ">
          <label
            htmlFor=""
            className="font-geist font-bold text-2xl text-[#1e1e20dd]"
          >
            Welcome Create Account!
          </label>
          <label htmlFor="" className="font-geist  text-[#38383b]">
            Enter your credentials to login your account
          </label>
        </div>

        <div className=" inputs w-[100%] grid grid-cols-2 gap-4">
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Firsname
            </h1>
            <input
              type="text"
              placeholder="Enter your Firstname"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#cddcfe69]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.firstname
                ? formik.touched.firstname
                  ? formik.errors.firstname
                  : null
                : null}
            </p>
          </div>
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Lastname
            </h1>
            <input
              type="text"
              placeholder="Enter your Lastname"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#cddcfe69]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.lastname
                ? formik.touched.lastname
                  ? formik.errors.lastname
                  : null
                : null}
            </p>
          </div>
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
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#cddcfe69]  px-3 w-[100%]"
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
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#cddcfe69]  px-3 w-[100%]"
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
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Mobile phone
            </h1>
            <input
              type="text"
              placeholder="Enter Mobile phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#cddcfe69]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.phone
                ? formik.touched.phone
                  ? formik.errors.phone
                  : null
                : null}
            </p>
          </div>
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Email
            </h1>
            <input
              type="email"
              placeholder="Enter your Email Address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#cddcfe69]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.email
                ? formik.touched.email
                  ? formik.errors.email
                  : null
                : null}
            </p>
          </div>
        </div>
        <div className="inputContainer flex flex-col  w-full items-start gap-2 ">
          <button
            disabled={!formik.isValid}
            className="py-3 font-geist rounded-[.4rem]  border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]"
          >
            Sign Up
          </button>
        </div>

        <div className="signup flex  text-center w-[100%] justify-center items-center gap-2">
          <p className="font-geist text-[14px] text-[#000]">
            I have an account?
          </p>
          <Link
            className="font-geist text-[16px] text-[#000] border-b-2"
            to={"/auth/login"}
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
// 93435
