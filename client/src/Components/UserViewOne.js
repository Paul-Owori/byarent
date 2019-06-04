import React, { Component } from "react";
import "./css/user_viewOne.css";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { getItem, getItems } from "../Actions/itemActions"; //REQUIRED FOR REDUX
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
    activeImage: ""
  };

  checker = () => {
    if (this.props.item.item && this.props.item.item.item_name) {
      return true;
    } else {
      return false;
    }
  };

  telliyas = () => {
    //this.stateSetter();
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
    //console.log("Items?", this.props.item.items);
    console.log(
      "CURRENT ITEM IN SESSION STORAGE=>",
      JSON.parse(sessionStorage.getItem("item"))
    );
    console.log("Just props", this.props);

    // console.log("HISTORY from props", this.props.history);
    // console.log(
    //   "Attempt at image construction=>",
    //   "http://localhost:5000/" + this.props.item.items[0].item_image[0]
    // );
    // let freaky = this.props.item.items.forEach(item =>
    //   console.log("ITEM=>", item)
    // );
    // console.log(freaky);
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
        src: `"http://localhost:5000/"${item_imageArray[i]}`,
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
    let cart = [];
    cart.push(this.state.item);

    if (sessionStorage.getItem("cart") === null) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let oldCart = JSON.parse(sessionStorage.getItem("cart"));
      let newCart = [...oldCart, ...cart];
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
    window.location.reload();
  };

  render() {
    const { item } = this.state.item;
    return (
      <React.Fragment>
        <Button
          type="button"
          className="mt-5 mb-3 "
          color="light"
          block
          onClick={this.telliyas}
        >
          LOG
        </Button>
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
          {this.state.item && this.state.item.item_name ? (
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
                        src={"http://localhost:5000/" + item}
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
                        <Button
                          outline
                          color="light"
                          onClick={this.minusActiveIndex}
                        >
                          Prev
                        </Button>
                      </Col>
                      <Col xs="10">
                        <img
                          src={
                            "http://localhost:5000/" +
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
                        <Button
                          className="ml-0"
                          outline
                          color="light"
                          onClick={this.plusActiveIndex}
                        >
                          Next
                        </Button>
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
                        <Col xs="4">Bedrooms:</Col>
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
          ) : this.checker && !window.location.hash ? (
            "This page will reload in " +
            setTimeout(() => {
              window.location = window.location + "#loaded";
              window.location.reload();
            }, 150)
          ) : (
            console.log("ERROR")
          )}
          <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              {this.state.item ? this.state.item.item_name : ""}
            </ModalHeader>
            <ModalBody>
              <img
                src={"http://localhost:5000/" + this.state.activeImage}
                alt="Active Image"
                className="activeImage"
              />
            </ModalBody>
          </Modal>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  user: state.user
});

UserViewOne.propTypes = {
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object,
  user: PropTypes.object
};
//REQUIRED FOR REDUX
export default connect(
  mapStateToProps,
  { getItem, getItems }
)(UserViewOne);
