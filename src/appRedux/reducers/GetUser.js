import {
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  START_GET_COMMENT_OVERVIEW,
  GET_COMMENT_OVERVIEW_SUCCESS,
  GET_COMMENT_OVERVIEW_ERROR,
  START_GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR,
  START_GET_RECOMMEND_LAND_OVERVIEW,
  GET_RECOMMEND_LAND_OVERVIEW_SUCCESS,
  GET_RECOMMEND_LAND_OVERVIEW_ERROR,
  START_GET_RECOMMEND_GROUP_OVERVIEW,
  GET_RECOMMEND_GROUP_OVERVIEW_SUCCESS,
  GET_RECOMMEND_GROUP_OVERVIEW_ERROR
} from "constants/ActionTypes";

const INIT_STATE = {
  loading: true,
  error: "",
  data: null,
  comment: [],
  commentOverview: [],
  loadComment: true,
  recommendLand: [],
  recommendGroup: [],
  loadRecommandLand: true,
  loadRecommandGroup: true
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

    case START_GET_RECOMMEND_LAND_OVERVIEW:
      return {
        ...state,
        recommendLand: [],
        loadRecommandLand: true
      };

    case GET_RECOMMEND_LAND_OVERVIEW_SUCCESS:
      return {
        ...state,
        recommendLand: action.payload,
        loadRecommandLand: false
      };

    case GET_RECOMMEND_LAND_OVERVIEW_ERROR:
      return { ...state, error: action.payload, loadRecommandLand: false };

    case START_GET_RECOMMEND_GROUP_OVERVIEW:
      return {
        ...state,
        loadRecommandGroup: [],
        loadRecommandGroup: true
      };

    case GET_RECOMMEND_GROUP_OVERVIEW_SUCCESS:
      return {
        ...state,
        loadRecommandGroup: action.payload,
        loadRecommandGroup: false
      };

    case GET_RECOMMEND_GROUP_OVERVIEW_ERROR:
      return { ...state, error: action.payload, loadRecommandGroup: false };
    default:
      return state;
  }
};
