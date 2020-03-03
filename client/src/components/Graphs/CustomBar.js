import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';

class CustomBar extends React.Component {

  render() {

    let newChartist = new Chartist.Svg('circle');
    console.log(newChartist);

    var data = {
      labels: this.props.labels,
      series: [
        this.props.data
      ],
    };

    var options = {
      showPoint: true,
      showLine: true,
      showArea: false,
      fullWidth: true,
      showLabel: false,
      axisX: {
        showGrid: false,
        showLabel: true,
      },
      axisY: {
        showGrid: true,
        showLabel: true,
      },
      chartPadding: 10,
      height: '300px'
    };

    var type = 'Bar'

    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} className="test-chart"/>
      </div>
    )
  }
}

export default CustomBar;
// import React, { Component } from 'react'
// import { Bar } from 'react-chartjs-2';

// export default class CustomBar extends Component {
//   render() {

//     const data = {
//       labels: this.props.labels,
//       datasets: [
//         {
//           fill: false,
//           lineTension: 0.2,
//           borderColor: this.props.graphColor,
//           pointRadius: 0,
//           data: this.props.data,
//           backgroundColor: [
//             "#e55353",
//             "#2eb85c",
//             "#3299ff",
//             "#f9b115",
//             "#aa64d6",
//           ],
//         }
//       ]
//     };


//     const options = {
//       responsive: true,
//       maintainAspectRatio: true,
//       legend: {
//          display: false
//       },
//       tooltips: {
//            enabled: false
//       },
//       scales: {
//         xAxes: [{
//             gridLines: {
//               display: false
//             },
//         }],
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }

//     return (
//       <>
//         <Bar data={data} options={options} height={200}/>
//       </>
//     )
//   }
// }
