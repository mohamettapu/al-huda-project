import { Outlet } from "react-router-dom";
import AuthHeader from "../Components/AuthHeader";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full h-full   flex flex-col gap-2  bg-[#d7eaf4bb]">
      <div className=" headerShadow  ">
        <AuthHeader />
      </div>
      <div className="body   rounded   flex-grow h-[40rem border]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
