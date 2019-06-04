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
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { signInUser, addUser } from "../Actions/userActions"; //REQUIRED FOR REDUX
import PropTypes from "prop-types";

class UserSignUp extends Component {
  // componentDidMount() {
  //   this.props.addUser(); //REQUIRED FOR REDUX
  //   this.props.signInUser(); //REQUIRED FOR REDUX
  // }
  state = {
    loading: false,
    firstName: "",
    lastName: "",
    signUpEmail: "",
    signUpPassword1: "",
    signUpPassword2: "",
    signInEmail: "",
    signInPassword: "",
    user: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  telliyas = () => {
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
  };

  // user.user_firstName = req.body.firstName;
  // user.user_lastName = req.body.lastName;
  // user.user_email = req.body.email;
  // user.setPassword(req.body.password);

  onSignUp = e => {
    e.preventDefault();
    console.log("STARTING SIGNUP");
    if (this.state.signUpPassword1 === this.state.signUpPassword2) {
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword2
      };
      console.log("USER YOU =>", newUser);
      //Adds an item via the addItem action
      this.props.addUser(newUser);
    } else {
      alert("Passwords do not match!");
    }
  };

  onSignIn = e => {
    e.preventDefault();
    console.log("STARTING SIGNIN");
    const signInUser = {
      email: this.state.signInEmail,
      password: this.state.signInPassword
    };
    //Adds an item via the addUser action
    this.props.signInUser(signInUser);
    console.log("USER YOU =>", signInUser);
    //TEST!!
    this.props.history.push("/user/all");
    //Then close the moddle
    //this.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <p>
          <h1 className="font-weight-light colorME text-center my-5">
            Welcome!
          </h1>
          <Button
            type="button"
            className="mt-5 mb-3 "
            color="light"
            block
            onClick={this.telliyas}
          >
            WHATCHUGAT NIGGA
          </Button>
        </p>
        <Container className="text-center">
          <Row className="justify-content-center ">
            <Col md="4" className="px-lg-5 User">
              <h3 className="font-weight-bold colorME text-center my-3">
                Sign-In
              </h3>
              <Form className="text-center" onSubmit={this.onSignIn}>
                <FormGroup>
                  <Input
                    type="email"
                    className="form-control"
                    id="signInEmail"
                    name="signInEmail"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    id="signInPassword"
                    name="signInPassword"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button color="light" block type="submit" className="mt-5 mb-3">
                  SignIn
                </Button>
              </Form>
              <p className="colorME">OR</p>
              <Button color="primary " block className="mt-3 mb-3">
                Continue with Facebook
              </Button>
              <Button color="danger" block className="mt-3 mb-3">
                Continue with Google
              </Button>
            </Col>
            <Col md="2">
              <h3 className="font-weight-bold colorME text-center my-3">OR</h3>
            </Col>
            <Col md="4" className="px-lg-5 User">
              <h3 className="font-weight-bold colorME text-center my-3">
                Sign-Up
              </h3>
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
                    id="signUpPassword1"
                    name="signUpPassword1"
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
                  className="mt-5 mb-3 "
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

//export default UserSignUp;
UserSignUp.propTypes = {
  addUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
  //item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
}); //REQUIRED FOR REDUX
export default connect(
  mapStateToProps,
  { addUser, signInUser }
)(UserSignUp); //REQUIRED FOR REDUX

// const mapStateToProps = state => ({
//   item: state.item
// }); //REQUIRED FOR REDUX
// export default connect(
//   mapStateToProps,
//   { addUser }
// )(ItemModal); //REQUIRED FOR REDUX
