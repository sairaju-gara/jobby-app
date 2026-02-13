import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("jwt_token");
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:4000/jobbyapp/register";

      const userDetails = {
        username,
        email,
        password,
        phoneNumber,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const res = await fetch(apiUrl, options);
      const data = await res.json();

      if (res.ok) {
        setUsername("");
        setPassword("");
        setEmail("");
        setPhoneNumber("");
        setShowErrMsg(false);
        setErrorMsg("");
        alert("User registered successfully");
        navigate("/login", { replace: true });
      } else {
        setErrorMsg(data.errorMsg);
        setShowErrMsg(true);
      }
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <form className="register-con" onSubmit={submitForm}>
      <div className="register-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="app-logo"
          alt="website logo"
        />

        <div>
          <label htmlFor="username" className="label-ele">
            USERNAME
          </label>
          <br />
          <input
            id="username"
            className="input-ele"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
        </div>

        <br />
        <div>
          <label htmlFor="email" className="label-ele">
            E-MAIL
          </label>
          <br />
          <input
            id="email"
            className="input-ele"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="E-Mail"
          />
        </div>

        <br />

        <div>
          <label htmlFor="password" className="label-ele">
            PASSWORD
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="input-ele"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        <br />
        <div>
          <label htmlFor="phoneNumber" className="label-ele">
            PHONE NUMBER
          </label>
          <br />
          <input
            id="phoneNumber"
            className="input-ele"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="PhoneNumber"
          />
        </div>

        <br />

        <button type="submit" className="register-btn">
          Register
        </button>

        {showErrMsg && <p className="error-msg">*{errorMsg}</p>}
      </div>
    </form>
  );
};

export default Register;
