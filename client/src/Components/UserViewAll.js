import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";
import "./css/view_all.css";
import { TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getAvailableItems, getItem } from "../Actions/itemActions";
import PropTypes from "prop-types";
import { currentSite } from "../client_config/config_vars";

class UserViewAll extends Component {
  componentDidMount() {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    currentUser
      ? this.setState({ user: currentUser })
      : this.setState({ user: {} });
    this.props.getAvailableItems();
    setTimeout(() => {
      console.log("the state i just added==>>", this.state);
      let availableItemArray = [];
      this.setState({ items: this.props.item.items });
    }, 150);
    console.log("Mounted");
  }

  state = {
    user: {},
    loading: false,
    items: [],
    filter: false,
    saleItemsVisible: true,
    rentItemsVisible: true,
    modal: false,
    activeImage: "",
    item_name: "",
    _id: ""
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

  filterToggle = () => {
    this.setState({ filter: !this.state.filter });
  };

  rentOrBuy = purchaseDetails => {
    if ((purchaseDetails.rent = true)) {
      return "Rent";
    } else {
      return "Buy";
    }
  };

  visibilityCheck = rent => {
    if (rent === true && this.state.rentItemsVisible === true) {
      return "User dark bg-dark my-3  text-center";
    } else if (rent === true && this.state.rentItemsVisible === false) {
      return "User dark bg-dark my-3  text-center invisibleItem";
    } else if (rent === false && this.state.saleItemsVisible === true) {
      return "User dark bg-dark my-3  text-center";
    } else if (rent === false && this.state.saleItemsVisible === false) {
      return "User dark bg-dark my-3  text-center invisibleItem";
    }
  };

  rentOnly = () => {
    this.setState({ saleItemsVisible: false, rentItemsVisible: true });
  };

  saleOnly = () => {
    this.setState({ rentItemsVisible: false, saleItemsVisible: true });
  };

  showAll = () => {
    this.setState({ saleItemsVisible: true, rentItemsVisible: true });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  imageModal = item => {
    this.setState({
      activeImage: item.item_image[0],
      item_name: item.item_name,
      _id: item._id
    });

    setTimeout(() => {
      this.toggle();
    }, 500);
  };

  render() {
    return (
      <Container fluid className="allContainer text-center">
        <h2 className="colorME text-center">
          Welcome{" "}
          {this.props.user.user
            ? this.props.user.user.user_firstName
            : this.state.user
            ? this.state.user.user_firstName
            : ""}
          !
        </h2>
        <ButtonDropdown isOpen={this.state.filter} toggle={this.filterToggle}>
          <Button id="filter" color="secondary">
            FILTER FOR:
          </Button>
          <DropdownToggle filter color="secondary">
            <i class="fas fa-caret-down" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.showAll}>
              All available units
            </DropdownItem>
            <DropdownItem onClick={this.rentOnly}>Rent only</DropdownItem>
            <DropdownItem onClick={this.saleOnly}>Sale Only</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>

        <Container className="mb-5">
          <React.Fragment>
            <TransitionGroup>
              {this.props.item.loading === false && this.checker() === true ? (
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
                        className={this.visibilityCheck(
                          item_purchaseDetails.rent
                        )}
                      >
                        <div className="mt-2">
                          <h5 className="colorME font-weight-bold">
                            {item_name}
                          </h5>
                        </div>

                        <div className="dispImgBody">
                          <img
                            src={currentSite + item_image[0]}
                            className="dispImg"
                            alt=""
                            onClick={this.imageModal.bind(this, {
                              item_name: item_name,
                              item_image: item_image,
                              _id: _id
                            })}
                          />
                        </div>

                        <div className="mt-1">
                          <p className="text-justify colorME dispText ">
                            {item_description}
                          </p>
                          <hr />
                          <h6 className="mb-2 priceLabel font-weight-bold">
                            UGX {item_price}
                          </h6>
                          <h6 className=" mb-3 infoLabel">
                            Available for:{" "}
                            <span className="rentOrSaleLabel">
                              {" "}
                              {item_purchaseDetails.rent
                                ? "Rent"
                                : item_purchaseDetails.sell
                                ? "Sale"
                                : ""}
                            </span>
                          </h6>
                          <Button
                            color="light"
                            block
                            className="mr-2 my-3 seeMore "
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
                  <h4 className="greyME font-weight-bold mt-3 ">
                    Please wait...{" "}
                  </h4>
                  <div className="spinner-grow text-secondary loader my-5" />
                </div>
              )}
            </TransitionGroup>
          </React.Fragment>
        </Container>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.state.item_name ? this.state.item_name : ""}
          </ModalHeader>
          <ModalBody>
            <img
              src={currentSite + this.state.activeImage}
              alt={this.state.activeImage}
              className="activeImage"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              block
              color="dark"
              onClick={this.getItem.bind(this, this.state._id)}
            >
              See more
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

UserViewAll.propTypes = {
  getAvailableItems: PropTypes.func.isRequired,
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
  { getAvailableItems, getItem }
)(UserViewAll);
