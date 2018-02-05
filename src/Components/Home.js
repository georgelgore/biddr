import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

class Home extends React.Component {
  render() {
    console.log("home props", this.props);
    return (
      <div>
        <div className="ui huge header">Welcome to Biddr</div>
        <div className="ui container">
          <div className="ui segment" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artists, sales }) => {
  return {
    artists,
    sales
  };
};

export default connect(mapStateToProps)(Home);
