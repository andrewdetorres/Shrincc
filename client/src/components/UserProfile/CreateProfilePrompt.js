import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StepWizard from 'react-step-wizard';

// Import Actions
import { createUserProfile, usernameCheck } from '../../actions/profile';
class CreateProfilePrompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.profile.username !== this.props.profile.username) {
      if (this.props.profile.username.length >= 1){
        this.setState({
          form: {
            ...this.state.form,
            usernameErrors: "This username is already taken"
          }
        })
      }
      else {
        this.setState({
          form: {
            ...this.state.form,
            usernameErrors: false
          }
        })
      }
    }
  }

  updateForm = (key, value) => {
    const { form } = this.state;

    if (key === 'username') {
      this.props.usernameCheck({username: value});
    }

    form[key] = value;
    this.setState({ form });
  }

  submitForm = () => {
    this.props.createUserProfile(this.state.form);
  }

  render() {

    return (
      <div className="row mx-auto create-profile justify-content-center">
        <div className="card border-0">
          <div className="card-body">
            <h2 className="card-title text-primary mb-3 text-center">Create A New Profile</h2>
            <StepWizard>
              <Name form={this.state.form} update={this.updateForm}/>
              <Username form={this.state.form} update={this.updateForm}/>
              <Bio form={this.state.form} update={this.updateForm}/>
              <Finish form={this.state.form} submit={this.submitForm}/>
            </StepWizard>
          </div>
        </div>
      </div>
    )
  }
}

const Stats = ({
  nextStep,
  previousStep,
  totalSteps,
  step,
  validated
}) => (
  <div>
      <hr />
      {/* {
        validated === false &&
        <button className='btn btn-primary btn-block' onClick={nextStep} disabled>Continue</button>
      } */}
      { step < totalSteps ?
        (
          validated === false ?
          <button className='btn btn-primary btn-block' onClick={nextStep} disabled>Continue</button>
          :
          <button className='btn btn-primary btn-block' onClick={nextStep}>Continue</button>
        )
        :
        (
          validated === false ?
          <button className='btn btn-success btn-block' onClick={nextStep} disabled>Finish</button>
          :
          <button className='btn btn-success btn-block' onClick={nextStep}>Finish</button>
        )
      }
      { step > 1 &&
          <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
      }
  </div>
);

class Name extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
    };
  }

  update = (e) => {
    this.props.update(e.target.name, e.target.value);

    if (this.props.form.firstName && this.props.form.lastName) {
      if (this.props.form.firstName.replace(/\s/g, "").length > 1 && this.props.form.lastName.replace(/\s/g, "").length > 1) {
        this.setState({
          validated: true,
        })
      }
      else {
        this.setState({
          validated: false,
        })
      }
    }
    else {
      this.setState({
        validated: false,
      })
    }
  }

  render() {

      return (
          <div className="wizard-item">
              <p className="text-center">Before you have a look around, <br />could you tell us a few extra details</p>
              <div className="wizard-item-form">
                <input
                  type='text'
                  className='form-control my-3'
                  name='firstName'
                  placeholder='First Name'
                  autoComplete="off"
                  onBlur={this.update}
                  onChange={this.update} />
                <input
                  type='text'
                  className='form-control my-3'
                  name='lastName'
                  placeholder='Last Name'
                  autoComplete="off"
                  onBlur={this.update}
                  onChange={this.update} />
                  {!this.state.validated ? <small>Names must be longer than 2 characters</small> : null}
                <Stats step={1} {...this.props} validated={this.state.validated}/>
              </div>
          </div>
      );
  }
}

class Username extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      string: false,
      usernameMatch: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.form.usernameErrors !== this.props.form.usernameErrors){
      if (this.props.form.usernameErrors) {
        this.setState({
          ...this.state.form,
          validated: false,
          usernameMatch: true,
        });
      }
      else {
        this.setState({
          ...this.state.form,
          validated: true,
          usernameMatch: false,
        });
      }
    }
  }

  update = (e) => {
    this.props.update(e.target.name, e.target.value.toLowerCase());
    if (this.props.form.usernameErrors){
      this.setState({
        ...this.state.form,
        validated: false,
        string: true,
      });
    }
    else if (this.props.form.username) {
      if (this.props.form.username.replace(/\s/g, "").length < this.props.form.username.length) {
        this.setState({
          ...this.state.form,
          validated: false,
          string: true,
        });
      }
      else {
        if (this.props.form.username.length > 4 && this.props.form.username.length < 16) {
          this.setState({
            ...this.state.form,
            validated: true,
            string: false,
          });
        }
        else {
          this.setState({
            ...this.state.form,
            validated: false,
            string: false,
          });
        }
      }
    }
    else {
      this.setState({
        ...this.state.form,
        validated: false,
        string: false,
      })
    }
  }

  render() {
    return (
      <div className="wizard-item">
        <div className="wizard-item-form">
        <p className="text-center m-0">Please enter a username for your user. <br /></p>
        <p className="text-center m-0">www.@todo.com/user/<strong>{this.props.form.username}</strong></p>
          <input
            type='text'
            className='form-control my-3'
            name='username'
            placeholder='Username'
            autoComplete="off"
            onBlur={this.update}
            onChange={this.update} />
            {
              !this.state.validated && !this.state.usernameMatch && !this.state.string 
                ? <small>Names must be between 5 and 15 characters</small> 
                : null
            }
            {this.state.string ? <small>Names cannot contain a space</small> : null}
            {this.state.usernameMatch ? <small>This username is already taken</small> : null}
          <Stats step={2} {...this.props} validated={this.state.validated} />
        </div>
      </div>
    );
  }
}

class Bio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
    };
  }

  update = (e) => {
    this.props.update(e.target.name, e.target.value);

    if (this.props.form.bio) {
      if (this.props.form.bio.replace(/\s/g, "").length > 3) {
        this.setState({
          validated: true,
        })
      }
      else {
        this.setState({
          validated: false,
        })
      }
    }
    else {
      this.setState({
        validated: false,
      })
    }
  }

  render() {
    return (
      <div className="wizard-item">
        <div className="wizard-item-form">
          <p className='text-center'>Why not tell us a bit about yourself</p>
          <textarea
            className='form-control my-3'
            name='bio'
            placeholder='Bio'
            autoComplete="off"
            onBlur={this.update}
            onChange={this.update} />
            {this.props.form.bio ? <small><strong>{this.props.form.bio.length}</strong>/280</small> : <small><strong>0</strong>/280</small>}
          <Stats step={3} {...this.props} validated={this.state.validated}/>
        </div>
      </div>
    );
  }
}

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
    };
  }

  submit = () => {
    this.props.submit();
  }

  render() {
    return (
      <div className="wizard-item">
        <div className="wizard-item-form">
          <div className={'text-center'}>
            <p>Welcome to Huffet <strong>{this.props.form.firstName ? this.props.form.firstName : ''} {this.props.form.lastName ? this.props.form.lastName : ''}</strong></p>
            <p>Are you happy with the username <strong>{this.props.form.username ? this.props.form.username : ''}</strong>?</p>
            <small className="mt-2">If you would like to change any of you information, please use the 'Go Back' Button. Otherwise, click the 'Finish' button below to begin using Huffet.</small>
          </div>
          <Stats step={4} {...this.props} nextStep={this.submit}/>
        </div>
      </div>
    );
  }
}

CreateProfilePrompt.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  usernameCheck: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { createUserProfile, usernameCheck })(withRouter(CreateProfilePrompt));
