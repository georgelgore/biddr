import React from "react";
import { connect } from "react-redux";

class Analytics extends React.Component {
  constructor() {
    super();

    this.state = {
      artists: [],
      sales: [],
      lots: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/top_artists/")
      .then(res => res.json())
      .then(obj => this.setState({ artists: obj }));
    fetch("http://localhost:3000/api/v1/top_sales/")
      .then(res => res.json())
      .then(obj => this.setState({ sales: obj }));
    fetch("http://localhost:3000/api/v1/high_lots/")
      .then(res => res.json())
      .then(obj => this.setState({ lots: obj }));
  }

  render() {
    console.log("analytics", this.state);
    return (
      <div>
        <div className="ui container">
          <div className="ui huge header">Analytics</div>
          <div className="ui segment">
            <div className="ui segment">
              <div className="ui shadowed segment">
                <h1>Top Ten Artists</h1>
                <div className="ui five cards">
                  {this.state.artists
                    ? this.state.artists
                        .sort((a, b) => a.sum - b.sum)
                        .map((artist, i) => (
                          <div key={i} className="card">
                            <div className="image">
                              <img
                                src={encodeURI(
                                  artist.image.slice(
                                    0,
                                    artist.image.length - 2
                                  ) + "700"
                                )}
                              />
                            </div>
                            <div className="content">
                              <div className="header">{artist.name}</div>
                              <div className="extra content">
                                Total Amount: ${artist.sum.toLocaleString(
                                  navigator.language,
                                  {
                                    minimumFractionDigits: 0
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                    : null}
                </div>
              </div>
            </div>
            <div className="ui segment">
              <div className="ui shadowed segment">
                <h1>Top Ten Lots</h1>
                <div className="ui five cards">
                  {this.state.lots
                    ? this.state.lots
                        .sort((a, b) => a.realized - b.realized)
                        .map((lot, i) => (
                          <div key={i} className="card">
                            <div className="image">
                              <img
                                src={encodeURI(
                                  lot.image.slice(0, lot.image.length - 2) +
                                    "700"
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
                                  <div className="description">
                                    Estimate on Request
                                  </div>
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
                    : null}
                </div>
              </div>
            </div>
            <div className="ui segment">
              <div className="ui shadowed segment">
                <h1>Top Ten Sales</h1>
              </div>
              <div className="ui five cards">
                {this.state.sales
                  ? this.state.sales
                      .sort((a, b) => a.sum - b.sum)
                      .map((sale, i) => (
                        <div key={i} className="card">
                          <div className="image">
                            <img
                              src={encodeURI(
                                sale.image.slice(0, sale.image.length - 2) +
                                  "700"
                              )}
                            />
                          </div>
                          <div className="content">
                            <div className="header">{sale.title}</div>
                            <div className="extra content">
                              Total Amount: ${sale.sum.toLocaleString(
                                navigator.language,
                                {
                                  minimumFractionDigits: 0
                                }
                              )}
                            </div>
                            <div className="extra content">
                              {sale.sale_date}
                            </div>
                            <div className="description">
                              {sale.internal_id}
                            </div>
                          </div>
                        </div>
                      ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;
