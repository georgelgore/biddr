import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

const ArtistList = props => {
  console.log("ARTIST LIST", props);
  return (
    <div className="ui container">
      <div className="ui fluid icon input">
        <i className="search icon" />
        <input
          onChange={event => props.updateSearchTerm(event)}
          value={props.searchTerm}
          type="text"
          placeholder="Search for artists by name..."
        />
      </div>
      <br />
      <div className="ui center aligned container">
        <div className="ui text container">
          <table className="ui very basic table">
            <thead>
              <tr>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {props.artistDisplay.map((artist, i) => (
                <tr key={i}>
                  <td
                    id={artist.id}
                    onClick={() => {
                      props.updateDisplayArtist(artist.id);
                      props.history.push(`artists/${artist.id}`);
                    }}
                  >
                    <h1 id={artist.id} className="ui center aligned header">
                      {artist.name}
                    </h1>
                    <img
                      src={encodeURI(
                        artist.image.slice(0, artist.image.length - 2) + "700"
                      )}
                      alt={
                        "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=700"
                      }
                      className="lot-image"
                      id={artist.id}
                    />
                  </td>
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales, artist }) => {
  return {
    sales,
    artist
  };
};

export default withRouter(connect(mapStateToProps, actions)(ArtistList));
