import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ArtistLotList = props => {
  const findSale = lot => {
    return props.sales.find(sale => sale.id === lot.sale_id);
  };
  const christiesLink =
    "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77";
  const addDefaultSrc = ev => {
    ev.target.src = christiesLink;
  };
  const getYear = lot => {
    let sale = findSale(lot);
    return sale.sale_date.slice(0, 4);
  };

  const linkAuction = lot => {
    let year = getYear(lot);
    let sale = findSale(lot).id;
    return `auctions/${year}/${sale}`;
  };
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
                <th>Sale</th>
                <th>Sale Date</th>
                <th>Lot Number</th>
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
                    <td key={`${i}0`}>
                      <img
                        onError={addDefaultSrc}
                        src={lot.image}
                        alt={christiesLink}
                      />
                    </td>
                    <td key={`${i}1`}>
                      <a
                        onClick={() => {
                          props.history.replace(linkAuction(lot));
                        }}
                      >
                        {findSale(lot).title}
                      </a>
                    </td>
                    <td key={`${i}3`}>{findSale(lot).sale_date}</td>
                    <td key={`${i}4`}>{lot.lot_number}</td>
                    <td key={`${i}5`}>{lot.art_title}</td>
                    <td key={`${i}6`}>
                      ${lot.estimate_low.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </td>
                    <td key={`${i}7`}>
                      ${lot.estimate_high.toLocaleString(navigator.language, {
                        minimumFractionDigits: 0
                      })}
                    </td>
                    <td key={`${i}8`}>
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

const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};

export default withRouter(connect(mapStateToProps)(ArtistLotList));
