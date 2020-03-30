import React, { Component } from 'react'

class ApproveEmail extends Component {
  render() {
    return (
      <div>
        <div className="masthead container-fluid d-flex justify-content-center align-items-center pb-5">
          <div className="landing-text text-dark text-center">
            <h1>Please approve your email</h1>
            <hr />
            <p>The email confirmation can be found at the email address you used to sign up to Shrincc.</p>
            <p>By using Shrincc, you accept our <a href="/privacy">privacy policy</a> and <a href="/cookies">cookie policy</a>.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ApproveEmail;