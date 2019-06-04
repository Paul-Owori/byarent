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

import { connect } from "react-redux"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

import "./css/navbar.css";

class AppNavbar extends Component {
  state = {
    user: JSON.parse(sessionStorage.getItem("user")),
    admin: JSON.parse(sessionStorage.getItem("admin")),
    //admin: this.props.admin.admin,
    cart: JSON.parse(sessionStorage.getItem("cart")),
    loggedIn: sessionStorage.getItem("user") === null ? false : true,
    isOpen: false,
    modal: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  modalToggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  logOut = () => {
    //this.setState({ loggedIn: false });
    // console.log("Redux state=>", this.props);
    // console.log("Local Storage=>", this.state);
    // console.log(
    //   "Session storage user =>",
    //   JSON.parse(sessionStorage.getItem("user"))
    // );
    // console.log("HISTORY from props", this.props.history);
    // console.log("Just props", this.props);

    const user = sessionStorage.getItem("user");
    const admin = sessionStorage.getItem("admin");
    const cart = sessionStorage.getItem("cart");

    user
      ? sessionStorage.removeItem("user")
      : admin
      ? sessionStorage.removeItem("admin")
      : window.location.reload();

    if (cart) {
      sessionStorage.removeItem("cart");
    }

    window.location.reload();

    //this.props.history.push("/");
    // this.props.history.push("/");
  };

  signIn = () => {
    this.setState({});
  };

  //userCheck = () => {
  // JSON.parse(sessionStorage.getItem("user")) ? true : false;
  // if (JSON.parse(sessionStorage.getItem("user"))) {
  //   return true;
  // } else if (this.props.user.user) {
  //   return true;
  // } else {
  //   return false;
  // }
  //};

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
                  <RouterNavLink to="/user/all" className="greyME2">
                    Houses
                  </RouterNavLink>
                </NavLink>
              </NavItem>
              {(sessionStorage.getItem("user") === null ? (
                false
              ) : (
                true || this.state.loggedIn === true
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
                {this.state.user ? (
                  ""
                ) : this.state.admin ? (
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
                  <NavLink className="greyME2">
                    <i
                      className="fas fa-shopping-cart"
                      onClick={this.modalToggle}
                    />
                    {this.state.cart ? this.state.cart.length : ""}
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink>
                  <RouterNavLink
                    to="https://github.com/Paul-Owori"
                    className="greyME2"
                  >
                    GitHub
                  </RouterNavLink>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>
            {this.state.user ? this.state.user.user_firstName + "'s " : ""}
            Shopping Cart
          </ModalHeader>
          <ModalBody>
            <TransitionGroup className="shopping-list">
              {this.state.cart ? (
                this.state.cart.map(
                  ({ _id, item_name, item_purchaseDetails, item_price }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <Row>
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
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  user: PropTypes.object.isRequired
  //item: PropTypes.object.isRequired
};

//export default AppNavbar;

const mapStateToProps = state => ({
  user: state.user
  //admin: state.admin
}); //REQUIRED FOR REDUX
export default connect(mapStateToProps)(AppNavbar);
