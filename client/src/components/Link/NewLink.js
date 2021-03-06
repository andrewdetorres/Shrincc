import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isUrl from 'is-url';

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
      loading: false,
      errors: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.link.shortLink !== this.props.link.shortLink) {
      this.setState({
        loading: false
      });
    }
  }

  CopyText = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText("https://shrin.cc/" + this.props.link.shortLink)

    // Change copied text
    this.setState({
      copied: true
    })

    swal.fire({
      title: 'Link Copied!',
      text: 'The link https://shrin.cc/' + this.props.link.shortLink + ' has been copied to your clipboard',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <Okay />
      )
    })
  }
  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      loading: true
    });

    if (isUrl(this.state.link)) {
      this.props.createLink({longLink: this.state.link});
      // Change copied text
      this.setState({
        link: "",
        copied: false,
        errors: {}
      });
    }
    else {
      this.setState({
        errors: {
          URL: "URL is invalid, please enter a valid URL (please include 'https://'"
        }
      })
    }
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
            value={"https://shrin.cc/" + this.props.link.shortLink}
            id="shortLinkInput"
            className="w-75 px-3"
            disabled/>
            <p
              className="btn btn-dark w-25 copied-button"
              onClick={this.CopyText}
            >
              {!this.state.copied ? 'Copy' : 'Copied'}
            </p>
        </>
      );
    }

    return (
      <div className="shrincc-wrapper">
        {/* Sub header with breadcrumbs */}
        <header className="border-top">
          <ol className="breadcrumb bg-white border-0 rounded-0 m-0">
            <li className="breadcrumb-item pl-md-5 pl-3"><a href="/">Dashboard</a></li>
            <li className="breadcrumb-item active">New Link</li>
          </ol>
        </header>
        <div className="content" id="MyLink">
          <div className="container-fluid">
            <div className="row h-50 justify-content-center align-items-center">
              <div className="col-md-6 col-12 text-center">
                <h5 className="text-dark mt-4">Shrincc your link and track your stats.</h5>
                <form onSubmit={this.onSubmit}>
                  <div className="input-group justify-content-center mt-4">
                    <input
                      type="text"
                      name="link"
                      placeholder="https://example.com"
                      className="w-100 px-3 mb-3"
                      value={this.state.link}
                      onChange={this.onChange}
                      required/>
                      <button className="btn btn-primary w-50 mb-3" type="submit">Shrincc My Link</button>
                      {copy}
                  </div>
                  {this.state.errors.URL ? <span className="text-danger">{this.state.errors.URL}</span> : ""}
                  {this.state.loading &&
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  }
                </form>
              </div>
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
