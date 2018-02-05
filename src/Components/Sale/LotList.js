import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { ScatterPlot } from "react-d3-basic";
const LotList = props => {
  const artistRoute = artistId => {
    return `/artists/${artistId}`;
  };

  const makeData = lots => {
    const output = [];
    lots.map((lot, i) => output.push({ lot: `${i}`, price: lot.realized }));
    return output;
  };
  console.log("sale list", props);
  return (
    <div className="ui centered grid">
      <div className="twelve wide column">
        <h1 className="ui left aligned header"> Analytics </h1>
        <ScatterPlot
          data={makeData(props.lots)}
          width={960}
          height={500}
          margins={{ top: 80, right: 100, bottom: 80, left: 100 }}
          chartSeries={[
            {
              field: "price",
              name: "Price",
              symbol: "cross",
              symbolSize: 6
            }
          ]}
          x={function(d) {
            return d.lot;
          }}
          xScale={"linear"}
          yScale={"linear"}
          xLabel="Lot Number"
          yLabel="Price Realized"
        />
        <h1> Lots </h1>
        <div className="ui left aligned container">
          <table className="ui sortable very basic table">
            <thead>
              <tr>
                <th />
                <th />
                <th>Artist</th>
                <th>Title</th>
                <th>Low Estimate</th>
                <th>High Estimate</th>
                <th>Price Realized</th>
              </tr>
            </thead>
            <tbody>
              {props.lots ? (
                props.lots.map((lot, i) => (
                  <tr key={i}>
                    <td key={`${i}0`}>{lot.lot_number}</td>
                    <td key={`${i}1`}>
                      <img src={lot.image} alt={"google.com"} />
                    </td>
                    <td key={`${i}2`}>
                      <p
                        onClick={() => {
                          props.history.push(`/artists/${lot.artist_id}`);
                        }}
                      >
                        {lot.lot_number}
                      </p>
                      <Link to={artistRoute(lot.artist_id)}>
                        {
                          props.artists.find(
                            artist => artist.id === lot.artist_id
                          ).title_name
                        }
                      </Link>
                    </td>
                    <td key={`${i}3`}>{lot.art_title}</td>
                    <td key={`${i}4`}>
                      ${lot.estimate_low.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </td>
                    <td key={`${i}5`}>
                      ${lot.estimate_high.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </td>
                    <td key={`${i}6`}>
                      ${lot.realized.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Loading</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ artists }) => {
  return {
    artists
  };
};

export default withRouter(connect(mapStateToProps)(LotList));
