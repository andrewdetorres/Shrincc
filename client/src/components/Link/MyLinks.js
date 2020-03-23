import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from 'lodash';

// Import Components
import LinkTableRow from '../Dashboard/LinkTableRow';

// Import Actions
import { getAllLinks } from '../../actions/link';

class MyLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitDays: 7,
      copied: false,
    };
  }

  componentDidMount() {
    this.props.getAllLinks();
  }

  selectChange = (value, type) => {
    if (type === "visitDays" ) {
      this.setState({visitDays: value});
    }
    else if (type === "sourceDays" ) {
      this.setState({sourceDays: value});
    }
  }

  render() {

    // Create Table
    let rows = null;

    // Get the date from 7 days ago.
    let d = new Date();
    let sevenDays = d.setDate(d.getDate() - 7);
    var oneWeekAgo = new Date(sevenDays).toISOString();

    if (this.props.link.AllLinks && this.props.link.loading === false) {

      rows = this.props.link.AllLinks.map((link, index) => {
        let clickThisWeek = [];

        // Get all the clicks within the last week
        link.clicks.forEach(click => {
          if(oneWeekAgo <= click.date) {
            clickThisWeek.push({"date": click.date.substring(0, 10)});
          }
        });

        let avgClickPerDay = (clickThisWeek.length / 7).toFixed(2);

        // Create graph data for each row
        let graphData = _.groupBy(clickThisWeek, "date");

        let dataToSend = [];

        for (let i = 6; i >= 0; i--) {
          let date = new Date();
          date.setDate(date.getDate() - i);
          var dateCheck = new Date(date).toISOString();

          if (graphData[dateCheck.substring(0, 10)]) {
            dataToSend.push(graphData[dateCheck.substring(0, 10)].length);
          }
          else {
            dataToSend.push(0);
          }
        }

        // Set the graph color based on if the data has improved
        let graphColor;
        if (dataToSend[0] > dataToSend[6]){
          graphColor = "#E60023";
        }
        else if (dataToSend[0] < dataToSend[6]){
          graphColor = "#2CB85C";
        }
        else {
          graphColor = "#F9B112";
        }
          
        // Return the link table row with its content
        return (
        <LinkTableRow
          shortLink={link.shortLink}
          longLink={link.longLink}
          data={dataToSend}
          date={link.date}
          clickCount={link.clicks.length}
          avgClickPerDay={avgClickPerDay}
          graphColor={graphColor}
          active={link.active}
          key={index}
          />
        )
      });
    }
    return (
      <div className="shrincc-wrapper pb-5">
        {/* Sub header with breadcrumbs */}
        <header className="border-top">
          <ol className="breadcrumb bg-white border-0 rounded-0 m-0">
            <li className="breadcrumb-item pl-5"><a href="/">Dashboard</a></li>
            <li className="breadcrumb-item active">My Links</li>
          </ol>
        </header>

        {/* Links list */}
        <div className="px-md-5 px-1 mt-4">
          <div className="card border-0 shadow mx-md-0 mx-4" id="dashboard-table">
            <div className="card-body">
              <div className="text-muted text-right">
                <table className="table table-responsive-sm table-outline mb-0">
                  <thead className="thead-white border-0">
                    <tr>
                      <th>Site</th>
                      <th></th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Usage <small>(Last 7 days)</small></th>
                      <th className="text-center">Avg. Click Per Day <small>(Last 7 days)</small></th>
                      <th>Total visits</th>
                      <th>View Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


MyLinks.propTypes = {
  getAllLinks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  link: state.link,
  errors: state.errors
});

export default connect(mapStateToProps, { getAllLinks })(withRouter(MyLinks));


