import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { createUserProfile, usernameCheck } from '../../actions/profile';

const swal = withReactContent(Swal);
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.profile.userProfile.username,
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.profile.username !== this.props.profile.username) {
      if (this.props.profile.username.length >= 1){
        this.setState({
          errors: {
            username: "This username is already taken"
          }
        })
      }
      else {
        this.setState({
          errors: {
            username: false
          }
        })
      }
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.name === 'username') {
      this.props.usernameCheck({username: event.target.value.toLowerCase()});
    }
  };

  onSubmit = event => {
    event.preventDefault();

    // Username basic validation
    if (this.state.username.replace(/\s/g, "").length < this.state.username.length) {
      this.setState({
        errors: {
          username : "Username must not contain any spaces"
        }
      })
      return;
    }
    else {
      if (this.state.username.length > 4 && this.state.username.length < 16) {
        this.setState({
          errors: {
            username : ""
          }
        })
      }
      else {
        this.setState({
          errors: {
            username : "Username must be between 5 and 15 characters"
          }
        })
        return;
      }
    }

    if (this.state.errors.username !== false) {
      this.setState({
        errors: {
          username: "This username is already taken"
        }
      })
      return;
    }

    const user = {
      username: this.state.username.toLowerCase(),
    }; 

    this.props.createUserProfile(user);

    swal.fire({
      title: 'Profile Updated!',
      text: 'Your profile has been updated successfully.',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <Okay />
      )
    })
  };

  render() {
    return (
      <div className="card border-0 w-100" id="edit-profile">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">Edit Username</h2>
          <div className="mb-4">
            <form onSubmit={this.onSubmit}>
                <div className="mb-2">
                  <label htmlFor="username" className="mb-0"><small>Username</small></label>
                  <input 
                    type="text" 
                    className="form-control w-100" 
                    id="username" 
                    name="username"
                    placeholder="Username" 
                    autoComplete="off"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <small className="text-primary">{this.state.errors.username}</small>
                </div>
                <button className="btn btn-primary my-4 mr-2" type="submit" name="saveProfile">Save Profile</button>
            </form>
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

EditProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  usernameCheck: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { createUserProfile, usernameCheck })(withRouter(EditProfile));
