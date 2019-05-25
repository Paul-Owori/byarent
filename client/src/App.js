import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./Components/AppNavbar";
import AdminSignIn from "./Components/AdminSignIn";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <AdminSignIn />
    </div>
  );
}

export default App;
