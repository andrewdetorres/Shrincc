import React, { Component } from 'react'
import Footer from '../Navigation/Footer';

class About extends Component {
  render() {
    return (
      <>
        {/* Masthead */}
        <div className="masthead container-fluid d-flex justify-content-center align-items-center pb-5">
          <div className="landing-text text-dark text-center">
            <h1>About Shrincc</h1>
            <hr />
            <p>Shrincc is a small web application that has been developed to help improve my knowledge of ReactJS, NodeJS, ExpressJS and MongoDB.</p>
            <p>Any issues that are found in Shrincc can be raised at the application Github <a href="https://www.github.com/andrewdetorres/shrincc">HERE</a></p>
            <p>All Usage of Shrincc is entirley at the users discretion. You the user accept sole liability for using Shrincc to share your links online.</p>
            <a href="/register" className="btn btn-primary text-white mt-2">Register to Shrincc</a>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </>
    )
  }
}

export default About;
