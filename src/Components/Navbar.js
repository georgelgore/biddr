import React from "react";
import { Link } from "react-router-dom";
import { Modal, Image, Menu, Segment, Item } from "semantic-ui-react";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItem: "What is Biddr?"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleDisplay = () => {
    switch (this.state.activeItem) {
      case "What is Biddr?":
        return this.showAbout();
      case "How do the Charts Work?":
        return this.showCharts();
      case "How can I use Biddr?":
        return this.showUse();
      default:
        return this.showAbout();
    }
  };
  showAbout = () => {
    return (
      <div>
        <p style={{ fontSize: 18 }}>
          Biddr is a resource for researching artworks and artists on the
          secondary market. The data on this website comes from publicly
          available auction data from sales dating between 2007 and 2017.{" "}
        </p>
        <p style={{ fontSize: 18 }}>
          For more information about the how to use the website or how the
          information was collected, please contact George Gore:
          georgelgore@gmail.com.
        </p>
      </div>
    );
  };

  showUse = () => {
    return (
      <div>
        <h4>Search for Artists by Name</h4>
        <p>
          Click on the "Artists" tab at the top of the screen. Type in the
          artist you are looking for or select from the randomly generated
          artists.
        </p>
        <p>
          Once you have found the artist you are looking for, scroll down on
          their page to view all artworks that have been put on sale in the past
          ten years. Click on the artwork image to see more information about
          the work, or click on the headers of the table to sort the artworks by
          different elements; such as price realized or title.
        </p>
        <h4>Search for Sales by Date</h4>
        <p>
          Click on the "Auctions" tab at the top of the screen. Select the year
          you would like to learn more information about. Next, select a sale
          and see all of the artworks sold in that sale. Like the "Artists"
          page, you have the ability to search and sort the artworks.
        </p>
      </div>
    );
  };

  showCharts = () => {
    return (
      <div>
        <h4> Bar Charts & Pie Charts </h4>
        <p>Hover over the display elements to see further information.</p>
        <h4> Scatter Charts </h4>
        <p>
          Scatter charts have the added functionality of zoom and sorting! Click
          on the headers above the lots to change the data display. The data
          points in the scatter charts have the additional benefit of size,
          which represents the amount the artwork was sold for. If you want more
          specific information about a lot that is small, use the zoom
          functionality to have better access all artworks.
        </p>
      </div>
    );
  };

  render() {
    return (
      <Menu style={{ maxHeight: 75 }}>
        <Link to="/biddr/">
          <h1
            style={{
              fontSize: 30,
              marginBottom: "35px",
              marginTop: "9px"
            }}
            className="Iconic header item"
          >
            Biddr
          </h1>
        </Link>
        <div className="right fixed menu">
          <div className="right fixed menu">
            <Link to="/biddr/artists">
              <Item
                style={{
                  fontSize: 20,
                  marginBottom: "35px",
                  marginTop: "9px"
                }}
              >
                <h4 className="head2">ARTISTS</h4>
              </Item>
            </Link>
            <Link to="/biddr/auctions">
              <Item
                style={{
                  fontSize: 20,
                  marginBottom: "35px",
                  marginTop: "9px"
                }}
              >
                <h4 className="head2">AUCTIONS</h4>
              </Item>
            </Link>
            <Link to="/biddr/analytics">
              <Item
                style={{
                  fontSize: 20,
                  marginBottom: "35px",
                  marginTop: "9px"
                }}
              >
                <h4 className="head2">ANALYTICS</h4>
              </Item>
            </Link>
            <div>
              <Modal
                style={{ marginTop: "300 px", margin: "0 auto" }}
                dimmer="blurring"
                trigger={
                  <a>
                    <Item
                      style={{
                        fontSize: 20,
                        marginBottom: "35px",
                        marginTop: "9px"
                      }}
                      className="hover"
                    >
                      <h4 className="head2">ABOUT BIDDR</h4>
                    </Item>
                  </a>
                }
              >
                <Modal.Header>
                  <h1>Welcome to Biddr!</h1>
                </Modal.Header>
                <Modal.Content image>
                  <Image
                    wrapped
                    size="large"
                    src="https://www.christies.com/img/lotimages//2016/NYR/2016_NYR_12152_0018B_000(joan_mitchell_noon).jpg?mode=max&down.speed=-1&Width=700"
                  />
                  <div>
                    <Menu attached="top" tabular>
                      <Menu.Item
                        name="What is Biddr?"
                        active={this.state.activeItem === "What is Biddr?"}
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        name="How can I use Biddr?"
                        active={
                          this.state.activeItem === "How can I use Biddr?"
                        }
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        name="How do the Charts Work?"
                        active={
                          this.state.activeItem === "How do the Charts Work?"
                        }
                        onClick={this.handleItemClick}
                      />
                    </Menu>
                    <Segment
                      style={{ width: 600, height: 277, overflow: "auto" }}
                      attached="bottom"
                    >
                      {this.handleDisplay()}
                    </Segment>
                  </div>
                </Modal.Content>
              </Modal>
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

export default Navbar;
