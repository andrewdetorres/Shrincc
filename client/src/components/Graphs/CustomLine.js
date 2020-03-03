import React from 'react';
import ChartistGraph from 'react-chartist';
 
class CustomLine extends React.Component {
  render() {
 
    var data = {
      labels: this.props.labels,
      series: [
        this.props.data
      ]
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
        labelInterpolationFnc: function skipLabels(value, index) {
          return index % 2  === 1 ? value : null;
        }
      },
      axisY: {
        showGrid: true,
        showLabel: true,
      },
      chartPadding: 10,
      height: '300px'
    };
 
    var type = 'Line'
 
    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} className="line-chart"/>
        <svg viewBox="0 0 0 0" style={{"height":"0", "width":"0"}}>
          <defs>
            <linearGradient id="gradient-a" x1="0" y1="0" x2="1" y2="0">
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

export default CustomLine;
