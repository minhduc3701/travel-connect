import {
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  START_GET_COMMENT_OVERVIEW,
  GET_COMMENT_OVERVIEW_SUCCESS,
  GET_COMMENT_OVERVIEW_ERROR,
  START_GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR
} from "constants/ActionTypes";

const INIT_STATE = {
  loading: true,
  error: "",
  data: null,
  comment: [],
  commentOverview: [],
  loadComment: true
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_DATA_START:
      return { ...state, loading: true };

    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };

    case GET_USER_DATA_ERROR:
      return { ...state, error: action.payload, loading: false };
    case START_GET_COMMENT_OVERVIEW:
      return {
        ...state,
        comment: [],
        loadComment: true
      };

    case GET_COMMENT_OVERVIEW_SUCCESS:
      return {
        ...state,
        commentOverview: action.payload,
        loadComment: false
      };

    case GET_COMMENT_OVERVIEW_ERROR:
      return { ...state, error: action.payload, loadComment: false };
    case START_GET_COMMENT:
      return {
        ...state,
        comment: [],
        loadComment: true
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        loadComment: false
      };

    case GET_COMMENT_ERROR:
      return { ...state, error: action.payload, loadComment: false };
    default:
      return state;
  }
};
