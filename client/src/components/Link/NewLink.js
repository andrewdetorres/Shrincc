import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import Actions
import { createLink } from '../../actions/link';

class NewLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      copied: false,
      errors: {}
    };
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
              onClick={() => {
                // Copy text to clipboard
                navigator.clipboard.writeText("http://localhost:3000/shrincc/" + this.props.link.shortLink)

                // Change copied text
                this.setState({
                  copied: true
                })
              }}
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
