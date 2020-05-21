import React, { Component } from "react";
import Nav from "./Nav";
import Account from "./Account";
import { connect } from "react-redux";
// component to render the topmost Title bar consisting navigations and Account logged-in details
class TitleBar extends Component {
  render() {
    const { authedUser } = this.props;
    return (
      <div className="title-bar">
        <Nav />
        {authedUser !== null ? <Account /> : null}
      </div>
    );
  }
}

export default connect()(TitleBar);
