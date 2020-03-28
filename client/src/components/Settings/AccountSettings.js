import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Import Actions
import { passwordReset, emailReset, deleteAccount, logoutUser } from '../../actions/auth';

const swal = withReactContent(Swal);

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

  deleteConfirm = () => {
    swal.fire({
      title: 'Link Copied!',
      icon: 'error',
      showConfirmButton: false,
      html: (
        <>
          <p>Are you sure you wish to delete you account and all associated information?</p>
          <p>This action can not be reversed?</p>
          <DeleteOkay 
            onClick={this.deleteAccount}
          />
          <Close/>
        </>
      )
    })
  }

  deleteAccount = () => {
    this.props.deleteAccount();
    this.props.logoutUser(this.props.history);
    this.props.history.push('/login');
    swal.fire({
      title: 'Deleted!',
      text: 'Your account has been deleted.',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <Okay />
      )
    })
    .then(() => {
    });
  }


  render() {

    let updateEmailDisabled;
    
    if (this.state.email === this.props.auth.user.email) {
      updateEmailDisabled = (
        <button 
          type="submit" 
          name="resetPassword" 
          className="btn btn-outline-dark"
          disabled
          >
          Update Email
        </button>
      )
    }
    else {
      updateEmailDisabled = (
        <button 
          type="submit" 
          name="resetPassword" 
          className="btn btn-outline-dark"
          >
          Update Email
        </button>
      )
    }

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
              {updateEmailDisabled}
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
            <label htmlFor="email" className="mb-0">Delete Account</label>
            <p className="my-2">
              <small>By selecting this you agree to permenently delete your account. This action can not be reversed.</small>
            </p>
            <button className="btn btn-outline-primary" onClick={this.deleteConfirm}>Permenently Delete Account</button>
          </div>
        </div>
      </div>
    )
  }
}

export const Okay = () => (
  <button
    className="btn btn-success my-2"
    onClick={() => swal.close()}
  >
    Okay
  </button>
)

export const DeleteOkay = ({ onClick }) => (
  <button
    className="btn btn-error my-2"
    onClick={() => onClick()}
  >
    Delete
  </button>
)

export const Close = () => (
  <button
    className="btn btn-success my-2"
    onClick={() => swal.close()}
  >
    Close
  </button>
)

AccountSettings.propTypes = {
  passwordReset: PropTypes.func.isRequired,
  emailReset: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { passwordReset, emailReset, deleteAccount, logoutUser })(withRouter(AccountSettings));
