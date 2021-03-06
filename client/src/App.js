import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactGA from 'react-ga';

// Import Fontawesome
import { library }  from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


import { fetchUser } from "./actions/auth";

import './assets/sass/vendor/main.scss';
import setAuthToken from "./utilities/setAuthToken";
// Import CoreUI
// import '@coreui/coreui/dist/css/coreui.min.css';

// Component Import
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PasswordReset from "./components/Auth/PasswordReset";
import PasswordResetConfirm from "./components/Auth/PasswordResetConfirm";
import Verification from "./components/Verification/Verification";
import AuthUser from "./components/Auth/AuthUser";

const ANALYTICS_KEY = process.env.REACT_APP_GOOOGLE_ANALYTICS_TRACKING_CODE;

ReactGA.initialize(ANALYTICS_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    library.add(fas, fab, far);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/passwordreset" component={PasswordReset} />
          <Route exact path="/passwordreset/confirm/:resetToken" component={PasswordResetConfirm} />
          <Route path="/Verification" component={Verification} />
          <Route path="/" component={AuthUser} />
          <Redirect exact from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {fetchUser})(App);