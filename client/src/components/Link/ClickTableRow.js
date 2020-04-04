import React, { Component } from 'react';
import countryFlagEmoji from "country-flag-emoji";
import Moment from 'react-moment';

export default class ClickTableRow extends Component {
  render() {
    return (
      <tr>
        <td className="text-left" style={{"min-width":"200px"}}>
          <div>
          {(this.props.countryCode !== "Unknown" ? countryFlagEmoji.get(this.props.countryCode).emoji : "Unknown")} {this.props.countryName}
          </div>
        </td>
        <td className="text-center" style={{"min-width":"150px"}}>
          <div>
            <Moment format="Do MMM, YYYY" >
              {this.props.date}
            </Moment>
          </div>
        </td>
        <td className="text-center">
          <div>
            <Moment format="HH:mm" >
              {this.props.date}
            </Moment>
          </div>
        </td>
        <td className="text-center">
          <div>
            {this.props.browser}
          </div>
        </td>
        <td className="text-center" style={{"min-width":"150px"}}>
          <div>
            {this.props.os}
          </div>
        </td>
        <td className="text-center">
          <div>
            {this.props.device}
          </div>
        </td>
      </tr>
    )
  }
}

