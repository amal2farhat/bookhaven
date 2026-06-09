import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import styles from './signup.module.css';
import "./login2.css";
const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSignUpClick = () => {
    navigate("/signup"); // Change '/signup' to your sign-up page route
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      // const sessionToken = response.data.sessionToken; // Store this token securely
      // localStorage.setItem('token', response.data.token);
      // // localStorage.setItem('sessionToken', sessionToken);
      const user = response.data.user;
      localStorage.setItem("userAdmin", user.isAdmin);

      console.log("Admin", user.id);
      console.log("aa", user.isAdmin);

      if (user.isAdmin === false) {
        navigate("/"); // Redirect admin to home page
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.userFullName);
        localStorage.setItem("email", user.email);
        console.log("userId", user.id);
        console.log("userId", user.userFullName);
      } else {
        navigate("/dashboard"); // Redirect regular users to home
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="container">
      <div class="wrapper">
        <div class="background"></div>
        <div class="form-container">
          <div class="form-content">
            <div>
              <h1 class="form-heading">Login Form with Floating Labels</h1>
            </div>
            <div class="form-fields">
              <div class="field">
                <input id="email" name="email" type="text" class="input" placeholder="Email address" />
                <label for="email" class="input-label">
                  Email Address
                </label>
              </div>
              <div class="field">
                <input id="password" name="password" type="password" class="input" placeholder="Password" />
                <label for="password" class="input-label">
                  Password
                </label>
              </div>
              <div class="submit-btn">
                <button class="submit-button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
