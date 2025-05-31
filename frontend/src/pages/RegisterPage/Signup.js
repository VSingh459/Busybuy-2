import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "../../redux/reducers/authReducer";
import { navActions } from "../../redux/reducers/navReducer";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(navActions.fuller()); // Toggle login state
      navigate("/"); // Redirect after signup
    }
  }, [token, dispatch, navigate]);

  const signup = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }
    dispatch(handleSignup({ name, email, password }));
  };

  return (
    <div className="containerL">
      <h2 id="hel">Sign Up</h2>
      <input
        id="iS3"
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button id="sU" type="submit" onClick={signup}>
        Signup
      </button>
    </div>
  );
};

export default SignupPage;
