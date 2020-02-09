import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserProfile } from '../../actions/profile';
import { followUser, unfollowUser } from '../../actions/profile';

class UserProfile extends Component {

  componentDidMount() {
    this.props.getUserProfile(this.props.match.params.userId);

    // Get user ID's
    const {id, _id} = this.props.auth.user;
    const { userId } = this.props.match.params;

    if (id === userId || _id === userId) {
      this.props.history.push('/profile');
    }
  }

  HandleFollowRequest = (user) => {
    const followIndex = this.props.profile.profile.followers.map(follower =>
      follower.user.toString()
    )
    .indexOf(this.props.auth.user.id || this.props.auth.user._id);

    if (followIndex >= 0 ) {
      this.props.unfollowUser(user);
    }
    else {
      this.props.followUser(user);
    }

    this.props.getUserProfile(this.props.match.params.userId);
    // const userToFollow = this.props.match.params.userId;
  }

  render() {
    return (
      <>
        <div className="row mx-sm-5 px-sm-5 px-3 my-4 mx-3">
          <p>Profile</p>
        </div>
      </>
    )
  }
}

UserProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default
connect(mapStateToProps, {
  getUserProfile,
  followUser,
  unfollowUser
})(withRouter(UserProfile));
