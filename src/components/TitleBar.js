import React, { Component } from "react";
import Nav from "./Nav";
import Account from "./Account";
// component to render the topmost Title bar consisting navigations and Account logged-in details
class TitleBar extends Component {
  render() {
    return (
      <div className="title-bar">
        <Nav />
        <Account />
      </div>
    );
  }
}

export default TitleBar;
