import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateMyPassword, updateMe } from "../../_actions/authAction";
import ImgPlaceholder from "../../img/img-placeholder.jpg";

const MyProfile = ({
  auth: { username, company, isAuthenticated, user, loading, role },
  logout,
  history,
  updateMyPassword,
  updateMe
}) => {
  const {
    companyName,
    country,
    state,
    city,
    companyAddress,
    companyPhone,
    companyEmail,
    description
  } = company;

  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: ""
  });

  const [photoData, setPhotoData] = useState({ photo: "" });

  const { passwordCurrent, password, passwordConfirm } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangePhotoHandler = e => {
    e.preventDefault();
    setPhotoData({ ...photoData, photo: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    updateMyPassword(formData, history);
  };

  const onsubmitPhoto = e => {
    e.preventDefault();
    updateMe(photoData);
  };

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
                        src={user.photo ? user.photo : ImgPlaceholder}
                        alt="logo"
                        className="img-raised rounded img-fluid bg-light"
                      />
                    </div>
                    <div className="name">
                      <h3 className="title">
                        {username}, {companyName}
                      </h3>
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

              <div className="container mt-5">
                <div className="row">
                  <div className="col-sm-6">
                    <h4>Update Your Profile</h4>
                    <img
                      className="img-thumbnail"
                      src={user.photo ? user.photo : ImgPlaceholder}
                      alt=""
                      width="250"
                      height="250"
                    />
                    <br />
                    <br />
                    <form
                      className="form-signin"
                      onSubmit={e => onsubmitPhoto(e)}
                    >
                      <div className="form-label-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Profile Picture Link"
                          value={photoData.photo}
                          name="photo"
                          onChange={e => onChangePhotoHandler(e)}
                          required
                        />
                        <small className="text-muted">
                          Give a link to you profile picture
                        </small>
                      </div>

                      <hr className="my-4" />

                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>

                  {isAuthenticated && (role === "admin" || "super-admin") ? (
                    <div className="col-sm-6">
                      <h4>Update Password</h4>
                      <form
                        className="form-signin"
                        onSubmit={e => onSubmitHandler(e)}
                      >
                        <div className="form-label-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Current Password"
                            value={passwordCurrent}
                            name="passwordCurrent"
                            onChange={e => onChangeHandler(e)}
                            required
                          />
                        </div>
                        <div className="form-label-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            name="password"
                            onChange={e => onChangeHandler(e)}
                            required
                          />
                        </div>
                        <div className="form-label-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            name="passwordConfirm"
                            onChange={e => onChangeHandler(e)}
                            required
                          />
                        </div>

                        <hr className="my-4" />

                        <button
                          className="btn btn-lg btn-primary btn-block text-uppercase"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MyProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateMyPassword: PropTypes.func.isRequired,
  updateMe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { updateMyPassword, updateMe })(
  MyProfile
);
