import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from "victory";
import { connect } from "react-redux";

const AuctionBarChart = props => {
  // const reducer = (accumulator, currentValue) => {
  //   return accumulator + currentValue.realized;
  // };
  const reducer2 = (accumulator, currentValue) => {
    return accumulator + currentValue.sum;
  };

  const getSumBySale = () => {
    const data = [];
    if (props.sales && props.sales.length > 0) {
      props.sales.forEach(sale =>
        data.push({
          year: sale.sale_date.slice(0, 4),
          sum: sale.sum
        })
      );
    }
    return data;
  };

  const yearReducer = sales => {
    if (sales) {
      return sales.reduce(reducer2, 0);
    }
  };

  const findSales = (sales, year) => {
    return sales.filter(sale => sale.year === year);
  };

  const makeData = (sales = getSumBySale()) => {
    const data = [];
    data.push(
      Object.assign(
        {},
        {
          year: "2007",
          sum: yearReducer(findSales(sales, "2007")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2007")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales:${findSales(sales, "2007").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2008",
          sum: yearReducer(findSales(sales, "2008")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2008")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales:${findSales(sales, "2008").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2009",
          sum: yearReducer(findSales(sales, "2009")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2009")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales:${findSales(sales, "2008").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2010",
          sum: yearReducer(findSales(sales, "2010")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2010")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales:${findSales(sales, "2009").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2011",
          sum: yearReducer(findSales(sales, "2011")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2011")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2010").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2012",
          sum: yearReducer(findSales(sales, "2012")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2012")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2011").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2013",
          sum: yearReducer(findSales(sales, "2013")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2013")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2013").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2014",
          sum: yearReducer(findSales(sales, "2014")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2014")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2014").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2015",
          sum: yearReducer(findSales(sales, "2015")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2015")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2015").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2016",
          sum: yearReducer(findSales(sales, "2016")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2016")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2016").length}`
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "2017",
          sum: yearReducer(findSales(sales, "2017")),
          label: `Annual Sales Total: $${yearReducer(
            findSales(sales, "2017")
          ).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}\nNumber of Sales: ${findSales(sales, "2017").length}`
        }
      )
    );
    return data;
  };

  return (
    <VictoryChart width={900} domainPadding={25} theme={VictoryTheme.material}>
      <VictoryLabel
        text={"Annual Sum x Year"}
        x={450}
        y={65}
        textAnchor="middle"
      />
      <VictoryAxis />
      <VictoryAxis dependentAxis tickFormat={x => `${x / 1000000000}B`} />
      <VictoryBar
        labelComponent={<VictoryTooltip />}
        data={makeData()}
        x="year"
        y="sum"
      />
    </VictoryChart>
  );
};

const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};

export default connect(mapStateToProps)(AuctionBarChart);
