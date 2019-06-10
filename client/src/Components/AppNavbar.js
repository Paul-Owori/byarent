import React, { Component } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { userLogout } from "../Actions/userActions"; //REQUIRED FOR REDUX
import { adminLogout } from "../Actions/adminActions"; //REQUIRED FOR REDUX
import {
  addOrders,
  deletePreOrder,
  getOrdersUser
} from "../Actions/orderActions"; //REQUIRED FOR REDUX
import { buyItem } from "../Actions/itemActions"; //REQUIRED FOR REDUX
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";
import "./css/navbar.css";

class AppNavbar extends Component {
  state = {
    user: [],
    admin: [],
    orders: [],
    pre_orders: [],
    cart: [],
    cartColor: "",
    fav_color: "",
    loggedIn: "",
    isOpen: false,
    modal: false,
    fav_modal: false
  };
  componentDidMount() {
    let currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (currentUser && currentUser._id) {
      this.props.getOrdersUser(currentUser._id);
    }

    this.setState({
      user: sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : "",
      admin: sessionStorage.getItem("admin")
        ? JSON.parse(sessionStorage.getItem("admin"))
        : "",
      cart: sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [],
      pre_orders:
        this.props.pre_orders && this.props.pre_orders.length
          ? this.props.pre_orders
          : JSON.parse(sessionStorage.getItem("cart")),
      loggedIn: sessionStorage.getItem("user") === null ? false : true,
      orders: sessionStorage.getItem("orders")
        ? JSON.parse(sessionStorage.getItem("orders"))
        : [],
      cartColor:
        (this.props.pre_orders && this.props.pre_orders.length) ||
        (JSON.parse(sessionStorage.getItem("cart")) &&
          JSON.parse(sessionStorage.getItem("cart")).length)
          ? "fas fa-shopping-cart cart fa-lg"
          : "fas fa-shopping-cart fa-lg",
      fav_color:
        (this.props.orders && this.props.orders.length) ||
        (JSON.parse(sessionStorage.getItem("orders")) &&
          JSON.parse(sessionStorage.getItem("orders")).length)
          ? "fas fa-heart redME fa-lg"
          : "fas fa-heart fa-lg"
    });
  }

  componentWillReceiveProps() {
    this.setState({
      user: sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : "",
      admin: sessionStorage.getItem("admin")
        ? JSON.parse(sessionStorage.getItem("admin"))
        : "",
      cart: sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [],
      pre_orders:
        this.props.pre_orders && this.props.pre_orders.length
          ? this.props.pre_orders
          : JSON.parse(sessionStorage.getItem("cart")),
      loggedIn: sessionStorage.getItem("user") === null ? false : true,
      orders:
        this.props.order.orders && this.props.order.orders.length
          ? this.props.order.orders
          : sessionStorage.getItem("orders")
          ? JSON.parse(sessionStorage.getItem("orders"))
          : [],
      cartColor:
        (this.props.pre_orders && this.props.pre_orders.length) ||
        sessionStorage.getItem("cart")
          ? "fas fa-shopping-cart cart"
          : "fas fa-shopping-cart"
    });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  modalToggle = () => {
    setTimeout(() => {
      this.setState({ modal: !this.state.modal });
    }, 50);
  };

  fav_modalToggle = () => {
    setTimeout(() => {
      this.setState({ fav_modal: !this.state.fav_modal });
    }, 50);
  };

  logOut = () => {
    this.props.userLogout();
    this.props.adminLogout();

    const user = sessionStorage.getItem("user");
    const admin = sessionStorage.getItem("admin");
    const cart = sessionStorage.getItem("cart");
    const orders = sessionStorage.getItem("orders");

    setTimeout(() => {
      if (user) {
        sessionStorage.removeItem("user");
      }
      if (admin) {
        sessionStorage.removeItem("user");
      }
      if (cart) {
        sessionStorage.removeItem("cart");
      }
      if (orders) {
        sessionStorage.removeItem("orders");
      }
    }, 50);

    this.setState({ user: "", admin: "" });
  };

  signIn = () => {
    this.setState({});
  };

  updateComponent = () => {
    console.log("This just doesnt work");
    this.forceUpdate();
  };

  deleteCartItem = _id => {
    this.props.deletePreOrder(_id);
    this.forceUpdate();
  };

  housesNav = () => {
    sessionStorage.getItem("admin") !== null
      ? this.props.history.push("/admin/all")
      : this.props.history.push("/user/all");
  };

  orderCheckout = orders => {
    let orderArray = [];
    let userID = JSON.parse(sessionStorage.getItem("user"))._id;
    setTimeout(() => {
      orders.forEach(order => {
        this.props.buyItem(order, order._id);
        orderArray.push({
          name: order.item_name,
          rentOrSale:
            order.item_purchaseDetails.rent === true ? "rent" : "sale",
          price: order.item_price,
          item_id: order._id,
          user_id: userID,
          date: new Date().toString()
        });
      });
    }, 150);

    setTimeout(() => {
      this.props.addOrders(orderArray);
    }, 300);
    console.log("ORDERS RECEIVED ==>>", orderArray);

    setTimeout(() => {
      orders.forEach(order => {
        this.deleteCartItem(order._id);
      });
      this.setState({ orders: this.props.order.orders });
    }, 380);
  };

  toGithub = () => {
    window.open("https://github.com/Paul-Owori/byarent", "_self");
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
          <NavbarBrand>
            <Link to="/" className="greyME2">
              ByaRent!
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <RouterNavLink
                    to={
                      sessionStorage.getItem("admin") !== null
                        ? "/admin/all"
                        : "/user/all"
                    }
                    className="greyME2"
                  >
                    Houses
                  </RouterNavLink>
                </NavLink>
              </NavItem>
              {(sessionStorage.getItem("user") === null &&
              sessionStorage.getItem("admin") === null ? (
                false
              ) : (
                true
              )) ? (
                <NavItem>
                  <NavLink>
                    <RouterNavLink
                      to="/"
                      className="greyME2"
                      onClick={this.logOut}
                    >
                      Logout
                    </RouterNavLink>
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink>
                    <RouterNavLink to="/user" className="greyME2">
                      Signin / Signup
                    </RouterNavLink>
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink>
                  <RouterNavLink to="/about" className="greyME2">
                    About
                  </RouterNavLink>
                </NavLink>
              </NavItem>
              <NavItem>
                {this.state.user || this.state.admin ? (
                  ""
                ) : (
                  <NavLink>
                    <RouterNavLink to="/admin" className="greyME2">
                      Admin
                    </RouterNavLink>
                  </NavLink>
                )}
              </NavItem>
              {sessionStorage.getItem("user") === null ? (
                ""
              ) : (
                <NavItem>
                  <NavLink>
                    <i
                      className={this.state.cartColor}
                      onClick={this.modalToggle}
                    />
                    <small>
                      {this.state.pre_orders
                        ? this.state.pre_orders.length
                        : sessionStorage.getItem("cart")
                        ? JSON.parse(sessionStorage.getItem("cart")).length
                        : 0}
                    </small>
                  </NavLink>
                </NavItem>
              )}
              {sessionStorage.getItem("user") === null ? (
                ""
              ) : (
                <NavItem>
                  <NavLink>
                    <i
                      className={this.state.fav_color}
                      onClick={this.fav_modalToggle}
                    />
                    <small>{this.state.orders.length}</small>
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink>
                  <RouterNavLink className="greyME2" onClick={this.toGithub}>
                    GitHub-Repo
                  </RouterNavLink>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="lg">
          <ModalHeader toggle={this.modalToggle}>
            {this.state.user ? this.state.user.user_firstName + "'s " : ""}
            Shopping Cart
          </ModalHeader>
          <ModalBody>
            <TransitionGroup>
              {this.state.cart &&
              this.state.cart.length &&
              sessionStorage.getItem("cart") !== null ? (
                this.state.cart.map(
                  ({ _id, item_name, item_purchaseDetails, item_price }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <Row className="mb-3">
                        <Col xs="3">
                          <h5>{item_name}</h5>
                        </Col>
                        <Col xs="2">
                          <h6>{item_purchaseDetails.address}</h6>
                        </Col>
                        <Col xs="2">
                          <h6>UGX {item_price}</h6>
                        </Col>
                        <Col xs="2">
                          <h6 className="font-weight-bold">
                            {item_purchaseDetails.rent === true
                              ? "Rent"
                              : "For Sale"}
                          </h6>
                        </Col>
                        <Col xs="2">
                          <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.deleteCartItem.bind(this, _id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </CSSTransition>
                  )
                )
              ) : (
                <p>You haven't added anything to your cart yet</p>
              )}
            </TransitionGroup>
            <Button
              onClick={
                sessionStorage.getItem("cart")
                  ? this.orderCheckout.bind(
                      this,
                      JSON.parse(sessionStorage.getItem("cart"))
                    )
                  : console.log("Error")
              }
              className="checkout"
              color="dark"
              size="block"
            >
              Check out cart
            </Button>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.fav_modal}
          toggle={this.fav_modalToggle}
          size="lg"
        >
          <ModalHeader toggle={this.fav_modalToggle}>
            {this.state.user ? this.state.user.user_firstName + "'s " : ""}
            Favourites
          </ModalHeader>
          <ModalBody>
            <TransitionGroup className="shopping-list">
              {this.state.orders && this.state.orders.length ? (
                this.state.orders.map(
                  ({ _id, item_name, rentOrSale, item_price, date }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <Row className="mb-3">
                        <Col xs="3">
                          <h5>{item_name}</h5>
                        </Col>
                        <Col xs="3">
                          <h6>Ordered on {date}</h6>
                        </Col>
                        <Col xs="2">
                          <h6>UGX {item_price}</h6>
                        </Col>
                        <Col xs="2">
                          <h6 className="font-weight-bold">{rentOrSale}</h6>
                        </Col>
                        <Col xs="2" />
                      </Row>
                    </CSSTransition>
                  )
                )
              ) : (
                <p>You haven't made any orders yet</p>
              )}
            </TransitionGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  userLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  deletePreOrder: PropTypes.func.isRequired,
  addOrders: PropTypes.func.isRequired,
  pre_orders: PropTypes.object.isRequired,
  getOrdersUser: PropTypes.func.isRequired,
  buyItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin,
  order: state.order,
  item: state.item
});
export default connect(
  mapStateToProps,
  { userLogout, adminLogout, addOrders, deletePreOrder, getOrdersUser, buyItem }
)(AppNavbar);
