import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CalendarHeatmap from 'react-calendar-heatmap';
import { Line, Doughnut } from 'react-chartjs-2';
import 'react-calendar-heatmap/dist/styles.css';

import { GroupBy } from 'react-lodash'
import _ from 'lodash';

// Import Components
import LinkTableRow from './LinkTableRow';

// Import Actions
import { getAllLinks } from '../../actions/link';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getAllLinks();
  }

  render() {
    // React-Chart.js Dummy Data
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#321fdb',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
         display: false
      },
      scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }],
        yAxes: [{
            gridLines: {
                // drawOnChartArea: false
            }
        }]
      }
    }

    const doughnutData = {
      labels: [
        'Mobile',
        'Tablet',
        'Desktop'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#e55353',
        '#2eb85c',
        '#2f92f6'
        ],
        hoverBackgroundColor: [
        '#e52727',
        '#09a53d',
        '#007fff'
        ]
      }]
    };

    const doughnutOptions = {
      legend: {
         display: false
      }
    }

    // Heatmap data
    var heatData = [];

    // Create Table
    let HeatMap;
    let rows = null;
    let totalLinks = 0;
    let totalClicks = 0;
    let heatDataFinal = [];
    let higgestClickCount = 0;
    let obj;

    if (this.props.link.AllLinks && this.props.link.loading === false) {
      rows = this.props.link.AllLinks.map((link, index) => {
       return (
        <LinkTableRow
          shortLink={"https://shrin.cc/" + link.shortLink}
          data={[23,45,36,17,24]}
          linkType="Social Media"
          date={link.date}
          clickCount={link.clicks.length}
          active={false}
          key={index}
          />
       )
      });

      totalLinks = this.props.link.AllLinks.length;

      this.props.link.AllLinks.forEach(link => {
        totalClicks = totalClicks + link.clicks.length;
      });

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
          higgestClickCount = nextHeatData[click].length
        }
        heatDataFinal.push(obj);
      });


    }

    return (


      <div className="c-wrapper">
        {/* Sub header with breadcrumbs */}
        <header className="c-header c-header-light">
          <div className="c-subheader px-3">
            <ol className="breadcrumb border-0 m-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item"><a href="#">Admin</a></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </header>

        {/* First row of cards */}
        <div className="px-md-5 px-1 mt-5">
          <div className="card-group shadow mb-4">
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">{totalLinks}</div><small className="text-muted text-uppercase font-weight-bold">Links Created</small>
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
                <div className="text-value-lg">{totalClicks}</div><small className="text-muted text-uppercase font-weight-bold">Visitors</small>
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

        <div className="px-md-5 px-1 mt-3">
          <div className="card border-0 shadow" id="dashboard-table">
            <div className="card-body py-4">
              <div className="text-muted text-right mb-4">
                <table className="table table-responsive-sm table-hover table-outline mb-0">
                  <thead className="thead-white border-0">
                    <tr>
                      <th className="text-center">Image</th>
                      <th >User</th>
                      <th className="text-center">Active</th>
                      <th className="text-center">Usage</th>
                      <th className="text-center">Avg. Click Rate</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Heatmap */}
        <div className="px-5 mt-3">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="c-chart-wrapper">
                <h3>Daily Click Heatmap</h3>
                <div className="px-5">
                  <CalendarHeatmap
                    startDate={new Date('2020-01-01')}
                    endDate={new Date('2020-12-31')}
                    showOutOfRangeDays={true}
                    values={heatDataFinal}
                    classForValue={(value) => {
                      console.log(higgestClickCount);
                      if (!value) {
                        return 'color-empty';
                      }
                      if (value.count < 5) {
                        return `color-scale-${value.count}`;
                      }
                      return `color-scale-large`;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="d-flex justify-content-between px-5 mt-3">
          <div className="card border-0 w-50 mr-4 shadow">
            <div className="card-body">
              <div className="c-chart-wrapper">
                <h3>Click By Month</h3>
                <Line data={data} options={options}/>
              </div>
            </div>
          </div>
          <div className="card border-0 w-50 ml-4 shadow">
            <div className="card-body">
              <div className="c-chart-wrapper">
                <h3>Click By Month</h3>
                <Doughnut data={doughnutData} options={doughnutOptions}/>
              </div>
            </div>
          </div>
        </div> */}
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

