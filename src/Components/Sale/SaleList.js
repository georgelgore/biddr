import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { VictoryPie, VictoryTooltip } from "victory";

const SaleList = props => {
  const makeData = () => {
    let data = [];
    let sales = yearSales();
    sales.forEach(sale =>
      data.push({
        y: sale.sum,
        label: `${sale.title}\n${sale.sale_date}\n$${sale.sum.toLocaleString(
          navigator.language,
          {
            minimumFractionDigits: 0
          }
        )}`
      })
    );
    return data;
  };
  const yearSales = () => {
    return props.sales.filter(
      sale => sale.sale_date.slice(0, 4) === props.year
    );
  };
  return (
    <div className="ui left aligned container">
      <h1> Sales – {props.year} </h1>
      <div className="ui link list">
        {yearSales().map((sale, i) => (
          <Link
            className="ui item"
            key={i}
            to={`biddr/auctions/${props.year}/${sale.id}`}
          >
            <div className="content">{sale.title}</div>
          </Link>
        ))}
      </div>
      <h1 className="ui left aligned header"> Analytics </h1>
      <div className="ui container">
        <VictoryPie
          innerRadius={100}
          domainPadding={10}
          data={makeData()}
          // style={{ labels: { fontSize: 5, angle: 45 } }}
          labelComponent={<VictoryTooltip renderInPortal={true} />}
          width={800}
        />
      </div>
      <div style={{ opacity: 0 }}>""</div>
      <div style={{ opacity: 0 }}>""</div>
      <div style={{ opacity: 0 }}>""</div>
      <div style={{ opacity: 0 }}>""</div>
    </div>
  );
};
const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};
export default connect(mapStateToProps)(SaleList);
