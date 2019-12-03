import React, { Fragment, useEffect } from "react";
// import styles from "./dashboard.module.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRequests,
  getCompanyRequests,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount
} from "../../_actions/requestAction";
import Spinner from "../UI/Spinner";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";

const UserDashboard = ({
  auth: { company, username },
  requests,
  openStatusCount,
  getOpenStatusCount,
  thirtyDaysRequestsCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  getCompanyRequests,
  getRequests,
  loading
}) => {
  useEffect(() => {
    getRequests();
    getOpenStatusCount();
    get30DaysRequestsCount();
    getCompanyOpenStatusCount();
    getCompany30DaysRequestsCount();
    getCompanyRequests();
    //eslint-diable-next-line
  }, [
    getRequests,
    getOpenStatusCount,
    get30DaysRequestsCount,
    getCompanyOpenStatusCount,
    getCompany30DaysRequestsCount,
    getCompanyRequests
  ]);

  const me = !username ? "" : username;

  const mycompany = !company.companyName ? "" : company.companyName;
  return (
    <Fragment>
      {requests === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className={`display-4`}>
            {" "}
            <i className="fa fa-tachometer text-secondary"></i> Dashboard{" "}
          </h1>

          <p className="lead">
            Welcome {me}, {mycompany}{" "}
          </p>
          <p>
            <i className="fa fa-calendar text-secondary"></i>{" "}
            <Moment format="DD/MM/YYYY, h:mm:ss a">{moment().format()}</Moment>
          </p>
          <div>
            <div className="container">
              <div className="row mb-3  animated fadeIn">
                <div className="col-xl-3 col-sm-6 py-2">
                  <Link to="/request" style={{ textDecoration: "none" }}>
                    <div className="card bg-success text-white h-100">
                      <div className="card-body bg-success">
                        <div className="rotate">
                          <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">REQUESTS</h6>
                        <small>Total no of requests</small>
                        <h1 className="display-4">{requests.result}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                  <Link to="/openRequest" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-danger h-100">
                      <div className="card-body bg-danger">
                        <div className="rotate">
                          <i className="fa fa-hourglass-half fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">OPEN REQUEST</h6>
                        <small>No of pending requests</small>
                        <h1 className="display-4">{openStatusCount}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                  <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                      <div className="rotate">
                        <i className="fa fa-calendar fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Request in 30 days</h6>
                      <small>Requests within last 30 days</small>
                      <h1 className="display-4">{thirtyDaysRequestsCount}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                  <Link to="/myreport" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-warning h-100">
                      <div className="card-body">
                        <div className="rotate">
                          <i className="fa fa-bar-chart fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Reports</h6>
                        <small>View all Reports</small>

                        <h1 className="display-4">
                          <i className="fa fa-line-chart"></i>
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Thought */}
              <br />
              <div className="container">
                <div className="thought text-center bg-light p-4 animated fadeIn">
                  <h3 className="text-secondary lead">
                    “Learn from yesterday, live for today, hope for tomorrow”
                  </h3>
                  <p className="lead text-secondary">- Albert Einstein</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
  getOpenStatusCount: PropTypes.func.isRequired,
  get30DaysRequestsCount: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
  getCompanyOpenStatusCount: PropTypes.func.isRequired,
  getCompany30DaysRequestsCount: PropTypes.func.isRequired,
  getCompanyRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests: state.request.requests,
  openStatusCount: state.request.openStatusCount,
  thirtyDaysRequestsCount: state.request.thirtyDaysRequestsCount,
  companyRequests: state.request.companyRequests,
  companyOpenStatusCount: state.request.companyOpenStatusCount,
  companyThirtyDaysRequestsCount: state.request.companyThirtyDaysRequestsCount,
  openStatus: state.request.openStatus,
  loading: state.request.loading
});

export default connect(mapStateToProps, {
  getRequests,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  getCompanyRequests
})(withRouter(UserDashboard));
