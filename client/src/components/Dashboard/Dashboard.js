import React, { Component } from 'react';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
class Dashboard extends Component {
  
  render() {
    var heatData = [
      { date: '2020-01-01', count: 1 },
      { date: '2020-01-03', count: 4 },
      { date: '2020-01-06', count: 6 },
    ];

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
        <div className="px-md-5 px-1 my-5">
          <div className="card-group mb-4">
          <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">1238</div><small className="text-muted text-uppercase font-weight-bold">Links Created</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-warning w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">8,835</div><small className="text-muted text-uppercase font-weight-bold">Visitors</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-info w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">7,508</div><small className="text-muted text-uppercase font-weight-bold">Unique Visitors</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-success w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">8.34</div><small className="text-muted text-uppercase font-weight-bold">Avg. Click Per Link</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-danger w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5">
          <h3>Daily Click Heatmap</h3>
            <div className="px-5">
              <CalendarHeatmap
              startDate={new Date('2020-01-01')}
              endDate={new Date('2020-12-31')}
              showOutOfRangeDays={true}
              values={heatData}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                if (value.count < 5) {
                  return `color-scale-${value.count}`;
                }
                return `color-scale-large`;
              }}
            /></div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
