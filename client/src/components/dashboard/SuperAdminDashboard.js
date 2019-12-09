import React, { Fragment, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompanies } from "../../_actions/companyAction";

const SuperAdminDashboard = ({
  auth: { username, company },
  getCompanies,
  companies
}) => {
  useEffect(() => {
    getCompanies();
    //eslint-diable-next-line
  }, [getCompanies]);

  const me = <Link to="/myprofile">{!username ? "" : username}</Link>;
  const mycompany = (
    <Link to="/mycompany">
      {!company.companyName ? "" : company.companyName}
    </Link>
  );
  return (
    <div>
      <h1 className={`display-4`}> Dashboard</h1>
      <p className="lead">
        Welcome{" "}
        <b>
          {me}, {mycompany}{" "}
        </b>
      </p>
      <p>
        <i className="fa fa-dot-circle-o text-danger fa-lg"></i> Super-Admin
      </p>
      <div className="container py-4">
        <div className="row mb-3 animated fadeIn">
          <div className="col-xl-3 col-sm-6 py-2">
            <Link to="/activity" style={{ textDecoration: "none" }}>
              <div className="card bg-success text-white h-100">
                <div className="card-body bg-success">
                  <div className="rotate">
                    <i className="fa fa-futbol-o fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">ACTIVITY</h6>
                  <br />
                  <h1 className="display-4">
                    {" "}
                    <i className="fa fa-futbol-o"></i>{" "}
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-xl-3 col-sm-6 py-2">
            <Link to="/company" style={{ textDecoration: "none" }}>
              <div className="card bg-success text-white h-100">
                <div className="card-body bg-primary">
                  <div className="rotate">
                    <i className="fa fa-industry fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">COMPANY</h6>
                  <br />
                  <h1 className="display-4">
                    <i className="fa fa-industry"></i>{" "}
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-xl-3 col-sm-6 py-2">
            <Link to="/request" style={{ textDecoration: "none" }}>
              <div className="card bg-success text-white h-100">
                <div className="card-body bg-danger">
                  <div className="rotate">
                    <i className="fa fa-list fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">REQUESTS LOGS</h6>
                  <br />
                  <h1 className="display-4">
                    <i className="fa fa-list"></i>{" "}
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-xl-3 col-sm-6 py-2">
            <Link to="/user" style={{ textDecoration: "none" }}>
              <div className="card bg-success text-white h-100">
                <div className="card-body bg-warning">
                  <div className="rotate">
                    <i className="fa fa-user fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">USERS</h6>
                  <br />
                  <h1 className="display-4">
                    <i className="fa fa-user"></i>{" "}
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        </div>

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
                <Link to="#" className="text-dark">
                  <i class="fa fa-angle-right" aria-hidden="true"></i> Activity{" "}
                  <span className="arrow"></span>
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
                <Link to="#" className="text-dark">
                  <i class="fa fa-angle-right" aria-hidden="true"></i> Company{" "}
                  <span className="arrow"></span>
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
                <Link to="#" className="text-dark">
                  <i class="fa fa-angle-right" aria-hidden="true"></i> Logs{" "}
                  <span className="arrow"></span>
                </Link>
              </li>
              <ul className="sub-menu collapse" id="new">
                <Link to="/request">
                  All Logs <span className="arrow"></span>
                </Link>
              </ul>

              <li
                data-toggle="collapse"
                data-target="#user"
                className="collapsed"
              >
                <Link to="#" className="text-dark">
                  <i class="fa fa-angle-right" aria-hidden="true"></i> User
                  Setting <span className="arrow"></span>
                </Link>
              </li>
              <ul className="sub-menu collapse" id="user">
                <li>
                  <Link to="/user">
                    All Users <span className="arrow"></span>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/addUser">
                    Create User <span className="arrow"></span>
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
        </div>
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
                  alt=""
                />
              </div>
            ))}
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
