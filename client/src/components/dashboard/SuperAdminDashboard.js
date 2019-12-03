import React, { Fragment, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompanies } from "../../_actions/companyAction";

const SuperAdminDashboard = ({
  auth: { username },
  getCompanies,
  companies,
  loading
}) => {
  useEffect(() => {
    getCompanies();
    //eslint-diable-next-line
  }, [getCompanies]);
  return (
    <div className={styles.dashboard}>
      <h1 className={`display-4`}> Dashboard</h1>
      <p className="lead">
        Welcome <b>{username}</b>
      </p>
      <div className="container">
        <div className={styles.dashboardMenu}>
          <div className="row">
            <div
              className={`col-sm-2 col-md-2 animated zoomIn bg-primary ${styles.dashboardItem}`}
            >
              <Link to="/activity" style={{ textDecoration: "none" }}>
                <i className="fa fa-futbol-o fa-lg"></i>
                <h1 className="lead text-light">Actvity</h1>
              </Link>
            </div>
            <div
              className={`col-sm-2 col-md-2 animated zoomIn bg-primary ${styles.dashboardItem}`}
            >
              <Link to="/company" style={{ textDecoration: "none" }}>
                <i className="fa fa-industry fa-lg"></i>
                <h1 className="lead text-light">Company</h1>
              </Link>
            </div>
            <div
              className={`col-sm-2 col-md-2 animated zoomIn bg-primary ${styles.dashboardItem}`}
            >
              <Link to="/request" style={{ textDecoration: "none" }}>
                <i className="fa fa-file fa-lg"></i>
                <h1 className="lead text-light"> Request Logs</h1>
              </Link>
            </div>

            <div
              className={`col-sm-2 col-md-2 animated zoomIn bg-primary ${styles.dashboardItem}`}
            >
              <Link to="/user" style={{ textDecoration: "none" }}>
                <i className="fa fa-user-circle-o fa-lg"></i>
                <h1 className="lead text-light">Users</h1>
              </Link>
            </div>
          </div>

          <Fragment>
            <div className="menu py-4">
              <p className="lead">
                <i class="fa fa-bars" aria-hidden="true"></i> Menu
              </p>
              <div className="menu-list">
                <ul
                  id="menu-content"
                  className="menu-content out text-secondary"
                  style={{ listStyleType: "none" }}
                >
                  <li
                    data-toggle="collapse"
                    data-target="#products"
                    className="collapsed active"
                  >
                    <Link to="#" className="text-secondary">
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Activity <span className="arrow"></span>
                    </Link>
                  </li>
                  <ul className="sub-menu collapse" id="products">
                    <li className="active">
                      <Link to="/activity">View Activities</Link>
                    </li>
                    <li>
                      <Link to="addActivity">Add an activity</Link>
                    </li>
                  </ul>

                  <li
                    data-toggle="collapse"
                    data-target="#service"
                    className="collapsed"
                  >
                    <Link to="#" className="text-secondary">
                      <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                      Company <span className="arrow"></span>
                    </Link>
                  </li>
                  <ul className="sub-menu collapse" id="service">
                    <li>
                      <Link to="/company">View Companies</Link>
                    </li>
                    <li>
                      <Link to="/addCompany">Add Company</Link>
                    </li>
                  </ul>

                  <li
                    data-toggle="collapse"
                    data-target="#new"
                    className="collapsed"
                  >
                    <Link to="#" className="text-secondary">
                      <i class="fa fa-angle-right" aria-hidden="true"></i> Logs{" "}
                      <span className="arrow"></span>
                    </Link>
                  </li>
                  <ul className="sub-menu collapse" id="new">
                    <Link to="/request" className="text-secondary">
                      All Logs <span className="arrow"></span>
                    </Link>
                  </ul>

                  <li
                    data-toggle="collapse"
                    data-target="#user"
                    className="collapsed"
                  >
                    <Link to="#" className="text-secondary">
                      <i class="fa fa-angle-right" aria-hidden="true"></i> User
                      Setting <span className="arrow"></span>
                    </Link>
                  </li>
                  <ul className="sub-menu collapse" id="user">
                    <Link to="/user" className="text-secondary">
                      All Users <span className="arrow"></span>
                    </Link>
                    <li>
                      {" "}
                      <Link to="/addUser" className="text-secondary">
                        Create User Setting <span className="arrow"></span>
                      </Link>
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
          </Fragment>
        </div>

        <div className="container">
          <p className="lead">Companies...</p>
          <div className="row">
            {companies &&
              companies.map(comp => (
                <div
                  className="col-lg-2 col-md-2 col-sm-4"
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={comp.photo}
                    className="img-thumbnail my-2"
                    style={{ maxWidth: "150px" }}
                    alt="company logo"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SuperAdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  companies: state.company.companies,
  loading: state.company.loading
});

export default connect(mapStateToProps, { getCompanies })(
  withRouter(SuperAdminDashboard)
);
