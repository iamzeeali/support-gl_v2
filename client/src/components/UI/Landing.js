import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="">Globus Labs Support Portal</h1>

          <p className="lead">
            Manage all your business processes better with Globus Labs.
          </p>
          <div className="btn-group" role="group" aria-label="Basic example">
            {/* <Link className="btn btn-outline-secondary btn-lg" to="/register">
              Sign Up
            </Link> */}
            <Link className="btn btn-primary btn-lg" to="/login">
              Log In
            </Link>
          </div>
          <small className="py-5">
            Powered By{" "}
            <a
              href="https://www.globuslabs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Globus Labs
            </a>
          </small>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
