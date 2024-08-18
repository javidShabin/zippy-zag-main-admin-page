import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthAdmin = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminExist) {
      navigate("/log-in");
    }
  }, [isAdminExist, navigate]);

  return isAdminExist ? <Outlet /> : null;
};

export default AuthAdmin;
