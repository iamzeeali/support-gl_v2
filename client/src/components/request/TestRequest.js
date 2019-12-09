import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { getRequests } from "../../_actions/requestAction";
import Moment from "react-moment";
import "moment-timezone";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TestRequest extends React.Component {
  state = {
    pager: {},
    pageOfItems: []
  };

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate() {
    this.loadPage();
  }

  loadPage() {
    // get page of items from api
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    if (page !== this.state.pager.currentPage) {
      fetch(`/api/activityLog?page=${page}`, { method: "GET" })
        .then(response => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        });
    }
  }

  render() {
    const { pager, pageOfItems } = this.state;
    return (
      <Fragment>
        <div className="card text-center m-3">
          <h3 className="card-header">
            React + Node - Server Side Pagination Example
          </h3>

          <div className="card-body">
            {pageOfItems.map(item => (
              <div key={item.id}>{item}</div>
            ))}
          </div>
          <div className="card-footer pb-0 pt-3">
            {pager.pages && pager.pages.length && (
              <ul className="pagination">
                <li
                  className={`page-item first-item ${
                    pager.currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <Link to={{ search: `?page=1` }} className="page-link">
                    First
                  </Link>
                </li>
                <li
                  className={`page-item previous-item ${
                    pager.currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <Link
                    to={{ search: `?page=${pager.currentPage - 1}` }}
                    className="page-link"
                  >
                    Previous
                  </Link>
                </li>
                {pager.pages.map(page => (
                  <li
                    key={page}
                    className={`page-item number-item ${
                      pager.currentPage === page ? "active" : ""
                    }`}
                  >
                    <Link
                      to={{ search: `?page=${page}` }}
                      className="page-link"
                    >
                      {page}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item next-item ${
                    pager.currentPage === pager.totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    to={{ search: `?page=${pager.currentPage + 1}` }}
                    className="page-link"
                  >
                    Next
                  </Link>
                </li>
                <li
                  className={`page-item last-item ${
                    pager.currentPage === pager.totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    to={{ search: `?page=${pager.totalPages}` }}
                    className="page-link"
                  >
                    Last
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
TestRequest.propTypes = {
  auth: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  req: state.request
});
export default connect(mapStateToProps)(TestRequest);
