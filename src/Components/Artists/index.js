import React, { Component } from "react";
import ArtistList from "./ArtistList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ArtistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: [],
      searchTerm: "",
      displayArtist: ""
    };
  }

  updateDisplayArtist = (history, artistId) => {
    history.push(`/artists/${artistId}`);
  };

  randomlySelectArtist = input => {
    let newArtists = [];
    for (let x = 0; x < 10; x++) {
      newArtists.push(input[Math.floor(Math.random() * input.length)]);
    }
    return newArtists;
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props !== nextProps &&
      nextProps.artists.length > 0 &&
      !nextProps.searchTerm
    ) {
      this.setState({ display: this.randomlySelectArtist(nextProps.artists) });
    }
  }

  componentDidMount() {
    if (this.props.artists.length > 0 && !this.props.searchTerm) {
      this.setState({ display: this.randomlySelectArtist(this.props.artists) });
    }
  }

  updateSearchTerm = event => {
    if (event.target.value.length === 0) {
      return this.setState({
        display: this.randomlySelectArtist(this.props.artists),
        searchTerm: ""
      });
    } else {
      let toShow = this.props.artists.filter(artist => {
        if (artist.name) {
          return artist.name.includes(event.target.value.toUpperCase());
        }
        return;
      });
      return this.setState({
        searchTerm: event.target.value,
        display: toShow.sort()
      });
    }
  };

  render() {
    console.log("RENDER PROPS", this.props);
    window.artistprops = this.props.location;
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

export default withRouter(connect(mapStateToProps)(ArtistContainer));
