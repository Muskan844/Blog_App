import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../contextData/Context";

const Navbar = () => {
  const {user, dispatch} = useContext(Context);
  const PF="http://localhost:5000/images/"

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
  }
  return (
    <div className="nav">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-telegram"></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <NavLink className="Link" to="/">
              HOME
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink className="Link" to="/about">
              ABOUT
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink className="Link" to="/contact">
              CONTACT
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink className="Link" to="/write">
              WRITE
            </NavLink>
          </li>

          <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <NavLink to="/setting" className="Link">
          <img
            className="topImg"
            src={PF+ user.profilePic}
            alt="img"
          />
          </NavLink>
        ) : (
          <><ul>
            <li className="topListItem"><NavLink className="Link" to="/login">
              LOGIN
            </NavLink></li>
            <li className="topListItem"><NavLink className="Link" to="/register">
              REGISTER
            </NavLink></li>
            </ul>
          </>
        )}

        <i className=" searchIcon fas fa-search" />
      </div>
    </div>
  );
};

export default Navbar;
