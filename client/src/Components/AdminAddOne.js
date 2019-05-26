import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, Button, Row, Col, Form } from "reactstrap";
import "./css/view_one.css";

class AdminAddOne extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h3 class="greyME text-center">Click any field to edit it</h3>
        <Container>
          <div class="text-justify">
            <Button color="secondary" size="lg" className="mb-1 mt-3">
              Go Back
            </Button>
            <Row className="justify-content-around">
              <Col xs="3" className="User  my-3 colorME imgScroller border" />
              <Col xs="8" className="User mt-3 colorME border">
                <div className="mainImgBody">
                  <div className="mainImgBody text-center" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default AdminAddOne;
