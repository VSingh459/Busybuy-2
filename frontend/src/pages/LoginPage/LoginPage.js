import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../redux/reducers/authReducer";
import { navActions } from "../../redux/reducers/navReducer";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(navActions.fuller()); // Toggle login state
      navigate("/"); // Redirect to homepage
    }
  }, [token, dispatch, navigate]);

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }
    dispatch(handleLogin({ email, password }));
  };

  return (
    <div className="containerL">
      <h2 id="hel">Sign In</h2>
      <input
        id="iS"
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        id="iS2"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button id="sU" type="submit" onClick={login}>
        Login
      </button>
      <button id="SI" onClick={() => navigate("/signup")}>
        Or SignUp instead
      </button>
    </div>
  );
};

export default LoginPage;
