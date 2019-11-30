import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sending from "../UI/Sending";
import Spinner from "../UI/Spinner";
import { addRequest } from "../../_actions/requestAction";
import {
  getCompanyActivities,
  populateSubActivities
} from "../../_actions/activityAction";

const AddRequest = ({
  auth: { username },
  addRequest,
  getCompanyActivities,
  sendingLoader,
  populateSubActivities,
  activities,
  subActivities,
  history
}) => {
  useEffect(() => {
    getCompanyActivities();
    //eslint-diable-next-line
  }, [getCompanyActivities]);

  const [formData, setFormData] = useState({
    activity: "",
    subActivity: "",
    description: "",
    priority: ""
  });

  const [selectData, setSelectData] = useState({
    selectedValue: ""
  });

  const { activity, subActivity, description, priority } = formData;
  const { selectedValue } = selectData;

  const onChangeSelect = e => {
    e.preventDefault();
    setSelectData({ ...selectData, selectedValue: e.target.value });
    populateSubActivities(e.target.value);
    setFormData({ ...formData, activity: e.target.value });
  };

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addRequest(formData, history);
  };

  const onCloseModal = () => {
    setSelectData({ ...selectData, selectedValue: "" });
  };

  let activityOptions = activities.map(activity => (
    <option key={activity._id} value={activity.activityName}>
      {activity.activityName}
    </option>
  ));

  let subActivityOptions = subActivities.map(subAct => (
    <option value={subAct}>{subAct}</option>
  ));

  const modal = (
    <div
      class="modal d-block animated fadeIn bg-light"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      id="myModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">What do you want to do?</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              onClick={onCloseModal}
            >
              &times;
            </button>
          </div>

          <div class="modal-body text-center">
            <div className="row ml-4">
              <div className="col-sm-3 border-light bg-primary text-light m-2 text-center">
                <i class="fa fa-envelope text-light" aria-hidden="true">
                  {" "}
                </i>
                <br />
                <small>
                  {" "}
                  <Link to="/addEmail" className="text-light">
                    {" "}
                    Create New Email
                  </Link>
                </small>
              </div>
              <div className="col-sm-3 border-light bg-primary text-light m-2 text-center">
                <i class="fa fa-trash text-light" aria-hidden="true">
                  {" "}
                </i>
                <br />

                <small>
                  <Link to="/deleteEmail" className="text-light">
                    {" "}
                    Delete Email
                  </Link>
                </small>
              </div>
              <div className="col-sm-3 border-light bg-primary text-light m-2 text-center">
                <i class="fa fa-lock text-light" aria-hidden="true">
                  {" "}
                </i>
                <br />

                <small>
                  <Link to="/changePassword" className="text-light">
                    {" "}
                    Change Password
                  </Link>
                </small>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" onClick={onCloseModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/request">
          <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
        </Link>{" "}
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>{" "}
        <Link to="/request" className="btn btn-primary float-right">
          <i class="fa fa-list"></i> {username} Request
        </Link>{" "}
        <h1 className="pt-4">Add Request</h1>
        <small className="lead">Add new Request...</small>
      </div>

      {sendingLoader ? (
        <Spinner />
      ) : (
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
                        placeholder="User"
                        value={username}
                        required
                        disabled
                      />
                    </div>

                    <div className="form-label-group">
                      <select
                        className="form-control"
                        value={activity}
                        onChange={e => onChangeSelect(e)}
                        required
                      >
                        <option value="" disabled selected hidden>
                          -Select Activity-
                        </option>

                        {activityOptions}
                      </select>
                    </div>

                    <div className="form-label-group">
                      <select
                        className="form-control"
                        name="subActivity"
                        value={subActivity}
                        defaultValue={{
                          label: "Select sub Activity",
                          value: 0
                        }}
                        onChange={e => onChangeHandler(e)}
                        required
                      >
                        <option value="" disabled selected hidden>
                          -Select Sub Activity-
                        </option>
                        {subActivityOptions}
                      </select>
                    </div>
                    <div className="form-label-group">
                      <select
                        className="form-control"
                        name="priority"
                        value={priority}
                        onChange={e => onChangeHandler(e)}
                        defaultValue="low"
                        required
                      >
                        <option value="" disabled selected hidden>
                          Choose Priority
                        </option>
                        <option value="low" default>
                          Low
                        </option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {selectedValue === "Email Management" ? modal : null}

                    <div className="form-label-group">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Description (optional)"
                        value={description}
                        name="description"
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
      )}
    </Fragment>
  );
};

AddRequest.propTypes = {
  getCompanyActivities: PropTypes.func.isRequired,
  addRequest: PropTypes.func.isRequired,
  populateSubActivities: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: state.activity.activities,
  subActivities: state.activity.subActivities,
  sendingLoader: state.request.sendingLoader,
  auth: state.auth
});

export default connect(mapStateToProps, {
  addRequest,
  getCompanyActivities,
  populateSubActivities
})(withRouter(AddRequest));
