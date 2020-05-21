import React from "react";
import { NavLink } from "react-router-dom";

// pageNotFound is the Functional Component which renders when we try to go to the page which doesn't exist
function PageNotFound() {
  return (
    <div className="center">
      <h1>Oops!</h1>
      <p>Page Not Found !!</p>
      <p className="padding-top">
        <NavLink className="click-here" to="/">
          Click here
        </NavLink>{" "}
        to go back to home page
      </p>
    </div>
  );
}

export default PageNotFound;
