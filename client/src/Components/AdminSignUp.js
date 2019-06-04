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
import { addAdmin } from "../Actions/adminActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class AdminSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpPassword2: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  telliyas = () => {
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
  };

  onSignUp = e => {
    e.preventDefault();
    console.log("STARTING SIGNUP");
    if (this.state.signUpPassword === this.state.signUpPassword2) {
      const newAdmin = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword2
      };
      console.log("USER YOU =>", newAdmin);
      //Adds an item via the addItem action
      this.props.addAdmin(newAdmin);
    } else {
      alert("Passwords do not match!");
    }
  };
  render() {
    return (
      <React.Fragment>
        <p>
          <h1 class="font-weight-light colorME text-center my-3">
            Administrator Signup
          </h1>
        </p>
        <p class="text-center my-3 ">
          <small class="colorME font-weight-bold">
            *This is a restricted page*
          </small>
        </p>
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
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 User">
              <h3 class="font-weight-bold colorME text-center my-3">Sign-Up</h3>
              <Form className="text-center" onSubmit={this.onSignUp}>
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    name="signUpEmail"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signUpPassword"
                    name="signUpPassword"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signUpPassword2"
                    name="signUpPassword2"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button
                  type="submit"
                  className="mt-5 mb-3 goToAll"
                  color="light"
                  block
                >
                  SignUp
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

AdminSignUp.propTypes = {
  addAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
  //item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
}); //REQUIRED FOR REDUX
export default connect(
  mapStateToProps,
  { addAdmin }
)(AdminSignUp); //REQUIRED FOR REDUX
