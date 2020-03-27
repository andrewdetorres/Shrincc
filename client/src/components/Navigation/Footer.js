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
        <footer className="page-footer font-small mt-3">
          <div className="d-flex flex-md-row flex-column justify-content-center footer-copyright text-center pb-1 text-dark">
            <small className="px-3"><a href="/about" className="text-dark">About</a></small>
            <small className="px-3"><a href="/cookies" className="text-dark">Cookies</a></small>
            <small className="px-3"><a href="/privacy" className="text-dark">Privacy</a></small>
            {/* <small className="px-3"><a href="/privacy" className="text-dark">Privacy &amp; Usage</a></small> */}
            <small className="px-3"><a href="/contact" className="text-dark">Contact</a></small>
          </div>
          <div className="footer-copyright text-center pb-1 text-dark">
            <small>
              © {copyrightDate} Copyright - 
              <a href="https://shrincc.com/" className="text-dark"> Shrincc.com</a>
            </small>
          </div>
        </footer>
      </Fragment>
    )
  }
}

export default Footer;