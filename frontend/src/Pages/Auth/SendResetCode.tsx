import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import "../.././styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
// import { LoginFN } from "../../Redux/Slices/Auth/loginSLice";
import { resetData, sendResetCodeFN } from "../../Redux/Slices/Auth/sendEmail";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SendResetCode = () => {
  //   const [showPassword, setShowPassword] = useState(false);
  const SendResetCodeToEmailState = useSelector(
    (state: RootState) => state.sendEmail
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //   const togglePassworVisibility = () => {
  //     setShowPassword((firstState) => !firstState);
  //   };
  useEffect(() => {
    if (SendResetCodeToEmailState.isSuccess) {
      toast.success(SendResetCodeToEmailState.data.msg);
      console.log(SendResetCodeToEmailState.data.msg);
      navigate("/check-reset-code");
      dispatch(resetData());
    }
    if (SendResetCodeToEmailState.isError) {
      console.log(SendResetCodeToEmailState.errorMsg);
      toast.error(SendResetCodeToEmailState.errorMsg);
    }
  }, [dispatch, navigate, SendResetCodeToEmailState]);
  const formik = useFormik({
    initialValues: {
      clientEmail: "",
    },
    onSubmit(values) {
      //   console.log("submitd  " + values.username);
      dispatch(sendResetCodeFN(values));
    },
    validationSchema: yup.object({
      clientEmail: yup
        .string()
        .required("enter your Email to send reset code "),
    }),
  });
  return (
    <div className="  rounded-md mt-6  ">
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
            Please enter your email to receive the reset code
          </label>
        </div>

        <div className=" inputs w-[100%] flex flex-col gap-6 ">
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Email Address
            </h1>
            <input
              type="text"
              placeholder="Enter your Email"
              name="clientEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientEmail}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f369]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#b00c0c]">
              {formik.errors.clientEmail
                ? formik.touched.clientEmail
                  ? formik.errors.clientEmail
                  : null
                : null}
            </p>
          </div>

          <div className="inputContainer flex flex-col items-start gap-2 ">
            <button
              disabled={!formik.isValid}
              className="py-3 font-geist rounded-[.4rem]  text-center border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]"
            >
              {SendResetCodeToEmailState.isLoading ? (
                <span className="animate-pulse font-geist w-5 h-5 px-[9px] py-[0.px]  rounded-full bg-black border-4 text-center border-[#fff]"></span>
              ) : (
                <h1 className="text-white font-geist">send reset code</h1>
              )}
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

export default SendResetCode;
// 93435
