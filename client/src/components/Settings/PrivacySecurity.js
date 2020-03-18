import React, { Component } from "react";

class PrivacySecurity extends Component {
  render() {
    return (
      <div className="card border-0 w-100">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">Usage Policy</h2>
          <div className="mb-4">
            <label htmlFor="email" className="mb-0">Our Usage Policy</label>
            <hr />
            <small>Shrincc is a small web application that has been developed to help improve my knowledge of ReactJS, NodeJS, ExpressJS and MongoDB.</small><br/><br/>
            <small>Any issues that are found in Shrincc can be raised at the application Github <a href="https://www.github.com/andrewdetorres/shrincc">HERE</a></small><br/><br/>
            <small>All Usage of Shrincc is entirley at the users discretion. You the user accept sole liability for using Shrincc to share your links online.</small><br/><br/>
          </div>
        </div>
      </div>
    )
  }
}

export default PrivacySecurity;
