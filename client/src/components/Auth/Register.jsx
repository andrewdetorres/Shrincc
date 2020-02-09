import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import Actions
import { registerNewUser } from '../../actions/auth'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordInput: "password",
      passwordShow: "Show Password",
      errors: {}
    };
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
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

    const newUser = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    };

    this.props.registerNewUser(newUser, this.props.history);

    if (this.errors) {
      this.toggleClass();
    }
  };

  render() {

    return (
        <div className="content" id="register">
          <div className="container-fluid">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-md-6 col-12 text-center">
                <img
                  src={require("../../assets/img/temp_logo.png")}
                  width="250px"
                  alt="Brand Logo"
                  />
                <h5 className="text-dark mt-4">Register To Continue</h5>
                <form onSubmit={this.onSubmit}>
                  <div className="input-group justify-content-center">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
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
                  <div className="row w-75 mx-auto">
                    <div className="col-12 p-0">
                      <p className="togglePassword text-right" onClick={this.togglePassword}>
                        <small>
                          {this.state.passwordShow}
                        </small>
                      </p>
                    </div>
                  </div>
                  {this.props.errors.password && (
                    <div className="text-danger">
                      <small>
                        {this.props.errors.password}
                      </small>
                    </div>
                  )}
                  <button className="btn btn-primary my-4" type="submit" name="register">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Log in!</a></p>
                <div className="social-container">
                  <div className="oauth">
                    <a href="/auth/facebook" className="social mx-2">
                      <button className="btn btn-facebook my-2">
                        <FontAwesomeIcon icon={['fab', 'facebook-f']} height="20px" className="mr-2"/>
                        Sign up with Facebook
                      </button>
                    </a>
                    <a href="/auth/google" className="social mx-2">
                      <button className="btn btn-google my-2">
                        <FontAwesomeIcon icon={['fab', 'google']} height="20px" className="mr-2"/>
                        Sign up with Google
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

Register.propTypes = {
  registerNewUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerNewUser })(withRouter(Register));

