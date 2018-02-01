import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import Auction from "./Auction.js";
import Year from "./Year.js";
import Sale from "./Sale.js";
import ArtistContainer from "./ArtistContainer.js";
import { Route, Switch, withRouter } from "react-router-dom";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      sales: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/sales/")
      .then(resp => resp.json())
      .then(arr => this.setState({ sales: arr }));
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
                    sale={this.state.sales.filter(
                      sale => sale.id.toString() === match.params.id
                    )}
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
            <Route exact path="/" component={ArtistContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
