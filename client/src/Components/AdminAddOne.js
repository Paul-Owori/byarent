import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import "./css/view_one.css";

class AdminAddOne extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h3 class="greyME text-center">Click any field to edit it</h3>
        <Container className="my-3">
          <div class="text-justify">
            <Button color="secondary" size="lg" className="mb-1 mt-3">
              Go Back
            </Button>
            <Row className="justify-content-around">
              <Col xs="3" className="User  my-3 colorME imgScroller ">
                <h4 className="greyME text-center my-2">Uploaded Images:</h4>
              </Col>
              <Col xs="8" className="User my-3 colorME text-center">
                <Form>
                  <div className="mainImgBody text-center ">
                    <Input
                      type="image"
                      id="input-image-now"
                      className="mainImg"
                    />
                  </div>
                  <div className="text-center my-0 ">
                    <Input
                      type="text"
                      id="inputTitle"
                      placeholder="Input Title"
                      className="roundEdges mt-1 titleBox colorME border"
                    />
                  </div>

                  <Input
                    type="textarea"
                    id="inputDescription"
                    placeholder="Input description here."
                    rows="6"
                    className=" roundEdges dispText my-2 descriptionBox colorME"
                  />
                  <Row className="justify-content-around  my-2">
                    <Col xs="7" className="greyME text-justify ">
                      <h6 class="font-weight-bold">Purchase details:</h6>

                      <FormGroup row className="my-0">
                        <Label
                          className=" categoryLabel greyME"
                          for="inputAddress"
                          sm={2}
                        >
                          Address:
                        </Label>
                        <Col sm={9} className="ml-auto">
                          <Input
                            type="text"
                            id="inputAddress"
                            placeholder="Input address here"
                            className="ml-auto my-0 categoryBox colorME"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="my-0">
                        <Label
                          className=" categoryLabel greyME"
                          for="inputBedrooms"
                          sm={2}
                        >
                          Bedrooms:
                        </Label>
                        <Col sm={9} className="ml-auto">
                          <Input
                            type="Number"
                            id="inputBedrooms"
                            placeholder="0"
                            className="ml-auto my-0 categoryBox colorME"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="my-0">
                        <Label
                          className=" categoryLabel greyME"
                          for="inputBathrooms"
                          sm={2}
                        >
                          Bathrooms:
                        </Label>
                        <Col sm={9} className="ml-auto">
                          <Input
                            type="Number"
                            id="inputBathrooms"
                            placeholder="0"
                            className="ml-auto my-0 categoryBox colorME"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="my-0">
                        <Label
                          className=" categoryLabel greyME"
                          for="inputGarage"
                          sm={2}
                        >
                          Garage:
                        </Label>
                        <Col sm={9} className="ml-auto">
                          <Input
                            type="Number"
                            id="inputGarage"
                            placeholder="0"
                            className="ml-auto mt-0 mb-3 categoryBox colorME"
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup row>
                        <Label
                          className=" categoryLabel mt-5 greyME font-weight-bold"
                          for="inputPrice"
                          sm={2}
                        >
                          PRICE:
                        </Label>
                        <Col sm={9} className="ml-auto">
                          <Input
                            type="text"
                            id="inputPrice"
                            placeholder="0"
                            className="ml-auto mt-5 priceBox "
                            styles={{ width: "100%" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-0 mb-2 justify-content">
                        <Button
                          sm={4}
                          className="font-weight-bold leaseOptions"
                          outline
                          color="light"
                          active
                        >
                          RENT
                        </Button>
                        <h5 sm={1} className="mt-2 ml-2 greyME">
                          OR
                        </h5>
                        <Button
                          sm={4}
                          className="font-weight-bold ml-auto leaseOptions"
                          outline
                          color="light"
                        >
                          SELL
                        </Button>
                      </FormGroup>
                      <Button
                        type="submit"
                        className="submitButton font-weight-bold"
                        outline
                        color="success"
                      >
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default AdminAddOne;
