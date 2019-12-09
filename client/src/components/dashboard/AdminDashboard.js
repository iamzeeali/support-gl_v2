import React, { Fragment, useEffect } from "react";
import Spinner from "../UI/Spinner";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRequestsCount,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  getCompanyRequests
} from "../../_actions/requestAction";

const AdminDashboard = ({
  auth: { company, username },
  requests_count,
  openStatusCount,
  thirtyDaysRequestsCount,
  companyRequests,
  companyOpenStatusCount,
  companyThirtyDaysRequestsCount,
  getRequestsCount,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyRequests,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  loading
}) => {
  useEffect(() => {
    getRequestsCount();
    getOpenStatusCount();
    get30DaysRequestsCount();
    getCompanyOpenStatusCount();
    getCompany30DaysRequestsCount();
    getCompanyRequests();
  }, []);

  let today = new Date();

  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const me = <Link to="/myprofile">{!username ? "" : username}</Link>;

  const mycompany = (
    <Link to="/mycompany">
      {!company.companyName ? "" : company.companyName}
    </Link>
  );
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Link to="/mycompany">
            <img
              src={company.photo}
              alt="logo"
              style={{ maxWidth: "150px", maxHeight: "100px" }}
              className="img-thumbnail float-right bg-light"
            />
          </Link>
          <h1 className={`display-4`}>Dashboard </h1>

          <p className="lead">
            Welcome {me}, {mycompany}{" "}
          </p>
          <p>
            <i className="fa fa-dot-circle-o text-info fa-lg"></i> Admin
          </p>
          <p>
            <i className="fa fa-calendar text-secondary"></i> {date}
          </p>
          <div>
            <div className="container">
              <div className="row mb-3 animated fadeIn">
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/request" style={{ textDecoration: "none" }}>
                    <div className="card bg-success text-white h-100">
                      <div className="card-body bg-success">
                        <div className="rotate">
                          <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">MY REQUESTS</h6>
                        <br />
                        <h1 className="display-4">
                          {requests_count ? requests_count : "..."}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/openRequest" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-danger h-100">
                      <div className="card-body bg-danger">
                        <div className="rotate">
                          <i className="fa fa-hourglass-half fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">MY OPEN REQUEST</h6>
                        <h1 className="display-4">
                          {openStatusCount ? openStatusCount : "..."}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                      <div className="rotate">
                        <i className="fa fa-calendar fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">MY Request in 30 days</h6>
                      <h1 className="display-4">
                        {thirtyDaysRequestsCount
                          ? thirtyDaysRequestsCount
                          : "..."}
                      </h1>
                    </div>
                  </div>
                </div>
                {/*} <div className="col-xl-3 col-sm-6 py-2">
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
      </div> */}
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/adminRequest" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-primary h-100">
                      <div className="card-body">
                        <div className="rotate">
                          <i className="fa fa-industry fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">COMPANY'S REQUESTS</h6>

                        <h1 className="display-4">
                          {companyRequests.length
                            ? companyRequests.length
                            : "..."}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/companyreport" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-danger h-100">
                      <div className="card-body">
                        <div className="rotate">
                          <i className="fa fa-industry fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">
                          COMPANY'S OPEN REQUESTS
                        </h6>

                        <h1 className="display-4">
                          {companyOpenStatusCount
                            ? companyOpenStatusCount
                            : "..."}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/companyreport" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-warning h-100">
                      <div className="card-body">
                        <div className="rotate">
                          <i className="fa fa-calendar fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">
                          COMPANY'S 30 DAYS REQUESTS
                        </h6>

                        <h1 className="display-4">
                          {companyThirtyDaysRequestsCount
                            ? companyThirtyDaysRequestsCount
                            : "..."}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Thought */}
            <div className="container">
              <div className="card thought col-sm-6 mx-auto text-center bg-dark pt-3 animated pulse">
                <p className="text-secondary">
                  “Learn from yesterday, live for today, hope for tomorrow”
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  companyRequests: PropTypes.array.isRequired,
  getOpenStatusCount: PropTypes.func.isRequired,
  get30DaysRequestsCount: PropTypes.func.isRequired,
  getRequestsCount: PropTypes.func.isRequired,
  getCompanyOpenStatusCount: PropTypes.func.isRequired,
  getCompany30DaysRequestsCount: PropTypes.func.isRequired,
  getCompanyRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  requests_count: state.request.requests_count,
  openStatusCount: state.request.openStatusCount,
  thirtyDaysRequestsCount: state.request.thirtyDaysRequestsCount,
  companyRequests: state.request.companyRequests,
  companyOpenStatusCount: state.request.companyOpenStatusCount,
  companyThirtyDaysRequestsCount: state.request.companyThirtyDaysRequestsCount,
  openStatus: state.request.openStatus,
  loading: state.request.loading
});

export default connect(mapStateToProps, {
  getRequestsCount,
  getOpenStatusCount,
  get30DaysRequestsCount,
  getCompanyOpenStatusCount,
  getCompany30DaysRequestsCount,
  getCompanyRequests
})(withRouter(AdminDashboard));
