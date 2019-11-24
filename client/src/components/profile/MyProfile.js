import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CompanyProfile = ({
  auth: { username, company, isAuthenticated, user, loading, role },
  logout
}) => {
  const {
    companyName,
    country,
    state,
    city,
    shortName,
    photo,
    companyAddress,
    companyPhone,
    companyEmail,
    contactPerson,
    contactPersonPhone,
    contactPersonEmail,
    description
  } = company;
  return (
    <Fragment>
      <div className="profile-page pb-4">
        <div className="page-header pb-4 rounded" data-parallax="true"></div>
        <div className="main main-raised p-4">
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                      <img
                        src={photo}
                        alt="logo"
                        className="img-raised rounded img-fluid bg-light"
                      />
                    </div>
                    <div className="name">
                      <h3 className="title">{username}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {description ? (
                  <div className="col-md-10 ml-auto mr-auto p-4 bg-light">
                    {" "}
                    <p className="text-muted my-4 text-center">
                      {description}{" "}
                    </p>{" "}
                  </div>
                ) : null}
              </div>
              <div className="details my-4">
                <div className="row">
                  <div className="col-sm-6">
                    <ul class="list-group">
                      <li class="list-group-item active">
                        <h5>Company Details</h5>
                      </li>
                      <li class="list-group-item">
                        {" "}
                        <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                        {company.companyName} <br />
                        {city} {state} {country} <br />
                        {companyAddress}
                        <br />
                        <br />
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                        {companyPhone}
                      </li>
                      <li class="list-group-item">
                        {" "}
                        <i class="fa fa-envelope" aria-hidden="true"></i>{" "}
                        {companyEmail}
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul class="list-group bg-light">
                      <li class="list-group-item active ">
                        <h5>Personal Details</h5>
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-user" aria-hidden="true"></i> {username}
                        <br />
                        <br />
                        <br />
                      </li>
                      <li class="list-group-item">
                        {role === "admin" ? (
                          <i class="fa fa-dot-circle-o text-info "> {role}</i>
                        ) : (
                          <i class="fa fa-dot-circle-o text-primary ">
                            {" "}
                            {role}
                          </i>
                        )}
                      </li>
                      <li class="list-group-item">
                        <i class="fa fa-envelope" aria-hidden="true"></i>{" "}
                        {user.email}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CompanyProfile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CompanyProfile);
