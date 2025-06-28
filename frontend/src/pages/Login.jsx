import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { handleFailer, handleSuccess } from "../Components/Utils";
import Loader from "../Components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formdata ", formData);
  };
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return handleFailer("All fields are required");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://jwt-auth-backend-354i8ypg3-lepaksha-swamy-k-ms-projects.vercel.app/auth/login",
        formData
      );
      console.log(response.data);

      // const result = await response.json();
      // const { success, message, token,user,error } = result;
      if (response.data.success) {
        handleSuccess(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        console.log(response.data.name);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (response.data.error) {
        console.log(response.data.error);
        const details = response.data.message;
        console.log(details);
        handleFailer(details);
      } else {
        handleFailer(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const msg =
          error.response.data.error ||
          error.response.data.message ||
          "Login failed";
        console.error("🚫 Validation Error:", msg);
        handleFailer(msg); // Show in toast
      } else {
        console.error("⚠️ Request failed:", error.message);
        handleFailer("Something went wrong");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2>Login Form</h2>

        <div>
          <label htmlFor="email"> Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            type="email"
            placeholder="enter your email"
          />
        </div>

        <div>
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            placeholder="enter your password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Loader size={20} /> : "Login"}
        </button>
        <span>
          Don't have an account? <Link to="/signup">signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
