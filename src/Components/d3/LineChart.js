import React from "react";
import { Chart } from "react-d3-core";

const chartData = [{ age: 1, height: 5 }, { age: 2, height: 6 }];

var width = 700,
  height = 300,
  margins = { left: 100, right: 100, top: 50, bottom: 50 },
  title = "User sample",
  // chart series,
  // field: is what field your data want to be selected
  // name: the name of the field that display in legend
  // color: what color is the line
  chartSeries = [
    {
      field: "BMI",
      name: "BMI",
      color: "#ff7f0e"
    }
  ],
  // your x accessor
  x = function(d) {
    return d.index;
  };
