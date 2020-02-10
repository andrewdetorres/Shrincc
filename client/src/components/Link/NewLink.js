import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import Actions
import { getLink } from '../../actions/link';

class NewLink extends Component {

  // componentDidMount() {
  //   console.log(this.props.match.params.shortLink);
  // }

  render() {
    this.props.getLink(this.props.match.params.shortLink);
    return (
      <>
      </>
    )
  }
}

NewLink.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { getLink })(withRouter(NewLink));
