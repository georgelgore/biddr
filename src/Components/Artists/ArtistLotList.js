import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const christiesLink =
  "https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77";
class ArtistLotList extends Component {
  constructor() {
    super();

    this.state = {
      lots: [],
      sorted: false,
      originalSort: true
    };
  }

  componentWillMount() {
    this.setState({
      lots: this.props.lots.sort(
        (a, b) =>
          parseInt(this.findSale(a).sale_date, 10) -
          parseInt(this.findSale(b).sale_date, 10)
      )
    });
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
      default:
        return this.setState({
          lots: lots
        });
    }
  };

  handleClick = event => {
    this.sortLots(this.props.lots, event.target.innerText);
  };

  render() {
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
                  <th>High Estimate</th>
                  <th onClick={event => this.handleClick(event)}>
                    <i className="sort icon" />Price Realized
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.lots ? (
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
                        <a
                          onClick={() => {
                            this.props.history.replace(() =>
                              this.linkAuction(lot)
                            );
                          }}
                        >
                          {this.findSale(lot).title}
                        </a>
                      </td>
                      <td key={`${i}3`}>{this.findSale(lot).sale_date}</td>
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
  }
}

const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};

export default withRouter(connect(mapStateToProps)(ArtistLotList));
