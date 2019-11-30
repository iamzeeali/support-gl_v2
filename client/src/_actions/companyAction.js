import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current Company
export const getCurrentCompany = id => async dispatch => {
  try {
    const res = await axios.get(`/api/company/${id}`);

    dispatch({
      type: types.GET_COMPANY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all Companies
export const getCompanies = () => async dispatch => {
  try {
    const res = await axios.get("/api/company");
    dispatch({
      type: types.GET_COMPANIES,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.COMPANY_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add company
export const addCompany = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/company", formData);
    dispatch({
      type: types.ADD_COMPANY,
      payload: res.data
    });

    dispatch(setAlert("Company Added", "success"));

    history.push("/company");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Company
export const editCompany = (formData, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.patch(`/api/company/${id}`, formData, config);

    dispatch({
      type: types.GET_COMPANY,
      payload: res.data
    });

    dispatch(setAlert("Company Updated", "success"));

    history.push("/company");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Company
export const deleteCompany = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/company/${id}`);
      dispatch({
        type: types.DELETE_COMPANY,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: types.COMPANY_ERROR
      });
    }
  }
};

//Set Current Company
export const setCurrentCompany = company => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_COMPANY,
    payload: company
  });
};

// Clear Company
export const clearCompany = () => async dispatch => {
  dispatch({ type: types.CLEAR_COMPANY });
};

//Filter Company
export const filterCompany = text => async dispatch => {
  dispatch({ type: types.FILTER_COMPANY, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
