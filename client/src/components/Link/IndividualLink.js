import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Import Actions
import { getIndividualLink, deleteLink } from '../../actions/link';

// Import Components
import CustomBar from '../Graphs/CustomBar';
import CustomLine from '../Graphs/CustomLine';

const swal = withReactContent(Swal);

class IndividualLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitDays: 7,
      avgClickDays: 7,
      copied: false,
    };
  }

  componentDidMount() {
    this.props.getIndividualLink(this.props.match.params.linkId);
  }

  componentDidUpdate(prevProps) {
   if(prevProps.link.currentLink !== this.props.link.currentLink) {
      if (this.props.link.currentLink === "") {
        this.props.history.push("/");
      }
   };
  }

  selectChange = (value, type) => {
    if (type === "visitDays" ) {
      this.setState({visitDays: value});
    }
  }

  addDefaultSrc(ev){
    ev.target.src = require("../../assets/img/default_favicon.png");
  }

  deleteConfirm = () => {
    swal.fire({
      title: 'Link Copied!',
      icon: 'error',
      showConfirmButton: false,
      html: (
        <>
          <p>Are you sure you wish to delete <span className="text-primary">{"https://shrin.cc/" + this.props.link.currentLink.shortLink}</span></p>
          <DeleteOkay 
            linkId={this.props.link.currentLink.shortLink}
            onClick={this.deleteLink}
          />
          <Close/>
        </>
      )
    })
  }

  deleteLink = (linkId) => {
    this.props.deleteLink(linkId);
    swal.fire({
      title: 'Deleted!',
      text: 'Your link has been deleted.',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <Okay />
      )
    })
    .then(() => {
      this.props.history.push('/');
    });
  }

  CopyText = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText("https://shrin.cc/" + this.props.link.currentLink.shortLink)

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
          <p>The link <span className="text-primary">{"https://shrin.cc/" + this.props.link.currentLink.shortLink}</span> has been copied to your clipboard'</p>
          <Okay />
        </>
      )
    })
  }

  render() {

    let shortLink;
    let linkImage;
    let linkTitle;
    let linkDescription;

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
    let dataToSend = [];
    let labelsToSend = [];
    let avgClickPerDay;

    let heatData = [];
    let heatDataFinal = [];
    let higgestClickCount = 0;
    let obj;

    // Get the date from 7 days ago.
    let d = new Date();
    let days = d.setDate(d.getDate() - this.state.visitDays);
    var daysAgo = new Date(days).toISOString();

    let dAvg = new Date();
    let daysAvg = dAvg.setDate(dAvg.getDate() - this.state.avgClickDays);
    var daysAgoAvg = new Date(daysAvg).toISOString();

    if (this.props.link.currentLink && this.props.link.loading === false) {

      const { currentLink } = this.props.link;

      let clicksCalc = [];

      // Get all the clicks based on visit days
      currentLink.clicks.forEach(click => {
        if(daysAgo <= click.date) {
          clicksCalc.push({"date": click.date.substring(0, 10)});
        }
      })

      // Create graph data for each row
      let graphData = _.groupBy(clicksCalc, "date");

      let avgClickCalc = [];
      
      // Get all the clicks based on visit days
      currentLink.clicks.forEach(click => {
        if(daysAgoAvg <= click.date) {
          avgClickCalc.push({"date": click.date.substring(0, 10)});
        }
      })

      avgClickPerDay = (avgClickCalc.length / this.state.avgClickDays).toFixed(2);

      for (let i = this.state.visitDays - 1; i >= 0; i--) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        var dateCheck = new Date(date).toISOString();

        if (graphData[dateCheck.substring(0, 10)]) {
          dataToSend.push(graphData[dateCheck.substring(0, 10)].length);
        }
        else {
          dataToSend.push(0);
        }
        labelsToSend.push(dateCheck.substring(5, 10));
      }

      // Set the short link value
      shortLink = (
        <a
          href={"https://shrin.cc/" + currentLink.shortLink}
          target="_blank"
          rel="noopener noreferrer"
          >
          {"https://shrin.cc/" + currentLink.shortLink}
        </a>
      );

      linkImage = (
        <img className="favicon-image mr-2" src={"https://www.google.com/s2/favicons?domain=" + currentLink.longLink} onError={this.addDefaultSrc} alt="favicon"/>
      )

      linkTitle = this.props.link.currentLink.title ? this.props.link.currentLink.title : "";

      linkDescription = this.props.link.currentLink.description ? this.props.link.currentLink.description : "";

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

      // Collect Heatmap data
      // Push the date of each link click to array
      currentLink.clicks.forEach(click => {
        heatData.push({date: click.date.substring(0, 10)})
      });

      // Group results by date
      let nextHeatData = _.groupBy(heatData, "date");

      // Iterate through array and build data structure for heatmap
      Object.keys(nextHeatData).forEach(click => {
        obj = {
          "date": click, "count": nextHeatData[click].length
        }
        if(nextHeatData[click].length > higgestClickCount) {
          higgestClickCount = nextHeatData[click].length;
        }
        heatDataFinal.push(obj);
      });

      // Get the Top Bar values
      active = "True";
      clicksTotal = currentLink.clicks.length;
      uniqueVisitors = Object.keys(uniqueVisitorsBuilder).length;
    }

    console.log(this.props.link.currentLink);

    return (
      <div className="shrincc-wrapper pb-5">
        {/* Sub header with breadcrumbs */}

        <header className="border-top">
          <ol className="breadcrumb bg-white border-0 rounded-0 m-0">
            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
            <li className="breadcrumb-item active">Link - {this.props.match.params.linkId}</li>
          </ol>
        </header>

        {/* First row of cards */}
        <div className="px-md-5 px-1 mt-4">
          <div className="card-group shadow mb-4 mx-md-0 mx-4 bg-white">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <p className="text-dark mt-2">
                  {linkImage} {linkTitle}
                </p>
                <h5 className="m-0 p-0">
                  {shortLink}
                  &nbsp;|&nbsp;
                  <span className="cursor-pointer" onClick={this.CopyText}>
                    {this.state.copied ? "Copied" : "Copy"}
                  </span>
                </h5>
                <p className="text-light mt-3 link-description">
                  {linkDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="card-group shadow mb-4 mx-md-0 mx-4 bg-white">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4 className={active ? "text-success" : "text-danger"}>{active ? "Active" : "Inactive"}</h4>
                <small className="text-muted text-uppercase font-weight-bold">Link Status</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Visitors */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{clicksTotal}</h4>
                <small className="text-muted text-uppercase font-weight-bold">Clicks</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Unique Visitors */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{uniqueVisitors}</h4>
                <small className="text-muted text-uppercase font-weight-bold">Unique Visitors</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Avg Clicks Per Day */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{avgClickPerDay}</h4>
                <small className="text-muted text-uppercase font-weight-bold">Avg. Clicks Per Day (last {this.state.avgClickDays} days )</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-md-row flex-column justify-content-center px-md-5 px-1">
          <div className="graph-width card-group shadow mt-3 mr-md-2 mx-md-0 mx-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="d-flex justify-content-between pb-3">
                <div className="text-left">
                  <h4 className="m-0">Visits</h4>
                  <small className="text-light">Visits made in the past {this.state.visitDays} days</small>
                </div>
                  <li className="list-unstyled my-auto mx-lg-2 py-2 py-lg-0 px-3 px-md-0">
                    <p className="nav-link dropdown-toggle cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.state.visitDays} days
                    </p>
                    <div className="dropdown-menu dropdown-menu-right border-top-0 rounded-0 p-0" aria-labelledby="navbarDropdown">
                      <p onClick={() => this.selectChange(7, "visitDays")} className="dropdown-item m-0" href="/">7 Days</p>
                      <p onClick={() => this.selectChange(14, "visitDays")} className="dropdown-item m-0" href="/">14 Days</p>
                      <p onClick={() => this.selectChange(30, "visitDays")} className="dropdown-item m-0" href="/">30 Days</p>
                    </div>
                  </li>
                </div>
                <div>
                  <CustomLine data={dataToSend} labels={labelsToSend} graphColor={"#00beff"}/>
                </div>
              </div>
            </div>
          </div>
          <div className="graph-width card-group shadow mt-3 ml-md-2 mx-md-0 mx-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="text-left pb-3">
                  <h4 className="m-0">Browser Type</h4>
                  <small className="text-light">Varied browsers based on visits</small>
                </div>
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
                <div className="px-5 py-3 heatmap-container">
                  <CalendarHeatmap
                    startDate={new Date('2020-01-01')}
                    endDate={new Date('2020-12-31')}
                    showOutOfRangeDays={true}
                    values={heatDataFinal}
                    classForValue={(value) => {
                      if (!value) {
                        return 'color-empty';
                      }
                      if (value.count <= ((higgestClickCount / 100) * 20)) {
                        return `color-scale-1`;
                      }
                      else if (value.count <= ((higgestClickCount / 100) * 40)) {
                        return `color-scale-2`;
                      }
                      else if (value.count <= ((higgestClickCount / 100) * 60)) {
                        return `color-scale-3`;
                      }
                      else if (value.count <= ((higgestClickCount / 100) * 80)) {
                        return `color-scale-4`;
                      }
                      else if (value.count <= ((higgestClickCount / 100) * 100)) {
                        return `color-scale-large`;
                      }
                    }}
                    tooltipDataAttrs={value => {
                      return {
                        "data-tip": `${(value.date ? "Date : " + value.date + " | ": "") + (value.count ? "Clicks : " + value.count : "")}`
                      };
                    }}
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
        <div className="d-flex flex-md-row flex-column justify-content-center px-md-5 px-1 mt-1">
          <div className="graph-width card-group shadow mt-3 mr-md-2 mx-md-0 mx-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="text-left pb-3">
                  <h4 className="m-0">Device Type</h4>
                  <small className="text-light">Varied device types based on visits</small>
                </div>
                <div >
                  <CustomBar data={deviceData} labels={deviceLabels}/>
                </div>
              </div>
            </div>
          </div>
          <div className="graph-width card-group shadow mt-3 ml-md-2 mx-md-0 mx-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="text-left pb-3">
                  <h4 className="m-0">Operating System</h4>
                  <small className="text-light">Varied operating system based on visits</small>
                </div>
                <div>
                  <CustomBar data={osData} labels={osLabels}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end px-md-5 px-1 mt-3">
          <button className="btn btn-danger" onClick={this.deleteConfirm}>Delete Link</button>
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

export const DeleteOkay = ({ linkId, onClick }) => (
  <button
    className="btn btn-error my-2"
    onClick={() => onClick(linkId)}
  >
    Delete
  </button>
)

export const Close = () => (
  <button
    className="btn btn-success my-2"
    onClick={() => swal.close()}
  >
    Close
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

export default connect(mapStateToProps, { getIndividualLink, deleteLink })(withRouter(IndividualLink))