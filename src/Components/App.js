import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import Auction from "./Sale/Auction";
import Year from "./Sale";
import Sale from "./Sale/Sale";
import ArtistContainer from "./Artists";
import Artist from "./Artists/Artist.js";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchArtists() && this.props.fetchSales();
  }

  render() {
    console.log("app props", this.props);
    return (
      <div className="App">
        <Navbar />
        <div className="Main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auctions" component={Auction} />
            <Route
              exact
              path="/auctions/:year/:id"
              render={({ match }) => {
                return (
                  <Sale
                    year={match.params.year}
                    sale={
                      this.props.sales.filter(
                        sale => sale.id.toString() === match.params.id
                      )[0]
                        ? this.props.sales.filter(
                            sale => sale.id.toString() === match.params.id
                          )[0]
                        : {}
                    }
                  />
                );
              }}
            />
            <Route
              exact
              path="/auctions/:year"
              render={({ match }) => {
                return (
                  <Year
                    year={match.params.year}
                    sales={this.props.sales.filter(sale =>
                      sale.sale_date.slice(0, 4).includes(match.params.year)
                    )}
                  />
                );
              }}
            />
            <Route
              exact
              path="/artists/:id"
              render={() => {
                return <Artist />;
              }}
            />
            <Route
              exact
              path="/artists"
              render={({ match }) => {
                return (
                  <ArtistContainer
                    updateDisplayArtist={this.updateDisplayArtist}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artists, sales }) => {
  return {
    artists,
    sales
  };
};

export default withRouter(connect(mapStateToProps, actions)(App));
