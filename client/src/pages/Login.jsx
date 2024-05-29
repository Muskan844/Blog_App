import React,{useRef,useContext} from "react";
import { Context } from "../contextData/Context";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"}); //on clicking login btn, its gonna call LOGIN_START btn in Reducer.js and update its isFetching
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      //if there is res, then,
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter username..." ref={userRef} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <NavLink className="Link" to="/register">
          Register
        </NavLink>
      </button>
    </div>
  );
};

export default Login;
