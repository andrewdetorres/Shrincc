import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Recaptcha from 'react-google-invisible-recaptcha';

// Import Actions
import { contactForm } from '../../actions/auth';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      email: "",
      message: "",
      name: "",
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    
    this.recaptcha.execute();
    
    const submit = {
      email: this.state.email.toLowerCase(),
      name: this.state.name,
      date: new Date().toString(),
      message: this.state.message,
    };

    this.props.contactForm(submit);

    this.setState({
      email: "",
      message: "",
      name: "",
      emailSubmit: this.state.email.toLowerCase(),
      result: true
    })
    this.recaptcha.reset();
  };

  render() {

    const sentResult = (
      <p className="text-center mt-3">
        Your message has been sent using the following email: <strong><i>{this.state.emailSubmit}</i></strong>.
        <br/>
        We hope to get back to you within 5-10 working days.
      </p>
    )
    
    return (
      <>
        {/* Masthead */}
        <header id="header" className="header">
          <div className="masthead container-fluid d-flex justify-content-center align-items-center py-5" id="contact">
            <div className="landing-text text-dark text-center">
              <h1 className="pt-5">Contact Form</h1>
              <hr />
              <form onSubmit={this.onSubmit}>
                <Recaptcha
                  ref={ ref => this.recaptcha = ref }
                  sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_KEY}
                  onResolved={ () => console.log( 'Captcha Success.' ) } />
                <div className="input-group justify-content-center">
                  <p>Please ensure form is filled in correctly before submitting.</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-75 mt-4 px-3"
                    value={this.state.email}
                    onChange={this.onChange}
                    autoComplete="off"
                    required/>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-75 mt-4 px-3"
                    value={this.state.name}
                    onChange={this.onChange}
                    autoComplete="off"
                    required/>
                  <textarea
                    type="text"
                    name="message"
                    placeholder="Message"
                    className="w-75 mt-4 px-3"
                    rows="7" 
                    cols="50"
                    value={this.state.message}
                    onChange={this.onChange}
                    autoComplete="off"
                    required/>
                </div>
                {this.state.result 
                ? sentResult 
                  : ""
                }
                <button className="btn btn-primary my-4" type="submit" name="login">Submit</button>
              </form>
            </div>
          </div>
        </header>
      </>
    )
  }
}

Contact.propTypes = {
  contactForm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { contactForm })(withRouter(Contact));

