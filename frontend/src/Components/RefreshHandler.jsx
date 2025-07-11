import React, { use, useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      if (
        location.pathname === "/login" ||
        location.pathname === "/" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuth]);

  return null;
};

export default RefreshHandler;
