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

class App extends Component {
  constructor() {
    super();

    this.state = {
      sales: [],
      artists: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/sales/")
      .then(resp => resp.json())
      .then(arr => this.setState({ sales: arr }))
      .then(
        fetch("http://localhost:3000/api/v1/artists")
          .then(resp => resp.json())
          .then(arr => this.setState({ artists: arr }))
      );
  }

  render() {
    console.log("app props", this.state);
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
                      this.state.sales.filter(
                        sale => sale.id.toString() === match.params.id
                      )[0]
                        ? this.state.sales.filter(
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
                    sales={this.state.sales.filter(sale =>
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
                return (
                  <Artist
                    artists={this.state.artists}
                    sales={this.state.sales}
                  />
                );
              }}
            />
            <Route
              exact
              path="/artists"
              render={({ match }) => {
                return (
                  <ArtistContainer
                    updateDisplayArtist={this.updateDisplayArtist}
                    artists={this.state.artists}
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

export default withRouter(App);
