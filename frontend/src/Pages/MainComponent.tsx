import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import "../styles/shadow.css";

const MainComponent = () => {
  return (
    <div className="grid grid-cols-[280px_1fr] gap-2 h-screen p-2 bg-[#D5E0E6] ">
      <div className="sidebar sideBarshadow rounded-[1rem] bg-[#F0F9FF] w-[100%]">
        <Sidebar />
      </div>
      <div className="outlet   rounded-[1rem] bg-[#E9EEF5] px-4 py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainComponent;
