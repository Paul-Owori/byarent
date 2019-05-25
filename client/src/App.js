import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./Components/AppNavbar";
import About from "./Components/About";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <About />
    </div>
  );
}

export default App;
