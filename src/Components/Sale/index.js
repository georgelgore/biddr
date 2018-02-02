import React from "react";
import SaleList from "./SaleList";

const Year = props => {
  console.log("year props", props);
  return (
    <div>
      <SaleList year={props.year} sales={props.sales} />
      <br />
    </div>
  );
};

export default Year;
