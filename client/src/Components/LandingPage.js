import React, { Component } from "react";
import { Jumbotron, Container, Button } from "reactstrap";
import "./css/landingPage.css";

class LandingPage extends Component {
  state = {};

  redirectToSignUp = () => {
    this.props.history.push("/user");
  };
  redirectToViewAll = () => {
    this.props.history.push("/user/all");
  };
  render() {
    return (
      <Container className="my-5">
        <Jumbotron className="text-center my-3">
          <h1 className="display-1 font-weight-bold">ByaRent!</h1>
          <p className="lead">
            You are a few steps away from Buying / Renting your dream home!
          </p>
          <hr className="my-4" />
          <p>Select one of the options below to get started.</p>
          <Button
            id="viewUnits"
            className="mr-2"
            onClick={this.redirectToViewAll}
            outline
            size="lg"
            color="light"
            role="button"
          >
            View available units
          </Button>
          <Button
            id="userSignUp"
            classNAme="ml-2"
            onClick={this.redirectToSignUp}
            outline
            size="lg"
            color="light"
            role="button"
          >
            SignUp / SignIn
          </Button>
        </Jumbotron>
      </Container>
    );
  }
}

export default LandingPage;
