import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { getCompanyRequests } from "../../_actions/requestAction";
import Moment from "react-moment";
import "moment-timezone";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AdminRequest = ({
  auth: { username },

  getCompanyRequests,
  companyRequests,
  companyRequestLoading
}) => {
  useEffect(() => {
    getCompanyRequests();
    //eslint-diable-next-line
  }, [getCompanyRequests]);

  const openStatus = (
    <i class="fa fa-clock-o text-warning text-center" aria-hidden="true"></i>
  );

  const closeStatus = (
    <i
      class="fa fa-check-circle text-success text-center"
      aria-hidden="true"
    ></i>
  );

  const highPriority = (
    <span className="badge badge-danger text-center">High</span>
  );
  const lowPriority = (
    <span className="badge badge-warning text-center">Low</span>
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
        <Link to="/addRequest">
          <i
            className="fa fa-plus-circle text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <h1 className="pt-4">Company Requests</h1>
        <small className="lead">Requests in the portal...</small>
        <br />
        <small>
          <i
            class="fa fa-clock-o text-warning text-center fa-lg"
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          Open
        </small>
        <br />{" "}
        <small>
          <i
            class="fa fa-check-circle text-success text-center fa-lg"
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          Closed
        </small>
      </div>

      {companyRequests === null || companyRequestLoading ? (
        <Spinner />
      ) : (
        <table className="table table-hover table-bordered animated my-4 fadeIn my-4 container">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">Sub Activities</th>
              <th scope="col">Req By</th>
              <th scope="col">Req for</th>
              <th scope="col">Req on</th>
              <th scope="col">Status</th>
              <th scope="col">Description</th>
              <th scope="col">Email</th>
              <th scope="col">Priority</th>
              <th scope="col">Closed On</th>
            </tr>
          </thead>

          <tbody>
            {companyRequests.map(request => (
              <tr key={request._id}>
                <td>{request.activity}</td>
                <td>{request.subActivity}</td>
                <td>{request.user && request.user.name}</td>
                <td>{request.user && request.user.company.companyName}</td>
                <td>
                  {" "}
                  <Moment format="DD/MM/YYYY, h:mm:ss a">{request.date}</Moment>
                </td>
                <td>
                  {request.openStatus === true ? openStatus : closeStatus}
                </td>
                <td>{request.description && request.description}</td>
                <td>{request.email && request.email}</td>
                <td>
                  {request.priority === "low" ? lowPriority : highPriority}
                </td>
                <td>
                  {request.closeDate ? (
                    <Moment format="DD/MM/YYYY, h:mm:ss a">
                      {request.closeDate}
                    </Moment>
                  ) : (
                    openStatus
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

AdminRequest.propTypes = {
  getCompanyRequests: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
  companyRequests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  companyRequests: state.request.companyRequests.data,
  companyRequestLoading: state.request.companyRequestLoading
});
export default connect(mapStateToProps, { getCompanyRequests })(AdminRequest);
