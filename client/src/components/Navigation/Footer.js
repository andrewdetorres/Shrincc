import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

// Import Actions
import { logoutUser } from '../../actions/auth';

class Footer extends Component {

  render() {

    var d = new Date();
    var copyrightDate = d.getFullYear();

    return (
      <Fragment>
        {/* Footer */}
        <footer className="page-footer font-small bg-primary pt-4 mt-5">
          <div className="container-fluid text-center text-white text-md-left px-5">
            <div className="d-flex container-fluid flex-md-row flex-column justify-content-around align-items-stretch px-5">
              <div className="mb-md-0 mb-3">
                <h3 className="text-uppercase">Links</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!" className="text-white">Home</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Articles</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Why Shrincc?</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="mb-md-0 mb-3">
                <h3 className="text-uppercase">User</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!" className="text-white">Login</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright text-center py-3 text-white">© {copyrightDate} Copyright - 
            <a href="https://shrincc.com/" className="text-white"> Shrincc.com</a>
          </div>
        </footer>
      </Fragment>
    )
  }
}

export default Footer;