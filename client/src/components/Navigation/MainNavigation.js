import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

// Import Actions
import { logoutUser } from '../../actions/auth';

class MainNavigation extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-md-3 p-5">
          <a className="navbar-brand ml-2 logo-font text-dark" href="/">
            <img src={require("../../assets/img/shrincc_logo_black.png")} height="50px" alt="Brand logo"/>
          </a>
          <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav navbar-right mr-2">
              <li className="nav-item my-auto mx-3">
                <a className="nav-link text-dark" href="/">Home</a>
              </li>
              <li className="nav-item my-auto mx-3">
                <a className="nav-link text-dark" href="/articles">Articles</a>
              </li>
              <li className="nav-item my-auto mx-3">
                <a className="nav-link text-dark" href="/about">About Shrincc</a>
              </li>
              <li className="nav-item my-auto ml-2 my-auto">
                <a className="nav-link text-dark pl-4 pr-0" href="/login">
                  <button className="btn btn-primary">
                    Login
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(MainNavigation));