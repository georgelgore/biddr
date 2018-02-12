import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    console.log("home props", this.props);
    return (
      <div>
        <video autoPlay muted loop id="myVideo">
          <source
            src="https://www.youtube.com/watch?v=duJQMdSbsBw.mp4"
            type="video/mp4"
          />
        </video>
        <div className="ui huge header">Welcome to Biddr</div>
        <div className="ui container" />
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
