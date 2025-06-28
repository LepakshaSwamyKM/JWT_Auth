import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../Components/Utils";
import { ToastContainer } from "react-toastify";
import Loader from "../Components/Loader";

function Home() {
  const [logedUser, setLogedUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLogedUser(localStorage.getItem("user"));
  });
  const handleLogOut = () => {
    handleSuccess("Log Out Successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      {logedUser}
      <button onClick={handleLogOut}>Log Out</button>
      <ToastContainer />
      <Loader />
    </div>
  );
}

export default Home;
