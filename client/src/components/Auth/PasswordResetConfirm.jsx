import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { passwordResetConfirm } from '../../actions/auth';

// @todo - import new action
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      repeatPassword: "",
      passwordInput: "password",
      passwordShow: "Show Password",
      errors: {}
    };
  }

  togglePassword = () => {
    if (this.state.passwordInput === "password") {
      this.setState({
        passwordInput: "text",
        passwordShow: "Hide Password"
      })
    }
    else {
      this.setState({
        passwordInput: "password",
        passwordShow: "Show Password"
      })
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.password === this.state.repeatPassword) {
      const userData = {
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
        token: this.props.match.params.resetToken
      };

      this.props.passwordResetConfirm(userData, this.props.history);
      this.props.history.push("/login");

      if (this.errors) {
        this.toggleClass();
      }
    }
    else {
      this.setState({
        errors : {
          password : "Passwords do not match"
        }
      })
    }
  };

  render() {
    return (
      <div className="content" id="passwordResetConfirm">
        <div className="container-fluid">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-md-6 col-12 text-center">
              <img
                src={require("../../assets/img/shrincc_logo.png")}
                width="250px"
                alt="Brand Logo"
                />
              <h5 className="text-dark mt-4">
                Enter your new password.
              </h5>
              <form onSubmit={this.onSubmit}>
                <div className="input-group justify-content-center">
                  <input
                    type={this.state.passwordInput}
                    name="password"
                    placeholder="Password"
                    className="w-75 mt-4 px-3"
                    value={this.state.password}
                    onChange={this.onChange}
                    required/>
                </div>
                <div className="input-group justify-content-center">
                  <input
                    type={this.state.passwordInput}
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    className="w-75 mt-4 px-3"
                    value={this.state.repeatPassword}
                    onChange={this.onChange}
                    required/>
                </div>
                {this.props.errors.password && (
                  <div className="text-danger">
                    <small>
                      {this.props.errors.password}
                    </small>
                  </div>
                )}
                <div className="row w-75 mx-auto">
                  <div className="col-6 p-0 text-left">
                    <a href="/passwordreset" className="forgotPassword">
                      <small>
                        Reset Password
                      </small>
                    </a>
                  </div>
                  <div className="col-6 p-0">
                    <p className="togglePassword text-right" onClick={this.togglePassword}>
                      <small>
                        {this.state.passwordShow}
                      </small>
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary my-4" type="submit" name="login">Set my new password</button>
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
  passwordResetConfirm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { passwordResetConfirm })(withRouter(Login));
