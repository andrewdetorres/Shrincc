import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Line } from 'react-chartjs-2';
import GetDate from '../Common/GetDate';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swal = withReactContent(Swal);

export default class LinkTableRow extends Component {


  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  CopyText = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText(this.props.shortLink)

    // Change copied text
    this.setState({
      copied: true
    })

    swal.fire({
      title: 'Link Copied!',
      icon: 'success',
      showConfirmButton: false,
      html: (
        <>
          <p>The link <span className="text-primary">{this.props.shortLink}</span> has been copied to your clipboard'</p>
          <Okay />
        </>
      )
    })
  }
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
          <div>
            <img className="avatar rounded-circle" src={require("../../assets/img/avatar.png")} alt="user@email.com" />
            <span className="-status bg-success"></span>
          </div>
        </td>
        <td>
          <div>
            <a href={this.props.shortLink}>{this.props.shortLink}</a> 
            &nbsp;|&nbsp;
            <span className="cursor-pointer" onClick={this.CopyText}>
              {this.state.copied ? "Copied" : "Copy"}
            </span>
          </div>
          <div className="small text-muted"> 
            Created: <GetDate date={this.props.date}></GetDate>
          </div>
          <div className="small text-muted">
            <a href={this.props.longLink} className="text-dark longlink-overflow">{this.props.longLink}</a>
          </div>
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
          <strong>[INT]</strong>
        </td>
        <td>
          <div className="small text-muted">Click Count</div><strong>{this.props.clickCount}</strong>
        </td>
      </tr>
    )
  }
}

export const Okay = () => (
  <button
    className="btn btn-success my-2"
    onClick={() => swal.close()}
  >
    Okay
  </button>
)

