import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./css/view_all.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
//import { signInUser, addUser } from "../Actions/userActions"; //REQUIRED FOR REDUX
import { getItems, getItem } from "../Actions/itemActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class AdminViewAll extends Component {
  componentWillMount() {
    const currentAdmin = JSON.parse(sessionStorage.getItem("admin"));
    currentAdmin
      ? this.setState({ admin: currentAdmin })
      : this.setState({ admin: {} });
    //setTimeout(() => {
    //   if (this.props.user.user) {
    //     this.setState({ user: this.props.user.user });
    //     //sessionStorage.setItem("user", JSON.stringify(this.props.user.user));
    //   } else if (currentUser) {
    //     this.setState({ user: currentUser });
    //   }
    //  }, 100);
  }

  componentDidMount() {
    // this.setState({ loading: this.props.items.loading });
    this.props.getItems();
  }

  state = {
    admin: {},
    loading: false,
    items: null
  };

  telliyas = () => {
    //this.stateSetter();
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
    console.log("Items?", this.props.item.items);
    console.log(
      "CURRENT ITEM IS SESSION STORAGE=>",
      JSON.parse(sessionStorage.getItem("item"))
    );
    console.log(
      "CURRENT ADMIN IS SESSION STORAGE=>",
      JSON.parse(sessionStorage.getItem("admin"))
    );
    console.log("Just props", this.props);

    console.log("HISTORY from props", this.props.history);
    //console.log("CURRENT CART=>", JSON.parse(sessionStorage.getItem("cart")));

    // let oldCart = [...this.props.item.items];
    // let newCart = oldCart.filter(item => {
    //   return item.item_image.length > 5;
    // });
    // console.log("old cart=>", oldCart);
    // console.log("new cart=>", newCart);
    // sessionStorage.setItem("cart", JSON.stringify(newCart));
    // //console.log("WINDOW=>", window.document);
    // console.log(
    //   "Attempt at image construction=>",
    //   "http://localhost:5000/" + this.props.item.items[0].item_image[0]
    // );
    // let freaky = this.props.item.items.forEach(item =>
    //   console.log("ITEM=>", item)
    // );
    // console.log(freaky);
  };

  // stateSetter = () => {
  //   const currentUser = sessionStorage.getItem("user");
  //   if (this.props.user.user) {
  //     this.setState({ user: this.props.user.user });
  //   } else if (currentUser) {
  //     this.setState({ user: JSON.parse(currentUser) });
  //   }
  // };

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

  editItem = id => {
    //this.props.editItem(id);
    //console.log(id);
    sessionStorage.setItem("item", JSON.stringify(id));
    //admin/edit/
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
  render() {
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
            <TransitionGroup>
              {this.checker() ? (
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
                        className="User dark bg-dark my-3  text-center "
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
                          <Row className="justify-content-around">
                            <Col xl="3">
                              <Button
                                color={isSold === true ? "warning" : "success"}
                                className="mb-3 priceAndRent2 "
                              >
                                {isSold === true ? "Sold" : "Available"}
                              </Button>
                            </Col>
                            <Col xl="3">
                              <Button
                                color="warning"
                                className="mb-3 priceAndRent2 "
                              >
                                {item_price}
                              </Button>
                            </Col>
                            <Col xl="3">
                              <Button
                                color="info"
                                className=" mb-3 priceAndRent2"
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
                            className="mr-2 mb-3 seeMore "
                            onClick={this.editItem.bind(this, _id)}
                          >
                            Edit this unit
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
                    {this.checker()
                      ? setTimeout(() => {
                          this.forceUpdate();
                          //window.stop();
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
      </React.Fragment>
    );
  }
}

AdminViewAll.propTypes = {
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
)(AdminViewAll);

/*

<div className="dispImgBody">
                      <img src={`http://localhost:5000/` + item_image[0]} className="dispImg" alt="" />
                    </div>



<Col md="3" className="User dark bg-dark my-3 ">
              <div className="mt-2">
                <h5 className="colorME font-weight-bold">item.name</h5>
              </div>

              <div className="dispImgBody">
                <img src="" className="dispImg" alt="" />
              </div>

              <div className="mt-1">
                <p className="text-justify colorME dispText ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate tenetur, eos id rem repudiandae, culpa quam nemo
                  vero esse doloremque tempore voluptatibus quas? Numquam non
                  laudantium nobis cum quas eius. Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Cupiditate tenetur, eos id rem
                  repudiandae, culpa quam nemo vero esse doloremque tempore
                  voluptatibus quas? Numquam non laudantium nobis cum quas eius.
                </p>
                <Button color="warning" className="mb-3 priceAndRent ">
                  $500
                </Button>
                <Button color="info" className="mb-3 priceAndRent">
                  Rent
                </Button>
                <Button color="light" block className="mb-3 seeMore ">
                  See More
                </Button>
              </div>
            </Col>





            const { items } = this.props.item.items;
    return (
      <React.Fragment>
        <h3 className="greyME text-center">Welcome!</h3>
        <Button
          type="button"
          className="mt-5 mb-3 "
          color="light"
          block
          onClick={this.telliyas}
        >
          WHATCHUGAT NIGGA
        </Button>
        <Container>
          <Row>
            <TransitionGroup>
              {items.map(
                ({
                  _id,
                  item_name,
                  item_description,
                  item_price,
                  item_image,
                  item_purchaseDetails
                }) => (
                  <Col md="3" className="User dark bg-dark my-3 ">
                    <div className="mt-2">
                      <h5 className="colorME font-weight-bold">{item_name}</h5>
                    </div>

                    <div className="dispImgBody">
                      <img src="" className="dispImg" alt="" />
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
                      <Button color="info" className="mb-3 priceAndRent">
                        {this.rentOrBuy(item_purchaseDetails)}
                      </Button>
                      <Button color="light" block className="mb-3 seeMore ">
                        See More
                      </Button>
                    </div>
                  </Col>
                )
              )}
            </TransitionGroup>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}



<Container>
          <Row>
            <TransitionGroup>
                  <Col md="3" className="User dark bg-dark my-3 ">
                    <div className="mt-2">
                      <h5 className="colorME font-weight-bold">{item_name}</h5>
                    </div>

                    <div className="dispImgBody">
                      <img src="" className="dispImg" alt="" />
                    </div>
                    </div>
                  </Col>
                )
              )}
            </TransitionGroup>
          </Row>
          </Container>

*/