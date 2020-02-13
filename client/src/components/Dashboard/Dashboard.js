import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Line, Doughnut } from 'react-chartjs-2';
import 'react-calendar-heatmap/dist/styles.css';

class Dashboard extends Component {

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

    const doughnutData = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#e55353',
        '#2eb85c',
        '#2f92f6'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ]
      }]
    };

    const options = {
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

    // HEatmap Dummy Data
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
        <div className="px-md-5 px-1 mt-5">
          <div className="card-group shadow mb-4">
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
        <div className="px-5 mt-3">
          <div class="card border-0 shadow">
            <div class="card-body">
              <div class="c-chart-wrapper">
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
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between px-5 mt-3">
          <div class="card border-0 w-50 mr-4 shadow">
            <div class="card-body">
              <div class="c-chart-wrapper">
                <h3>Click By Month</h3>
                <Line data={data} options={options}/>
              </div>
            </div>
          </div>
          <div class="card border-0 w-50 mr-4 shadow">
            <div class="card-body">
              <div class="c-chart-wrapper">
                <h3>Click By Month</h3>
                <Doughnut data={doughnutData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
