import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import * as actions from "../../actions";
import {
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryClipContainer,
  VictoryTooltip,
  VictoryLegend,
  VictoryLabel
} from "victory";

const christiesLink =
  "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77";
class ArtistLotList extends Component {
  constructor() {
    super();

    this.state = {
      displayLots: [],
      sorted: true,
      xLabel: "Lot Number",
      searchTerm: "",
      search: false
    };
  }

  makeData = () => {
    let data = [];
    this.props.lots.forEach((lot, i) =>
      data.push({
        x: i + 3,
        y: lot.realized,
        amount: lot.realized,
        fill: d =>
          d.y >= lot.estimate_low && d.y <= lot.estimate_high
            ? "#000000"
            : d.y <= lot.estimate_low ? "#c43a31" : "#006400",
        fillOpacity: 0.8,
        strokeWidth: 3,
        label: `"${lot.art_title}"\n${lot.size_mat}\n${
          this.findSale(lot).title
        }\nSale Date ${
          this.findSale(lot).sale_date
        }\nEstimate $${lot.estimate_low.toLocaleString(navigator.language, {
          minimumFractionDigits: 0
        })}-$${lot.estimate_high.toLocaleString(navigator.language, {
          minimumFractionDigits: 0
        })}\nPrice Realized: $${lot.realized.toLocaleString(
          navigator.language,
          {
            minimumFractionDigits: 0
          }
        )}`
      })
    );
    return data;
  };

  componentDidMount() {
    this.props.fetchDisplayArtist(`${this.props.display_artist}`);
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
        if (this.state.sorted === true) {
          return this.setState({
            sorted: false,
            lots: lots.sort(
              (a, b) =>
                parseInt(this.findSale(b).sale_date, 10) -
                parseInt(this.findSale(a).sale_date, 10)
            )
          });
        } else {
          return this.setState({
            sorted: true,
            lots: lots.sort(
              (a, b) =>
                parseInt(this.findSale(a).sale_date, 10) -
                parseInt(this.findSale(b).sale_date, 10)
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

      case "Low Estimate":
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

  updateSearchTerm(event) {
    if (event.target.value.length === 0) {
      return this.setState({ search: false, searchTerm: "", displayLots: [] });
    } else {
      this.setState({ searchTerm: event.target.value, search: true }, () =>
        console.log("1 STATE LOCAL", this.state)
      );
      let lots = this.props.lots.filter(lot =>
        lot.art_title.toLowerCase().includes(event.target.value)
      );
      console.log("2 LOTS!", lots);
      this.setState(
        { displayLots: lots },
        console.log("3 new lots", this.state.displayLots)
      );
    }
  }

  handleClick = event => {
    this.sortLots(this.props.lots, event.target.innerText);
    this.setState({ xLabel: event.target.innerText });
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <div className="ui active centered inline loader" />
        ) : null}
        <div className="ui  container">
          <h1 className="ui left aligned header"> Analytics </h1>
          {this.props.lots && this.props.lots.length > 0 ? (
            <div className="ui segment">
              <VictoryChart
                domainPadding={10}
                width={800}
                containerComponent={<VictoryZoomContainer />}
                animate={{ duration: 500 }}
              >
                <VictoryLabel
                  text={`Price Realized x ${
                    this.state.xLabel ? this.state.xLabel : "Lot Number"
                  }`}
                  x={400}
                  y={5}
                  textAnchor="middle"
                />
                <VictoryLegend
                  x={305}
                  y={25}
                  orientation="horizontal"
                  symbolSpacer={3}
                  gutter={20}
                  data={[
                    {
                      name: "Within Estimate",
                      symbol: { fill: "#000000" },
                      labels: { fontSize: 6 }
                    },
                    {
                      name: "Above Estimate",
                      symbol: { fill: "#006400" },
                      labels: { fontSize: 6 }
                    },
                    {
                      name: "Below Estimate",
                      symbol: { fill: "#c43a31" },
                      labels: { fontSize: 6 }
                    }
                  ]}
                />
                <VictoryAxis
                  label={this.state.xLabel}
                  style={{ tickLabels: { fontSize: 0, padding: 1 } }}
                />
                <VictoryAxis
                  label={"Realized"}
                  style={{ tickLabels: { fontSize: 4, padding: 4 } }}
                  dependentAxis
                />
                {this.state.sorted ? (
                  <VictoryLabel text="⟶" x={452} y={282} textAnchor="middle" />
                ) : (
                  <VictoryLabel text="⟵" x={348} y={282} textAnchor="middle" />
                )}
                <VictoryScatter
                  bubbleProperty="amount"
                  minBubbleSize={1}
                  maxBubbleSize={10}
                  groupComponent={<VictoryClipContainer />}
                  labelComponent={<VictoryTooltip />}
                  data={this.makeData()}
                  animate={{ duration: 500 }}
                />
              </VictoryChart>
            </div>
          ) : null}
        </div>
        <div className="ui centered grid">
          <div className="twelve wide column">
            <div className="ui left aligned container">
              <br />
              <h1> Lots </h1>
              <br />
              {this.props.lots.length > 150 ? null : (
                <div className="ui fluid icon input">
                  <i className="search icon" />
                  <input
                    onChange={event => this.updateSearchTerm(event)}
                    value={this.state.searchTerm}
                    type="text"
                    placeholder="Search for lots by name..."
                  />
                </div>
              )}
              <table className="ui very basic table">
                <thead>
                  <tr>
                    <th />
                    <th>Sale</th>
                    <th onClick={event => this.handleClick(event)}>
                      <div className="hover">
                        <i className="sort icon" />Sale Date
                      </div>
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <div className="hover">
                        <i className="sort icon" />Lot Number{" "}
                      </div>
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <div className="hover">
                        <i className="sort icon" />Title{" "}
                      </div>
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <div className="hover">
                        <i className="sort icon" />Low Estimate
                      </div>
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <div className="hover">
                        <i className="sort icon" />High Estimate{" "}
                      </div>
                    </th>
                    <th onClick={event => this.handleClick(event)}>
                      <div className="hover">
                        <i className="sort icon" />Price Realized{" "}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.lots && this.props.lots.length > 0 ? (
                    this.state.search ? (
                      this.state.displayLots.map((lot, i) => (
                        <tr key={i}>
                          <td key={`${i}0`}>
                            <Modal
                              trigger={
                                <img
                                  className="hover"
                                  onError={this.addDefaultSrc}
                                  src={lot.image}
                                  alt={christiesLink}
                                />
                              }
                              closeIcon
                              size={"large"}
                            >
                              <Modal.Content image>
                                <img
                                  onError={this.addDefaultSrc}
                                  src={
                                    lot.image.slice(0, lot.image.length - 2) +
                                    "500"
                                  }
                                  alt={christiesLink}
                                />
                                <Modal.Description>
                                  <div
                                    style={{
                                      paddingBottom: "20%"
                                    }}
                                    className="ui basic center aligned segment"
                                  >
                                    <h1>{`"${lot.art_title.length > 20}"`}</h1>
                                    <h3 style={{ maxWidth: "100%" }}>
                                      {this.props.artist.name}
                                    </h3>
                                    <p />
                                    <p>
                                      {lot.size_mat.length < 60
                                        ? `${lot.size_mat}`
                                        : null}
                                    </p>
                                    <p
                                    >{`Estimate: $${lot.estimate_low.toLocaleString(
                                      navigator.language,
                                      {
                                        minimumFractionDigits: 0
                                      }
                                    )}-$${lot.estimate_high.toLocaleString(
                                      navigator.language,
                                      {
                                        minimumFractionDigits: 0
                                      }
                                    )}`}</p>
                                    <p>
                                      {`Price Realized: $${lot.realized.toLocaleString(
                                        navigator.language,
                                        {
                                          minimumFractionDigits: 0
                                        }
                                      )}`}
                                    </p>
                                  </div>
                                </Modal.Description>
                              </Modal.Content>
                            </Modal>
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
                      this.props.lots.map((lot, i) => (
                        <tr key={i}>
                          <td key={`${i}0`}>
                            <Modal
                              trigger={
                                <img
                                  className="hover"
                                  onError={this.addDefaultSrc}
                                  src={lot.image}
                                  alt={christiesLink}
                                />
                              }
                              closeIcon
                              size={"large"}
                            >
                              <Modal.Content image>
                                <img
                                  onError={this.addDefaultSrc}
                                  src={
                                    lot.image.slice(0, lot.image.length - 2) +
                                    "500"
                                  }
                                  alt={christiesLink}
                                />
                                <Modal.Description
                                  style={{
                                    marginTop: "10%",
                                    marginLeft: "5%",
                                    marginRight: "5%",
                                    width: "20%"
                                  }}
                                >
                                  <div className="ui basic center aligned segment">
                                    <h1>{`"${lot.art_title}"`}</h1>
                                    <h3>{this.props.artist.name}</h3>
                                    <p />
                                    <p>
                                      {lot.size_mat.length < 60
                                        ? `${lot.size_mat}`
                                        : null}
                                    </p>
                                    <p
                                    >{`Estimate: $${lot.estimate_low.toLocaleString(
                                      navigator.language,
                                      {
                                        minimumFractionDigits: 0
                                      }
                                    )}-$${lot.estimate_high.toLocaleString(
                                      navigator.language,
                                      {
                                        minimumFractionDigits: 0
                                      }
                                    )}`}</p>
                                    <p>
                                      {`Price Realized: $${lot.realized.toLocaleString(
                                        navigator.language,
                                        {
                                          minimumFractionDigits: 0
                                        }
                                      )}`}
                                    </p>
                                  </div>
                                </Modal.Description>
                              </Modal.Content>
                            </Modal>
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
                    )
                  ) : (
                    <tr>{null}</tr>
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

const mapStateToProps = ({
  sales,
  displayArtist,
  display_artist,
  loading,
  artist
}) => {
  const lots = displayArtist.data
    ? displayArtist.data.attributes.lots.count > 250
      ? displayArtist.data.attributes.lots[(0, 250)].sort(
          (a, b) =>
            parseInt(a.lot_number.slice(4), 10) -
            parseInt(b.lot_number.slice(4), 10)
        )
      : displayArtist.data.attributes.lots.sort(
          (a, b) =>
            parseInt(a.lot_number.slice(4), 10) -
            parseInt(b.lot_number.slice(4), 10)
        )
    : [];

  return {
    sales,
    displayArtist,
    display_artist,
    lots,
    loading,
    artist
    // lots_loading: displayArtist.id === artist.id
  };
};

export default withRouter(connect(mapStateToProps, actions)(ArtistLotList));

// ? displayArtist.data.attributes.lots.count > 250
//   ? displayArtist.data.attributes.lots[(0, 250)].sort(
//       (a, b) =>
//         parseInt(a.lot_number.slice(4), 10) -
//         parseInt(b.lot_number.slice(4), 10)
//     )
//   : displayArtist.data.attributes.lots.sort(
//       (a, b) =>
//         parseInt(a.lot_number.slice(4), 10) -
//         parseInt(b.lot_number.slice(4), 10)
//     )
// : [];
