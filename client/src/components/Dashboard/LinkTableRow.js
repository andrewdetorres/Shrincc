import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Line, Doughnut } from 'react-chartjs-2';

export default class LinkTableRow extends Component {

  render() {

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: '#E60023',
          pointRadius: 0,
          data: this.props.data
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
    return (

      <tr>
        <td className="text-center">
          <div><img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" /><span className="-status bg-success"></span></div>
        </td>
        <td>
          <div>{this.props.shortLink}</div>
          <div className="small text-muted"><span>{this.props.linkType}</span> | Registered: {this.props.date}</div>
        </td>
        <td className="text-center">
          {this.props.active ? <FontAwesomeIcon icon={['far', 'check-circle']} height="20px" className="mr-2 text-success"/> : <FontAwesomeIcon icon={['far', 'times-circle']} height="20px" className="mr-2 text-danger"/>}
        </td>
        <td style={{"width":"100px"}}>
          <div>
            <Line data={data} options={options} height={50}/>
          </div>
        </td>
        <td className="text-center">
          <strong>5.67</strong>
        </td>
        <td>
          <div className="small text-muted">Click Count</div><strong>{this.props.clickCount}</strong>
        </td>
      </tr>
    )
  }
}
