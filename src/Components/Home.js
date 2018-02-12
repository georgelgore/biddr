import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    console.log("home props", this.props);
    return (
      <div
        style={{
          backgroundImage: `https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FLMIiM-G105jy7QYGetZfDw%252FWarhol%2BSelf%2BPortrait.JPG&width=1200&quality=80`
        }}
      >
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
