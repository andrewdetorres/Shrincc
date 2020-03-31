import React, { Component } from 'react'

class About extends Component {
  render() {
    return (
      <>
        {/* Masthead */}
        <div className="masthead container-fluid d-flex justify-content-center align-items-center pb-5">
          <div className="landing-text text-dark text-center">
            <h1>About Shrincc</h1>
            <hr />
            <p>This page is coming soon</p>
            <a href="/register" className="btn btn-primary text-white mt-2">Register to Shrincc</a>
          </div>
        </div>
      </>
    )
  }
}

export default About;
