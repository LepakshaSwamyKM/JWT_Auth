import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RefreshHandler from "./Components/RefreshHandler";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const ProctectedRoutes = ({ element }) => {
    return isAuth ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <RefreshHandler setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProctectedRoutes element={<Home />} />} />
      </Routes>
    </div>
  );
};

export default App;
