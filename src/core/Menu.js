import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = (props) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/")}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props.history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props.history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() ? (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signout")}
                to="/signin"
                onClick={() =>
                  signout(() => {
                    props.history.push("/");
                  })
                }
              >
                SignOut
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signin")}
                to="/signin"
              >
                SignIn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(props.history, "/signup")}
                to="/signup"
              >
                SignUp
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
