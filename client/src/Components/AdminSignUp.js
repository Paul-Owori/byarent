import React, { Component } from "react";
import "./css/user.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader
} from "reactstrap";
import { connect } from "react-redux";
import { addAdmin } from "../Actions/adminActions";
import PropTypes from "prop-types";

class AdminSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpPassword2: "",
    warnModalText: "",
    warnModal: false
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  telliyas = () => {
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
  };

  warnModaltoggle = () => {
    this.setState({ warnModal: !this.state.warnModal });
    setTimeout(() => {
      this.setState({ warnModal: !this.state.warnModal });
    }, 1500);
  };

  onSignUp = e => {
    e.preventDefault();

    if (this.state.signUpPassword === this.state.signUpPassword2) {
      if (
        this.state.firstName &&
        this.state.lastName &&
        this.state.signUpEmail &&
        this.state.signUpPassword2
      ) {
        const newAdmin = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.signUpEmail,
          password: this.state.signUpPassword2
        };

        this.props.addAdmin(newAdmin);
        this.setState({
          firstName: "",
          lastName: "",
          signUpEmail: "",
          signUpPassword: "",
          signUpPassword2: ""
        });
        this.setState({
          warnModalText: `Success! You can now try logging in`
        });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 100);
      } else {
        this.setState({
          warnModalText: "Make sure to fill in all fields before you submit!"
        });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 100);
      }
    } else {
      this.setState({ warnModalText: "Passwords do not match!" });
      setTimeout(() => {
        this.warnModaltoggle();
      }, 100);
    }
  };
  render() {
    return (
      <Container fluid className="adminSignUpContainer">
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
                    value={this.state.firstName}
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
                    value={this.state.lastName}
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
                    value={this.state.signUpEmail}
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
                    value={this.state.signUpPassword}
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
                    value={this.state.signUpPassword2}
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
        <Modal isOpen={this.state.warnModal} toggle={this.warnModaltoggle}>
          <ModalHeader toggle={this.warnModaltoggle}>
            {this.state.warnModalText}
          </ModalHeader>
        </Modal>
      </Container>
    );
  }
}

AdminSignUp.propTypes = {
  addAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { addAdmin }
)(AdminSignUp);
