import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitle">
        <div className="headerTileSm">Blog App</div>
        <div className="headerTitleLg">Blog App</div>
      </div>
        <img
        className="headerImg"
          src="https://images.unsplash.com/photo-1503278501277-e50457741130?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="headerImg"
        />
    </div>
  );
};

export default Header;
