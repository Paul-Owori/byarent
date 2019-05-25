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
      </React.Fragment>
    );
  }
}

export default AdminSignIn;
