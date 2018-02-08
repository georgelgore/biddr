import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ maxHeight: 75 }} className="ui top fixed menu">
      <Link to="/">
        <h1
          style={{ fontSize: 30, paddingBottom: "17 px" }}
          className="Iconic header item"
        >
          Biddr
        </h1>
      </Link>
      <div className="right fixed menu">
        <div className="right fixed menu">
          <Link to="/artists">
            <div
              className="item"
              style={{
                fontSize: 20,
                paddingTop: "25px",
                paddingBottom: "25px",
                marginTop: "5px",
                marginBottom: "5px"
              }}
            >
              <h4 className="head2">ARTISTS</h4>
            </div>
          </Link>
          <Link to="/auctions">
            <div
              className="item"
              style={{
                fontSize: 20,
                paddingTop: "25px",
                paddingBottom: "25px",
                marginTop: "5px",
                marginBottom: "5px"
              }}
            >
              <h4 className="head2">AUCTIONS</h4>
            </div>
          </Link>
          <Link to="/analytics">
            <div
              className="item"
              style={{
                fontSize: 20,
                paddingTop: "25px",
                paddingBottom: "25px",
                marginTop: "5px",
                marginBottom: "5px"
              }}
            >
              <h4 className="head2 ">ANALYTICS</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
