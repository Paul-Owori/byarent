import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./Components/AppNavbar";
import UserSignUp from "./Components/Parts/UserSignUp";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <UserSignUp />
    </div>
  );
}

export default App;
