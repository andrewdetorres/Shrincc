import React, { Component } from 'react'

export default class IndividualLink extends Component {
  render() {
    return (

      <div>
        <p>{this.props.match.params.linkId}</p>
      </div>
    )
  }
}
