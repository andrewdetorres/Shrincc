import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

export default class CustomLine extends Component {
  render() {

    const data = {
      labels: this.props.labels,
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: this.props.graphColor,
          pointRadius: 1,
          data: this.props.data,
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
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
        enabled: true,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 10,
            autoSkip: true,
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return (
      <>
        <Line data={data} options={options} height={200}/>
      </>
    )
  }
}
