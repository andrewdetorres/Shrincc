import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Import Components
import EditProfile from './EditProfile';
import AccountSettings from "./AccountSettings";
import SocialMedia from "./SocialMedia";
import PrivacySecurity from "./PrivacySecurity";

class Settings extends Component {

  render() {
    return (
      <div className="c-wrapper">
        <header className="c-header c-header-light">
          <div className="c-subheader px-3">
            <ol className="breadcrumb border-0 m-0">
              <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
              <li className="breadcrumb-item active">Account Settings</li>
            </ol>
          </div>
        </header>
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-md-4 col-lg-3 p-0 d-flex justify-content-center">
              <div className="card border-0 w-100">
                <div className="card-body">
                  <h2 className="card-title">Settings</h2>
                  <div className="item-icons my-4 d-flex">
                    <div className="px-0 mx-0 w-auto">
                      <img src="https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format&q=70" alt="Avatar" className="avatar rounded-circle mr-2"/>
                    </div>
                    <div className="w-auto px-0 mx-0">
                      <p className="pl-2 p-0 m-0">Blah McBlah</p>
                      <small className="pl-2 p-0 m-0 text-primary">Subscriber</small>
                    </div>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/edit-profile" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'user']} className="mr-2 my-auto"/>
                        Edit Profile
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/account-settings" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'cog']} className="mr-2 my-auto"/>
                        Account Settings
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/social-media" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'share-alt']} className="mr-2 my-auto"/>
                        Connect Social Media
                    </a>
                  </div>
                  <div className="item-icons my-4">
                    <a href="/settings/privacy-security" className="py-2">
                      <FontAwesomeIcon icon={['fas', 'user-secret']} className="mr-2 my-auto"/>
                        Privacy and Security
                    </a>
                  </div>
                  <a href="/logout" onClick={this.logoutUser} className="btn btn-primary">Logout</a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9 p-0 d-flex justify-content-center">
              <Switch>
                <Route path="/settings/edit-profile" component={EditProfile} />
                <Route path="/settings/account-settings" component={AccountSettings} />
                <Route path="/settings/social-media" component={SocialMedia} />
                <Route path="/settings/privacy-security" component={PrivacySecurity} />
                <Redirect from="/settings" to="/settings/edit-profile" />
                <Redirect from="/settings/*" to="/settings/edit-profile" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Settings);
