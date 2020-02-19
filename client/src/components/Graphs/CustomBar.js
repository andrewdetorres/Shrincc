import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';

export default class CustomBar extends Component {
  render() {

    const data = {
      labels: this.props.labels,
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: this.props.graphColor,
          pointRadius: 0,
          data: this.props.data,
          backgroundColor: [
            "#e55353",
            "#2eb85c",
            "#3299ff",
            "#f9b115",
            "#aa64d6",
          ],
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
        <Bar data={data} options={options} height={200}/>
      </>
    )
  }
}
