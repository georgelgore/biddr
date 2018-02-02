import React from "react";
import { Link } from "react-router-dom";

const ArtistList = props => {
  return (
    <div className="ui container">
      <div className="ui fluid icon input">
        <i className="search icon" />
        <input
          onChange={props.updateSearchTerm}
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
              {props.artists.map((artist, i) => (
                <tr key={i}>
                  <td id={artist.id} onClick={props.updateDisplayArtist}>
                    <Link
                      className="ui item"
                      key={i}
                      to={`artists/${artist.id}`}
                    >
                      <h1 id={artist.id} className="ui center aligned header">
                        {artist.title_name}
                      </h1>
                      {artist.image ? (
                        <img
                          src={encodeURI(artist.image)}
                          alt={"google.com"}
                          className="lot-image"
                          id={artist.id}
                        />
                      ) : null}
                    </Link>
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

export default ArtistList;
