import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

//Component to render the avatar image and id of authedUser
class Account extends Component {
  handleLogout = () => {
    const { setAuthedUser, history } = this.props;
    setAuthedUser(null);
    history.push("/");
  };

  render() {
    const { authedUser, avatar } = this.props;
    if (authedUser === null) {
      return null;
    }
    return (
      <Fragment>
        <ul className="nav nav-account">
          <li onClick={this.handleLogout} className="nav-li">
            Logout
          </li>
          <li className="user-name nav-li">
            <img
              src={avatar}
              alt={`Avatar of ${avatar}`}
              className="profile-pic scale-down"
            />
          </li>
          <li className="padding-zero user-name nav-li">{authedUser}</li>
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const avatar = authedUser !== null ? users[authedUser].avatarURL : null;
  return {
    authedUser,
    avatar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
