import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';

export default class CustomPie extends Component {
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
        display: true,
        position: "right"
      },
      tooltips: {
        enabled: true
      }
    }

    return (
      <>
        <Pie data={data} options={options} height={200}/>
      </>
    )
  }
}
