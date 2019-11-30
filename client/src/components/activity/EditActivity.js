import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  editActivity,
  getCurrentActivity
} from "../../_actions/activityAction";
import { getCompanies } from "../../_actions/companyAction";

const EditActivity = ({
  activity: { activity, loading },
  editActivity,
  getCompanies,
  getCurrentActivity,
  history,
  companies,
  match
}) => {
  const [formData, setFormData] = useState({
    company: "",
    activityName: "",
    subActivities: ""
  });

  useEffect(() => {
    getCompanies();
    getCurrentActivity(match.params.id);

    setFormData({
      activityName:
        loading || !activity.activityName ? "" : activity.activityName,
      subActivities:
        loading || !activity.subActivities ? "" : activity.subActivities
    });
    //eslint-disable-next-line
  }, [loading, getCurrentActivity, getCompanies]);

  const { activityName, subActivities, company } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = e => {
    e.preventDefault();
    editActivity(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/" className="float-right">
          <i
            className="fa fa-home fa-lg text-dark border border-dark rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <Link to="/activity" className="btn btn-primary">
          <i className="fa fa-arrow-left"> </i> Go Back
        </Link>
        <h1 className="pt-4">Edit Activity</h1>
        <small className="lead">Update an Activity...</small>
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

EditActivity.propTypes = {
  editActivity: PropTypes.func.isRequired,
  getCurrentActivity: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
  getCompanies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activity: state.activity,
  companies: state.company.companies
});

export default connect(mapStateToProps, {
  editActivity,
  getCurrentActivity,
  getCompanies
})(withRouter(EditActivity));
