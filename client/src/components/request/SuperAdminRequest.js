import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import {
  getAllRequests,
  fetchAllRequests,
  setCurrentRequest,
  clearRequest,
  deleteRequest
} from "../../_actions/requestAction";
import FilterRequest from "./FilterRequest";
import Moment from "react-moment";
import "moment-timezone";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";

const SuperAdminRequest = ({
  getAllRequests,
  fetchAllRequests,
  setCurrentRequest,
  requests,
  filtered,
  loading
}) => {
  const [scroll, setScroll] = useState({
    count: 10,
    start: 1
  });

  useEffect(() => {
    let { count, start } = scroll;

    getAllRequests(count, start);
    //eslint-diable-next-line
  }, [getAllRequests]);

  const fetch = () => {
    let { count, start } = scroll;
    setScroll({ ...scroll, start: ++start });

    fetchAllRequests(count, start);
  };

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
  const modPriority = (
    <span className="badge badge-info text-center">Moderate</span>
  );
  const lowPriority = (
    <span className="badge badge-warning text-center">Low</span>
  );

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
        </Link>
        <h1 className="pt-4">Request Logs</h1>
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

      <div className="container py-4">
        <FilterRequest />
        <br />
        <InfiniteScroll
          dataLength={requests.length}
          next={fetch}
          hasMore={true}
          loader={<h1>...</h1>}
        >
          {requests !== null && !loading ? (
            <table className="table table-responsive-sm table-hover table-bordered animated fadeIn my-2">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Sub Activities</th>
                  <th scope="col">Req By</th>
                  <th scope="col">Company</th>
                  <th scope="col">Req Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Closed On</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered !== null
                  ? filtered.map(req => (
                      <tr key={req._id}>
                        <td>{req.activity}</td>
                        <td>{req.subActivity}</td>
                        <td>{req.user && req.user.name}</td>
                        <td>{req.user && req.user.company.companyName}</td>
                        <td>
                          {" "}
                          <Moment format="DD/MM/YYYY, h:mm:ss a">
                            {req.date}
                          </Moment>
                        </td>
                        <td>
                          {req.description ? (
                            req.description
                          ) : (
                            <span className="text-muted">No Description</span>
                          )}
                        </td>
                        <td>{req.email ? req.email : "NA"}</td>

                        <td>
                          {req.openStatus === true ? openStatus : closeStatus}
                        </td>
                        <td>
                          {req.priority === "low"
                            ? lowPriority
                            : req.priority === "moderate"
                            ? modPriority
                            : highPriority}
                        </td>
                        <td>
                          {req.closeDate ? (
                            <Moment format="DD/MM/YYYY, h:mm:ss a">
                              {req.closeDate}
                            </Moment>
                          ) : (
                            openStatus
                          )}
                        </td>

                        <td>
                          <Link
                            title="Update Status"
                            to={`/editRequest/${req._id}`}
                            onClick={() => setCurrentRequest(req)}
                          >
                            <i className="fa fa-edit fa-lg"></i>
                          </Link>{" "}
                        </td>
                      </tr>
                    ))
                  : requests.map(req => (
                      <tr key={req._id}>
                        <td>{req.activity}</td>
                        <td>{req.subActivity}</td>
                        <td>{req.user && req.user.name}</td>
                        <td>{req.user && req.user.company.companyName}</td>
                        <td>
                          {" "}
                          <Moment format="DD/MM/YYYY, h:mm:ss a">
                            {req.date}
                          </Moment>
                        </td>
                        <td>
                          {req.description ? (
                            req.description
                          ) : (
                            <span className="text-muted">No Description</span>
                          )}
                        </td>
                        <td>{req.email ? req.email : "NA"}</td>

                        <td>
                          {req.openStatus === true ? openStatus : closeStatus}
                        </td>
                        <td>
                          {" "}
                          {req.priority === "low" ? lowPriority : highPriority}
                        </td>
                        <td>
                          {req.closeDate ? (
                            <Moment format="DD/MM/YYYY, h:mm:ss a">
                              {req.closeDate}
                            </Moment>
                          ) : (
                            openStatus
                          )}
                        </td>

                        <td>
                          <Link
                            title="Update Status"
                            to={`/editRequest/${req._id}`}
                            onClick={() => setCurrentRequest(req)}
                          >
                            <i className="fa fa-edit fa-lg"></i>
                          </Link>{" "}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          ) : (
            <div class="container">
              <Skeleton count={10} height={40} />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </Fragment>
  );
};

SuperAdminRequest.propTypes = {
  getAllRequests: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  setCurrentRequest: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  requests: state.request.requests,
  request: state.request.request,
  filtered: state.request.filtered,
  loading: state.request.loading
});
export default connect(mapStateToProps, {
  getAllRequests,
  fetchAllRequests,
  deleteRequest,
  setCurrentRequest,
  clearRequest
})(SuperAdminRequest);
