import React from "react";
import { Link } from "react-router-dom";

const SaleList = props => {
  console.log("sale list", props);
  return (
    <div className="ui left aligned container">
      <h1> Sales – {props.year} </h1>

      <div className="ui link list">
        {props.sales.map((sale, i) => (
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

export default SaleList;
