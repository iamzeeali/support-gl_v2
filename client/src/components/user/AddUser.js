import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../_actions/authAction";
import { getCompanies } from "../../_actions/companyAction";

const AddUser = ({
  auth: { username },
  addUser,
  getCompanies,
  companies,
  history
}) => {
  useEffect(() => {
    getCompanies();
    //eslint-diable-next-line
  }, [getCompanies]);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: ""
  });

  const { name, company, email, password, passwordConfirm, role } = formData;

  const onChangeHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addUser(formData, history);
  };

  let companyOptions = companies.map(company => (
    <option key={company._id} value={company._id}>
      {company.companyName}
    </option>
  ));

  return (
    <Fragment>
      <div className="form-title animated fadeIn">
        <Link to="/user">
          <i className="fa fa-arrow-left text-muted bg-light rounded-circle p-2"></i>
        </Link>{" "}
        <Link to="/" className="">
          <i
            className="fa fa-home fa-lg text-muted bg-light rounded-circle p-2"
            aria-hidden="true"
          ></i>
        </Link>
        <h1 className="pt-4">Add User</h1>
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="name"
                      value={name}
                      onChange={e => onChangeHandler(e)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <select
                      className="form-control"
                      name="company"
                      value={company}
                      onChange={e => onChangeHandler(e)}
                    >
                      <option className="text-muted">-Select Company-</option>

                      {companyOptions}
                    </select>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="passwordConfirm"
                      value={passwordConfirm}
                      onChange={e => onChangeHandler(e)}
                      required
                    />
                  </div>

                  <div className="form-label-group">
                    <select
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={e => onChangeHandler(e)}
                    >
                      <option className="text-muted">-Choose Role-</option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
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

AddUser.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  companies: state.company.companies,
  auth: state.auth
});
export default connect(mapStateToProps, { addUser, getCompanies })(
  withRouter(AddUser)
);
