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

class AdminSignIn extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <p>
          <h1 class="font-weight-light colorME text-center my-5">
            Are you an Administrator?
          </h1>
        </p>
        <Container className="text-center">
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 User">
              <h3 class="font-weight-bold colorME text-center my-3">Sign-In</h3>
              <Form className="text-center">
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="adminSignInEmail"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="adminSignInPassword"
                    placeholder="Password"
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
    );
  }
}

export default AdminSignIn;
