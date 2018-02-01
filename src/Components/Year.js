import React from "react";
import SaleList from "./SaleList";

const Year = props => {
  console.log("year props", props);
  return (
    <div>
      <h1> Sales – {props.year} </h1>
      <SaleList year={props.year} sales={props.sales} />
      <br />
      <h1 className="ui left aligned header"> Analytics </h1>
    </div>
  );
};

export default Year;
