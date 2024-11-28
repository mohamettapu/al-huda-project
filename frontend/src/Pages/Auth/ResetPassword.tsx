import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import "../.././styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import {
  resetData,
  resetPasswordFN,
} from "../../Redux/Slices/Auth/resetPasswordSlice";

const ResetPassword = () => {
  //   const [showPassword, setShowPassword] = useState(false);
  const resetPasswordState = useSelector(
    (state: RootState) => state.resetPasswordState
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //   const togglePassworVisibility = () => {
  //     setShowPassword((firstState) => !firstState);
  //   };
  useEffect(() => {
    if (resetPasswordState.isSuccess) {
      toast.success(resetPasswordState.data.msg);
      console.log(resetPasswordState.data.msg);
      navigate("/login");
      dispatch(resetData());
    }
    if (resetPasswordState.isError) {
      console.log(resetPasswordState.errorMsg);
      toast.error(resetPasswordState.errorMsg);
    }
  }, [dispatch, navigate, resetPasswordState]);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    onSubmit(values) {
      //   console.log("submitd  " + values.username);
      dispatch(resetPasswordFN(values));
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required("enter your Email to send reset code "),
    }),
  });
  return (
    <div className="  rounded-md mt-6 ">
      <form
        onSubmit={formik.handleSubmit}
        className="form  shadow rounded-[1rem] bg-[#F0F9FF] lg:w-[33%] max-w-[90%] h-[35rem] px-10 py-14 mx-auto flex flex-col gap-8 items-center"
      >
        <div className="labels flex flex-col text-center ">
          <label
            htmlFor=""
            className="font-geist font-bold text-2xl text-[#1e1e20dd]"
          >
            Reset Your Password
          </label>
          <label htmlFor="" className="font-geist  text-[#38383b]">
            create strong password to secure your account
          </label>
        </div>

        <div className=" inputs w-[100%] flex flex-col gap-3">
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              New Password
            </h1>
            <input
              type="text"
              placeholder="Enter your New password"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f369]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#b00c0c]">
              {formik.errors.newPassword
                ? formik.touched.newPassword
                  ? formik.errors.newPassword
                  : null
                : null}
            </p>
          </div>

          <div className="inputContainer flex flex-col items-start gap-2 ">
            <button
              disabled={!formik.isValid}
              className="py-3 font-geist rounded-[.4rem]  border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]"
            >
              reset password
            </button>
          </div>

          <div className="signup flex  text-center w-[100%] justify-center items-center gap-2">
            <p className="font-geist text-[14px] text-[#000]">Remembered?</p>
            <Link
              className="font-geist text-[16px] text-[#000] border-b-2"
              to={"/auth/login"}
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
// 93435
