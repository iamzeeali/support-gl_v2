import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addActivity } from "../../_actions/activityAction";
import { getCompanies } from "../../_actions/companyAction";

const AddActivity = ({ addActivity, companies, getCompanies, history }) => {
  useEffect(() => {
    getCompanies();
    //eslint-diable-next-line
  }, [getCompanies]);

  const [formData, setFormData] = useState({
    company: "",
    activityName: "",
    subActivities: ""
  });

  const { activityName, subActivities, company } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addActivity(formData, history);
  };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/activity">
          <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
        </Link>{" "}
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <h1 className="pt-4">Add Activity</h1>
        <small className="lead">Add new Activity...</small>
      </div>

      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card my-5">
              <div className="card-body">
                <form
                  className="form-signin"
                  onSubmit={e => onSubmitHandler(e)}
                >
                  <div className="form-label-group">
                    <select
                      className="form-control"
                      value={company}
                      name="company"
                      onChange={e => onChangeHandler(e)}
                      required
                    >
                      <option className="text-muted">-Select Company-</option>
                      {companies.map(comp => (
                        <option key={comp._id} value={comp._id}>
                          {comp.companyName}
                        </option>
                      ))}
                      ;
                    </select>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Activity"
                      name="activityName"
                      value={activityName}
                      onChange={e => onChangeHandler(e)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sub Activities"
                      name="subActivities"
                      value={subActivities}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                    <small className="text-muted">
                      Enter comma separated values. Eg: create email, change
                      password etc.
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddActivity.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  addActivity: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  companies: state.company.companies
});
export default connect(mapStatetoProps, { addActivity, getCompanies })(
  withRouter(AddActivity)
);
