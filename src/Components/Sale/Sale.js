import React from "react";
import LotList from "./LotList";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Sale extends React.Component {
  componentDidMount() {
    this.props.fetchDisplaySale(this.props.sale.id);
  }
  render() {
    return (
      <div>
        {this.props.loading ? (
          <div className="ui active centered inline loader" />
        ) : (
          <div className="ui container">
            <h1>
              {this.props.sale.title ? (
                this.props.sale.title
              ) : (
                <div className="ui segment">
                  <div className="ui active inverted dimmer">
                    <div className="ui large text loader">Loading</div>
                  </div>
                </div>
              )}
            </h1>
            <h1>
              {this.props.sale.sale_date ? this.props.sale.sale_date : ""}
            </h1>
            <LotList />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ sales, displaySale }) => {
  return {
    sales,
    displaySale
  };
};

export default connect(mapStateToProps, actions)(Sale);
