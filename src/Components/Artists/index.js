import React, { Component } from "react";
import ArtistList from "./ArtistList";
import { connect } from "react-redux";

class ArtistContainer extends Component {
  constructor() {
    super();

    this.state = {
      display: [],
      searchTerm: "",
      displayArtist: ""
    };
  }

  updateDisplayArtist = (history, artistId) => {
    history.push(`/artists/${artistId}`);
  };

  updateSearchTerm = event => {
    if (event.target.value.length === 0) {
      return this.setState({ display: [], searchTerm: "" });
    } else {
      let toShow = this.props.artists.filter(artist => {
        if (artist.name) {
          return artist.name.includes(event.target.value.toUpperCase());
        }
      });
      return this.setState({
        searchTerm: event.target.value,
        display: toShow.sort()
      });
    }
  };

  render() {
    return (
      <div className="ui container">
        <h1> Artists </h1>
        <ArtistList
          artistDisplay={this.state.display}
          updateSearchTerm={this.updateSearchTerm}
          searchTerm={this.state.searchTerm}
        />
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

export default connect(mapStateToProps)(ArtistContainer);
