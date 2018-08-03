import React, { Component } from "react";
import NavbarContainer from "./../Navbar/NavbarContainer";
import SidebarContainer from "./../Sidebar/SidebarContainer";
import BodyContainer from "./../Body/BodyContainer";
import FooterContainer from "./../Footer/FooterContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarContainer />
        <div className="bodyContainer">
        
          <SidebarContainer />
          <BodyContainer />
          
        </div>
        <FooterContainer />
      </div>
    );
  }
}

export default App;
