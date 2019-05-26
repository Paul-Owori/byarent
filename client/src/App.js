import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./Components/AppNavbar";
import AdminAddOne from "./Components/AdminAddOne";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <AdminAddOne />
    </div>
  );
}

export default App;
