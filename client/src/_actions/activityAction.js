import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current activity
export const getCurrentActivity = id => async dispatch => {
  const actId = JSON.stringify({ id });
  try {
    const res = await axios.get(`/api/activity/${actId}`);

    dispatch({
      type: types.GET_ACTIVITY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.ACTIVITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Companies Activities
export const getCompanyActivities = () => async dispatch => {
  try {
    const res = await axios.get("/api/activity/companyActivities");
    dispatch({
      type: types.GET_ACTIVITIES,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.ACTIVITY_ERROR,
      payload: { status: err.response }
    });
  }
};

//Get all Activities
export const getActivities = () => async dispatch => {
  try {
    const res = await axios.get("/api/activity");
    dispatch({
      type: types.GET_ACTIVITIES,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.ACTIVITY_ERROR,
      payload: { status: err.response }
    });
  }
};

export const populateSubActivities = activity => async dispatch => {
  try {
    dispatch({
      type: types.POPULATE_SUBACTIVITIES,
      payload: activity
    });
  } catch (err) {
    dispatch({
      type: types.ACTIVITY_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add Activity
export const addActivity = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/activity", formData);
    dispatch({
      type: types.ADD_ACTIVITY,
      payload: res.data
    });

    dispatch(setAlert("Activity Added", "success"));

    history.push("/activity");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ACTIVITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Activity
export const editActivity = (formData, history, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.patch(`/api/activity/${id}`, formData, config);

    dispatch({
      type: types.GET_ACTIVITY,
      payload: res.data
    });

    dispatch(setAlert("Activity Updated", "success"));

    history.push("/activity");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ACTIVITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Actiivty
export const deleteActivity = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/activity/${id}`);
      dispatch({
        type: types.DELETE_ACTIVITY,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: types.ACTIVITY_ERROR
      });
    }
  }
};

//Set Current Activity
export const setCurrentActivity = activity => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_ACTIVITY,
    payload: activity
  });
};

// Clear Activity
export const clearActivity = () => async dispatch => {
  dispatch({ type: types.CLEAR_ACTIVITY });
};

//Filter Activity
export const filterActivity = text => async dispatch => {
  dispatch({ type: types.FILTER_ACTIVITY, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
