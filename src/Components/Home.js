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
        <div className="homePage">
          Welcome to Biddr, a website for researching artworks and artists on
          the secondary market
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
// "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
