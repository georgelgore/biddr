import React, { Component } from "react";
import ArtistList from "./ArtistList";

class ArtistContainer extends Component {
  constructor() {
    super();

    this.state = {
      artists: [],
      display: [],
      searchTerm: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/artists")
      .then(resp => resp.json())
      .then(arr => this.setState({ artists: arr }));
  }

  updateSearchTerm = event => {
    if (event.target.value.length === 0) {
      this.setState({ display: [], searchTerm: "" });
    } else {
      this.setState(
        { searchTerm: event.target.value },
        console.log("updating")
      );
      let toShow = this.state.artists.filter(artist =>
        artist.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState(
        { searchTerm: event.target.value, display: toShow.sort() },
        console.log("updating")
      );
    }
  };

  render() {
    console.log("artist container", this.state);
    return (
      <div className="ui container">
        <h1> Artists </h1>
        <ArtistList
          artists={this.state.display}
          updateSearchTerm={this.updateSearchTerm}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}

export default ArtistContainer;
