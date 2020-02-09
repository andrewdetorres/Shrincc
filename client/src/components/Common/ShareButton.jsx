import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ShareButton extends Component {
  render() {
    return (
      <>
        <a href={this.props.hrefLink}>
          <button className={"btn text-white py-1 px-2 my-1 mr-2 " + this.props.class}>
            <FontAwesomeIcon icon={['fab', this.props.icon]} className="mr-2 my-auto"/>
            {this.props.title}
          </button>
        </a>
      </>
    )
  }
}

export default ShareButton;
