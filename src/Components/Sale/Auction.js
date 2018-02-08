import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuctionBarChart from "../VictoryCharts/AuctionBarChart";

const Auction = props => {
  return (
    <div className="ui grid">
      <div className="sixteen wide column">
        <div className="ui huge header">Auctions</div>
      </div>
      <br />
      <div className="ui container" style={{ fontSize: "20px" }}>
        <table className="ui very basic table">
          <tbody className="center aligned">
            <tr>
              <td>
                <Link to="/auctions/2007">2007</Link>
              </td>
              <td>
                <Link to="/auctions/2011">2011</Link>
              </td>
              <td>
                <Link to="/auctions/2015">2015</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/auctions/2008">2008</Link>
              </td>
              <td>
                <Link to="/auctions/2012">2012</Link>
              </td>
              <td>
                <Link to="/auctions/2016">2016</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/auctions/2009">2009</Link>
              </td>
              <td>
                <Link to="/auctions/2013">2013</Link>
              </td>

              <td>
                <Link to="/auctions/2017">2017</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/auctions/2010">2010</Link>
              </td>
              <td>
                <Link to="/auctions/2014">2014</Link>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div className="centered ten wide column">
        <div className="ui large header">Analytics</div>
        {/*<AuctionBarChart />*/}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sales }) => {
  return {
    sales
  };
};
export default connect(mapStateToProps)(Auction);
