import React from "react";
import SaleList from "./SaleList";
import { connect } from "react-redux";

const Year = props => {
  console.log("year props", props);
  return (
    <div>
      <SaleList year={props.year} sales={props.sales} />
      <br />
    </div>
  );
};

const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};
export default connect(mapStateToProps)(Year);
