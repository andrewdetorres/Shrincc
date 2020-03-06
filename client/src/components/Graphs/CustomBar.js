import React from 'react';
import ChartistGraph from 'react-chartist';
 
class CustomBar extends React.Component {
  render() {
 
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
        <ChartistGraph data={data} options={options} type={type} className="bar-chart"/>
        <svg viewBox="0 0 0 0" style={{"height":"0", "width":"0"}}>
          <defs>
            <linearGradient id="bar-gradient-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 190, 255, 0)"></stop>
              <stop offset="15%" stopColor="rgba(0, 190, 255, 1)"></stop>
              <stop offset="85%" stopColor="rgba(0, 190, 255, 1)"></stop>
              <stop offset="100%" stopColor="rgba(0, 190, 255, 0)"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }
}

export default CustomBar;
