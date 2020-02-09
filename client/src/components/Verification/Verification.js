import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

// Import Actions

import { logoutUser } from '../../actions/auth';
class Verification extends Component {

  logoutUserAndRedirect = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <Fragment>
        <p>Email Verified</p>
        <a onClick={this.logoutUserAndRedirect} href="/login">Click here to login</a>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Verification);
