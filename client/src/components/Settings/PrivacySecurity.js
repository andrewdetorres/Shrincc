import React, { Component } from "react";

class PrivacySecurity extends Component {
  render() {
    return (
      <div className="card border-0 w-100">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3">PrivacySecurity</h2>
          <div className="mb-4">
            <label htmlFor="email" className="mb-0">Example Privacy</label>
            <input type="checkbox" class="ml-2"/>
            <p className="my-2">
              <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</small>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PrivacySecurity;
