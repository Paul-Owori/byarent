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
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { signInAdmin } from "../Actions/adminActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class AdminSignIn extends Component {
  state = {
    adminSignInPassword: "",
    adminSignInEmail: "",
    warnModalText: "",
    warnModal: false
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const signInAdmin = {
      email: this.state.adminSignInEmail,
      password: this.state.adminSignInPassword
    };

    this.props.signInAdmin(signInAdmin);
    setTimeout(() => {
      if (this.props.admin.admin && this.props.admin.admin.admin_firstName) {
        this.props.history.push("/admin/all");
      } else {
        this.setState({ warnModalText: "Login Error! Please try again" });
        setTimeout(() => {
          this.warnModaltoggle();
        }, 100);
      }
    }, 200);
  };

  warnModaltoggle = () => {
    this.setState({ warnModal: !this.state.warnModal });
    setTimeout(() => {
      this.setState({ warnModal: !this.state.warnModal });
    }, 1500);
  };

  render() {
    return (
      <Container fluid className="adminSignUpContainer">
        <p>
          <h1 className="font-weight-light colorME text-center mt-5">
            Are you an Administrator?
          </h1>
        </p>

        <Container className="text-center">
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 User">
              <h3 class="font-weight-bold colorME text-center my-3">Sign-In</h3>
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
        <Modal isOpen={this.state.warnModal} toggle={this.warnModaltoggle}>
          <ModalHeader toggle={this.warnModaltoggle}>
            {this.state.warnModalText}
          </ModalHeader>
        </Modal>
      </Container>
    );
  }
}

AdminSignIn.propTypes = {
  signInAdmin: PropTypes.func.isRequired,
  admins: PropTypes.array,
  admin: PropTypes.object
};

const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { signInAdmin }
)(AdminSignIn);
