import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-white">
          <a className="navbar-brand ml-2 logo-font text-dark" href="/">
            <img src={require("../../assets/img/temp_logo.png")} height="40px" alt="Brand logo"/>
          </a>
          <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav navbar-right mr-2">
              <li className="nav-item my-auto mx-3">
                <a className="nav-link text-dark" href="/new">New Link</a>
              </li>
              <li className="nav-item my-auto mx-3">
                <a className="nav-link text-dark" href="/login">Dashboard</a>
              </li>
              <li className="nav-item my-auto mx-lg-2 py-2 py-lg-0 px-3 px-md-0">
                <a className="nav-link dropdown-toggle" href="/profile"id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={ProfilePictureURL ? ProfilePictureURL : require("../../assets/img/default_profile_23456781349501.png")} alt="Avatar" className="avatar rounded-circle"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/profile">Dashboard</a>
                  <a className="dropdown-item" href="/saved">Saved Jobs</a>
                  <a className="dropdown-item" href="/track">Track Jobs</a>
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