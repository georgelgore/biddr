import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="ui top fixed menu">
      <Link to="/">
        <div style={{ fontSize: 24 }} className="Iconic header item">
          Biddr
        </div>
      </Link>
      <div className="right menu">
        <div className="right menu">
          <Link to="/artists">
            <h4 className="Iconic item">Artists</h4>
          </Link>
          <Link to="/auctions">
            <h4 className="Iconic item">Auctions</h4>
          </Link>
          <Link to="/analytics">
            <h4 className="Iconic item">Analytics</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
