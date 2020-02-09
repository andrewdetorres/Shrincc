import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { passwordReset } from '../../actions/auth';

// @todo - import new action
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email.toLowerCase()
    };

    // @todo - Change
    this.props.passwordReset(user, this.props.history);

    if (this.errors) {
      this.toggleClass();
    }
  };

  render() {
    return (
      <div className="content" id="passwordreset">
        <div className="container-fluid">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-md-6 col-12 text-center">
              <img
                src={require("../../assets/img/temp_logo.png")}
                width="250px"
                alt="Brand Logo"
                />
              <h5 className="text-dark mt-4">
                Enter your email to reset your password.
              </h5>
              <form onSubmit={this.onSubmit}>
                <div className="input-group justify-content-center">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className="w-75 mt-4 px-3"
                    value={this.state.email}
                    onChange={this.onChange}
                    required/>
                </div>
                {this.props.errors.email && (
                  <div className="text-danger">
                    <small>
                      {this.props.errors.email}
                    </small>
                  </div>
                )}
                {this.props.auth.resetMessage && (
                  <div className="text-success">
                    <small>
                      {this.props.auth.resetMessage.success}
                    </small>
                  </div>
                )}
                <button className="btn btn-primary my-4" type="submit" name="login">Send my password reset link</button>
              </form>
              <p>
                <a href="login" className="login-button">Log In </a>
                  or
                <a href="login" className="login-button"> Sign Up!</a>
                </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// @todo - import new action
Login.propTypes = {
  passwordReset: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { passwordReset })(withRouter(Login));
