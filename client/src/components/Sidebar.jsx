import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categs, setCategs] = useState([]);
  //data from backend is coming with the help of useeffect each time page loads, but setting into its space with the help of usestate
  useEffect(() => {
    const getCategs = async () => {
      const res = await axios.get("https://blog-app-25.onrender.com/api/category");
      setCategs(res.data);
    };
    getCategs();
  }, []); //fire each time as the page reloads
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.unsplash.com/photo-1520809227329-2f94844a9635?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDd8MTg5NTEyMXx8ZW58MHx8fHx8"
          alt="img"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          architecto delectus earum rem, assumenda eius dolorum? Numquam
          voluptatibus voluptates vero? Lorem ipsum dolor sit amet consectetur
          adipisicing elitjj.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categs.map((c) => (
            <Link to={`/?categ=${c.name}`} className="Link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-telegram"></i>
          <i className="sidebarIcon fa-brands fa-linkedin"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
