import * as types from "../_actions/types";

const initialState = {
  request: null,
  requests: [],
  companyRequests: [],
  emails: [],
  email: null,
  error: {},
  filtered: null,
  loading: true,
  companyRequestLoading: true,
  sendingLoader: false,
  open: null,
  openStatus: null,
  companyOpenStatus: null,
  thirtyDaysRequestsCount: null,
  companyThirtyDaysRequestsCount: null,
  openStatusCount: null,
  companyOpenStatusCount: null
};

export default function(state = initialState, action) {
  const { type, payload, sendingPayload } = action;

  switch (type) {
    case types.GET_REQUEST:
      return {
        ...state,
        request: payload.data,
        loading: false
      };
    case types.GET_REQUESTS:
      return {
        ...state,
        requests: payload,
        loading: false
      };
    case types.GET_OPEN_STATUS_COUNT:
      return {
        ...state,
        openStatusCount: payload.data,
        loading: false
      };
    case types.GET_OPEN_STATUS:
      return {
        ...state,
        requests: payload,

        loading: false
      };
    case types.GET_30_DAYS_REQUESTS:
      return {
        ...state,
        requests: payload,

        loading: false
      };
    case types.GET_30_DAYS_REQUESTS_COUNT:
      return {
        ...state,
        thirtyDaysRequestsCount: payload,
        loading: false
      };
    //*************************COMPANY******************************** */
    case types.GET_COMPANY_REQUESTS:
      return {
        ...state,
        companyRequests: payload,
        companyRequestLoading: false
      };
    case types.GET_COMPANY_OPEN_STATUS_COUNT:
      return {
        ...state,
        companyOpenStatusCount: payload.data,
        loading: false
      };
    case types.GET_COMPANY_OPEN_STATUS:
      return {
        ...state,
        companyRequests: payload,
        loading: false
      };
    case types.GET_COMPANY_30_DAYS_REQUESTS:
      return {
        ...state,
        companyRequests: payload,
        loading: false
      };
    case types.GET_COMPANY_30_DAYS_REQUESTS_COUNT:
      return {
        ...state,
        companyThirtyDaysRequestsCount: payload,
        loading: false
      };
    //***************************************END COMPANY****************************** */
    case types.ADD_REQUEST:
      return {
        ...state,
        request: payload,
        sendingLoader: sendingPayload
      };
    case types.SET_CURRENT_REQUEST:
      return {
        ...state,
        request: action.payload,
        open: action.payload.openStatus
      };
    case types.CLEAR_REQUEST:
      return {
        ...state,
        request: null,

        loading: true,
        sendingLoader: false
      };
    case types.GET_EMAILS:
      return {
        ...state,
        emails: payload,
        loading: false
      };
    case types.ADD_EMAIL:
      return {
        ...state,
        email: payload,
        loading: false
      };
    case types.DELETE_EMAIL:
      return {
        ...state,
        email: payload,
        loading: false
      };

    case types.FILTER_REQUEST:
      return {
        ...state,
        filtered: state.requests.data.filter(requ => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            requ.activity.match(regex) ||
            requ.user.name.match(regex) ||
            requ.user.company.companyName.match(regex) ||
            // requ.subActivity.match(regex) ||
            requ.email.match(regex) ||
            // requ.closeDate.match(regex) ||
            requ.priority.match(regex)
          );
        })
      };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case types.DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(
          request => request._id !== action.payload
        ),
        loading: false
      };
    case types.REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
