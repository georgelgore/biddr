import React from "react";
import { withRouter } from "react-router-dom";
class Analytics extends React.Component {
  constructor() {
    super();

    this.state = {
      artists: [],
      sales: [],
      lots: [],
      show: "",
      inner: "Top Ten Artists"
    };
  }

  componentDidMount() {
    fetch("https://biddr-app.herokuapp.com/api/v1/top_artists/")
      .then(res => res.json())
      .then(obj => this.setState({ artists: obj }));
    fetch("https://biddr-app.herokuapp.com/api/v1/top_sales/")
      .then(res => res.json())
      .then(obj => this.setState({ sales: obj }));
    fetch("https://biddr-app.herokuapp.com/api/v1/high_lots/")
      .then(res => res.json())
      .then(obj => this.setState({ lots: obj }));
  }

  showLots = () => {
    return this.state.lots
      ? this.state.lots
          .sort((a, b) => a.realized - b.realized)
          .map((lot, i) => (
            <div key={i} className="card">
              <div
                className="hover image"
                onClick={() =>
                  this.props.history.push(`biddr/artists/${lot.artist_id}`)
                }
              >
                <img
                  alt="https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77"
                  src={encodeURI(
                    lot.image.slice(0, lot.image.length - 2) + "450"
                  )}
                />
              </div>
              <div className="content">
                <div className="header">{lot.artist_name}</div>
                <div className="header">{lot.art_title}</div>
                <div className="description">{lot.size_mat}</div>
                <br />
                <div className="extra content">
                  {lot.estimate_low === 0 ? (
                    <div className="description">Estimate on Request</div>
                  ) : (
                    <div>
                      <div className="description">
                        Low Estimate: ${lot.estimate_low.toLocaleString(
                          navigator.language,
                          {
                            minimumFractionDigits: 0
                          }
                        )}
                      </div>
                      <div className="description">
                        High Estimate: ${lot.estimate_high.toLocaleString(
                          navigator.language,
                          {
                            minimumFractionDigits: 0
                          }
                        )}
                      </div>
                    </div>
                  )}
                  <div className="description">
                    Price Realized: ${lot.realized.toLocaleString(
                      navigator.language,
                      {
                        minimumFractionDigits: 0
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
      : null;
  };

  showArtists = () => {
    return this.state.artists
      ? this.state.artists.sort((a, b) => a.sum - b.sum).map((artist, i) => (
          <div key={i} className="card">
            <div
              className="hover image"
              onClick={() =>
                this.props.history.push(`biddr/artists/${artist.artist_id}`)
              }
            >
              <img
                alt="https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77"
                src={encodeURI(
                  artist.image.slice(0, artist.image.length - 2) + "450"
                )}
              />
            </div>
            <div className="content">
              <div className="header ">{artist.name}</div>
              <div className="extra content">
                Amount Sold: ${artist.sum.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0
                })}
              </div>
            </div>
          </div>
        ))
      : null;
  };

  showSales = () => {
    return this.state.sales
      ? this.state.sales.sort((a, b) => a.sum - b.sum).map((sale, i) => (
          <div key={i} className="card">
            <div
              className="hover image"
              onClick={() =>
                this.props.history.push(
                  `biddr/auctions/${sale.sale_date.slice(0, 5)}/${sale.sale_id}`
                )
              }
            >
              <img
                alt="https://www.christies.com/img/lotimages//Alert/NoImage/non_NoImag.jpg?Width=77"
                src={encodeURI(
                  sale.image.slice(0, sale.image.length - 2) + "450"
                )}
              />
            </div>
            <div className="content">
              <div className="header">{sale.title}</div>
              <div className="extra content">
                Total Amount: ${sale.sum.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0
                })}
              </div>
              <div className="extra content">{sale.sale_date}</div>
              <div className="description">{sale.internal_id}</div>
            </div>
          </div>
        ))
      : null;
  };

  handleClick = event => {
    this.setState({
      show: event.target.innerText,
      inner: event.target.innerText
    });
  };

  handleDisplay = () => {
    switch (this.state.show) {
      case "Top Ten Artists":
        return this.showArtists();
      case "Top Ten Lots":
        return this.showLots();
      case "Top Ten Sales":
        return this.showSales();
      default:
        return this.showArtists();
    }
  };

  render() {
    return (
      <div>
        <div className="ui top attached tabular menu">
          <a
            id={1}
            onClick={event => this.handleClick(event)}
            className={`item ${
              this.state.inner === "Top Ten Artists" ? "active" : ""
            }`}
          >
            Top Ten Artists
          </a>
          <a
            id={2}
            onClick={event => this.handleClick(event)}
            className={`item ${
              this.state.inner === "Top Ten Lots" ? "active" : ""
            }`}
          >
            Top Ten Lots
          </a>
          <a
            id={3}
            onClick={event => this.handleClick(event)}
            className={`item ${
              this.state.inner === "Top Ten Sales" ? "active" : ""
            }`}
          >
            Top Ten Sales
          </a>
        </div>
        <div className="ui bottom attached segment">
          <div className="ui five cards">{this.handleDisplay()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Analytics);
