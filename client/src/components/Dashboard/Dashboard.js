import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const scale = scaleLog().base(Math.E);

class Dashboard extends Component {
  
  render() {

    const data = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J'],
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(230, 0, 35, 0.2)',
          borderColor: 'rgba(230, 0, 35, 0.5)',
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
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          },
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              display: true,
              drawOnChartArea: false,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 4,
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            display: false,
            autoSkip: true,
            gridLines: {
              display: true,
              drawOnChartArea: false,
            }
          },
        ],
      },
    }

    return (
      <div className="row mx-3" id="dashboard">
        <div class="col-md-4 col-lg-3 mx-auto mb-4">
          <div class="card border-0 shadow">
            <div class="card-body p-0">
              <div class="d-flex flex-column">
                <div class="my-auto p-3">
                  <h2 class="m-0">+ 1287</h2>
                  <p class="m-0 text-muted"><small>Monthly Click Rate</small>
                  </p>
                </div>
                <div class="my-auto text-center">
                  <div style={{"height":"150px", "width":"100%"}}>
                    <Line data={data} options={options} id="chart"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
