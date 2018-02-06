import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ScatterPlot } from "react-d3-basic";

class LotList extends React.Component {
  constructor() {
    super();

    this.state = {
      showLots: [],
      lotSorted: true,
      sorted: false
    };
  }
  sortByLotId = lots => {
    return lots.sort(function(a, b) {
      return a.id - b.id;
    });
  };

  makeData = lots => {
    const output = [];
    lots.map((lot, i) => output.push({ lot: `${i}`, price: lot.realized }));
    return output;
  };

  // sortLots = (lots, filter) => {
  //   switch (filter) {
  //     case "Sale Date":
  //       if (this.state.originalSort === false) {
  //         return this.setState({
  //           originalSort: true,
  //           lots: lots.sort(
  //             (a, b) =>
  //               parseInt(this.findSale(a).sale_date, 10) -
  //               parseInt(this.findSale(b).sale_date, 10)
  //           )
  //         });
  //       } else {
  //         return this.setState({
  //           originalSort: false,
  //           lots: lots.sort(
  //             (a, b) =>
  //               parseInt(this.findSale(b).sale_date, 10) -
  //               parseInt(this.findSale(a).sale_date, 10)
  //           )
  //         });
  //       }
  //     case "Lot Number":
  //       if (this.state.sorted === false) {
  //         return this.setState({
  //           sorted: true,
  //           lots: lots.sort(
  //             (a, b) =>
  //               parseInt(a.lot_number.slice(4), 10) -
  //               parseInt(b.lot_number.slice(4), 10)
  //           )
  //         });
  //       } else {
  //         return this.setState({
  //           sorted: false,
  //           lots: lots.sort(
  //             (a, b) =>
  //               parseInt(b.lot_number.slice(4), 10) -
  //               parseInt(a.lot_number.slice(4), 10)
  //           )
  //         });
  //       }
  //     case "Title":
  //       if (this.state.sorted === false) {
  //         return this.setState({
  //           sorted: true,
  //           lots: lots.sort((a, b) => {
  //             if (a.art_title.slice(0, 1) < b.art_title.slice(0, 1)) {
  //               return -1;
  //             }
  //             if (a.art_title.slice(0, 1) > b.art_title.slice(0, 1)) {
  //               return 1;
  //             } else {
  //               return 0;
  //             }
  //           })
  //         });
  //       } else {
  //         return this.setState({
  //           sorted: false,
  //           lots: lots.sort((a, b) => {
  //             if (a.art_title.slice(0, 1) > b.art_title.slice(0, 1)) {
  //               return -1;
  //             }
  //             if (a.art_title.slice(0, 1) < b.art_title.slice(0, 1)) {
  //               return 1;
  //             } else {
  //               return 0;
  //             }
  //           })
  //         });
  //       }
  //     case "Price Realized":
  //       if (this.state.sorted === false) {
  //         return this.setState({
  //           sorted: true,
  //           lots: lots.sort((a, b) => a.realized - b.realized)
  //         });
  //       } else {
  //         return this.setState({
  //           sorted: false,
  //           lots: lots.sort((a, b) => b.realized - a.realized)
  //         });
  //       }
  //     default:
  //       return this.setState({
  //         lots: lots
  //       });
  //   }

  findArtist = lot =>
    this.props.artists.find(artist => artist.id === lot.artist_id);

  handleClick = event => {
    this.sortLots(this.props.lots, event.target.innerText);
  };

  render() {
    console.log("LOT LIST", this.props);
    return (
      <div className="ui centered grid">
        <div className="twelve wide column">
          <h1 className="ui left aligned header"> Analytics </h1>
          {/*<ScatterPlot
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
        />*/}
          <h1> Lots </h1>
          <div className="ui left aligned container">
            <table className="ui very basic table">
              <thead>
                <tr>
                  <th />
                  <th />
                  <th onClick={event => this.handleClick(event)}>Artist</th>
                  <th onClick={event => this.handleClick(event)}>Title</th>
                  <th onClick={event => this.handleClick(event)}>
                    Low Estimate
                  </th>
                  <th onClick={event => this.handleClick(event)}>
                    High Estimate
                  </th>
                  <th onClick={event => this.handleClick(event)}>
                    Price Realized
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.lots ? (
                  this.sortByLotId(this.props.lots).map((lot, i) => (
                    <tr key={i}>
                      <td key={`${i}0`}>{lot.lot_number}</td>
                      <td key={`${i}1`}>
                        <img src={lot.image} alt={"google.com"} />
                      </td>
                      <td key={`${i}2`}>
                        <a
                          onClick={() => {
                            this.props.history.replace(
                              `/artists/${lot.artist_id}`
                            );
                          }}
                        >
                          {this.findArtist(lot).name}
                        </a>
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
  }
}

export default withRouter(LotList);
