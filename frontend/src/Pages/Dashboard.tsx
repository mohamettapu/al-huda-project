import { useEffect, useState } from "react";
import "../.././src/styles/shadow.css";
const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [setIsVisible]);
  return (
    <div className={`text-black ${isVisible ? "dashboard-animate" : ""}`}>
      <div className="mainLabel">
        <h1 className=" font-geist text-xl font-medium text-black">
          Dashboard
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
