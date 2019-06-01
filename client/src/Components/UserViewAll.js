import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./css/view_all.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
//import { signInUser, addUser } from "../Actions/userActions"; //REQUIRED FOR REDUX
import { getItems } from "../Actions/itemActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class UserViewAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: null
    };
  }

  componentDidMount() {
    // this.setState({ loading: this.props.items.loading });
    this.props.getItems();
  }

  telliyas = () => {
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
    console.log("Items?", this.props.item.items);
    // console.log(
    //   "Attempt at image construction=>",
    //   "http://localhost:5000/" + this.props.item.items[0].item_image[0]
    // );
    // let freaky = this.props.item.items.forEach(item =>
    //   console.log("ITEM=>", item)
    // );
    // console.log(freaky);
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

  rentOrBuy = purchaseDetails => {
    if ((purchaseDetails.rent = true)) {
      return "Rent";
    } else {
      return "Buy";
    }
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
        <h2 className="colorME text-center">Welcome!</h2>
        <Container className="mb-5">
          <React.Fragment>
            <TransitionGroup>
              {this.checker() ? (
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
                </Row>
              ) : (
                <div className="text-center">
                  <h5 className="greyME font-weight-bold">
                    Try refreshing this page if it does not refresh
                    automaticaly...{" "}
                    {this.checker && !window.location.hash
                      ? setTimeout(() => {
                          window.location = window.location + "#loaded";
                          window.location.reload();
                          //window.stop();
                        }, 2000)
                      : console.log("ERROR")}
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

UserViewAll.propTypes = {
  getItems: PropTypes.func.isRequired
  //item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});
export default connect(
  mapStateToProps,
  { getItems }
)(UserViewAll);

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
