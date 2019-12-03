import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { filterRequest, clearFilter } from "../../_actions/requestAction";

const FilterRequest = ({ filterRequest, clearFilter, filtered }) => {
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChangeHandler = e => {
    if (text.current.value !== null) {
      filterRequest(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="input-group">
      <input
        ref={text}
        type="text"
        className="form-control search-menu"
        placeholder="Search Requests..."
        onChange={onChangeHandler}
      />
      <div className="input-group-append">
        <span className="input-group-text">
          <i className="fa fa-search text-dark" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  requests: state.request.requests,
  filtered: state.request.filtered
});

export default connect(mapStateToProps, { filterRequest, clearFilter })(
  FilterRequest
);
