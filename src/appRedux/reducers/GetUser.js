import {
  GET_USER_DATA_START,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR
} from "constants/ActionTypes";

const INIT_STATE = {
  loading: true,
  error: "",
  data: null
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

    default:
      return state;
  }
};
