import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import "../styles/shadow.css";

const MainComponent = () => {
  return (
    <div className="grid grid-cols-[240px_1fr] gap-2 h-screen p-2   ">
      <div className="sidebar sideBarshadow w-[100%] overflow-y-auto scrollbar-thin">
        <Sidebar />
      </div>
      <div className="outlet   rounded-[1rem] bg-[#E9EEF5] px-4 py-4 overflow-y-auto scrollbar-thin">
        <Outlet />
      </div>
    </div>
  );
};

export default MainComponent;
