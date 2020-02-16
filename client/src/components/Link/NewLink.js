import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// import Actions
import { createLink } from '../../actions/link';

const swal = withReactContent(Swal);

class NewLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      copied: false,
      errors: {}
    };
  }

  CopyText = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText("http://localhost:3000/shrincc/" + this.props.link.shortLink)

    // Change copied text
    this.setState({
      copied: true
    })

    swal.fire({
      title: 'Link Copied!',
      text: 'The link http://localhost:3000/shrincc/' + this.props.link.shortLink + ' has been copied to your clipboard',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <Okay />
      )
    })
  }
  onSubmit = (event) => {
    event.preventDefault();

    this.props.createLink({longLink: this.state.link});
    // Change copied text
    this.setState({
      copied: false
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    let copy = null;
    
    if (this.props.link.shortLink && this.props.link.loading === false) {
      copy = (
        <>
          <input 
            ref={(textarea) => this.textArea = textarea}
            type="text" 
            value={"http://localhost:3000/shrincc/" + this.props.link.shortLink} 
            id="shortLinkInput" 
            className="w-75 px-3"
            disabled/> 
            <p 
              className="btn btn-dark m-0"
              onClick={() => this.CopyText}
            >
              {!this.state.copied ? 'Copy' : 'Copied'}
            </p> 
        </>
      );
    }

    return (
      <div className="content" id="MyLink">
        <div className="container-fluid">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-md-6 col-12 text-center">
              <h5 className="text-dark mt-4">Shrincc your link and track your stats.</h5>
              <form onSubmit={this.onSubmit}>
                <div className="input-group justify-content-center mt-4">
                  <input
                    type="text"
                    name="link"
                    placeholder="https://example.com/"
                    className="w-75 px-3"
                    value={this.state.link}
                    onChange={this.onChange}
                    required/>
                    <button className="btn btn-primary" type="submit">Shrincc My Link</button>
                    {copy}
                </div>
                <br/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const Okay = () => (
  <button
    className="btn btn-success my-2"
    onClick={() => swal.close()}
  >
    Okay
  </button>
)

NewLink.propTypes = {
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});


export default connect(mapStateToProps, { createLink })(withRouter(NewLink));
