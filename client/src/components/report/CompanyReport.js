import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
import { Bar, Pie } from "react-chartjs-2";
import {
  getCompanyRequests,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  clearRequest
} from "../../_actions/requestAction";

const CompanyReport = ({
  auth: { company, username },
  companyRequests,
  companyOpenStatusCount,
  companyThirtyDaysRequestsCount,
  loading
}) => {
  const [chartData, setChartData] = useState({
    PieChartData: {},
    barChartData: {}
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      PieChartData: {
        labels: ["Open Requests", "Close Requests"],
        datasets: [
          {
            label: "Requests",
            data: [
              companyOpenStatusCount,
              companyRequests.length - companyOpenStatusCount
            ],
            backgroundColor: ["#0083e8", "#ecf000"]
          }
        ]
      },
      barChartData: {
        labels: ["Requests In 30 days"],
        datasets: [
          {
            label: "Requests",
            data: [companyThirtyDaysRequestsCount],
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
      {companyRequests.data === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/myreport">
            <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
          </Link>
          <Link to="/myreport" className="btn btn-primary float-right">
            <i class="fa fa-bar-chart"></i> {username}'s Report
          </Link>
          <h1>{company.companyName} Report</h1>

          <br />
          <br />
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4 animated zoomIn">
                <div className="card-counter primary">
                  <i className="fa fa-list"></i>
                  <span className="count-numbers display-4">
                    {companyRequests.length}
                  </span>
                  <span className="count-name">Total Requests</span>
                </div>
              </div>

              <div className="col-md-4 animated zoomIn">
                <div className="card-counter danger">
                  <i className="fa fa-hourglass-half"></i>
                  <span className="count-numbers display-4">
                    {companyOpenStatusCount}
                  </span>
                  <span className="count-name">Open Requests</span>
                </div>
              </div>

              <div className="col-md-4 animated zoomIn">
                <div className="card-counter success">
                  <i className="fa fa-calendar"></i>
                  <span className="count-numbers display-4">
                    {companyThirtyDaysRequestsCount}
                  </span>
                  <span className="count-name">Requests in 30 days</span>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "70px" }}>
              <div className="col-sm-6">
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
              <div className="col-sm-6">
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
      )}
    </Fragment>
  );
};

CompanyReport.propTypes = {
  auth: PropTypes.object.isRequired,
  companyRequests: PropTypes.array.isRequired,
  getCompanyOpenStatusCount: PropTypes.func.isRequired,
  getCompany30DaysRequestsCount: PropTypes.func.isRequired,
  getCompanyRequests: PropTypes.func.isRequired,
  clearRequest
};

const mapStateToProps = state => ({
  auth: state.auth,
  companyRequests: state.request.companyRequests,
  companyOpenStatusCount: state.request.companyOpenStatusCount,
  companyThirtyDaysRequestsCount: state.request.companyThirtyDaysRequestsCount,
  loading: state.request.loading
});

export default connect(mapStateToProps, {
  getCompanyRequests,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  clearRequest
})(withRouter(CompanyReport));
