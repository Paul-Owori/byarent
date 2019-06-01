import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux"; //REQUIRED FOR REDUX
import store from "./store"; //REQUIRED FOR REDUX
import AppNavbar from "./Components/AppNavbar";
import UserViewAll from "./Components/UserViewAll";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <UserViewAll />
      </div>
    </Provider>
  );
}

export default App;
