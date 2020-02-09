import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SocialMedia extends Component {
  render() {
    return (
      <div className="card border-0 w-100">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">SocialMedia</h2>
          <div className="mb-4">
            <h4 htmlFor="email" className="mb-0">Connect To Facebook</h4>
            <p className="my-2 w-75">
              <small>By selecting this, you will be connecting your ccount to facebook. This will allow you to log in through the 'Log in with Facebook' feature.</small>
            </p>
            <div className="oauth">
              <a href="/auth/facebook" className="social">
                <button className="btn btn-facebook my-2">
                  <FontAwesomeIcon icon={['fab', 'facebook-f']} height="20px" className="mr-2"/>
                  Connect to Facebook
                </button>
              </a>
            </div>
          </div>
          <div className="mb-4">
            <h4 htmlFor="email" className="mb-0">Connect To Google</h4>
            <p className="my-2 w-75">
              <small>By selecting this, you will be connecting your ccount to Google. This will allow you to log in through the 'Log in with google' feature.</small>
            </p>
            <div className="oauth">
              <a href="/auth/google" className="social">
                <button className="btn btn-google my-2">
                  <FontAwesomeIcon icon={['fab', 'google-f']} height="20px" className="mr-2"/>
                  Connect to Google
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SocialMedia;
