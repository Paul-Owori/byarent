import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux"; //REQUIRED FOR REDUX
import store from "./store"; //REQUIRED FOR REDUX
import AppNavbar from "./Components/AppNavbar";
import UserViewAll from "./Components/UserViewAll";
import AdminSignIn from "./Components/AdminSignIn";
import UserSignUp from "./Components/UserSignUp";
import UserViewOne from "./Components/UserViewOne";
import AdminAddOne2 from "./Components/AdminAddOne2";
import AdminSignUp from "./Components/AdminSignUp";
import LandingPage from "./Components/LandingPage";
import About from "./Components/About";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppNavbar path="/" component={AppNavbar} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/user" component={UserSignUp} />
          <Route path="/user/all" component={UserViewAll} />
          <Route path="/user/:item_id" component={UserViewOne} />
          <Route path="/admin" component={AdminSignIn} />
          <Route path="/admin/signUp" component={AdminSignUp} />
          <Route path="/admin/add" component={AdminAddOne2} />
          <Route path="/about" component={About} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

//<Route path="/user/one" component={UserViewOne} />
