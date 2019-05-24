import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import "./css/user.css";

class UserSignUp extends Component {
  state = {};
  render() {
    return (
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col className="md-4 px-lg-5 User">
            <h3 className="font-weight-bold colorME text-center my-3">
              {" "}
              Sign-In
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
    );
  }
}

export default UserSignUp;
