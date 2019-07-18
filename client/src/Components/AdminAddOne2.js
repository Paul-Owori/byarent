import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../Actions/itemActions";
import PropTypes from "prop-types";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Input,
  Label,
  FormGroup,
  ListGroupItem,
  ListGroup,
  Modal,
  ModalHeader
} from "reactstrap";

import "./css/view_one.css";

class AdminAddOne extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.resetForm = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      item_name: "",
      item_description: "",
      item_price: "",
      files: "",
      address: "",
      bedrooms: "",
      bathrooms: "",
      garage: "",
      rent: false,
      sell: false,
      picUpload: "",
      picSlotsUsed: [],
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      warner: "greyME",
      item: "",
      modal: false,
      added: ""
    };
  }

  //Check and change the state appropriately when the props are updated
  componentDidUpdate(prevProps, prevState) {
    const prevPropsLength = prevProps.item.items.length;
    const newPropsLength = this.props.item.items.length;

    if (newPropsLength > prevPropsLength) {
      if (this.props.item.item.item_name) {
        this.setState({
          item_name: "",
          item_description: "",
          item_price: "",
          files: "",
          address: "",
          bedrooms: "",
          bathrooms: "",
          garage: "",
          rent: false,
          sell: false,
          picUpload: "",
          picSlotsUsed: [],
          one: "",
          two: "",
          three: "",
          four: "",
          five: "",
          six: "",
          seven: "",
          eight: "",
          warner: "greyME",
          item: "",

          added: `${this.props.item.item.item_name} has been added successfuly.`
        });
        setTimeout(() => {
          this.toggle();
        }, 100);
      }
    } else if (this.props.item.item.error) {
      this.setState({
        added: `There was an error uploading this item. Please try again. Error:${
          this.props.item.item.error
        }`
      });
      setTimeout(() => {
        this.toggle();
      }, 100);
    }
  }

  //Change a field in the state when its partner field in the form is edited
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  //Function to execute when the form is submitted
  onSubmit = e => {
    e.preventDefault();

    //Only accept the form if all the fields have content
    if (
      this.state.picSlotsUsed.length &&
      this.state.item_name &&
      this.state.item_description &&
      this.state.item_price &&
      this.state.address &&
      this.state.bedrooms &&
      this.state.bathrooms &&
      this.state.garage &&
      (this.state.rent === true || this.state.sell === true)
    ) {
      //Make an array of all images that have been submitted
      let filearray = [];
      if (this.state.one) {
        filearray.push(this.state.one.image);
      }
      if (this.state.two) {
        filearray.push(this.state.two.image);
      }
      if (this.state.three) {
        filearray.push(this.state.three.image);
      }
      if (this.state.four) {
        filearray.push(this.state.four.image);
      }
      if (this.state.five) {
        filearray.push(this.state.five.image);
      }
      if (this.state.six) {
        filearray.push(this.state.one.image);
      }
      if (this.state.seven) {
        filearray.push(this.state.seven.image);
      }
      if (this.state.eight) {
        filearray.push(this.state.eight.image);
      }

      //Construct a new Formdata to send to the backend since we're dealing with multipart formdata
      //due to the presence of binary data(images)
      let formData = new FormData();
      formData.append("item_name", `${this.state.item_name}`);
      formData.append("item_description", `${this.state.item_description}`);
      formData.append("item_price", `${this.state.item_price}`);
      formData.append("address", `${this.state.address}`);
      formData.append("bedrooms", `${this.state.bedrooms}`);
      formData.append("bathrooms", `${this.state.bathrooms}`);
      formData.append("garage", `${this.state.garage}`);
      formData.append("rent", `${this.state.rent}`);
      formData.append("sell", `${this.state.sell}`);
      for (let i = 0; i < filearray.length; i++) {
        formData.append("itemImage", filearray[i]);
      }

      this.setState({ item: formData });

      //Call the function addItem() from the itemActions in redux to add the selected item
      this.props.addItem(formData);
    } else {
      //If the form fields do not all have content, alert the user that they should put
      //content into all
      this.setState({
        added:
          "Something went wrong! Check to make sure all fields have content."
      });
      setTimeout(() => {
        this.toggle();
      }, 100);
    }
  };

  //Function to toggle field "rent" in the state.
  rentToggle = e => {
    e.preventDefault();
    this.setState({ rent: true });
    if (this.state.sell === true) {
      this.setState({ sell: false });
    }
  };

  //Function to toggle field "sell" in the state.
  sellToggle = e => {
    e.preventDefault();
    this.setState({ sell: true });
    if (this.state.rent === true) {
      this.setState({ rent: false });
    }
  };

  //Function to place images into the state.
  imageUpload = e => {
    e.preventDefault();
    let files = e.target.files;
    let index;

    for (index = 0; index < files.length; index++) {
      let file = files[index];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageHandler({ image: file, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  //Function to check for available slots in the state where an image can be stored
  //If all of the eight slots are full, the user is warned that they cannot add more than 8
  imageHandler = image => {
    if (image) {
      let picSlotCount = [];
      if (!this.state.one) {
        this.setState({ one: image });
        picSlotCount.push("one");
      } else if (!this.state.two) {
        this.setState({ two: image });
        picSlotCount.push("two");
      } else if (!this.state.three) {
        this.setState({ three: image });
        picSlotCount.push("three");
      } else if (!this.state.four) {
        this.setState({ four: image });
        picSlotCount.push("four");
      } else if (!this.state.five) {
        this.setState({ five: image });
        picSlotCount.push("five");
      } else if (!this.state.six) {
        this.setState({ six: image });
        picSlotCount.push("six");
      } else if (!this.state.seven) {
        this.setState({ seven: image });
        picSlotCount.push("seven");
      } else if (!this.state.eight) {
        this.setState({ eight: image });
        picSlotCount.push("eight");
      } else {
        this.setState({ added: "You cannot add more than 8 images!" });
        this.toggle();
        this.setState({ warner: "crimson" });
      }
      this.setState({
        picSlotsUsed: [...this.state.picSlotsUsed, ...picSlotCount]
      });
    }
  };

  //Function to delete a particular image from its respective slot in the state
  deleteimage = number => {
    this.setState({ warner: "greyME" });
    if (number === "one") {
      this.setState({
        one: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "one";
        })
      });
    } else if (number === "two") {
      this.setState({
        two: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "two";
        })
      });
    } else if (number === "three") {
      this.setState({
        three: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "three";
        })
      });
    } else if (number === "four") {
      this.setState({
        four: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "four";
        })
      });
    } else if (number === "five") {
      this.setState({
        five: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "five";
        })
      });
    } else if (number === "six") {
      this.setState({
        six: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "six";
        })
      });
    } else if (number === "seven") {
      this.setState({
        seven: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "seven";
        })
      });
    } else if (number === "eight") {
      this.setState({
        eight: "",
        picSlotsUsed: this.state.picSlotsUsed.filter(function(value) {
          return value !== "eight";
        })
      });
    }
  };

  //Function to assign "numbers" to images to make them easily identifiable by other functions
  numberer = number => {
    if (number === "one") {
      return this.state.one.imagePreviewUrl;
    } else if (number === "two") {
      return this.state.two.imagePreviewUrl;
    } else if (number === "three") {
      return this.state.three.imagePreviewUrl;
    } else if (number === "four") {
      return this.state.four.imagePreviewUrl;
    } else if (number === "five") {
      return this.state.five.imagePreviewUrl;
    } else if (number === "six") {
      return this.state.six.imagePreviewUrl;
    } else if (number === "seven") {
      return this.state.seven.imagePreviewUrl;
    } else if (number === "eight") {
      return this.state.eight.imagePreviewUrl;
    }
  };
  showFileUpload() {
    this.fileUpload.current.click();
  }

  //Function to turn off the dragover feature so that there is no reaction when an image is dragged over
  //the image drop field
  onDragOver(e) {
    e.preventDefault();
  }
  //Function to trigger image upload when an image is dropped into the drop field
  onDrop(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    let index;

    for (index = 0; index < files.length; index++) {
      let file = files[index];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageHandler({ image: file, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  //Function to warn the user when they've exceeded the number of allowed images
  //by changing the colour of the warning text from gray to red
  warner = () => {
    if (this.state.picSlotsUsed.length < 8) {
      this.setState({ warner: "greyME" });
      return this.state.warner;
    } else {
      this.setState({ warner: "crimson" });
      return this.state.warner;
    }
  };

  //Function to toggle the modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    setTimeout(() => {
      this.setState({ modal: !this.state.modal });
    }, 2000);
  };

  //Function for the goBack button to send the user back to the houses page
  goBack = () => {
    this.props.history.push("/admin/all");
  };

  render() {
    let pics = this.state.picSlotsUsed;
    return (
      <Container fluid className="adminOneContainer">
        <h3 className="greyME text-center">Click any field to edit it</h3>

        <Container className="my-3">
          <div class="text-justify">
            <Button
              color="secondary"
              size="lg"
              className="mb-1 mt-3"
              onClick={this.goBack}
            >
              Go Back
            </Button>
            <Row className="justify-content-around">
              <Col xs="3" className="User  my-3 imgScroller text-center">
                <h4 className="greyME  my-2">
                  Uploaded Images:{this.state.picSlotsUsed.length}
                </h4>
                <p className={this.state.warner}>
                  NOTE: Only 8(eight) images allowed per item.
                </p>
                <ListGroup>
                  <TransitionGroup className="shopping-list">
                    {pics.map(number => (
                      <CSSTransition
                        key={number}
                        timeout={500}
                        classNames="fade"
                      >
                        <ListGroupItem className=" my-3 User">
                          <div className="dispImgBody  mb-0">
                            <img
                              alt={number}
                              className="dispImg"
                              src={this.numberer(number)}
                            />
                          </div>
                          <Button
                            className="remove-btn mt-0"
                            color="danger"
                            size="sm"
                            block
                            onClick={this.deleteimage.bind(this, number)}
                          >
                            Delete
                          </Button>
                        </ListGroupItem>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ListGroup>
              </Col>
              <Col xs="8" className="User my-3 colorME text-center">
                <Form onSubmit={this.onSubmit}>
                  <div className="mainImgContainer mt-3">
                    <div
                      className="mainImgBody text-center mb-3 selectableImg"
                      onClick={this.showFileUpload}
                      onDrop={this.onDrop}
                      onDragOver={e => e.preventDefault()}
                    >
                      <input
                        type="file"
                        id="input-image-now"
                        style={{ display: "none" }}
                        ref={this.fileUpload}
                        multiple
                        onChange={this.imageUpload}
                      />
                      <img
                        alt="upload"
                        src={require("../img/upload-icon.png")}
                        className="uploadImage"
                      />
                      <small>Click or drag and drop to upload an image</small>
                    </div>
                  </div>
                  <div className="text-center my-0 ">
                    <Input
                      type="text"
                      id="inputTitle"
                      placeholder="Input Title"
                      className="roundEdges mt-1 titleBox colorME border"
                      name="item_name"
                      value={this.state.item_name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <Input
                    type="textarea"
                    id="inputDescription"
                    placeholder="Input description here."
                    rows="6"
                    className=" roundEdges my-2 descriptionBox colorME"
                    name="item_description"
                    value={this.state.item_description}
                    onChange={this.handleChange}
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
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
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
                            name="bedrooms"
                            value={this.state.bedrooms}
                            onChange={this.handleChange}
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
                            name="bathrooms"
                            value={this.state.bathrooms}
                            onChange={this.handleChange}
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
                            name="garage"
                            value={this.state.garage}
                            onChange={this.handleChange}
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
                            name="item_price"
                            value={this.state.item_price}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-0 mb-2 justify-content">
                        <Button
                          sm={4}
                          className="font-weight-bold leaseOptions"
                          outline
                          color="light"
                          active={this.state.rent}
                          name="rent"
                          onClick={this.rentToggle}
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
                          name="sell"
                          color="light"
                          active={this.state.sell}
                          onClick={this.sellToggle}
                        >
                          SELL
                        </Button>
                      </FormGroup>
                      <FormGroup row className="mt-0 mb-2">
                        <Button
                          type="submit"
                          className="submitButton font-weight-bold"
                          outline
                          color="success"
                        >
                          SUBMIT
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{this.state.added}</ModalHeader>
          </Modal>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item
});

AdminAddOne.propTypes = {
  addItem: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addItem }
)(AdminAddOne);
