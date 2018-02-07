import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import {
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryClipContainer,
  VictoryTooltip
} from "victory";

const christiesLink =
  "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77";
class ArtistLotList extends Component {
  constructor() {
    super();

    this.state = {
      lots: [],
      sorted: false,
      originalSort: true,
      xLabel: ""
    };
  }

  makeData = () => {
    let data = [];
    this.state.lots.forEach((lot, i) =>
      data.push({
        x: i + 2,
        y: lot.realized,
        amount: lot.realized,
        fill: d =>
          d.y >= lot.estimate_low && d.y <= lot.estimate_high
            ? "#000000"
            : d.y <= lot.estimate_low ? "#c43a31" : "#006400",
        fillOpacity: 0.8,
        strokeWidth: 3,
        label: `${this.findSale(lot).title}\nSale Date ${
          this.findSale(lot).sale_date
        }\nLow Estimate: $${lot.estimate_low.toLocaleString(
          navigator.language,
          {
            minimumFractionDigits: 0
          }
        )}\nHigh Estimate: $${lot.estimate_high.toLocaleString(
          navigator.language,
          {
            minimumFractionDigits: 0
          }
        )}\nPrice Realized: $${lot.realized.toLocaleString(navigator.language, {
          minimumFractionDigits: 0
        })}`
      })
    );
    console.log("DATA", data);
    return data;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      lots: nextProps.displayArtist.data.attributes.lots
    });
  }

  componentDidMount() {
    this.props.fetchDisplayArtist(`${this.props.artist.id}`);

    {
      /*if (this.props !== nextProps) {
      this.setState({
        lots: this.nextProps.lots.sort(
          (a, b) =>
            parseInt(this.findSale(a).sale_date, 10) -
            parseInt(this.findSale(b).sale_date, 10)
        )
      });
    }
    this.setState({
      lots: this.nextProps.lots.sort(
        (a, b) =>
          parseInt(this.findSale(a).sale_date, 10) -
          parseInt(this.findSale(b).sale_date, 10)
      )
    });*/
    }
  }

  findSale = lot => {
    return this.props.sales.find(sale => sale.id === lot.sale_id);
  };

  addDefaultSrc = ev => {
    ev.target.src = christiesLink;
  };
  getYear = lot => {
    let sale = this.findSale(lot);
    return sale.sale_date.slice(0, 4);
  };

  linkAuction = lot => {
    let year = this.getYear(lot);
    let sale = this.findSale(lot).id;
    return `auctions/${year}/${sale}`;
  };

  sortLots = (lots, filter) => {
    switch (filter) {
      case "Sale Date":
        if (this.state.originalSort === false) {
          return this.setState({
            originalSort: true,
            lots: lots.sort(
              (a, b) =>
                parseInt(this.findSale(a).sale_date, 10) -
                parseInt(this.findSale(b).sale_date, 10)
            )
          });
        } else {
          return this.setState({
            originalSort: false,
            lots: lots.sort(
              (a, b) =>
                parseInt(this.findSale(b).sale_date, 10) -
                parseInt(this.findSale(a).sale_date, 10)
            )
          });
        }
      case "Lot Number":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort(
              (a, b) =>
                parseInt(a.lot_number.slice(4), 10) -
                parseInt(b.lot_number.slice(4), 10)
            )
          });
        } else {
          return this.setState({
            sorted: false,
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

      default:
        return this.setState({
          lots: lots
        });
    }
  };

  handleClick = event => {
    this.sortLots(this.state.lots, event.target.innerText);
    this.setState({ xLabel: event.target.innerText });
  };

  render() {
    console.log("IN ALL", this.props);
    return (
      <div>
        <div className="ui container">
          <h1 className="ui left aligned header"> Analytics </h1>
          {this.state.lots && this.state.lots.length > 0 ? (
            <VictoryChart
              domainPadding={10}
              containerComponent={<VictoryZoomContainer />}
            >
              <VictoryAxis
                label={this.state.xLabel}
                style={{ tickLabels: { fontSize: 0, padding: 1 } }}
              />
              <VictoryAxis
                label={"Realized"}
                style={{ tickLabels: { fontSize: 4, padding: 4 } }}
                dependentAxis
              />
              <VictoryScatter
                bubbleProperty="amount"
                minBubbleSize={1}
                maxBubbleSize={10}
                groupComponent={<VictoryClipContainer />}
                labelComponent={<VictoryTooltip />}
                data={this.makeData()}
              />
            </VictoryChart>
          ) : null}
        </div>
        <div className="ui centered grid">
          <div className="twelve wide column">
            <h1> Lots </h1>
            <div className="ui left aligned container">
              <table className="ui very basic table">
                <thead>
                  <tr>
                    <th />
                    <th>Sale</th>
                    <th onClick={event => this.handleClick(event)}>
                      <i className="sort icon" />Sale Date
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <i className="sort icon" />Lot Number
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <i className="sort icon" />Title
                    </th>
                    <th>Low Estimate</th>
                    <th onClick={event => this.handleClick(event)}>
                      High Estimate
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <i className="sort icon" />Price Realized
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lots && this.state.lots.length > 0 ? (
                    this.state.lots.map((lot, i) => (
                      <tr key={i}>
                        <td key={`${i}0`}>
                          <img
                            onError={this.addDefaultSrc}
                            src={lot.image}
                            alt={christiesLink}
                          />
                        </td>
                        <td key={`${i}1`}>
                          <Link
                            to={`/auctions/${this.getYear(lot)}/${
                              this.findSale(lot).id
                            }`}
                          >
                            {this.findSale(lot).title}
                          </Link>
                        </td>
                        <td key={`${i}3`}>{this.findSale(lot).sale_date}</td>
                        <td key={`${i}4`}>{lot.lot_number}</td>
                        <td key={`${i}5`}>{lot.art_title}</td>
                        <td key={`${i}6`}>
                          ${lot.estimate_low.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 0
                            }
                          )}
                        </td>
                        <td key={`${i}7`}>
                          ${lot.estimate_high.toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 0
                            }
                          )}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sales, artist, displayArtist }) => {
  return {
    sales,
    artist,
    displayArtist
  };
};

export default withRouter(connect(mapStateToProps, actions)(ArtistLotList));
