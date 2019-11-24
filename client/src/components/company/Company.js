import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";
import {
  getCompanies,
  deleteCompany,
  setCurrentCompany,
  clearCompany
} from "../../_actions/companyAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Company = ({
  getCompanies,
  deleteCompany,
  setCurrentCompany,
  clearCompany,
  companies,
  filtered,
  loading
}) => {
  useEffect(() => {
    getCompanies();
    //eslint-diable-next-line
  }, [getCompanies]);

  const onDeleteHandler = id => {
    deleteCompany(id);
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
        <Link to="/addCompany" className="btn btn-primary">
          Add Company
        </Link>
        <h1 className="pt-4">Companies</h1>
        <small className="lead">Available Companies in the portal...</small>
      </div>

      <div className="container">
        {companies !== null && !loading ? (
          <table className="table animated fadeIn my-2">
            <thead>
              <tr>
                <th>Company</th>
                <th>Alias</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map(comp => (
                <tr key={comp._id}>
                  <td>{comp.companyName}</td>
                  <td>{comp.shortName}</td>
                  <td>{comp.country}</td>
                  <td>{comp.state}</td>
                  <td>{comp.city}</td>
                  <td>{comp.companyAddress}</td>
                  <td>{comp.companyPhone}</td>
                  <td>{comp.companyEmail}</td>
                  <td>
                    <Link
                      title="Edit"
                      to={`/editCompany/${comp._id}`}
                      onClick={() => setCurrentCompany(comp)}
                    >
                      <i className="fa fa-edit fa-lg"></i>
                    </Link>{" "}
                    &nbsp; &nbsp;
                    <Link
                      title="Delete"
                      to="#!"
                      onClick={() => onDeleteHandler(comp._id)}
                    >
                      <i className="fa fa-trash text-danger fa-lg"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

Company.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  setCurrentCompany: PropTypes.func.isRequired,
  clearCompany: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  companies: state.company.companies,
  company: state.company.company,
  filtered: state.company.filtered,
  loading: state.company.loading
});
export default connect(mapStateToProps, {
  getCompanies,
  deleteCompany,
  setCurrentCompany,
  clearCompany
})(Company);
