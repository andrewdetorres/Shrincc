import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Route, withRouter, Redirect, Switch } from "react-router-dom";

// Import Actions
import { getCurrentUserProfile } from './../../actions/profile';

// Import Components
import MainNavigation from '../Navigation/MainNavigation'
import AuthNavigation from '../Navigation/AuthNavigation'
import Loading from '../Common/Loading'
import Settings from '../Settings/Settings'
import UserProfile from "../UserProfile/UserProfile";
import CreateProfilePrompt from "../UserProfile/CreateProfilePrompt";
import Landing from "../Landing/Landing";
import NewLink from "../Link/NewLink";
import Dashboard from "../Dashboard/Dashboard";

class AuthUser extends Component {

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth !== this.props.auth) {
      this.props.getCurrentUserProfile();
    }
  }

  render() {
    var User;
    // Anon User
    if (this.props.auth.isAuthenticated === false && this.props.auth.loading === false) {
      User = (
        <Fragment>
          <MainNavigation />
          <Route path="/" component={Landing} />
          <Route path="/user/:userId" component={UserProfile} />
        </Fragment>
      )
    }

    // Authenticated User
    else if (this.props.auth.isAuthenticated === true && this.props.auth.loading === false) {
      if (this.props.profile.userProfile && this.props.profile.loading === false) {
        User = (
          <Fragment>
            <AuthNavigation />
              <Switch>
                <Route path="/new" component={NewLink} />
                <Route path="/user/:userId" component={UserProfile} />
                <Route path="/settings" component={Settings} />
                <Route path="/" component={Dashboard} />
              </Switch>
          </Fragment>
        )
      }
      else if (!this.props.profile.userProfile && this.props.profile.loading === false) {
        User = (
          <Fragment>
            <AuthNavigation />
            <Route path="/" component={CreateProfilePrompt} />
          </Fragment>
        )
      }
    }

    // Loading
    else {

      // @todo - Auth routes loading
      User = <Loading/>
    }

    return (
      <Fragment>
        {User}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUserProfile })(withRouter(AuthUser));
