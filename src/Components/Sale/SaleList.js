import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SaleList = props => {
  const yearSales = () => {
    return props.sales.filter(
      sale => sale.sale_date.slice(0, 4) === props.year
    );
  };
  console.log("sale list", props);
  return (
    <div className="ui left aligned container">
      <h1> Sales – {props.year} </h1>

      <div className="ui link list">
        {yearSales().map((sale, i) => (
          <Link
            className="ui item"
            key={i}
            to={`/auctions/${props.year}/${sale.id}`}
          >
            <div className="content">{sale.title}</div>
          </Link>
        ))}
      </div>
      <h1 className="ui left aligned header"> Analytics </h1>
    </div>
  );
};
const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};
export default connect(mapStateToProps)(SaleList);
