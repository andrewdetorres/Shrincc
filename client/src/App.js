import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Import Fontawesome
import { library }  from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


import { fetchUser } from "./actions/auth";

import './assets/sass/vendor/main.scss';
import setAuthToken from "./utilities/setAuthToken";

// Component Import
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PasswordReset from "./components/Auth/PasswordReset";
import PasswordResetConfirm from "./components/Auth/PasswordResetConfirm";
import Verification from "./components/Verification/Verification";
import AuthUser from "./components/Auth/AuthUser";

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
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {fetchUser})(App);