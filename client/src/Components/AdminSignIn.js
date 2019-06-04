import React, { Component } from "react";
import "./css/user.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { signInAdmin } from "../Actions/adminActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class AdminSignIn extends Component {
  state = {
    adminSignInPassword: "",
    adminSignInEmail: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("STARTING SIGNIN");
    const signInAdmin = {
      email: this.state.adminSignInEmail,
      password: this.state.adminSignInPassword
    };
    //Adds an item via the addAdmin action
    this.props.signInAdmin(signInAdmin);
    console.log("ADMIN YOU =>", signInAdmin);
    this.props.history.push("/admin/all");
  };

  telliyas = () => {
    //this.stateSetter();
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
    // console.log("Items?", this.props.item.items);
    console.log(
      "CURRENT ITEM IN SESSION STORAGE=>",
      JSON.parse(sessionStorage.getItem("item"))
    );
    console.log(
      "CURRENT USER IN SESSION STORAGE=>",
      JSON.parse(sessionStorage.getItem("user"))
    );

    console.log(
      "CURRENT ADMIN IN SESSION STORAGE=>",
      JSON.parse(sessionStorage.getItem("admin"))
    );
    console.log("Just props", this.props);

    console.log("HISTORY from props", this.props.history);
  };

  render() {
    return (
      <div className="main">
        <React.Fragment>
          <p>
            <h1 className="font-weight-light colorME text-center my-5">
              Are you an Administrator?
            </h1>
          </p>

          <Button
            type="button"
            className="mt-5 mb-3 "
            color="light"
            block
            onClick={this.telliyas}
          >
            LOG
          </Button>

          <Container className="text-center">
            <Row className="justify-content-center ">
              <Col md="4" className="px-lg-5 User">
                <h3 class="font-weight-bold colorME text-center my-3">
                  Sign-In
                </h3>
                <Form className="text-center" onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Input
                      type="email"
                      className="form-control"
                      id="adminSignInEmail"
                      name="adminSignInEmail"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      className="form-control"
                      id="adminSignInPassword"
                      name="adminSignInPassword"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button
                    id="adminSignIn"
                    type="submit"
                    block
                    color="light"
                    className="mt-5 mb-3 "
                  >
                    SignIn
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

//export default AdminSignIn;

AdminSignIn.propTypes = {
  signInAdmin: PropTypes.func.isRequired,
  admins: PropTypes.array,
  admin: PropTypes.object
  //item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
}); //REQUIRED FOR REDUX
export default connect(
  mapStateToProps,
  { signInAdmin }
)(AdminSignIn); //REQUIRED FOR REDUX
