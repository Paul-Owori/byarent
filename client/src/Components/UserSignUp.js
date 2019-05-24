import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import "./css/user.css";

class UserSignUp extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <p>
          <h1 class="font-weight-light colorME text-center my-5">Welcome!</h1>
        </p>
        <Container className="text-center">
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 User">
              <h3 className="font-weight-bold colorME text-center my-3">
                Sign-In
              </h3>
              <Form className="text-center">
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="signInEmail"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signInPassword"
                    placeholder="Password"
                  />
                </FormGroup>
                <Button color="light" block type="submit" className="mt-5 mb-3">
                  SignIn
                </Button>
              </Form>
              <p class="colorME">OR</p>
              <Button color="primary " block className="mt-3 mb-3">
                Continue with Facebook
              </Button>
              <Button color="danger" block classNAme="mt-3 mb-3">
                Continue with Google
              </Button>
            </Col>
            <Col md="2">
              <h3 class="font-weight-bold colorME text-center my-3">OR</h3>
            </Col>
            <Col md="4" className="px-lg-5 User">
              <h3 className="font-weight-bold colorME text-center my-3">
                Sign-Up
              </h3>
              <Form className="text-center">
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signUpPassword"
                    placeholder="Password"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signUpPassword2"
                    placeholder="Confirm Password"
                  />
                </FormGroup>
                <Button
                  type="submit"
                  className="btn btn-light btn-block mt-5 mb-3 goToAll"
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

export default UserSignUp;
