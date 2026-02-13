import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);

  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });

    setEmail("");
    setPassword("");
    setShowErrMsg(false);
    setErrorMsg("");
    alert("User login successfully");
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (error) => {
    setErrorMsg(error);
    setShowErrMsg(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:4000/jobbyapp/login";

    const userDetails = {
      email,
      password,
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
      onSubmitSuccess(data.jwtToken);
    } else {
      onSubmitFailure(data.errorMsg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className="login-con" onSubmit={submitForm}>
      <div className="login-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="app-logo"
          alt="website logo"
        />

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

        <button type="submit" className="login-btn">
          Login
        </button>

        {showErrMsg && <p className="error-msg">*{errorMsg}</p>}
      </div>
    </form>
  );
};

export default Login;
