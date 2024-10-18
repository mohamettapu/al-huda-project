import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { data } = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.accessToken) {
      navigate("/login");
    }
  }, [data, navigate]);

  return <>{data?.accessToken ? element : null}</>;
};

export default ProtectedRoutes;
