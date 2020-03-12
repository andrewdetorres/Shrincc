import React, { Component } from 'react'

class Landing extends Component {
  render() {

    var d = new Date();
    var copyrightDate = d.getFullYear();

    return (
      <>
      <div className="masthead container-fluid d-flex flex-md-row flex-column justify-content-center align-items-center pb-5">
        <div className="landing-text text-dark">
          <h1>Shrincc lets you shorten your URL's and track analytics</h1>
          <h6>Using Shrincc can help you track the usage of your links, recording browser type, device type and more...</h6>
        </div>
        <div className="landing-background" style={{"backgroundImage": `url(${require('../../assets/img/Startup_SVG.svg')})`}}>
        </div>
      </div>
      <div className="d-flex container-fluid flex-md-row flex-column justify-content-center align-items-center align-items-md-stretch p-5">
        <div className="card shadow border-0 py-3 mx-lg-5 mx-2 my-3 my-md-0" style={{"width": "300px"}}>
          <div className="card-body text-center">
            <img class="card-img-top py-4 features" src={require('../../assets/img/Business_SVG.svg')} alt="Card" />
            <h5 className="card-title">Analyse Link usage</h5>
            <p className="card-text">Analyse all of the date of your links, down to the device type.</p>
          </div>
        </div>
        <div className="card shadow border-0 py-3 mx-lg-5 mx-2 my-3 my-md-0" style={{"width": "300px"}}>
          <div className="card-body text-center">
            <img class="card-img-top py-4 features" src={require('../../assets/img/Coding_SVG.svg')} alt="Card" />
            <h5 className="card-title">Multiple Links</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div className="card shadow border-0 py-3 mx-lg-5 mx-2 my-3 my-md-0" style={{"width": "300px"}}>
          <div className="card-body text-center">
            <img class="card-img-top py-4 features" src={require('../../assets/img/Search_SVG.svg')} alt="Card" />
            <h5 className="card-title">Target Your Audiance</h5>
            <p className="card-text">Track your links and traget your audience more accurately.</p>
          </div>
        </div>
      </div>

      <div className="d-flex container-fluid flex-md-row flex-column justify-content-center align-items-center p-5 my-5 bg-primary">
        <div className="landing-text text-center text-white px-md-5 px-3 py-3">
          <h1>Start tracking your links today</h1>
          <a href="/register" className="btn btn-white text-primary px-5">Sign Up</a>
        </div>
      </div>

      <div className="d-flex container-fluid flex-md-row flex-column justify-content-center align-items-stretch p-5">
        <div className="card shadow border-0 py-3 mx-lg-5 mx-2 my-3 my-md-0" style={{"min-width": "200px"}}>
          <div className="card-body align-items-center d-flex flex-column justify-content-between">
            <img class="card-img-top py-4 graph-examples" src={require('../../assets/img/line_example.png')} alt="Card" />
            <h5 className="card-title text-center">Card title</h5>
            <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div className="card shadow border-0 py-3 mx-lg-5 mx-2 my-3 my-md-0" style={{"min-width": "200px"}}>
          <div className="card-body align-items-center d-flex flex-column justify-content-between">
            <img class="card-img-top py-4 graph-examples" src={require('../../assets/img/heatmap_example.png')} alt="Card" />
            <h5 className="card-title text-center">Card title</h5>
            <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>  
      <footer class="page-footer font-small bg-primary pt-4">
        <div class="container-fluid text-center text-white text-md-left px-5">
          <div class="d-flex container-fluid flex-md-row flex-column justify-content-around align-items-stretch px-5">
            <div class="mb-md-0 mb-3">
              <h3 class="text-uppercase">Links</h3>
              <ul class="list-unstyled">
                <li>
                  <a href="#!" className="text-white">Features</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Articles</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Why Shrincc?</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Contact</a>
                </li>
              </ul>
            </div>
            <div class="mb-md-0 mb-3">
              <h3 class="text-uppercase">User</h3>
              <ul class="list-unstyled">
                <li>
                  <a href="#!" className="text-white">Login</a>
                </li>
                <li>
                  <a href="#!" className="text-white">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright text-center py-3 text-white">© {copyrightDate} Copyright - 
          <a href="https://shrincc.com/" className="text-white"> Shrincc.com</a>
        </div>
      </footer>
      </>
    )
  }
}

export default Landing;
