import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current Member
export const getCurrentMember = id => async dispatch => {
  try {
    const res = await axios.get(`/api/user/member/${id}`);

    dispatch({
      type: types.GET_MEMBER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all Members
export const getMembers = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/member");
    dispatch({
      type: types.GET_MEMEBERS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: types.MEMBER_ERROR,
      payload: { status: err.response }
    });
  }
};

// Add Member
export const addMember = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/user/member", formData);
    dispatch({
      type: types.ADD_MEMBER,
      payload: res.data
    });

    dispatch(setAlert("Member Added", "success"));

    history.push("/member");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Member
export const editMember = (formData, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.patch(`/api/user/member/${id}`, formData, config);

    dispatch({
      type: types.GET_MEMBER,
      payload: res.data
    });

    dispatch(setAlert("Member Updated", "success"));

    history.push("/member");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete Member
export const deleteMember = id => async dispatch => {
  if (
    window.confirm(
      "To enable the user back call Globus Support Center. Confirm Disable?"
    )
  ) {
    try {
      await axios.patch(`/api/user/member/${id}`);
      dispatch({
        type: types.DELETE_MEMBER,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: types.MEMBER_ERROR
      });
    }
  }
};

//Set Current Member
export const setCurrentMember = member => async dispatch => {
  dispatch({
    type: types.SET_CURRENT_MEMBER,
    payload: member
  });
};

// Clear Member
export const clearMember = () => async dispatch => {
  dispatch({ type: types.CLEAR_MEMBER });
};

//Filter Member
export const filterMember = text => async dispatch => {
  dispatch({ type: types.FILTER_MEMBER, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: types.CLEAR_FILTER });
};
