import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import "../.././styles/shadow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { UpdateTeacherFN } from "../../Redux/Slices/teacher/updateTeacherSlice";
import { resetData } from "../../Redux/Slices/Evaluation/editEvaluation";

const UpdateTeacher = () => {
  const UpdateTeacherState = useSelector(
    (state: RootState) => state.updateTeacher
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [setIsVisible]);

  useEffect(() => {
    if (UpdateTeacherState.isSuccess) {
      toast.success(UpdateTeacherState.data.msg);

      dispatch(resetData());
    }
    if (UpdateTeacherState.isError) {
      console.log(UpdateTeacherState.errorMsg);
      toast.error(UpdateTeacherState.errorMsg);
    }
  }, [dispatch, navigate, UpdateTeacherState]);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
    },
    onSubmit(values) {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        toast.error("there is no userInfo");
        return;
      }
      const paredUserInfo = JSON.parse(userInfo);
      const { phone } = paredUserInfo;
      const cleanedUserphone = phone.replace(/\+252/g, "");
      console.log(cleanedUserphone);
      if (cleanedUserphone === values.phone) {
        dispatch(UpdateTeacherFN(values));
      } else {
        toast.error(
          "you can only update your info Enter your phone number begin 63"
        );
      }
      //   console.log("submitd  " + values.phone);
    },
    validationSchema: yup.object({
      fullName: yup.string().required("enter your fullname "),
      phone: yup.string().required("your phone is required"),
    }),
  });
  return (
    <div
      className={`rounded-md mt-6 transition-opacity duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-56 opacity-0"
      }`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="form  shadow rounded-[1rem] bg-[#F0F9FF] w-[43%] h-[35rem] px-10 py-14 mx-auto flex flex-col gap-8 items-center"
      >
        <div className="labels flex flex-col text-center ">
          <label
            htmlFor=""
            className="font-geist font-bold text-2xl text-[#1e1e20dd]"
          >
            Edit your data
          </label>
          <label htmlFor="" className="font-geist  text-[#38383b]">
            Enter your info
          </label>
        </div>

        <div className=" inputs w-[100%] flex flex-col gap-3">
          <div className="inputContainer flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Full Name
            </h1>
            <input
              type="text"
              placeholder="Enter your Full Name"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f369]  px-3 w-[100%]"
            />
            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.fullName
                ? formik.touched.fullName
                  ? formik.errors.fullName
                  : null
                : null}
            </p>
          </div>
          <div className="inputContainer relative flex flex-col items-start gap-2 ">
            <h1 className="font-geist text-[1.1rem] font-medium text-[#38383c]">
              Mobile phone
            </h1>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              placeholder="Enter your phone"
              value={formik.values.phone}
              className="py-3 font-geist rounded-[.4rem] text-black border-1 border-white bg-[#e2e7f384]  px-3 w-[100%]"
            />

            <p className="font-geist text-[13px] text-[#f00]">
              {formik.errors.phone
                ? formik.touched.phone
                  ? formik.errors.phone
                  : null
                : null}
            </p>
          </div>

          <div className="inputContainer flex flex-col items-start mt-11 gap-2 ">
            <button
              disabled={!formik.isValid}
              className="py-3 font-geist rounded-[.4rem]  border-1 text-white font-bold border-white bg-[#000000] hover:w-[95%] mx-auto duration-500   px-3 w-[100%]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTeacher;
// 93435
