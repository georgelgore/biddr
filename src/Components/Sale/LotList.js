import React from "react";

const SaleList = props => {
  console.log("sale list", props);
  return (
    <div className="ui centered grid">
      <div className="twelve wide column">
        <h1> Lots </h1>
        <div className="ui left aligned container">
          <table className="ui very basic table">
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
                    <td key={`${i}2`}>{lot.artist_name}</td>
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
          <h1 className="ui left aligned header"> Analytics </h1>
        </div>
      </div>
    </div>
  );
};

export default SaleList;
