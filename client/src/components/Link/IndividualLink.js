import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';

class IndividualLink extends Component {
  render() {


    const data = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: this.props.graphColor,
          pointRadius: 0,
          data: [34,97,45,36,75,64,57]
        }
      ]
    };


    const options = {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
         display: false
      },
      tooltips: {
           enabled: false
      },
      scales: {
        xAxes: [{
            gridLines: {
              display: false
            },
            // ticks: {
            //   display: false
            // }
        }],
        yAxes: [{
            // gridLines: {
            //   display: false
            // },
            // ticks: {
            //   display: false
            // }
        }]
      }
    }



    return (
      <div className="c-wrapper">
        {/* Sub header with breadcrumbs */}
        <header className="c-header c-header-light">
          <div className="c-subheader px-3">
            <ol className="breadcrumb border-0 m-0">
              <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
              <li className="breadcrumb-item active">Link - {this.props.match.params.linkId}</li>
            </ol>
          </div>
        </header>

        {/* First row of cards */}
        <div className="px-md-5 px-1 mt-5">

          <div className="card-group shadow mb-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <img className="favicon-image mr-2" src="https://stackoverflow.com/favicon.ico" alt="[longUrl]favicon.ico" />
                  <h3 className="m-0 p-0">[Title]</h3>
                </div>
                <h5 className="m-0 p-0">
                  <a href="[shortLink]">[shortLink]</a>
                </h5>
              </div>
            </div>
          </div>
          <div className="card-group shadow mb-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">[INT]</div><small className="text-muted text-uppercase font-weight-bold">Links Created</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-warning w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Visitors */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">[INT]</div><small className="text-muted text-uppercase font-weight-bold">Clicks</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-info w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Unique Visitors */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">[INT]</div><small className="text-muted text-uppercase font-weight-bold">Unique Visitors</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Click Per Link */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">[INT]</div><small className="text-muted text-uppercase font-weight-bold">Avg. Click Per Link</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-danger w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center px-md-5 px-1">
          <div className="card-group shadow mb-4 mr-3 w-100">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div >
                  <Line data={data} options={options} height={200}/>
                </div>
              </div>
            </div>
          </div>
          <div className="card-group shadow mb-4 ml-3 w-100">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div >
                  <Line data={data} options={options} height={200}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

IndividualLink.propTypes = {
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});

export default connect(mapStateToProps, null)(withRouter(IndividualLink))