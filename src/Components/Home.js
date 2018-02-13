import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    console.log("home props", this.props);
    return (
      <div>
        <div id="fullscreen-bg">
          <video autoPlay muted loop id="myVideo">
            <source src={require("./Media/video.mp4")} type="video/mp4" />
          </video>
        </div>
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

export default connect(mapStateToProps)(Home);
// "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
