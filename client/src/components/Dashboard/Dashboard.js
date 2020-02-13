import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CalendarHeatmap from 'react-calendar-heatmap';
import { Line, Doughnut } from 'react-chartjs-2';
import 'react-calendar-heatmap/dist/styles.css';
import { nominalTypeHack } from 'prop-types';

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


    // React-Chart.js Dummy Data
    const data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    const data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    const data3 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: [65, 59, 40, 80, 81, 56, 55,]
        }
      ]
    };
    const data4 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: [65, 59, 55, 80, 81, 56, 40]
        }
      ]
    };
    const data5 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: [65, 59, 82, 81, 36, 55, 40]
        }
      ]
    };
    const data6 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: [ 56, 55, 40, 65, 59, 80, 81,]
        }
      ]
    };

    const options1 = {
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
            ticks: {
              display: false
            }
        }],
        yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
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
            {/* Links Created */}
            <div className="card border-0">
              <div className="card-body py-4">
                <div className="text-muted text-right mb-4">
                </div>
                <div className="text-value-lg">1238</div><small className="text-muted text-uppercase font-weight-bold">Links Created</small>
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
                <div className="text-value-lg">8,835</div><small className="text-muted text-uppercase font-weight-bold">Visitors</small>
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
                <div className="text-value-lg">7,508</div><small className="text-muted text-uppercase font-weight-bold">Unique Visitors</small>
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
                <div className="text-value-lg">8.34</div><small className="text-muted text-uppercase font-weight-bold">Avg. Click Per Link</small>
                <div className="progress progress-xs mt-3 mb-0">
                  <div className="progress-bar bg-danger w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-md-5 px-1 mt-3">
          <div className="card border-0 shadow">
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
                    <tr>
                      <td className="text-center">
                        <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-success"></span></div>
                      </td>
                      <td>
                        <div>[SHORT LINK]</div>
                        <div className="small text-muted"><span>[LINK TYPE]</span> | Registered: Jan 1, 2015</div>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={['far', 'check-circle']} height="20px" className="mr-2 text-success"/>
                      </td>
                      <td style={{"width":"100px"}}>
                        <div>
                          <Line data={data1} options={options1} height={50}/>
                        </div>
                      </td>
                      <td className="text-center">
                        <strong>5.67</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Click Count</div><strong>15143</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-danger"></span></div>
                      </td>
                      <td>
                        <div>[SHORT LINK]</div>
                        <div className="small text-muted"><span>Recurring</span> | Registered: Jan 1, 2015</div>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={['far', 'check-circle']} height="20px" className="mr-2 text-success"/>
                      </td>
                      <td style={{"width":"100px"}}>
                        <div>
                          <Line data={data2} options={options1} height={50}/>
                        </div>
                      </td>
                      <td className="text-center">
                        <strong>5.67</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Click Count</div><strong>4123</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-warning"></span></div>
                      </td>
                      <td>
                        <div>[SHORT LINK]</div>
                        <div className="small text-muted"><span>[LINK TYPE]</span> | Registered: Jan 1, 2015</div>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={['far', 'check-circle']} height="20px" className="mr-2 text-success"/>
                      </td>
                      <td style={{"width":"100px"}}>
                        <div>
                          <Line data={data3} options={options1} height={50}/>
                        </div>
                      </td>
                      <td className="text-center">
                        <strong>5.67</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Click Count</div><strong>213</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-secondary"></span></div>
                      </td>
                      <td>
                        <div>[SHORT LINK]</div>
                        <div className="small text-muted"><span>[LINK TYPE]</span> | Registered: Jan 1, 2015</div>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={['far', 'check-circle']} height="20px" className="mr-2 text-success"/>
                      </td>
                      <td style={{"width":"100px"}}>
                        <div>
                          <Line data={data4} options={options1} height={50}/>
                        </div>
                      </td>
                      <td className="text-center">
                        <strong>5.67</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Click Count</div><strong>8743</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-success"></span></div>
                      </td>
                      <td>
                        <div>[SHORT LINK]</div>
                        <div className="small text-muted"><span>[LINK TYPE]</span> | Registered: Jan 1, 2015</div>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={['far', 'times-circle']} height="20px" className="mr-2 text-danger"/>
                      </td>
                      <td style={{"width":"100px"}}>
                        <div>
                          <Line data={data5} options={options1} height={50}/>
                        </div>
                      </td>
                      <td className="text-center">
                        <strong>5.67</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Click Count</div><strong>2186</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-danger"></span></div>
                      </td>
                      <td>
                        <div>[SHORT LINK]</div>
                        <div className="small text-muted"><span>[LINK TYPE]</span> | Registered: Jan 1, 2015</div>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={['far', 'check-circle']} height="20px" className="mr-2 text-success"/>
                      </td>
                      <td style={{"width":"100px"}}>
                        <div>
                          <Line data={data6} options={options1} height={50}/>
                        </div>
                      </td>
                      <td className="text-center">
                        <strong>5.67</strong>
                      </td>
                      <td>
                        <div className="small text-muted">Click Count</div><strong>1772</strong>
                      </td>
                    </tr>
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
        </div>
      </div>
    )
  }
}

export default Dashboard;
