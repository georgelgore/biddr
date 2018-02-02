import React from "react";
import LotList from "./LotList";

const Sale = props => {
  console.log("sale", props);
  return (
    <div className="ui container">
      <h1>{props.sale.title ? props.sale.title : "Loading"}</h1>
      <h1>{props.sale.sale_date ? props.sale.sale_date : ""}</h1>
      <LotList lots={props.sale.lots} />
    </div>
  );
};

export default Sale;
