import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./css/view_all.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, getItem, deleteItem } from "../Actions/itemActions";
import { getOrders } from "../Actions/orderActions";
import PropTypes from "prop-types";
import { currentSite } from "../client_config/config_vars";

class AdminViewAll extends Component {
  componentWillMount() {
    const currentAdmin = JSON.parse(sessionStorage.getItem("admin"));
    currentAdmin
      ? this.setState({ admin: currentAdmin })
      : this.setState({ admin: {} });
  }

  componentDidMount() {
    this.props.getItems();
    this.props.getOrders();
    setTimeout(() => {
      this.setState({
        items: this.props.item.items,
        orders: this.props.order.orders
      });
    }, 200);
  }

  state = {
    admin: {},
    loading: false,
    items: [],
    orders: [],
    deleteItem: {},
    order_modal: false,
    deleteModal: false,
    filter: false,
    rentItemsVisible: true,
    saleItemsVisible: true,
    availableItemsVisible: "",
    soldItemsVisible: ""
  };

  checker = () => {
    if (
      this.props.item.items &&
      this.props.item.items.length &&
      this.props.item.items[0].item_image &&
      this.props.item.items[0].item_image.length &&
      this.props.item.items[0].item_image[0]
    ) {
      return true;
    } else {
      return false;
    }
  };

  // setTimeout(() => {
  //   this.forceUpdate();
  //   //window.stop();
  // }, 150)

  editItem = id => {
    sessionStorage.setItem("item", JSON.stringify(id));

    this.props.history.push(`/admin/edit/${id}`);
  };

  rentOrBuy = purchaseDetails => {
    if ((purchaseDetails.rent = true)) {
      return "Rent";
    } else {
      return "Buy";
    }
  };
  addItem = () => {
    this.props.history.push("/admin/add");
  };

  newAdmin = () => {
    this.props.history.push("/admin/signUp");
  };

  order_modalToggle = () => {
    setTimeout(() => {
      this.setState({ order_modal: !this.state.order_modal });
    }, 50);
  };

  deleteModalToggle = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };

  deleteItem = item => {
    this.setState({ deleteItem: item });
    setTimeout(() => {
      this.deleteModalToggle();
    }, 50);
  };

  sendDeleteRequest = _id => {
    this.props.deleteItem(_id);
    setTimeout(() => {
      this.deleteModalToggle();
    }, 50);
  };

  visibilityCheck = (isSold, rent) => {
    if (rent === true && this.state.rentItemsVisible === true) {
      if (isSold === true) {
        return `User dark bg-dark my-3  text-center ${
          this.state.soldItemsVisible
        }`;
      } else {
        return `User dark bg-dark my-3  text-center ${
          this.state.availableItemsVisible
        }`;
      }
    } else if (rent === true && this.state.rentItemsVisible === false) {
      return "User dark bg-dark my-3  text-center invisibleItem";
    } else if (rent === false && this.state.saleItemsVisible === true) {
      if (isSold === true) {
        return `User dark bg-dark my-3  text-center ${
          this.state.soldItemsVisible
        }`;
      } else {
        return `User dark bg-dark my-3  text-center ${
          this.state.availableItemsVisible
        }`;
      }
    } else if (rent === false && this.state.saleItemsVisible === false) {
      return "User dark bg-dark my-3  text-center invisibleItem";
    }
  };

  filterToggle = () => {
    this.setState({ filter: !this.state.filter });
  };

  availableOnly = () => {
    this.setState({
      availableItemsVisible: "",
      soldItemsVisible: "invisibleItem"
    });
  };

  soldOnly = () => {
    this.setState({
      availableItemsVisible: "invisibleItem",
      soldItemsVisible: ""
    });
  };

  rentOnly = () => {
    this.setState({ saleItemsVisible: false, rentItemsVisible: true });
  };

  saleOnly = () => {
    this.setState({ rentItemsVisible: false, saleItemsVisible: true });
  };

  showAll = () => {
    this.setState({
      saleItemsVisible: true,
      rentItemsVisible: true,
      availableItemsVisible: "",
      soldItemsVisible: ""
    });
  };

  render() {
    return (
      <Container fluid className="allContainer">
        <h2 className="colorME text-center">
          Welcome {this.state.admin ? this.state.admin.admin_firstName : ""}!
        </h2>
        <Container className="mb-5 text-center ">
          <React.Fragment>
            <Row className="adminMenu  justify-content-start">
              <Col xs="3" className="ml-3 mr-2">
                <Button
                  className="adminMenuBtn mt-3"
                  size="lg"
                  outline
                  color="danger"
                  onClick={this.addItem}
                >
                  Add unit{" "}
                </Button>
              </Col>
              <Col xs="3" className="ml-4 mr-2 mt-3">
                <Button
                  className="adminMenuBtn"
                  size="lg"
                  outline
                  color="success"
                  onClick={this.order_modalToggle}
                >
                  Recent Orders{" "}
                </Button>
              </Col>
              <Col xs="3" className="ml-4 mt-3">
                <Button
                  className="adminMenuBtn"
                  size="lg"
                  outline
                  color="light"
                  onClick={this.newAdmin}
                >
                  Add New Admin{" "}
                </Button>
              </Col>
            </Row>

            <Row className="justify-content-start">
              <Col xs="3">
                <ButtonDropdown
                  isOpen={this.state.filter}
                  toggle={this.filterToggle}
                >
                  <Button
                    id="filter"
                    color="secondary"
                    className="my-4"
                    onClick={this.filterToggle}
                  >
                    FILTER FOR:
                  </Button>
                  <DropdownToggle filter color="secondary" className="my-4">
                    <i class="fas fa-caret-down" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.showAll}>
                      All available units
                    </DropdownItem>
                    <DropdownItem onClick={this.rentOnly}>
                      Rent only
                    </DropdownItem>
                    <DropdownItem onClick={this.saleOnly}>
                      Sale Only
                    </DropdownItem>
                    <DropdownItem
                      className="greenME font-weight-bold"
                      onClick={this.availableOnly}
                    >
                      Available Only
                    </DropdownItem>
                    <DropdownItem
                      className="dangerME font-weight-bold"
                      onClick={this.soldOnly}
                    >
                      Sold Only
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>

            <TransitionGroup>
              {this.props.item.loading === false && this.checker() === true ? (
                <Row className="justify-content-start">
                  {this.props.item.items.map(
                    ({
                      _id,
                      item_name,
                      item_description,
                      item_price,
                      item_image,
                      item_purchaseDetails,
                      isSold
                    }) => (
                      <Col
                        md="3"
                        className={this.visibilityCheck(
                          isSold,
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
                          />
                        </div>

                        <div className="mt-1">
                          <p className="text-justify colorME dispText ">
                            {item_description}
                          </p>
                          <Row className="justify-content-left mr-auto ">
                            <Col xl="4" className="priceAndRent">
                              <Button
                                color={isSold === true ? "danger" : "success"}
                                className="mb-3 priceAndRent "
                              >
                                {isSold === true ? "Sold" : "Available"}
                              </Button>
                            </Col>
                            <Col xl="4" className="priceAndRent">
                              <Button
                                color="warning"
                                className="mb-3 priceAndRent "
                              >
                                {item_price}
                              </Button>
                            </Col>
                            <Col xl="2" className="priceAndRent">
                              <Button
                                color="info"
                                className=" mb-3 priceAndRent"
                              >
                                {item_purchaseDetails.rent
                                  ? "Rent"
                                  : item_purchaseDetails.sell
                                  ? "Buy"
                                  : ""}
                              </Button>
                            </Col>
                          </Row>

                          <Button
                            color="light"
                            block
                            className="mr-2 mb-1 seeMore "
                            onClick={this.editItem.bind(this, _id)}
                          >
                            Edit this unit
                          </Button>
                          <Button
                            color="danger"
                            block
                            className="mr-2 mb-3 seeMore "
                            onClick={this.deleteItem.bind(this, {
                              _id: _id,
                              item_name: item_name
                            })}
                          >
                            Delete this unit
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
                  </h5>
                  <div className=" loadbody my-5" />
                </div>
              )}
            </TransitionGroup>
          </React.Fragment>
        </Container>
        <Modal
          isOpen={this.state.order_modal}
          toggle={this.order_modalToggle}
          size="lg"
        >
          <ModalHeader toggle={this.order_modalToggle}>Orders</ModalHeader>
          <ModalBody>
            <TransitionGroup className="shopping-list">
              {this.state.orders &&
              this.state.orders.length &&
              sessionStorage.getItem("orders") !== null ? (
                this.state.orders.map(
                  ({
                    _id,
                    item_name,
                    rentOrSale,
                    item_price,
                    date,
                    user_id
                  }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <Row className="mb-3">
                        <Col xs="2" className="controlOverFlow">
                          <h6 className="font-weight-bold">{item_name}</h6>
                        </Col>
                        <Col xs="2" className="controlOverFlow">
                          <h6>
                            Purchased by user:{" "}
                            <span className="font-weight-bold">{user_id}</span>
                          </h6>
                        </Col>
                        <Col xs="2" className="controlOverFlow">
                          <h6>
                            Ordered on:{" "}
                            <span className="font-weight-bold">{date}</span>
                          </h6>
                        </Col>
                        <Col xs="2" className="controlOverFlow">
                          <h6>
                            For:{" "}
                            <span className="font-weight-bold">
                              UGX {item_price}
                            </span>
                          </h6>
                        </Col>
                        <Col xs="2">
                          <h6>
                            Unit is for:
                            <span className="font-weight-bold">
                              {rentOrSale}
                            </span>
                          </h6>
                        </Col>
                        <Col xs="2" />
                      </Row>
                    </CSSTransition>
                  )
                )
              ) : (
                <p>No orders have been received yet</p>
              )}
            </TransitionGroup>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.deleteModal}
          toggle={this.deleteModalToggle}
          size="lg"
        >
          <ModalHeader toggle={this.deleteModalToggle}>
            Are you sure you want to delete{" "}
            {this.state.deleteItem ? this.state.deleteItem.item_name : ""}?
          </ModalHeader>
          <ModalBody>
            <Row className="justify-content-around">
              <Col xs="5">
                <Button
                  onClick={this.sendDeleteRequest.bind(
                    this,
                    this.state.deleteItem._id
                  )}
                  color="danger"
                  size="block"
                >
                  Delete
                </Button>
              </Col>
              <Col xs="5">
                <Button
                  onClick={this.deleteModalToggle}
                  color="secondary"
                  size="block"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

AdminViewAll.propTypes = {
  getItems: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object,
  user: PropTypes.object,
  order: PropTypes.object
};

const mapStateToProps = state => ({
  item: state.item,
  user: state.user,
  order: state.order
});
export default connect(
  mapStateToProps,
  { getItems, getItem, getOrders, deleteItem }
)(AdminViewAll);
