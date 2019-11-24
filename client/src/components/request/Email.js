import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { getEmails, deleteEmail } from "../../_actions/requestAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import "moment-timezone";

const Email = ({
  getEmails,
  deleteEmail,
  emails,
  loading,
  auth: { company }
}) => {
  useEffect(() => {
    getEmails();
    //eslint-diable-next-line
  }, [getEmails]);

  const onDeleteHandler = id => {
    deleteEmail(id);
  };

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/">
          <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
        </Link>{" "}
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>{" "}
        <br />
        <div class="btn-group p-4" role="group" aria-label="Basic example">
          <Link to="/addEmail" class="btn btn-secondary">
            Add Email
          </Link>
          <Link to="/deleteEmail" class="btn btn-secondary">
            Suspend Email
          </Link>
          <Link to="/changePassword" class="btn btn-secondary">
            Change Password
          </Link>
        </div>
        <h1 className="pt-4">Emails</h1>
        <small className="lead">
          Available Emails in {company.companyName}
        </small>
      </div>

      {emails !== null || !loading ? (
        <table className="table table-hover table-bordered container animated my-4 fadeIn my-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Created On</th>
            </tr>
          </thead>

          <tbody>
            {emails.map(email => (
              <tr key={email._id}>
                <td>{email.operateEmail}</td>
                <td>
                  {" "}
                  <Moment format="DD/MM/YYYY, h:mm:ss a">{email.date}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Email.propTypes = {
  getEmails: PropTypes.func.isRequired,
  deleteEmails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  emails: state.request.emails,
  loading: state.company.loading
});
export default connect(mapStateToProps, {
  getEmails,
  deleteEmail
})(Email);
