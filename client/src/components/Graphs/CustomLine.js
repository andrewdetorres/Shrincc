import React, { Component } from 'react'
import { Chart, Line } from 'react-chartjs-2';

export default class CustomLine extends Component {

  componentWillMount() {
    // Chart.pluginService.register({
    //   afterDraw: function (chart, easing) {
    //     let ctx = chart.ctx;
    //     let _stroke = ctx.stroke;
    //     ctx.stroke = function() {
    //         ctx.save();
    //         ctx.shadowColor = '#6d6d6d';
    //         ctx.shadowBlur = 10;
    //         ctx.shadowOffsetX = 0;
    //         ctx.shadowOffsetY = 40;
    //         _stroke.apply(this, arguments)
    //         ctx.restore();
    //     }
    //   }
    // });
  }

  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: 'Sales',
          type:'line',
          fill: false,
          lineTension: 0.2,
          borderColor: this.props.graphColor,
          pointRadius: 1,
          data: this.props.data,
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          borderColor: [
            "#e55353"
          ],
        },
        {
          label: '',
          type:'line',
          fill: false,
          lineTension: 0.2,
          borderColor: this.props.graphColor,
          pointRadius: 0,
          data: this.props.data,
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          borderColor: [
            "#e55353"
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
      line: {
          borderJoinStyle: 'round'
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
      },
      layout: {
        padding: {
          top: 5
        }
      }
    }

    const plugins = [{
    }];

    return (
      <>
        <Line data={data} options={options} plugins={plugins} height={200}/>
      </>
    )
  }
}
