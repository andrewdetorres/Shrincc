import React, { Component } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Import Actions
import { logoutUser } from '../../actions/auth';

// Import Components
import EditProfile from './EditProfile';
import AccountSettings from "./AccountSettings";
import SocialMedia from "./SocialMedia";

class Settings extends Component {

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
      <div className="shrincc-wrapper">
        {/* Sub header with breadcrumbs */}
        <header className="border-top">
          <ol className="breadcrumb bg-white border-0 rounded-0 m-0">
            <li className="breadcrumb-item pl-md-5 pl-3"><a href="/">Dashboard</a></li>
            <li className="breadcrumb-item active">Account Settings</li>
          </ol>
        </header>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-md-4 col-lg-3 p-0 d-flex justify-content-center">
              <div className="card border-0 w-100">
                <div className="card-body">
                  <h2 className="card-title">Settings</h2>
                  <div className="item-icons my-4 d-flex">
                    <div className="px-0 mx-0 w-auto">
                      <img src={ProfilePictureURL ? ProfilePictureURL : require("../../assets/img/default_profile_23456781349501.png")} alt="Avatar" className="avatar rounded-circle mr-2"/>
                    </div>
                    <div className="w-auto px-0 mx-0">
                      <p className="pl-2 p-0 m-0">{this.props.profile.userProfile.username}</p>
                    </div>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/account-settings" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'cog']} className="mr-2 my-auto"/>
                        Account Settings
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/edit-profile" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'user']} className="mr-2 my-auto"/>
                        Edit Username
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/social-media" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'share-alt']} className="mr-2 my-auto"/>
                        Connect Social Media
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/privacy" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'user-secret']} className="mr-2 my-auto"/>
                        Privacy Policy
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/cookies" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'cookie-bite']} className="mr-2 my-auto"/>
                        Cookies
                    </a>
                  </div>
                  <a href="/api/logout" onClick={this.logoutUser} className="btn btn-primary">Logout</a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9 p-0 d-flex justify-content-center">
              <Switch>
                <Route path="/settings/account-settings" component={AccountSettings} />
                <Route path="/settings/edit-profile" component={EditProfile} />
                <Route path="/settings/social-media" component={SocialMedia} />
                <Redirect from="/settings" to="/settings/account-settings" />
                <Redirect from="/settings/*" to="/settings/account-settings" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Settings));