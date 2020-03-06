import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <>
      <div className="masthead container-fluid d-flex flex-md-row flex-column justify-content-center align-items-center pb-5">
        <div className="landing-text text-dark">
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h1>
          <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
        </div>
        <div className="landing-background" style={{"backgroundImage": `url(${require('../../assets/img/Startup_SVG.svg')})`}}>
        </div>
      </div>
      <div className="d-flex container-fluid justify-content-center align-items-center py-5">
        <div className="card shadow border-0 py-3 mx-5" style={{"width": "18rem;"}}>
          <div className="card-body text-center">
            <img class="card-img-top py-4 features" src={require('../../assets/img/Startup_SVG.svg')} alt="Card image cap" />
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div className="card shadow border-0 py-3 mx-5" style={{"width": "18rem;"}}>
          <div className="card-body text-center">
            <img class="card-img-top py-4 features" src={require('../../assets/img/Startup_SVG.svg')} alt="Card image cap" />
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div className="card shadow border-0 py-3 mx-5" style={{"width": "18rem;"}}>
          <div className="card-body text-center">
            <img class="card-img-top py-4 features" src={require('../../assets/img/Startup_SVG.svg')} alt="Card image cap" />
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Landing;
