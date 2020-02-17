import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line, Bar } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Import Actions
import { getIndividualLink } from '../../actions/link';

const swal = withReactContent(Swal);

class IndividualLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  componentDidMount() {
    this.props.getIndividualLink(this.props.match.params.linkId);
  }

  CopyText = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText("http://localhost:3000/shrincc/" + this.props.link.currentLink.shortLink)

    // Change copied text
    this.setState({
      copied: true
    })

    swal.fire({
      title: 'Link Copied!',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <>
          <p>The link <span className="text-primary">{"http://localhost:3000/shrincc/" + this.props.link.currentLink.shortLink}</span> has been copied to your clipboard'</p>
          <Okay />
        </>
      )
    })
  }

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
        }]
      }
    }

    let shortLink;
    let linkImage;
    let linkLocaiton;
    if (this.props.link.currentLink && this.props.link.loading === false) {
      shortLink = (
        <a href={"http://localhost:3000/shrincc/" + this.props.link.currentLink.shortLink}>
          {"https://shrin.cc/" + this.props.link.currentLink.shortLink}
        </a>
      );

      // create favicon and linklocation from the LongLink
      var a = document.createElement('a');
      a.href = this.props.link.currentLink.longLink;
      let favicon = a['protocol'] + "//" + a['hostname'] + "/favicon.ico";
      linkLocaiton = a['hostname'];

      linkImage = (
        <img className="favicon-image mr-2" src={favicon} alt={favicon} />
      )
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
        <div className="px-md-5 px-1 mt-4">
          <div className="card-group shadow mb-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  {linkImage}
                  <h3 className="m-0 p-0">{linkLocaiton}</h3>
                </div>
                <h5 className="m-0 p-0">
                  {shortLink}
                  &nbsp;|&nbsp;
                  <span className="cursor-pointer" onClick={this.CopyText}>
                    {this.state.copied ? "Copied" : "Copy"}
                  </span>
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
                <div className="text-value-lg">[INT]</div><small className="text-muted text-uppercase font-weight-bold">Active</small>
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
                <h4>Visits this week</h4>
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
                <h4>Traffic Source</h4>
                <div >
                  <Bar data={data} options={options} height={200}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 mt-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="c-chart-wrapper">
                <h4>Daily Click Heatmap</h4>
                <div className="px-5">
                  <CalendarHeatmap
                    startDate={new Date('2020-01-01')}
                    endDate={new Date('2020-12-31')}
                    showOutOfRangeDays={true}
                    values={[
                      { date: '2016-01-01' },
                      { date: '2016-01-22' },
                      { date: '2016-01-30' },
                      // ...and so on
                    ]}
                    onClick={(value) => {
                      console.log(value);
                    }}
                  />
                  <ReactTooltip />
                </div>
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

IndividualLink.propTypes = {
  getIndividualLink: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});

export default connect(mapStateToProps, { getIndividualLink })(withRouter(IndividualLink))