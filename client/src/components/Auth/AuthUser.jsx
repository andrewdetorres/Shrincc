import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

// Import Actions
import { isActivated } from './../../actions/auth';
import { getCurrentUserProfile } from './../../actions/profile';

// Import Components
import MainNavigation from '../Navigation/MainNavigation'
import AuthNavigation from '../Navigation/AuthNavigation'
import Loading from '../Common/Loading'
import Settings from '../Settings/Settings'
import UserProfile from "../UserProfile/UserProfile";
import CreateProfilePrompt from "../UserProfile/CreateProfilePrompt";
import ApproveEmail from "../UserProfile/ApproveEmail";
import Landing from "../Landing/Landing";
import Articles from "../Landing/Articles";
import About from "../Landing/About";
import Cookies from "../Landing/Cookies";
import Privacy from "../Landing/Privacy";
import NewLink from "../Link/NewLink";
import Dashboard from "../Dashboard/Dashboard";
import MyLinks from "../Link/MyLinks";
import IndividualLink from "../Link/IndividualLink";
import Footer from "../Navigation/Footer";

class AuthUser extends Component {

  componentDidMount() {
    this.props.getCurrentUserProfile();
    this.props.isActivated();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.user.id) {
      if (prevProps.auth.user.id !== this.props.auth.user.id) {
        this.props.getCurrentUserProfile();
      }
      if (prevProps.auth.user.activated !== this.props.auth.user.activated) {
        this.props.isActivated();
      }
    }
  }

  render() {
    var User;
    // Anon User
    if (this.props.auth.isAuthenticated === false && this.props.auth.loading === false) {
      User = (
        <Fragment>
          <MainNavigation />
          <Switch>
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/about" component={About} />
            <Route exact path="/cookies" component={Cookies} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/" component={Landing} />
            <Redirect exact from="*" to="/" />
          </Switch>
          <Footer/>
        </Fragment>
      )
    }

    // Authenticated User
    else if (this.props.auth.isAuthenticated === true && this.props.auth.loading === false) {
      if (this.props.profile.userProfile && this.props.profile.loading === false && this.props.auth.user.activated == true) {
        User = (
          <Fragment>
            <AuthNavigation />
              <Switch>
                <Route exact path="/new" component={NewLink} />
                <Route exact path="/link/:linkId" component={IndividualLink} />
                <Route exact path="/user/:userId" component={UserProfile} />
                <Route exact path="/my-links" component={MyLinks}/>
                <Route path="/settings/" component={Settings}/>
                <Route exact path="/articles" component={Articles} />
                <Route exact path="/about" component={About} />
                <Route exact path="/cookies" component={Cookies} />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact path="/" component={Dashboard} />
                <Redirect exact from="*" to="/" />
              </Switch>
              <Footer/>
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
      else if (this.props.auth.user.activated == false && this.props.profile.loading === false) {
        User = (
          <Fragment>
            <AuthNavigation />
            <Route path="/" component={ApproveEmail} />
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

export default connect(mapStateToProps, { getCurrentUserProfile, isActivated })(withRouter(AuthUser));
