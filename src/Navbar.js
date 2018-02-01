import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="ui top fixed menu">
      <Link to="/">
        <div className="header item">Biddr</div>
      </Link>
      <div className="right menu">
        <div className="right menu">
          <Link to="/artists">
            <div className="item">Artists</div>
          </Link>
          <Link to="/auctions">
            <div className="item">Auctions</div>
          </Link>
          <Link to="/analytics">
            <div className="item">Analytics</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
