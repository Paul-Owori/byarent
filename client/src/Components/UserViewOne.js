import React, { Component } from "react";
import "./css/user_viewOne.css";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { getItem, getItems } from "../Actions/itemActions"; //REQUIRED FOR REDUX
import { preOrder } from "../Actions/orderActions"; //REQUIRED FOR REDUX
import { currentSite } from "../client_config/config_vars";

import PropTypes from "prop-types";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Button,
  Row,
  Col
} from "reactstrap";

class UserViewOne extends Component {
  componentWillMount() {
    let id = this.props.match.params.item_id;
    this.props.getItem(id);
    this.setState({ id: id });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        item: this.props.item.item,
        imageArray: this.props.item.item.item_image
      });
    }, 50);
  }

  state = {
    id: "",
    item: {},
    activeIndex: 0,
    imageArray: [],
    modal: false,
    warnInfo: "",
    modalWarn: false,
    activeImage: "",
    user: JSON.parse(sessionStorage.getItem("user"))
  };

  checker = () => {
    if (this.props.item.item && this.props.item.item.item_name) {
      return true;
    } else {
      return false;
    }
  };

  setActiveImage = image => {
    this.setState({ activeImage: image });
    setTimeout(() => {
      this.toggle();
    }, 50);
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  itemArray = () => {
    let itemArray = [];
    let item_imageArray = this.state.item.item_image;
    let count = 0;
    for (let i = 0; i < item_imageArray.length; i++) {
      itemArray.push({
        src: `${currentSite + item_imageArray[i]}`,
        altText: `Slide ${count}`,
        caption: `Slide ${count}`
      });
      count++;
    }
    return itemArray;
  };

  assignIndex = index => {
    this.setState({ activeIndex: index });
  };

  minusActiveIndex = () => {
    this.state.activeIndex === 0
      ? this.setState({ activeIndex: this.state.imageArray.length })
      : this.setState({ activeIndex: this.state.activeIndex - 1 });
  };
  plusActiveIndex = () => {
    this.state.activeIndex === this.state.imageArray.length - 1
      ? this.setState({ activeIndex: 0 })
      : this.setState({ activeIndex: this.state.activeIndex + 1 });
  };

  goBack = () => {
    this.props.history.push("/user/all");
  };

  addToCart = () => {
    if (this.state.user && this.state.user.user_firstName) {
      this.props.preOrder(this.state.item);

      this.setState({
        warnInfo: `${this.state.item.item_name} added to cart`
      });
      setTimeout(() => {
        this.toggleWarn();
      }, 100);
      this.forceUpdate();
    } else {
      this.setState({
        warnInfo: "You need to be logged in to add an item to your cart!"
      });
      setTimeout(() => {
        this.toggleWarn();
      }, 100);
    }
  };
  toggleWarn = () => {
    this.setState({ modalWarn: !this.state.modalWarn });
    setTimeout(() => {
      this.setState({ modalWarn: !this.state.modalWarn });
    }, 1500);
  };
  refreshME = () => {
    setTimeout(() => {
      this.forceUpdate();
    }, 1000);
  };

  render() {
    return (
      <Container fluid className="userOneContainer">
        <Button
          type="button"
          className="mt-5 mb-3 backButton "
          color="secondary"
          size="lg"
          onClick={this.goBack}
        >
          Go back
        </Button>
        <React.Fragment>
          {this.props.item.loading === false &&
          this.state.item &&
          this.state.item.item_name ? (
            <Container className="text-center greyME ">
              <Row className="justify-content-around User">
                <Col xs="3" className="User  my-3 colorME imgScroller">
                  <small className="greyME">
                    Click image to show in main display
                  </small>
                  {this.state.item.item_image.map(item => (
                    <div
                      className="dispImgBody  mb-2"
                      key={this.state.item.item_image.indexOf(item)}
                    >
                      <img
                        alt={item}
                        src={currentSite + item}
                        onClick={this.assignIndex.bind(
                          this,
                          this.state.item.item_image.indexOf(item)
                        )}
                        className="dispImg"
                      />
                    </div>
                  ))}
                </Col>
                <Col xs="8" className="User  User mt-3 colorME">
                  <small className="greyME">Click the image to zoom</small>
                  <div className="whiteBG">
                    <Row className="mainImgBody2  ">
                      <Col xs="1" className="align-self-center">
                        <i
                          className="fas fa-caret-square-left fa-xs display-4 clicker"
                          onClick={this.minusActiveIndex}
                        />
                      </Col>
                      <Col xs="10">
                        <img
                          alt={
                            this.state.item.item_image[this.state.activeIndex]
                          }
                          src={
                            currentSite +
                            this.state.item.item_image[this.state.activeIndex]
                          }
                          onClick={this.setActiveImage.bind(
                            this,
                            this.state.item.item_image[this.state.activeIndex]
                          )}
                          className="mainImg2"
                        />
                      </Col>
                      <Col xs="1" className="align-self-center ">
                        <i
                          className="fas fa-caret-square-right fa-xs display-4 clicker"
                          onClick={this.plusActiveIndex}
                        />
                      </Col>
                    </Row>
                  </div>
                  <h4 className="colorME">{this.state.item.item_name}</h4>
                  <div className="mt-1">
                    <p className="text-justify colorME dispText2  ">
                      {this.state.item.item_description}
                    </p>
                  </div>
                  <Row className="justify-content-around">
                    <Col xs="7" className="mt-3 greyME dispText  text-justify">
                      <h6 className="font-weight-bold">Purchase details:</h6>
                      <Row>
                        <Col xs="4">Address:</Col>
                        <Col xs="8">
                          {this.state.item.item_purchaseDetails.address}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4" className="font-weight-bold">
                          Available for:
                        </Col>
                        <Col xs="8" className="font-weight-bold">
                          {this.state.item.item_purchaseDetails.rent === true
                            ? "Rent"
                            : "Sale"}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">Bathrooms:</Col>
                        <Col xs="8">
                          {this.state.item.item_purchaseDetails.bathrooms}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">Bedrooms:</Col>
                        <Col xs="8">
                          {this.state.item.item_purchaseDetails.bedrooms}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="4">Garage:</Col>
                        <Col xs="8">
                          {this.state.item.item_purchaseDetails.garage}
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="4" className="mt-3 ">
                      <Button block color="primary" class="mb-1 mt-3">
                        UGX {this.state.item.item_price}
                      </Button>
                      <Button
                        block
                        color="success"
                        className="mb-1"
                        onClick={this.addToCart}
                      >
                        Add to cart <i className="fas fa-cart-plus" />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          ) : (
            <div className="text-center">
              <h5 className="greyME font-weight-bold">
                Try refreshing this page if it does not refresh automaticaly
                {this.refreshME()}
              </h5>
              <div className=" loadbody my-5" />
            </div>
          )}
          <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              {this.state.item ? this.state.item.item_name : ""}
            </ModalHeader>
            <ModalBody>
              <img
                src={currentSite + this.state.activeImage}
                alt={this.state.activeImage}
                className="activeImage"
              />
            </ModalBody>
          </Modal>
          <Modal
            size="lg"
            isOpen={this.state.modalWarn}
            toggle={this.toggleWarn}
          >
            <ModalHeader toggle={this.toggleWarn}>
              {this.state.warnInfo}
            </ModalHeader>
          </Modal>
        </React.Fragment>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  user: state.user,
  order: state.order
});

UserViewOne.propTypes = {
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  preOrder: PropTypes.func.isRequired,
  item: PropTypes.object,
  user: PropTypes.object,
  order: PropTypes.object
};
//REQUIRED FOR REDUX
export default connect(
  mapStateToProps,
  { getItem, getItems, preOrder }
)(UserViewOne);
