import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sending from "../UI/Sending";
import { deleteEmail, getEmails } from "../../_actions/requestAction";

const DeleteEmail = ({
  auth: { username },
  getEmails,
  deleteEmail,
  emails,
  sendingLoader,
  history
}) => {
  useEffect(() => {
    getEmails();
    //eslint-diable-next-line
  }, [getEmails]);

  const [formData, setFormData] = useState({
    activity: "Email",
    subActivity: "Delete Email",
    priority: "",
    operateEmail: "",
    description: "",
    active: false
  });

  const {
    activity,
    subActivity,
    description,
    operateEmail,
    priority
  } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    deleteEmail(formData, operateEmail, history);
  };

  var today = new Date();

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var date =
    today.getDate() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear() +
    ", " +
    hours +
    ":" +
    minutes +
    " " +
    ampm;

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/addRequest">
          <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
        </Link>{" "}
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>{" "}
        <Link to="/addRequest">
          <i
            className="fa fa-plus-circle text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <h1 className="pt-4">Suspend Email</h1>
      </div>

      {sendingLoader ? (
        <Sending />
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
                    <div className="row border-dark p-4">
                      <div className="col-sm-4">
                        Date: <br />
                        <b>{date}</b>{" "}
                      </div>

                      <div className="col-sm-3">
                        Request By:
                        <br /> <b>{username}</b>
                      </div>
                      <div className="col-sm-2">
                        Activity:
                        <br /> <b>{activity}</b>
                      </div>
                      <div className="col-sm-3">
                        Sub Activity: <br /> <b>{subActivity}</b>
                      </div>
                    </div>

                    <div className="form-label-group">
                      <select
                        className="form-control"
                        value={operateEmail}
                        name="operateEmail"
                        onChange={e => onChangeHandler(e)}
                        required
                      >
                        <option value="" disabled selected hidden>
                          Select Email
                        </option>
                        {emails.map(email => (
                          <option key={email._id} value={email._id}>
                            {email.operateEmail}
                          </option>
                        ))}
                        ;
                      </select>
                    </div>

                    <div className="form-label-group">
                      <select
                        className="form-control"
                        name="priority"
                        value={priority}
                        onChange={e => onChangeHandler(e)}
                        required
                      >
                        <option value="" disabled selected hidden>
                          Choose Priority
                        </option>
                        <option value="low" default>
                          Low
                        </option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </select>
                    </div>

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

DeleteEmail.propTypes = {
  getEmails: PropTypes.func.isRequired,
  deleteEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  emails: state.request.emails,
  sendingLoader: state.request.sendingLoader,
  auth: state.auth
});

export default connect(mapStateToProps, { getEmails, deleteEmail })(
  withRouter(DeleteEmail)
);
