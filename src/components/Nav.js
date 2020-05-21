import React from "react";
import { NavLink } from "react-router-dom";

// it's a functional component which renders the navigation tabs at the topmost Title bar
export default function Nav() {
  return (
    <nav>
      <ul className="nav">
        <li className="nav-li">
          <NavLink className="nav-li" to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            className="nav-li"
            to="/leaderboard"
            exact
            activeClassName="active"
          >
            Leaderboard
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-li" to="/add" exact activeClassName="active">
            Add Poll
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
