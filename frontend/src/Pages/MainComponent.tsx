import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import "../styles/shadow.css";
import { useState } from "react";

const MainComponent = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const hideSideBar = () => {
    setIsSidebarVisible(false);
  };
  return (
    <div className="grid lg:grid-cols-[240px_1fr] grid-cols-1 gap-2 h-screen p-2   ">
      <div
        className={`${
          isSidebarVisible ? "block" : "hidden"
        } lg:block fixed lg:relative z-10 top-0 left-0 h-full w-[240px] bg-white sideBarshadow overflow-y-auto scrollbar-thin`}
      >
        <Sidebar onLinkClick={hideSideBar} />
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-200 p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        =
      </button>
      <div
        className={`outlet md:w-full border border-black rounded-[1rem] bg-[#E9EEF5] px-4 py-4 overflow-y-auto scrollbar-thin ${
          isSidebarVisible ? "lg:shadow-none shadow-lg" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainComponent;
