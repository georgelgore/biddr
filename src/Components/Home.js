import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Home extends React.Component {
  handleClick = () => {
    console.log("in handle click");
    this.props.fetchSales();
    this.props.fetchArtists();
    console.log("after handle click");
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
        <div className="ui huge header">Welcome to Biddr</div>
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

export default connect(mapStateToProps, actions)(Home);
