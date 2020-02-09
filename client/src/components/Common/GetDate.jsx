import React, { Component } from 'react'

class GetDate extends Component {
  getDateOrdinal = (date) => {
    switch (date % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  render() {

    let date = new Date(this.props.date);

    var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ];

    return (
      <>
        {date.getDate() + this.getDateOrdinal(date.getDate()) + ' ' + (monthNames[date.getMonth()]) + ', ' + date.getFullYear()}
      </>
    )
  }
}

export default GetDate;
