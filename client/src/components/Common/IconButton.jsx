import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class IconButton extends Component {
  render() {
    return (
      <a href={this.props.hrefLink} onClick={this.props.onClick}>
        <button className={"btn text-white px-2 my-1 mr-2 " + this.props.buttonStyle}>
          <FontAwesomeIcon icon={[this.props.iconStyle, this.props.icon]} className="mr-2 my-auto"/>
          {this.props.title}
        </button>
      </a>
    )
  }
}

export default IconButton;
