import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import {
  VictoryScatter,
  VictoryLabel,
  VictoryLegend,
  VictoryChart,
  VictoryAxis,
  VictoryClipContainer,
  VictoryZoomContainer,
  VictoryTooltip
} from "victory";

const christiesLink =
  "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77";

class LotList extends React.Component {
  constructor() {
    super();

    this.state = {
      sorted: true,
      xLabel: "Lot Number",
      displayLots: [],
      searchTerm: "",
      search: false
    };
  }
  sortByLotId = lots => {
    return lots.sort(function(a, b) {
      return a.id - b.id;
    });
  };

  makeData = () => {
    let data = [];
    this.props.displayLots.forEach((lot, i) =>
      data.push({
        x: i + 10,
        y: lot.realized,
        amount: lot.realized,
        fillOpacity: 0.8,
        fill: d =>
          d.y >= lot.estimate_low && d.y <= lot.estimate_high
            ? "#000000"
            : d.y <= lot.estimate_low ? "#c43a31" : "#006400",
        label: `${lot.lot_number}\n${
          this.findArtist(lot).name
        }\n\nLow Estimate: $${lot.estimate_low.toLocaleString(
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
    return data;
  };

  addDefaultSrc = ev => {
    ev.target.src = christiesLink;
  };

  sortLots = (lots, filter) => {
    switch (filter) {
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
      case "Artist":
        if (this.state.sorted === false) {
          return this.setState({
            sorted: true,
            lots: lots.sort((a, b) => {
              if (
                this.findArtist(a).name.slice(0, 2) <
                this.findArtist(b).name.slice(0, 2)
              ) {
                return -1;
              }
              if (
                this.findArtist(b).name.slice(0, 2) >
                this.findArtist(a).name.slice(0, 2)
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
    this.sortLots(this.props.displayLots, event.target.innerText);
    this.setState({ xLabel: event.target.innerText });
  };

  updateSearchTerm(event) {
    if (event.target.value.length === 0) {
      return this.setState({ search: false, searchTerm: "", displayLots: [] });
    } else {
      this.setState({ searchTerm: event.target.value, search: true });
      let lots = this.props.displayLots.filter(
        lot =>
          lot.art_title.toLowerCase().includes(event.target.value) ||
          this.findArtist(lot)
            .name.toLowerCase()
            .includes(event.target.value)
      );
      this.setState({ displayLots: lots });
    }
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <div className="ui active centered inline loader" />
        ) : (
          <div>
            <h1 className="ui left aligned header"> Analytics </h1>
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
            <br />
            <h1 className="ui left aligned header"> Lots </h1>
            <div className="ui fluid icon input">
              <i className="search icon" />
              <input
                onChange={event => this.updateSearchTerm(event)}
                value={this.state.searchTerm}
                type="text"
                placeholder="Search for lots by artist name or artwork title..."
              />
            </div>
            <br />
            <div className="ui centered grid">
              <div className="forteen wide column">
                <div className="ui left aligned container">
                  <table className="ui very basic table">
                    <thead>
                      <tr>
                        <th onClick={event => this.handleClick(event)}>
                          <div className="hover">
                            <i className="sort icon" />Lot Number
                          </div>
                        </th>
                        <th />
                        <th onClick={event => this.handleClick(event)}>
                          <div className="hover">
                            <i className="sort icon" />Artist
                          </div>
                        </th>
                        <th onClick={event => this.handleClick(event)}>
                          <div className="hover">
                            <i className="sort icon" />Title
                          </div>
                        </th>
                        <th onClick={event => this.handleClick(event)}>
                          <div className="hover">
                            <i className="sort icon" />Low Estimate
                          </div>
                        </th>
                        <th onClick={event => this.handleClick(event)}>
                          <div className="hover">
                            <i className="sort icon" />High Estimate
                          </div>
                        </th>
                        <th onClick={event => this.handleClick(event)}>
                          <div className="hover">
                            <i className="sort icon" />Price Realized
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.displayLots ? (
                        this.state.search ? (
                          this.state.displayLots.map((lot, i) => (
                            <tr key={i}>
                              <td key={`${i}0`}>{lot.lot_number}</td>
                              <td key={`${i}1`}>
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
                                        lot.image.slice(
                                          0,
                                          lot.image.length - 2
                                        ) + "500"
                                      }
                                      alt={christiesLink}
                                    />
                                    <Modal.Description>
                                      <div
                                        style={{
                                          marginTop: "20%",
                                          maxWidth: "80%",
                                          marginLeft: "10%"
                                        }}
                                        className="ui basic center aligned segment"
                                      >
                                        <h1>{this.findArtist(lot).name}</h1>
                                        <h1>{`"${lot.art_title}"`}</h1>
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
                              <td key={`${i}2`}>
                                <a
                                  href={""}
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
                                ${lot.realized.toLocaleString(
                                  navigator.language,
                                  {
                                    minimumFractionDigits: 0
                                  }
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          this.props.displayLots.map((lot, i) => (
                            <tr key={i}>
                              <td key={`${i}0`}>{lot.lot_number}</td>
                              <td key={`${i}1`}>
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
                                        lot.image.slice(
                                          0,
                                          lot.image.length - 2
                                        ) + "500"
                                      }
                                      alt={christiesLink}
                                    />
                                    <Modal.Description>
                                      <div
                                        style={{
                                          marginTop: "20%",
                                          maxWidth: "80%",
                                          marginLeft: "10%"
                                        }}
                                        className="ui basic center aligned segment"
                                      >
                                        <h1>{this.findArtist(lot).name}</h1>
                                        <h1>{`"${lot.art_title}"`}</h1>
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
                              <td key={`${i}2`}>
                                <a
                                  href={""}
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
                                ${lot.realized.toLocaleString(
                                  navigator.language,
                                  {
                                    minimumFractionDigits: 0
                                  }
                                )}
                              </td>
                            </tr>
                          ))
                        )
                      ) : (
                        <tr>
                          <div className="ui segment">
                            <div className="ui active inverted dimmer">
                              <div className="ui large text loader">
                                Loading
                              </div>
                            </div>
                          </div>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ loading, displaySale }) => {
  const displayLots = displaySale.id
    ? displaySale.lots.sort(
        (a, b) =>
          parseInt(a.lot_number.slice(4), 10) -
          parseInt(b.lot_number.slice(4), 10)
      )
    : [];
  const artists = displaySale.artists ? displaySale.artists : [];
  return {
    loading,
    displaySale,
    displayLots,
    artists
  };
};
export default connect(mapStateToProps)(withRouter(LotList));
