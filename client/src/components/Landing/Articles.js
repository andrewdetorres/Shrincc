import React, { Component } from 'react'
import Footer from '../Navigation/Footer';

class Articles extends Component {
  render() {
    return (
      <>
        {/* Masthead */}
        <div className="masthead container-fluid d-flex justify-content-center align-items-center pb-5">
          <div className="landing-text text-dark text-center">
            <h1>Articles - Coming Soon</h1>
            <a href="/register" className="btn btn-primary text-white mt-2">Register to Shrincc</a>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </>
    )
  }
}

export default Articles;
