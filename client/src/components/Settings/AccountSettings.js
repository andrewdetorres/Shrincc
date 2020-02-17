import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import Actions
import { passwordReset, emailReset } from '../../actions/auth';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({
      email: this.props.auth.user.email
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onEmailSubmit = event => {
    event.preventDefault();

    const user = {
      oldEmail: this.props.auth.user.email,
      newEmail: this.state.email.toLowerCase()
    };

    this.props.emailReset(user, this.props.history);

    if (this.errors) {
      this.toggleClass();
    }
  }

  onPasswordResetSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.props.auth.user.email
    };

    this.props.passwordReset(user, this.props.history);

    if (this.errors) {
      this.toggleClass();
    }
  };

  render() {
    return (
      <div className="card border-0 w-100">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">Account Settings</h2>
          <div className="mb-3">
            <form onSubmit={this.onEmailSubmit}>
              <label htmlFor="email" className="mb-0">Email Address</label>
              <input
                type="email"
                className="form-control w-100"
                id="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.onChange}
              />
              <p>
                <small>All new email adresses will have to be verified to continue</small>
              </p>
              <button type="submit" name="resetPassword" className="btn btn-outline-dark">
                Save new email
              </button>
            </form>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="mb-0">Language <small>(Coming Soon!)</small></label>
            <select className="form-control w-100" id="language" disabled>
              <option>English (UK)</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-0">Reset My Password</label>
            <p className="my-2">
              <small>This will send an email containing a reset link to the address you set up this account with. If you used Google or Facebook to register. This will be send to the associated email.</small>
            </p>
            <form onSubmit={this.onPasswordResetSubmit}>
              <button type="submit" name="resetPassword" className="btn btn-outline-dark">
                Send my reset link
                </button>
            </form>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-0">Deactivate Profile</label>
            <p className="my-2">
              <small>By selecting this button you will deactivate your account. You will be able to log in to your profile which will reactivate the account. If the account is not accessed within 30 days. The account will be deleted.</small>
            </p>
            <button className="btn btn-outline-primary">Deactivate Profile</button>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-0">Delete Account</label>
            <p className="my-2">
              <small>By selecting this you agree to permenently delete your account. This action can not be reversed.</small>
            </p>
            <button className="btn btn-outline-primary">Permenently Delete Account</button>
          </div>
        </div>
      </div>
    )
  }
}

AccountSettings.propTypes = {
  passwordReset: PropTypes.func.isRequired,
  emailReset: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { passwordReset, emailReset })(withRouter(AccountSettings));
