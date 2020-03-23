import React, { Component } from 'react'
import Footer from '../Navigation/Footer';

class Landing extends Component {
  render() {
    return (
      <>
        {/* Masthead */}
        <div className="container-fluid d-flex flex-md-row flex-column justify-content-center align-items-center p-5">
          <div className="landing-text text-dark text-center">
            <h1>Shrincc lets you shorten your URL's and track analytics</h1>
            <h6>Using Shrincc can help you track the usage of your links, recording browser type, device type and more...</h6>
            <a href="/register" className="btn btn-primary text-white mt-2">Join Today</a>
          </div>
        </div>

        {/* Features */}
        <div className="d-flex container-fluid flex-md-row flex-column justify-content-between align-items-center align-items-md-stretch p-5">
          <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0" style={{"width": "300px"}}>
            <div className="card-body text-center align-items-center d-flex flex-column justify-content-between">
              <img class="card-img-top py-4 features justify-self-start" src={require('../../assets/img/Business_SVG.svg')} alt="Card" />
              <h5 className="card-title">Analyse Link usage</h5>
              <p className="card-text">Analyse all of the date of your links, down to the device type.</p>
            </div>
          </div>
          <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0" style={{"width": "300px"}}>
            <div className="card-body text-center align-items-center d-flex flex-column justify-content-between">
              <img class="card-img-top py-4 features" src={require('../../assets/img/Coding_SVG.svg')} alt="Card" />
              <h5 className="card-title">Multiple Links</h5>
              <p className="card-text">Create as many short links as you need.</p>
            </div>
          </div>
          <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0" style={{"width": "300px"}}>
            <div className="card-body text-center align-items-center d-flex flex-column justify-content-between">
              <img class="card-img-top py-4 features" src={require('../../assets/img/Search_SVG.svg')} alt="Card" />
              <h5 className="card-title">Target Your Audiance</h5>
              <p className="card-text">Track your links and traget your audience more accurately.</p>
            </div>
          </div>
        </div>

        {/* Page Split */}
        <div className="strip-content d-flex container-fluid flex-md-row flex-column justify-content-center align-items-center p-5 mt-5 bg-primary">
          <div className="landing-text text-center text-white px-md-5 px-3 py-3">
            <h1>Start tracking your links today</h1>
            <a href="/register" className="btn btn-white text-primary px-5">Sign Up</a>
          </div>
        </div>

        {/* Tracking Features */}
        <h2 className="text-center mt-5">How do we display data?</h2>
        <div className="d-flex container-fluid flex-md-row flex-column justify-content-around align-items-stretch p-5 mt-2">
          <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0 col-md-5">
            <div className="card-body align-items-center d-flex flex-column justify-content-between">
              <h5 className="card-title text-center">Track user visits</h5>
              <img class="card-img-top py-4 graph-examples" src={require('../../assets/img/line_example.png')} alt="Card" />
              <p className="card-text text-center">Track the amount of visits you recieve for all your links, or even individual links</p>
            </div>
          </div>
          <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0 col-md-5">
            <div className="card-body align-items-center d-flex flex-column justify-content-between">
              <h5 className="card-title text-center">Daily Heatmap of Visits</h5>
              <img class="card-img-top py-4 graph-examples" src={require('../../assets/img/heatmap_example.png')} alt="Card" />
              <p className="card-text text-center">Have a daily overview of the visits you recieve through our daily heatmap.</p>
            </div>
          </div>
        </div>  

        <Footer />
      </>
    )
  }
}

export default Landing;
