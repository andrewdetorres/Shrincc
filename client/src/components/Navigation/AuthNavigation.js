import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

// Import Actions
import { logoutUser } from '../../actions/auth';

class MainNavigation extends Component {

  logoutUser = () => {
    this.props.logoutUser(this.props.history);
    this.props.history.push('/login');
  }

  render() {

    let ProfilePictureURL = null;

    if (this.props.auth.loading === false && this.props.auth.user.profilePicture) {
      ProfilePictureURL = this.props.auth.user.profilePicture;
    }

    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-white px-md-5 px-4">
          <a className="navbar-brand ml-2 logo-font text-dark" href="/">
            <img src={require("../../assets/img/shrincc_logo_black.png")} height="40px" alt="Brand logo"/>
          </a>
          <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav navbar-right mr-2">
              <li className="nav-item my-auto mx-3">
                <a className="nav-link text-dark" href="/">Dashboard</a>
              </li>
              <li className="nav-item my-auto mx-2">
                <a className="nav-link text-dark px-2" href="/new">
                  <button className="btn btn-primary">
                    New Link
                  </button>
                </a>
              </li>
              <li className="nav-item ml-lg-2">
                <a className="nav-link dropdown-toggle px-0" href="/profile"id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={ProfilePictureURL ? ProfilePictureURL : require("../../assets/img/default_profile_23456781349501.png")} alt="Avatar" className="avatar rounded-circle"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/">Dashboard</a>
                  <a className="dropdown-item" href="/my-links">My Links</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/help">Help</a>
                  <a className="dropdown-item" href="/terms-and-conditions">Terms &amp; Conditions</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/settings">Account Settings</a>
                  <a className="dropdown-item" href="/api/logout" onClick={this.props.logoutUser}>Logout</a>
                </div>
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