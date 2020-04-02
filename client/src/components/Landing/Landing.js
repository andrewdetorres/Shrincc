import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Landing extends Component {
  render() {
    return (
      <>
        {/* HEADER */}
        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-container text-md-left text-center pb-md-0 pb-3">
                    <h1><span className="text-primary">Shrincc</span> Helps Shorten URL's and Track <span className="text-primary">Advanced Analytics</span></h1>
                    <p className="p-large">Using Shrincc can help you track the usage of your links, recording browser type, device type and more...</p>
                    <a className="btn btn-primary text-white px-4" href="/register">JOIN TODAY</a>
                  </div> 
                </div> 
                <div className="col-md-6">
                  <div className="image-container">
                    <img className="img-fluid" src={require('../../assets/img/Business_SVG.svg')} alt="alternative" />
                  </div> 
                </div> 
              </div> 
            </div> 
          </div>
        </header>

        {/* FEATURES */}
        <div id="features" className="features-container py-5">
          <div className="container-fluid">
            <div className="d-flex">
              <div className="text-center mx-auto col-md-6 pb-3">
                <h2><span className="text-primary"><strong>Improve Your Links With Shrincc</strong></span></h2>
                <p className="p-heading p-large">Shrincc allows you to create shortlinks and alayse the data seemlessly, creating the ultimate shortlink experience.</p>
              </div>
            </div> 
            <div className="d-flex container-fluid flex-md-row flex-column justify-content-around align-items-center align-items-md-stretch mb-3">
              <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0" style={{"width": "275px"}}>
                <div className="card-body text-center align-items-center d-flex flex-column justify-content-between">
                  <img className="card-img-top py-4 features justify-self-start" src={require('../../assets/img/Business_SVG.svg')} alt="Card" />
                  <h5 className="card-title">Analyse Link usage</h5>
                  <p className="card-text">Analyse all of the date of your links using multiple data points.</p>
                </div>
              </div>
              <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0" style={{"width": "275px"}}>
                <div className="card-body text-center align-items-center d-flex flex-column justify-content-between">
                  <img className="card-img-top py-4 features" src={require('../../assets/img/Coding_SVG.svg')} alt="Card" />
                  <h5 className="card-title">Unlimited Links</h5>
                  <p className="card-text">Create as many short links as you need.</p>
                </div>
              </div>
              <div className="card shadow border-0 py-3 mx-lg-0 mx-2 my-3 my-md-0" style={{"width": "275px"}}>
                <div className="card-body text-center align-items-center d-flex flex-column justify-content-between">
                  <img className="card-img-top py-4 features" src={require('../../assets/img/Search_SVG.svg')} alt="Card" />
                  <h5 className="card-title">Target Your Audiance</h5>
                  <p className="card-text">Track your links and traget your audience more accurately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-2 basic-background-1 py-md-5 py-2">
          <div className="container">
            <div className="d-flex flex-md-row flex-column-reverse">
              <div className="col-lg-6">
                <div className="image-container">
                  <img className="img-fluid" src={require('../../assets/img/Coding_SVG.svg')} alt="alternative" />
                </div> 
              </div> 
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <div className="text-container text-md-left text-center pb-md-0 pb-3">
                  <h2><span className="text-primary"><strong>Learn more about your audiance than ever before</strong></span></h2>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <div className="media-body">
                        <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                        Geographical Data.
                      </div>
                    </li>
                    <li className="media">
                      <div className="media-body">
                        <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                        Browser Type.
                      </div>
                    </li>
                    <li className="media">
                      <div className="media-body">
                        <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                        Refferals.
                      </div>
                    </li>
                    <li className="media">
                      <div className="media-body">
                        <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                        Device Type.
                      </div>
                    </li>
                    <li className="media">
                      <div className="media-body">
                        <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                        Plus Many More Data Points.
                      </div>
                    </li>
                  </ul>
                  <a className="btn btn-primary text-white px-4" href="/register">JOIN TODAY</a>
                </div>
              </div> 
            </div>
          </div>
        </div>

        <div id="pricing" className="cards-2">
          <div className="d-flex">
            <div className="text-center mx-auto col-6 pb-3">
              <h2><span className="text-primary"><strong>Multiple Pricing Options</strong></span></h2>
              <p className="p-heading p-large">
                Currently our free option is available to all users. 
                However, we are always updating our features and hope to have our Premium and Enterprise options available soon.
                </p>
            </div>
          </div> 
          <div className="d-flex container-fluid flex-md-row flex-column justify-content-around align-items-center align-items-md-stretch mb-3">
            <div className="card mx-3">
              <div className="card-body">
                <div className="card-title">Basic</div>
                <div className="card-subtitle">Just to see what can be achieved</div>
                <hr className="cell-divide-hr" />
                <div className="price">
                  <span className="value">Free</span>
                  <div className="frequency">monthly</div>
                </div>
                <hr className="cell-divide-hr" />
                <ul className="list-unstyled li-space-lg">
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Unlimited Shortlinks</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Basic overview analytics</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Individual Link Insight</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Advanced Link Insight</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Group and Tag Links</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Custom URL's</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Export Data</div>
                  </li>
                </ul>
              </div>
            </div> 

            <div className="card mx-3">
              <div className="label">
                <p className="best-value">Coming Soon</p>
              </div>
              <div className="card-body">
                <div className="card-title">Premium</div>
                <div className="card-subtitle">For busy individuals</div>
                <hr className="cell-divide-hr" />
                <div className="price">
                  <span className="currency">$</span><span className="value">11.99</span>
                  <div className="frequency">monthly</div>
                </div>
                <hr className="cell-divide-hr" />
                <ul className="list-unstyled li-space-lg">
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Unlimited Shortlinks</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Basic overview analytics</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Individual Link Insight</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Advanced Link Insight</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Group and Tag Links</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Custom URL's</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'times']} height="20px" className="mr-2 text-danger"/>
                    <div className="media-body">Export Data</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card mx-3">
              <div className="label">
                <p className="best-value">Coming Soon</p>
              </div>
              <div className="card-body">
                <div className="card-title">Enterprise</div>
                <div className="card-subtitle">Must have for large companies</div>
                <hr className="cell-divide-hr" />
                <div className="price">
                  <span className="currency">$</span><span className="value">25.99</span>
                  <div className="frequency">monthly</div>
                </div>
                <hr className="cell-divide-hr" />
                <ul className="list-unstyled li-space-lg">
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Unlimited Shortlinks</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Basic overview analytics</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Individual Link Insight</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Advanced Link Insight</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Group and Tag Links</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Custom URL's</div>
                  </li>
                  <li className="media">
                    <FontAwesomeIcon icon={['fa', 'check']} height="20px" className="mr-2 text-primary"/>
                    <div className="media-body">Export Data</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> 
      </>
    )
  }
}

export default Landing;
