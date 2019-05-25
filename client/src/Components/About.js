import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";
import "./css/landingPage.css";

class About extends Component {
  state = {};
  render() {
    return (
      <Container className="my-5">
        <Jumbotron className="text-center my-3">
          <h1 class="display-3 font-weight-bold">About us</h1>
          <p class="lead">
            We are Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laboriosam, itaque ducimus. Minima quaerat iste nemo error,
            praesentium, ullam deserunt itaque soluta accusamus impedit tempora
            deleniti repellat quod nostrum aperiam pariatur. Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Consequuntur magni provident
            quo blanditiis aliquam possimus. Dolores vero totam mollitia qui
            maxime! Libero, ducimus exercitationem! Facere voluptate quas atque
            omnis necessitatibus! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Consequuntur est accusamus voluptatum dolorum
            doloribus pariatur, quibusdam ea aut hic doloremque at. Beatae omnis
            accusantium quaerat quia fugiat quo quasi mollitia?
          </p>
          <hr class="my-4" />
          <p>You can contact us at admin@byarent.com</p>
        </Jumbotron>
      </Container>
    );
  }
}

export default About;
