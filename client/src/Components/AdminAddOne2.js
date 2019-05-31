import React, { Component } from "react";
import { connect } from "react-redux"; //REQUIRED FOR REDUX
import { addItem } from "../Actions/itemActions"; //REQUIRED FOR REDUX
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
  state = {
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
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  telliyas = () => {
    console.log("Local state =>", this.state);
    console.log("Redux Store => ", this.props);
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("STARTING SUBMISSION");
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

    this.props.addItem(formData);

    // const newItem = {
    //   item_name: this.state.item_name,
    //   item_description: this.state.item_description,
    //   item_price: this.state.item_price,
    //   files: filearray,
    //   address: this.state.address,
    //   bedrooms: this.state.bedrooms,
    //   bathrooms: this.state.bathrooms,
    //   garage: this.state.garage,
    //   rent: this.state.rent,
    //   sell: this.state.sell
    // };
    //Adds an item via the addUser action
    //this.props.signInUser(newItem);
    const count1 = this.props.item.items.length;

    //console.log("ITEM YOU =>", formData);
    // formData.values.forEach(value => console.log("FORMDATA VALUES", value));
    let testArray = [];
    for (var value of formData.values()) {
      testArray.push(value);
    }
    console.log("VALUES=>", testArray);
    let bob = [...formData.getAll("itemImage")];
    let billy = [...bob];
    console.log("bob", bob);
    console.log("billy", billy);

    setTimeout(() => {
      const count2 = this.props.item.items.length;
      if (count2 > count1) {
        this.setState({ added: "SUCCESS!" });
        this.toggle();
      } else {
        this.setState({
          added:
            "Something went wrong! Check to make sure all fields have content."
        });
        this.toggle();
      }
    }, 1000);
    //this.toggle();
  };
  //added:

  rentToggle = e => {
    e.preventDefault();
    this.setState({ rent: true });
    if (this.state.sell === true) {
      this.setState({ sell: false });
    }
    console.log("RENT WAS TOGGLED");
  };

  sellToggle = e => {
    e.preventDefault();
    this.setState({ sell: true });
    if (this.state.rent === true) {
      this.setState({ rent: false });
    }
    console.log("SELL WAS TOGGLED");
  };

  imageUpload = e => {
    e.persist();
    console.log("EEEE=>", e);
    console.log("TARGET FILES=>", e.target.files);
    e.preventDefault();
    let tempImageArray = [];
    let fileArray = [];
    let files = e.target.files;
    let index;
    //Processes incoming files into objects containing a dataURL and the file itself
    let handleLoadImage = file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          //fileArray.push(file);
          tempImageArray.push({ image: file, imagePreviewUrl: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
    console.log("FILES=>", files);

    for (index = 0; index < files.length; index++) {
      let file = files[index];
      //handleLoadImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        //fileArray.push(file);
        this.imageHandler({ image: file, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  onFilesAdded = evt => {
    const files = evt.target.files;
    // if (this.props.onFilesAdded) {
    //   const array = this.fileListToArray(files);
    //   this.props.onFilesAdded(array);
    // }
  };

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

  onDragOver(e) {
    e.preventDefault();
  }
  onDrop(e) {
    e.preventDefault();

    let tempImageArray = [];
    let fileArray = [];
    let files = e.dataTransfer.files;
    let index;
    //Processes incoming files into objects containing a dataURL and the file itself
    let handleLoadImage = file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          //fileArray.push(file);
          tempImageArray.push({ image: file, imagePreviewUrl: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
    console.log("FILES=>", files);

    for (index = 0; index < files.length; index++) {
      let file = files[index];
      //handleLoadImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        //fileArray.push(file);
        this.imageHandler({ image: file, imagePreviewUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
  warner = () => {
    if (this.state.picSlotsUsed.length < 8) {
      this.setState({ warner: "greyME" });
      return this.state.warner;
    } else {
      this.setState({ warner: "crimson" });
      return this.state.warner;
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    setTimeout(() => {
      this.setState({ modal: !this.state.modal });
    }, 2000);
  };

  render() {
    let pics = this.state.picSlotsUsed;
    return (
      <React.Fragment>
        <h3 className="greyME text-center">Click any field to edit it</h3>
        <Button
          type="button"
          className="mt-5 mb-3 "
          color="light"
          block
          onClick={this.telliyas}
        >
          WHATCHUGAT NIGGA
        </Button>
        <Button
          type="button"
          className="mt-5 mb-3 "
          color="light"
          block
          onClick={this.deleteimage}
        >
          delete an image from array
        </Button>
        <Container className="my-3">
          <div class="text-justify">
            <Button color="secondary" size="lg" className="mb-1 mt-3">
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
                <Form>
                  <div className="mainImgContainer">
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
                      onChange={this.handleChange}
                    />
                  </div>

                  <Input
                    type="textarea"
                    id="inputDescription"
                    placeholder="Input description here."
                    rows="6"
                    className=" roundEdges dispText my-2 descriptionBox colorME"
                    name="item_description"
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
                      <Button
                        type="submit"
                        className="submitButton font-weight-bold"
                        outline
                        color="success"
                        onClick={this.onSubmit}
                      >
                        SUBMIT
                      </Button>
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
      </React.Fragment>
    );
  }
}

//export default AdminAddOne;

const mapStateToProps = state => ({
  item: state.item
});

AdminAddOne.propTypes = {
  addItem: PropTypes.func.isRequired
};
//REQUIRED FOR REDUX
export default connect(
  mapStateToProps,
  { addItem }
)(AdminAddOne); //REQUIRED FOR REDUX
