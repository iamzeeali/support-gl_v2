import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Bar, Pie } from "react-chartjs-2";
import {
  getRequestsCount,
  getOpenStatusCount,
  get30DaysRequestsCount
} from "../../_actions/requestAction";

const MyReport = ({
  auth: { company, username, role },
  requests_count,
  getRequestsCount,
  openStatusCount,
  thirtyDaysRequestsCount
}) => {
  const [chartData, setChartData] = useState({
    PieChartData: {},
    barChartData: {}
  });

  useEffect(() => {
    getRequestsCount();
    setChartData({
      ...chartData,
      PieChartData: {
        labels: ["Open Requests", "Close Requests"],
        datasets: [
          {
            label: "Requests",
            data: [openStatusCount, requests_count - openStatusCount],
            backgroundColor: ["#0083e8", "#ecf000"]
          }
        ]
      },
      barChartData: {
        labels: ["Requests In 30 days"],
        datasets: [
          {
            label: "Requests",
            data: [thirtyDaysRequestsCount],
            backgroundColor: ["#cc0000"]
          }
        ]
      }
    });

    //eslint-diable-next-line
  }, []);

  const { PieChartData, barChartData } = chartData;

  return (
    <Fragment>
      <Link to="/">
        <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
      </Link>{" "}
      {role === "admin" ? (
        <Link to="/companyreport" className="btn btn-primary float-right">
          <i className="fa fa-bar-chart"></i> {company.companyName} Report
        </Link>
      ) : null}
      <h1>{username}'s Report</h1>
      <br />
      <br />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 animated zoomIn">
            <div className="card-counter primary">
              <i className="fa fa-list"></i>
              <span className="count-numbers display-4">{requests_count}</span>
              <span className="count-name">Total Requests</span>
            </div>
          </div>

          <div className="col-md-4 animated zoomIn">
            <div className="card-counter danger">
              <i className="fa fa-hourglass-half"></i>
              <span className="count-numbers display-4">{openStatusCount}</span>
              <span className="count-name">Open Requests</span>
            </div>
          </div>

          <div className="col-md-4 animated zoomIn">
            <div className="card-counter success">
              <i className="fa fa-calendar"></i>
              <span className="count-numbers display-4">
                {thirtyDaysRequestsCount}
              </span>
              <span className="count-name">Requests in 30 days</span>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "70px" }}>
          <div className="col-sm-6 col-md-6 animated fadeIn">
            <div className="pie-chart text-center">
              <Pie
                data={PieChartData}
                options={{
                  title: {
                    display: "Display",
                    text: "Request Pie Chart",
                    fontSize: 25
                  },
                  legend: {
                    // display: this.props.displayLegend,
                    position: "bottom"
                  }
                }}
              />
              <small>
                <Link to="/request"> All Requests </Link>|
                <Link to="/openRequest"> Open Requests</Link>
              </small>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 animated fadeIn">
            <div className="bar-chart">
              <Bar
                data={barChartData}
                options={{
                  title: {
                    display: "Display",
                    text: "Requests in Last 30 Days",
                    fontSize: 25
                  },
                  legend: {
                    // display: this.props.displayLegend,
                    position: "bottom"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MyReport.propTypes = {
  auth: PropTypes.object.isRequired,
  requests_count: PropTypes.array.isRequired,
  getOpenStatusCount: PropTypes.func.isRequired,
  get30DaysRequestsCount: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests_count: state.request.requests_count,
  openStatusCount: state.request.openStatusCount,
  thirtyDaysRequestsCount: state.request.thirtyDaysRequestsCount,
  loading: state.request.loading
});

export default connect(mapStateToProps, {
  getRequestsCount,
  getOpenStatusCount,
  get30DaysRequestsCount
})(withRouter(MyReport));
