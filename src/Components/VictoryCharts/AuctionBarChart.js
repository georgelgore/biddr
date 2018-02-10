import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { connect } from "react-redux";

const AuctionBarChart = props => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue.realized;
  };
  const reducer2 = (accumulator, currentValue) => {
    return accumulator + currentValue.sum;
  };

  const getSumBySale = () => {
    const data = [];
    if (props.sales && props.sales.length > 0) {
      props.sales.forEach(sale =>
        data.push({
          year: sale.sale_date.slice(0, 4),
          sum: sale.lots.reduce(reducer, 0)
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
          year: "'07",
          sum: yearReducer(findSales(sales, "2007"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'08",
          sum: yearReducer(findSales(sales, "2008"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'09",
          sum: yearReducer(findSales(sales, "2009"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'10",
          sum: yearReducer(findSales(sales, "2010"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'11",
          sum: yearReducer(findSales(sales, "2011"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'12",
          sum: yearReducer(findSales(sales, "2012"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'13",
          sum: yearReducer(findSales(sales, "2013"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'14",
          sum: yearReducer(findSales(sales, "2014"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'15",
          sum: yearReducer(findSales(sales, "2015"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'16",
          sum: yearReducer(findSales(sales, "2016"))
        }
      )
    );
    data.push(
      Object.assign(
        {},
        {
          year: "'17",
          sum: yearReducer(findSales(sales, "2017"))
        }
      )
    );
    console.log("DATA", data);
    return data;
  };

  return (
    <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
      <VictoryAxis />
      <VictoryAxis dependentAxis tickFormat={x => `${x / 1000000000}B`} />
      <VictoryBar data={makeData()} x="year" y="sum" />
    </VictoryChart>
  );
};

const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};

export default connect(mapStateToProps)(AuctionBarChart);
