import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line, Bar } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Import Actions
import { getIndividualLink } from '../../actions/link';

// Import Components
import CustomBar from '../Graphs/CustomBar';
import CustomPie from '../Graphs/CustomPie';

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
    navigator.clipboard.writeText("https://shrin.cc" + this.props.link.currentLink.shortLink)

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
          <p>The link <span className="text-primary">{"https://shrin.cc" + this.props.link.currentLink.shortLink}</span> has been copied to your clipboard'</p>
          <Okay />
        </>
      )
    })
  }

  render() {
    let shortLink;
    let linkImage;
    let linkLocaiton;

    // Graph data
    let browser = [];
    let device = [];
    let os = [];
    let ip = [];
    let browserLabels = [];
    let browserData = [];
    let deviceLabels = [];
    let deviceData = [];
    let osLabels = [];
    let osData = [];

    // Top Bar Values
    let active;
    let clicksTotal;
    let uniqueVisitors;
    let avgDaily;

    if (this.props.link.currentLink && this.props.link.loading === false) {
      
      const { currentLink } = this.props.link;

      // Set the short link value
      shortLink = (
        <a href={"https://shrin.cc" + currentLink.shortLink}>
          {"https://shrin.cc/" + currentLink.shortLink}
        </a>
      );

      // Create favicon and linklocation from the LongLink
      var a = document.createElement('a');
      a.href = currentLink.longLink;
      let favicon = a['protocol'] + "//" + a['hostname'] + "/favicon.ico";
      linkLocaiton = a['hostname'];

      linkImage = (
        <img className="favicon-image mr-2" src={favicon} alt={favicon} />
      )

      // Get the browser, device and OS data
      currentLink.clicks.forEach(click => {
        browser.push(click);
        device.push(click);
        os.push(click);
        ip.push(click);
      });

      let browserGraphBuilder = _.groupBy(browser, "clientName");
      let deviceGraphBuilder = _.groupBy(device, "deviceType");
      let osGraphBuilder = _.groupBy(os, "os");
      let uniqueVisitorsBuilder = _.groupBy(ip, "ip");
      
      Object.keys(browserGraphBuilder).forEach(key => {
        browserLabels.push(key);
        browserData.push(browserGraphBuilder[key].length);
      });

      Object.keys(deviceGraphBuilder).forEach(key => {
        deviceLabels.push(key);
        deviceData.push(deviceGraphBuilder[key].length);
      });

      Object.keys(osGraphBuilder).forEach(key => {
        osLabels.push(key);
        osData.push(osGraphBuilder[key].length);
      });
      
      // Get the Top Bar values
      active = "True";

      clicksTotal = currentLink.clicks.length;

      uniqueVisitors = Object.keys(uniqueVisitorsBuilder).length;
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
                <div className="text-value-lg">{active}</div><small className="text-muted text-uppercase font-weight-bold">Active</small>
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
                <div className="text-value-lg">{clicksTotal}</div><small className="text-muted text-uppercase font-weight-bold">Clicks</small>
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
                <div className="text-value-lg">{uniqueVisitors}</div><small className="text-muted text-uppercase font-weight-bold">Unique Visitors</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-success w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
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
                  <CustomPie data={deviceData} labels={deviceLabels}/>
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
                  <CustomBar data={browserData} labels={browserLabels}/>
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