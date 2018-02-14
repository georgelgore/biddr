import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="fullscreen-bg">
          <video autoPlay muted loop id="myVideo">
            <source src={require("./Media/video.mp4")} type="video/mp4" />
          </video>
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
