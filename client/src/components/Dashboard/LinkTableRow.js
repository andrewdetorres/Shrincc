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
    navigator.clipboard.writeText("https://shrin.cc/" + this.props.shortLink)

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
          <p>The link <span className="text-primary">{"https://shrin.cc/" + this.props.shortLink}</span> has been copied to your clipboard'</p>
          <Okay />
        </>
      )
    })
  }
  render() {
    const data = {
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          fill: false,
          lineTension: 0.2,
          borderColor: this.props.graphColor,
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
            <img className="favicon-image" src={this.props.favicon} alt="Website Icon" />
            <span className="-status bg-success"></span>
          </div>
        </td>
        <td>
          <div>
            <storng>
              <a href={"https://shrin.cc/" + this.props.shortLink} className="text-secondary">{"https://shrin.cc/" + this.props.shortLink}</a>
            </storng>
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
          <strong>{this.props.avgClickPerDay}</strong>
        </td>
        <td className="text-center">
          <strong>{this.props.clickCount}</strong>
        </td>
        <td className="text-center">
          <a href={"/link/" + this.props.shortLink}>View</a>
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

