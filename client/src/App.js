import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./Components/AppNavbar";
import AdminSignUp from "./Components/AdminSignUp";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <AdminSignUp />
    </div>
  );
}

export default App;
