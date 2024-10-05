import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import "../.././styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
// import { LoginFN } from "../../Redux/Slices/Auth/loginSLice";
import { sendResetCodeFN } from "../../Redux/Slices/Auth/sendEmail";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  //   const [showPassword, setShowPassword] = useState(false);
  const CheckResetCodeState = useSelector(
    (state: RootState) => state.checkResetCode
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //   const togglePassworVisibility = () => {
  //     setShowPassword((firstState) => !firstState);
  //   };
  useEffect(() => {
    if (CheckResetCodeState.isSuccess) {
      toast.success(CheckResetCodeState.data.msg);
      console.log(CheckResetCodeState.data.msg);
      navigate("/login");
    }
    if (CheckResetCodeState.isError) {
      console.log(CheckResetCodeState.errorMsg);
      toast.error(CheckResetCodeState.errorMsg);
    }
  }, [navigate, CheckResetCodeState]);
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
            Reset Your Password
          </label>
          <label htmlFor="" className="font-geist  text-[#38383b]">
            create strong password
          </label>
        </div>

        <div className=" inputs w-[100%] flex flex-col gap-3">
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Email
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
              className="py-3 font-geist rounded-[.4rem]  border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]"
            >
              Send Email
            </button>
          </div>

          <div className="signup flex  text-center w-[100%] justify-center items-center gap-2">
            <p className="font-geist text-[14px] text-[#000]">l?</p>
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
