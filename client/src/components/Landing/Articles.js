import React, { Component } from 'react'

class Articles extends Component {
  render() {
    return (
      <>
        {/* Masthead */}
        <div className="masthead container-fluid d-flex justify-content-center align-items-center pb-5">
          <div className="landing-text text-dark text-center">
            <h1>Aticles</h1>
            <hr />
            <p>This page is coming soon</p>
            <a href="/register" className="btn btn-primary text-white mt-2">Register to Shrincc</a>
          </div>
        </div>
      </>
    )
  }
}

export default Articles;
