import React from "react";

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
      <div className="ui four cards">
        {props.artists.map((artist, i) => (
          <div key={i} className="card">
            {artist.title_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
