import React, { Component } from "react";
import LotList from "../Sale/LotList";

class Artist extends Component {
  constructor() {
    super();

    this.state = {
      artist: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    let x = window.location.href;
    let y = x.slice(x.length - 3);
    fetch(`http://localhost:3000/api/v1/artists/${y}`)
      .then(resp => resp.json())
      .then(obj =>
        this.setState({ artist: obj }, console.log("PROPS", this.props))
      );
  }

  render() {
    console.log("in artist", this.state);
    return (
      <div>
        <h1>
          {this.state.artist.title_name
            ? this.state.artist.title_name
            : "Loading"}
        </h1>
      </div>
    );
  }
}

export default Artist;
