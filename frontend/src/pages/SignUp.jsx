import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleFailer, handleSuccess } from "../Components/Utils";
import axios from "axios";
import Loader from "../Components/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log("formadata", formData);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { user, email, password } = formData;
    if (!user || !email || !password)
      return handleFailer("All fields are required");
    setLoading(true);
    try {
      const url = "http://localhost:4050/auth/signup";
      const response = await axios.post(url, formData);
      console.log(response);
      if (response.data.success) {
        handleSuccess(response.data.message);
        setTimeout(() => {
          navigate("/login");
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
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("🚫 Validation Error:", error.response.data.error);
        handleFailer(error.response.data.error); // Show in toast
      } else {
        console.error("⚠️ Request failed:", error.message);
        handleFailer("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <h2>SignUp Form</h2>
        <div>
          <label htmlFor="user"> User Name</label>
          <input
            type="text"
            placeholder="enter your username"
            autoFocus
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            placeholder="enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            placeholder="enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Loader size={20} /> : "Sign Up"}
        </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
