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
                    {/*// <Link
                    //   className="ui item"
                    //   key={i}
                    //   to={`artists/${artist.id}`}
                    //   </Link>
                    // >
                    //*/}
                    <h1 id={artist.id} className="ui center aligned header">
                      {artist.name}
                    </h1>
                    {artist.lots.length > 0 ? (
                      <img
                        src={encodeURI(
                          artist.lots[artist.lots.length - 1].image
                        )}
                        alt={
                          "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77"
                        }
                        className="lot-image"
                        id={artist.id}
                      />
                    ) : null}
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

const mapStateToProps = ({ artists, sales, artist }) => {
  return {
    artists,
    sales,
    artist
  };
};

export default withRouter(connect(mapStateToProps, actions)(ArtistList));
