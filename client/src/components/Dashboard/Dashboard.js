import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

import _ from 'lodash';

// Import Components
import LinkTableRow from './LinkTableRow';

// Import Actions
import { getAllLinks } from '../../actions/link';
import CustomBar from '../Graphs/CustomBar';
import CustomLine from '../Graphs/CustomLine';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitDays: 7,
      copied: false,
    };
  }

  componentDidMount() {
    this.props.getAllLinks();
  }


  selectChange = (value, type) => {
    if (type === "visitDays" ) {
      this.setState({visitDays: value});
    }
    else if (type === "sourceDays" ) {
      this.setState({sourceDays: value});
    }
  }

  render() {

    // Heatmap data
    var heatData = [];

    // Graph data
    let clickLabelsToSend = [];
    let clickDataToSend = [];
    let browserLabels = [];
    let browserData = [];
    let deviceLabels = [];
    let deviceData = [];
    let osLabels = [];
    let osData = [];

    // Create Table
    let rows = null;
    let totalLinks = 0;
    let totalClicks = 0;
    let averageLinkClick = 0;
    let uniqueVisitors = 0;
    let heatDataFinal = [];
    let higgestClickCount = 0;
    let obj;

    // Get the date from 7 days ago.
    let d = new Date();
    let sevenDays = d.setDate(d.getDate() - 7);
    var oneWeekAgo = new Date(sevenDays).toISOString();

    if (this.props.link.AllLinks && this.props.link.loading === false) {

      let browser = [];
      let device = [];
      let os = [];
      let ip = [];

      rows = this.props.link.AllLinks.map((link, index) => {

        link.clicks.forEach(click => {
          browser.push(click);
          device.push(click);
          os.push(click);
          ip.push(click);
        });

        let clickThisWeek = [];

        // Get all the clicks within the last week
        link.clicks.forEach(click => {
          if(oneWeekAgo <= click.date) {
            clickThisWeek.push({"date": click.date.substring(0, 10)});
          }
        })

        let avgClickPerDay = (clickThisWeek.length / 7).toFixed(2);

        // Create graph data for each row
        let graphData = _.groupBy(clickThisWeek, "date");

        let dataToSend = [];

        for (let i = 6; i >= 0; i--) {
          let date = new Date();
          date.setDate(date.getDate() - i);
          var dateCheck = new Date(date).toISOString();

          if (graphData[dateCheck.substring(0, 10)]) {
            dataToSend.push(graphData[dateCheck.substring(0, 10)].length);
          }
          else {
            dataToSend.push(0);
          }
        }

        // Set the graph color based on if the data has improved
        let graphColor;
        if (dataToSend[0] > dataToSend[6]){
          graphColor = "#E60023";
        }
        else if (dataToSend[0] < dataToSend[6]){
          graphColor = "#2CB85C";
        }
        else {
          graphColor = "#F9B112";
        }

        for (let i = this.state.visitDays - 1; i >= 0; i--) {
          let date = new Date();
          date.setDate(date.getDate() - i);
          var dateCheck2 = new Date(date).toISOString();
  
          if (graphData[dateCheck2.substring(0, 10)]) {
            if (!clickDataToSend[dateCheck2.substring(0, 10)]) {
              clickDataToSend[dateCheck2.substring(0, 10)] = graphData[dateCheck2.substring(0, 10)].length;
            }
            else {
              clickDataToSend[dateCheck2.substring(0, 10)] = clickDataToSend[dateCheck2.substring(0, 10)] + graphData[dateCheck2.substring(0, 10)].length;
            }
          }
          else {
            if (!clickDataToSend[dateCheck2.substring(0, 10)]) {
              clickDataToSend[dateCheck2.substring(0, 10)] = 0;
            }
            else {
              clickDataToSend[dateCheck2.substring(0, 10)] = clickDataToSend[dateCheck2.substring(0, 10)] + 0;
            }
          }
          
        }

        // Return the link table row with its content
        return (
        <LinkTableRow
          shortLink={link.shortLink}
          longLink={link.longLink}
          data={dataToSend}
          date={link.date}
          clickCount={link.clicks.length}
          avgClickPerDay={avgClickPerDay}
          graphColor={graphColor}
          active={link.active}
          key={index}
          />
        )
      });

      console.log(Object.values(clickDataToSend));
      console.log(clickLabelsToSend);

      let browserGraphBuilder = _.groupBy(browser, "clientName");
      let deviceGraphBuilder = _.groupBy(device, "deviceType");
      let osGraphBuilder = _.groupBy(os, "os");

      Object.keys(browserGraphBuilder).forEach(key => {
        browserLabels.push(key);
        browserData.push(browserGraphBuilder[key].length);
      })

      Object.keys(deviceGraphBuilder).forEach(key => {
        deviceLabels.push(key);
        deviceData.push(deviceGraphBuilder[key].length);
      })

      Object.keys(osGraphBuilder).forEach(key => {
        osLabels.push(key);
        osData.push(osGraphBuilder[key].length);
      })


      let uniqueVisitorsBuilder = _.groupBy(ip, "ip");
      uniqueVisitors = Object.keys(uniqueVisitorsBuilder).length;

      // Return a new link prompt if now links created
      if (rows.length < 1) {
        rows = (
          <tr>
            <td colSpan="7" className="text-center">
              <p>No Data</p>
              <p>Create a new link <a href="/new">here</a></p>
            </td>
          </tr>
        )
      }

      // Push the date of each link click to array
      this.props.link.AllLinks.forEach(link => {
        link.clicks.forEach(click => {
          heatData.push({date: click.date.substring(0, 10)})
        });
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

      // Determine the total amount of clicks for all links the user owns
      this.props.link.AllLinks.forEach(link => {
        totalClicks = totalClicks + link.clicks.length;
      });
      
      // Gather the total amount of links the user owns
      totalLinks = this.props.link.AllLinks.length;

      // Average clicks calculation
      averageLinkClick = totalClicks / totalLinks;

    }

    return (

      <div className="shrincc-wrapper pb-5">
        {/* Sub header with breadcrumbs */}
        <header className="border-top">
          <ol className="breadcrumb bg-white border-0 rounded-0 m-0">
            <li className="breadcrumb-item active pl-5">Dashboard</li>
          </ol>
        </header>

        {/* First row of cards */}
        <div className="px-md-5 px-1 mt-4">
          <div className="card-group shadow mb-4 mx-md-0 mx-4 bg-white">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{totalLinks}</h4><small className="text-muted text-uppercase font-weight-bold">Links Created</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Visitors */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{totalClicks}</h4><small className="text-muted text-uppercase font-weight-bold">Clicks</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Unique Visitors */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{uniqueVisitors}</h4><small className="text-muted text-uppercase font-weight-bold">Unique Visitors</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            {/* Click Per Link */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <h4>{averageLinkClick > 0 ? averageLinkClick.toFixed(2) : 0}</h4><small className="text-muted text-uppercase font-weight-bold">Avg. Click Per Link</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-primary w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-md-5 px-1 mt-1">
          <div className="card border-0 shadow mx-md-0 mx-4" id="dashboard-table">
            <div className="card-body pb-0">
              <div className="text-muted text-center">
                <table className="table table-responsive-sm table-outline mb-0">
                  <thead className="thead-white border-0">
                    <tr>
                      <th>Site</th>
                      <th></th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Usage <small>(Last 7 days)</small></th>
                      <th className="text-center">Avg. Click Per Day <small>(Last 7 days)</small></th>
                      <th>Total visits</th>
                      <th>View Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
                <p className="my-2">
                  <a href="/my-links">View All Links</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-md-row flex-column justify-content-center px-md-5 px-1 mt-1">
          <div className="graph-width card-group shadow mt-3 mr-md-2 mx-md-0 mx-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4 text-center">
                <div className="d-flex justify-content-between pb-3">
                  <div className="text-left">
                    <h4 className="m-0">Visits</h4>
                    <small className="text-light">Visits made in the past {this.state.visitDays} days</small>
                  </div>
                </div>
                <div>
                  <CustomLine data={Object.values(clickDataToSend)} labels={Object.keys(clickDataToSend)} graphColor={"#00beff"}/>
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
                <div>
                  <CustomBar data={browserData} labels={browserLabels}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Heatmap */}
        <div className="px-5 mt-1 mt-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="c-chart-wrapper">
                <div className="text-left pb-">
                  <h4 className="m-0">Daily Heatmap</h4>
                  <small className="text-light">Daily Heatmap based on visits</small>
                </div>
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
      </div>
    )
  }
}

Dashboard.propTypes = {
  getAllLinks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});

export default connect(mapStateToProps, { getAllLinks })(withRouter(Dashboard));

