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
        <footer className="page-footer font-small mt-5">
          <div className="footer-copyright text-center py-3 text-dark">
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