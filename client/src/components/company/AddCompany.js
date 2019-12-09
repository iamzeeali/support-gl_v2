import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCompany } from "../../_actions/companyAction";

const AddCompany = ({ addCompany, history }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    shortName: "",
    country: "",
    state: "",
    city: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    contactPerson: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    photo: "",
    description: ""
  });

  const {
    companyName,
    shortName,
    country,
    state,
    city,
    companyAddress,
    companyPhone,
    companyEmail,
    contactPerson,
    contactPersonPhone,
    contactPersonEmail,
    photo,
    description
  } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addCompany(formData, history);
  };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/company">
          <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
        </Link>{" "}
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <h1 className="pt-4">Add Company</h1>
        <small className="lead">Add new Company...</small>
      </div>

      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-9 col-md-9 col-lg-9 mx-auto">
            <div className="card my-5">
              <div className="card-body">
                <form
                  className="form-signin"
                  onSubmit={e => onSubmitHandler(e)}
                >
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      name="companyName"
                      value={companyName}
                      onChange={e => onChangeHandler(e)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alias"
                      name="shortName"
                      value={shortName}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                    <small className="text-muted">
                      Enter company's alias or short name. Eg: IBM, LG, etc.
                    </small>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country"
                      name="country"
                      value={country}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      name="state"
                      value={state}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      name="city"
                      value={city}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Address"
                      name="companyAddress"
                      value={companyAddress}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Phone"
                      name="companyPhone"
                      value={companyPhone}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Email"
                      name="companyEmail"
                      value={companyEmail}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>

                  <hr className="my-4" />

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contact Person"
                      name="contactPerson"
                      value={contactPerson}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contact Person Phone"
                      name="contactPersonPhone"
                      value={contactPersonPhone}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contact Person Email"
                      name="contactPersonEmail"
                      value={contactPersonEmail}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Logo Link"
                      name="photo"
                      value={photo}
                      onChange={e => onChangeHandler(e)}
                    />
                  </div>

                  <div className="form-label-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      value={description}
                      onChange={e => onChangeHandler(e)}
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddCompany.propTypes = {
  addCompany: PropTypes.func.isRequired
};

export default connect(null, { addCompany })(withRouter(AddCompany));
