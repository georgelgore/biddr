import React from "react";
import { withRouter } from "react-router-dom";
import {
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryClipContainer
} from "victory";

class LotList extends React.Component {
  constructor() {
    super();

    this.state = {
      lots: [],
      originalSort: true,
      sorted: false
    };
  }
  sortByLotId = lots => {
    return lots.sort(function(a, b) {
      return a.id - b.id;
    });
  };

  makeData = () => {
    let data = [];
    this.props.lots.forEach((lot, i) =>
      data.push({
        x: i,
        y: lot.realized,
        fillOpacity: 0.8,
        strokeWidth: 3
      })
    );
    return data;
  };

  componentDidMount(props) {
    this.setState({
      lots: this.props.lots.sort(
        (a, b) =>
          parseInt(a.lot_number.slice(4), 10) -
          parseInt(b.lot_number.slice(4), 10)
      )
    });
  }

  componentDidReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        lots: this.nextProps.lots.sort(
          (a, b) =>
            parseInt(a.lot_number.slice(4), 10) -
            parseInt(b.lot_number.slice(4), 10)
        )
      });
    }
    this.setState({
      lots: this.props.lots.sort(
        (a, b) =>
          parseInt(a.lot_number.slice(4), 10) -
          parseInt(b.lot_number.slice(4), 10)
      )
    });
  }

  sortLots = (lots, filter) => {
    switch (filter) {
      case "Lot Number":
        if (this.state.originalSort === true) {
          return this.setState({
            sorted: false,
            lots: lots.sort(
              (a, b) =>
                parseInt(a.lot_number.slice(4), 10) -
                parseInt(b.lot_number.slice(4), 10)
            )
          });
        } else {
          return this.setState({
            sorted: true,
            lots: lots.sort(
              (a, b) =>
                parseInt(b.lot_number.slice(4), 10) -
                parseInt(a.lot_number.slice(4), 10)
            )
          });
        }
      case "Title":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort((a, b) => {
              if (a.art_title.slice(0, 1) < b.art_title.slice(0, 1)) {
                return -1;
              }
              if (a.art_title.slice(0, 1) > b.art_title.slice(0, 1)) {
                return 1;
              } else {
                return 0;
              }
            })
          });
        } else {
          return this.setState({
            sorted: false,
            lots: lots.sort((a, b) => {
              if (a.art_title.slice(0, 1) > b.art_title.slice(0, 1)) {
                return -1;
              }
              if (a.art_title.slice(0, 1) < b.art_title.slice(0, 1)) {
                return 1;
              } else {
                return 0;
              }
            })
          });
        }
      case "Artist":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort((a, b) => {
              if (
                this.findArtist(a).name.slice(0, 1) <
                this.findArtist(b).name.slice(0, 1)
              ) {
                return -1;
              }
              if (
                this.findArtist(b).name.slice(0, 1) >
                this.findArtist(a).name.slice(0, 1)
              ) {
                return 1;
              } else {
                return 0;
              }
            })
          });
        } else {
          return this.setState({
            sorted: false,
            lots: lots.sort((a, b) => {
              if (
                this.findArtist(a).name.slice(0, 1) >
                this.findArtist(b).name.slice(0, 1)
              ) {
                return -1;
              }
              if (
                this.findArtist(a).name.slice(0, 1) <
                this.findArtist(b).name.slice(0, 1)
              ) {
                return 1;
              } else {
                return 0;
              }
            })
          });
        }
      case "Price Realized":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort((a, b) => a.realized - b.realized)
          });
        } else {
          return this.setState({
            sorted: false,
            lots: lots.sort((a, b) => b.realized - a.realized)
          });
        }
      case "High Estimate":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort((a, b) => a.estimate_high - b.estimate_high)
          });
        } else {
          return this.setState({
            sorted: false,
            lots: lots.sort((a, b) => b.estimate_high - a.estimate_high)
          });
        }
      case "Low Estimate":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort((a, b) => a.estimate_low - b.estimate_low)
          });
        } else {
          return this.setState({
            sorted: false,
            lots: lots.sort((a, b) => b.estimate_low - a.estimate_low)
          });
        }
      default:
        return this.setState({
          lots: lots
        });
    }
  };

  findArtist = lot =>
    this.props.artists.find(artist => artist.id === lot.artist_id);

  handleClick = event => {
    this.sortLots(this.props.lots, event.target.innerText);
  };

  render() {
    console.log("LOT LIST", this.state, this.props);
    return (
      <div>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            label={"realized"}
            style={{ tickLabels: { fontSize: 5, padding: 2 } }}
            dependentAxis
          />
          <VictoryAxis
            label={""}
            style={{ tickLabels: { fontSize: 5, padding: 2 } }}
          />
          <VictoryScatter
            groupComponent={<VictoryClipContainer />}
            bubbleProperty="amount"
            data={this.makeData()}
          />
        </VictoryChart>
        <div className="ui centered grid">
          <div className="twelve wide column">
            <h1 className="ui left aligned header"> Analytics </h1>
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
                  {this.state.lots ? (
                    this.state.lots.map((lot, i) => (
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
                          ${lot.estimate_low.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 0
                            }
                          )}
                        </td>
                        <td key={`${i}5`}>
                          ${lot.estimate_high.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 0
                            }
                          )}
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
      </div>
    );
  }
}

export default withRouter(LotList);
