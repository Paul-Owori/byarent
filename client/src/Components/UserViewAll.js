import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./css/view_all.css";
import { TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { getItems, getItem } from "../Actions/itemActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class UserViewAll extends Component {
  componentWillMount() {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    currentUser
      ? this.setState({ user: currentUser })
      : this.setState({ user: {} });
  }

  componentDidMount() {
    this.props.getItems();
  }

  state = {
    user: {},
    loading: false,
    items: null
  };

  checker = () => {
    if (
      this.props.item.items &&
      this.props.item.items.length &&
      this.props.item.items[0].item_image &&
      this.props.item.items[0].item_image.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  getItem = id => {
    sessionStorage.setItem("item", JSON.stringify(id));

    this.props.history.push(`/user/one/${id}`);
  };

  rentOrBuy = purchaseDetails => {
    if ((purchaseDetails.rent = true)) {
      return "Rent";
    } else {
      return "Buy";
    }
  };
  render() {
    return (
      <Container fluid className="allContainer">
        <h2 className="colorME text-center">
          Welcome{" "}
          {this.props.user.user
            ? this.props.user.user.user_firstName
            : this.state.user
            ? this.state.user.user_firstName
            : ""}
          !
        </h2>
        <Container className="mb-5">
          <React.Fragment>
            <TransitionGroup>
              {this.checker() === true ? (
                <Row className="">
                  {this.props.item.items.map(
                    ({
                      _id,
                      item_name,
                      item_description,
                      item_price,
                      item_image,
                      item_purchaseDetails
                    }) => (
                      <Col
                        md="3"
                        className="User dark bg-dark my-3  text-center"
                      >
                        <div className="mt-2">
                          <h5 className="colorME font-weight-bold">
                            {item_name}
                          </h5>
                        </div>

                        <div className="dispImgBody">
                          <img
                            src={"http://localhost:5000/" + item_image[0]}
                            className="dispImg"
                            alt=""
                          />
                        </div>

                        <div className="mt-1">
                          <p className="text-justify colorME dispText ">
                            {item_description}
                          </p>
                          <Button
                            color="warning"
                            className="mb-3 priceAndRent "
                          >
                            {item_price}
                          </Button>
                          <Button color="info" className=" mb-3 priceAndRent">
                            {item_purchaseDetails.rent
                              ? "Rent"
                              : item_purchaseDetails.sell
                              ? "Buy"
                              : ""}
                          </Button>
                          <Button
                            color="light"
                            block
                            className="mr-2 mb-3 seeMore "
                            onClick={this.getItem.bind(this, _id)}
                          >
                            See More
                          </Button>
                        </div>
                      </Col>
                    )
                  )}
                </Row>
              ) : (
                <div className="text-center">
                  <h5 className="greyME font-weight-bold">
                    Try refreshing this page if it does not refresh automaticaly
                    in{" "}
                    {this.checker() === true
                      ? setTimeout(() => {
                          this.forceUpdate();
                        }, 150)
                      : console.log("ERROR")}{" "}
                    seconds
                  </h5>
                  <div className=" loadbody my-5" />
                </div>
              )}
            </TransitionGroup>
          </React.Fragment>
        </Container>
      </Container>
    );
  }
}

UserViewAll.propTypes = {
  getItems: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  item: state.item,
  user: state.user
});
export default connect(
  mapStateToProps,
  { getItems, getItem }
)(UserViewAll);
