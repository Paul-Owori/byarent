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

class AdminSignUp extends Component {
  state = {};
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
        <Container>
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 User">
              <h3 class="font-weight-bold colorME text-center my-3">Sign-Up</h3>
              <Form className="text-center">
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="adminFirstName"
                    placeholder="First Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="name"
                    className="form-control"
                    id="adminLastName"
                    placeholder="Last Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="adminSignUpEmail"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="adminSignUpPassword"
                    placeholder="Password"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="adminSignUpPassword2"
                    placeholder="Confirm Password"
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

export default AdminSignUp;
