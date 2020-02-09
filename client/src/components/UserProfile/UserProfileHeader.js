import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GetDate from '../Common/GetDate';

import { followUser } from '../../actions/profile';

class MyPostsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followActive: 'Unfollow'
    }
  }

  componentDidMount() {
    this.setButtonState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.profile.followers !== this.props.followers) {
      this.setButtonState();
    }
  } 

  setButtonState = () => {
    const followIndex = this.props.followers.map(follow =>
      follow.user.toString()
    )
    .indexOf(this.props.auth.user.id || this.props.auth.user._id);

    if (followIndex >= 0 ) {
      this.setState({
        followActive: 'Following'
      });
    }
    else {
      this.setState({
        followActive: 'Follow'
      });
    }
  }

  render() {

    return (
      <div>
        <div className="row py-1 border-bottom">
          <div className="col w-auto">
            <div className="item-icons my-4 d-flex">
              <div className="px-0 mx-0 w-auto">
                <img src="https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format&q=70" alt="Avatar" className="avatar-large rounded-circle mr-2"/>
              </div>
              <div className="w-auto px-0 mx-0 d-flex flex-column my-auto">
                <h3 className="pl-2 p-0 m-0">{this.props.username}</h3>
                <p className="pl-2 m-0 text-dark">Joined: <GetDate date={this.props.date} /></p>
                <button className="btn btn-outline-primary px-2 my-1 mr-2 py-0" onClick={this.props.function}>
                  {this.state.followActive}
                </button>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center justify-content-around w-auto">
            <div className="text-center my-4">
              <h4 className="text-dark">
                <strong>
                  {this.props.postCount}
                </strong>
              </h4>
              <p className="m-0">Posts</p>
            </div>
            <div className="text-center my-4">
              <h4 className="text-dark">
                <strong>
                  {this.props.followers.length}
                </strong>
              </h4>
              <p className="m-0">Followers</p>
            </div>
            <div className="text-center my-4">
              <h4 className="text-dark">
                <strong>
                  {this.props.following.length}
                </strong>
              </h4>
              <p className="m-0">Following</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MyPostsHeader.propTypes = {
  followUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  posts: state.posts,
  profile: state.profile
});

export default connect(mapStateToProps, { followUser })(withRouter(MyPostsHeader));
