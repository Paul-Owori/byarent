import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";
import "./css/landingPage.css";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Container className="my-5">
        <Jumbotron className="text-center my-3">
          <h1 class="display-1 font-weight-bold">ByaRent!</h1>
          <p class="lead">
            You are a few steps away from Buying / Renting your dream home!
          </p>
          <hr class="my-4" />
          <p>Select one of the options below to get started.</p>
          <a
            id="viewUnits"
            class="btn btn-outline-light btn-lg mr-2"
            href="#"
            role="button"
          >
            View available units
          </a>
          <a
            id="userSignUp"
            class="btn btn-outline-light btn-lg ml-2"
            href="#"
            role="button"
          >
            SignUp / SignIn
          </a>
        </Jumbotron>
      </Container>
    );
  }
}

export default LandingPage;
