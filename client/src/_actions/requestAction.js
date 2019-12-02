import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current Request
export const getCurrentRequest = id => async dispatch => {
  try {
    const res = await axios.get(`/api/activityLog/${id}`);

    dispatch({
      type: types.GET_REQUEST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//*****************************************LOGGED IN USER DATA****************************************** */
//Get user's Requests
export const getRequests = () => async dispatch => {
  try {
    const res = await axios.get(`/api/activityLog`);
    dispatch({
      type: types.GET_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get user's open Requests counts
export const getOpenStatusCount = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/openStatusCount");
    dispatch({
      type: types.GET_OPEN_STATUS_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get user's open Requests
export const getOpenStatus = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/openStatus");
    dispatch({
      type: types.GET_OPEN_STATUS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get user's 30days Requests
export const get30DaysRequests = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/30days");
    dispatch({
      type: types.GET_30_DAYS_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get user's 30days Requests Count
export const get30DaysRequestsCount = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/30daysCount");
    dispatch({
      type: types.GET_30_DAYS_REQUESTS_COUNT,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//*****************************************LOGGED IN COMPANY DATA****************************************************** */
//Get company's Requests
export const getCompanyRequests = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/company");
    dispatch({
      type: types.GET_COMPANY_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get company's open Requests counts
export const getCompanyOpenStatusCount = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/openStatusCount/company");
    dispatch({
      type: types.GET_COMPANY_OPEN_STATUS_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get companys's open Requests
export const getCompanyOpenStatus = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/openStatus/company");
    dispatch({
      type: types.GET_COMPANY_OPEN_STATUS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get company's 30days Requests
export const getCompany30DaysRequests = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/30days/company");
    dispatch({
      type: types.GET_COMPANY_30_DAYS_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get companys's 30days Requests Count
export const getCompany30DaysRequestsCount = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/30daysCount/company");
    dispatch({
      type: types.GET_COMPANY_30_DAYS_REQUESTS_COUNT,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

/****************************************************ALL FOR SUPER ADMIN*********************************************8 */
//Get all Requests
export const getAllRequests = () => async dispatch => {
  try {
    const res = await axios.get("/api/activityLog/all");
    dispatch({
      type: types.GET_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add Request
export const addRequest = (formData, history) => async dispatch => {
  console.log(formData);
  try {
    dispatch({
      type: types.ADD_REQUEST,
      sendingPayload: true
    });
    const res = await axios.post("/api/activityLog", formData);
    dispatch({
      type: types.ADD_REQUEST,
      payload: res.data,
      sendingPayload: false
    });

    dispatch(setAlert("Request Sent!", "success"));

    history.push("/request");
  } catch (err) {
    // const errors = err.response.data.errors;

    if (err) {
      dispatch(setAlert("Something went wrong, try again", "danger"));
    }

    dispatch({
      type: types.REQUEST_ERROR
    });
  }
};

//Get user's company emails
export const getEmails = () => async dispatch => {
  try {
    const res = await axios.get("/api/email");
    dispatch({
      type: types.GET_EMAILS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get all emails
export const getAllEmails = () => async dispatch => {
  try {
    const res = await axios.get("/api/email/all");
    dispatch({
      type: types.GET_EMAILS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.REQUEST_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add Email
export const addEmail = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/email", formData);
    dispatch({
      type: types.ADD_EMAIL,
      payload: res.data,
      sendingPayload: false
    });
    dispatch(addRequest(formData, history));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    } else {
      console.log(errors);
    }

    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Suspend Email (update active to false)
export const deleteEmail = (formData, id, history) => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      let activeOb = {
        active: formData.active
      };
      const res = await axios.patch(`/api/email/${id}`, activeOb);
      dispatch({
        type: types.DELETE_EMAIL,
        payload: res.data,
        sendingPayload: false
      });
      dispatch(setAlert("Supend Request Sent!", "success"));
      dispatch(addRequest(formData, history));
    } catch (err) {
      const errors = err.response.data;

      if (errors) {
        dispatch(
          setAlert(
            errors.message
              ? errors.message
              : "Problem sending request, try again",
            "danger"
          )
        );
      }

      dispatch({
        type: types.REQUEST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Change Passowrd Request
export const changePassword = (formData, history) => async dispatch => {
  try {
    dispatch(addRequest(formData, history));
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      dispatch(
        setAlert(
          errors.message
            ? errors.message
            : "Problem sending request, try again",
          "danger"
        )
      );
    }

    dispatch({
      type: types.REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Request
export const editRequest = (formData, history, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.patch(`/api/activityLog/${id}`, formData, config);

    dispatch({
      type: types.GET_REQUEST,
      payload: res.data
    });

    dispatch(setAlert("Request Updated", "success"));

    history.push("/request");
  } catch (err) {
    console.log(err);

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }

    // dispatch({
    //   type: types.REQUEST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

//Delete Request
export const deleteRequest = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/activityLog/${id}`);
      dispatch({
        type: types.DELETE_REQUEST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: types.REQUEST_ERROR
      });
    }
  }
};

//Set Current Request
export const setCurrentRequest = request => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_REQUEST,
    payload: request
  });
};

// Clear Request
export const clearRequest = () => async dispatch => {
  dispatch({ type: types.CLEAR_REQUEST });
};

//Filter Request
export const filterRequest = text => async dispatch => {
  dispatch({ type: types.FILTER_REQUEST, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
