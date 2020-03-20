import {
  FETCH_PROFILE,
  SAVE_LOCAL_BACKGROUND,
  SAVE_LOCAL_LOGO,
  GET_PRODUCT_LAND_MEMBER_START,
  GET_PRODUCT_LAND_MEMBER_SUCCESS,
  GET_PRODUCT_LAND_MEMBER_ERROR,
  GET_PRODUCT_GROUP_MEMBER_START,
  GET_PRODUCT_GROUP_MEMBER_SUCCESS,
  GET_PRODUCT_GROUP_MEMBER_ERROR,
  GET_PRODUCT_NEXT_LAND_MEMBER_START,
  GET_PRODUCT_NEXT_LAND_MEMBER_SUCCESS,
  GET_PRODUCT_NEXT_LAND_MEMBER_ERROR,
  GET_PRODUCT_NEXT_GROUP_MEMBER_START,
  GET_PRODUCT_NEXT_GROUP_MEMBER_SUCCESS,
  GET_PRODUCT_NEXT_GROUP_MEMBER_ERROR,
  RESET_CURRENT_LIST,
  GET_PREV_DATA_SUCCESS
} from "../../constants/ActionTypes";

let initialState = {
  error: "",
  loadingProductLand: false,
  loadingProductGroup: false,
  productList: [],
  currentListProduct: [],
  currentNextProduct: [],
  loadNextLand: false,
  loadNextGroup: false,
  load: false,
  landList: [],
  groupList: []
};

const Account = (state = initialState, action) => {
  let { profile } = action;
  switch (action.type) {
    case FETCH_PROFILE:
      state = profile;
      return { ...state };

    case SAVE_LOCAL_BACKGROUND:
      for (const key in state) {
        if (key === "company_background") {
          state[key] = action.imageUrl;
        }
      }
      return { ...state };

    case SAVE_LOCAL_LOGO:
      for (const key in state) {
        if (key === "company_logo") {
          state[key] = action.imageUrl;
        }
      }
      return { ...state };

    case GET_PRODUCT_LAND_MEMBER_START: {
      return { ...state, productList: [], loadingProductLand: false };
    }
    case GET_PRODUCT_LAND_MEMBER_SUCCESS: {
      return {
        ...state,
        loadingProductLand: true,
        landList: state.landList.concat(action.payload),
        currentListProduct: state.currentListProduct.concat(action.payload),
        productList: state.productList.concat(action.payload)
      };
    }
    case GET_PRODUCT_LAND_MEMBER_ERROR: {
      return { ...state, error: action.payload, loadingProductLand: true };
    }
    case GET_PRODUCT_GROUP_MEMBER_START: {
      return { ...state, productList: [], loadingProductGroup: false };
    }
    case GET_PRODUCT_GROUP_MEMBER_SUCCESS: {
      return {
        ...state,
        loadingProductGroup: true,
        groupList: state.groupList.concat(action.payload),
        currentListProduct: state.currentListProduct.concat(action.payload),
        productList: state.productList.concat(action.payload)
      };
    }
    case GET_PRODUCT_GROUP_MEMBER_ERROR: {
      return { ...state, error: action.payload, loadingProductGroup: true };
    }

    case RESET_CURRENT_LIST:
      return {
        ...state,
        currentListProduct: [],
        currentNextProduct: []
      };

    case GET_PRODUCT_NEXT_LAND_MEMBER_START:
      return {
        ...state,
        currentNextProductLand: [],
        loadNextLand: false
      };

    case GET_PRODUCT_NEXT_LAND_MEMBER_SUCCESS:
      return {
        ...state,
        landList: state.landList.concat(action.payload),
        productList: state.productList.concat(action.payload),
        currentNextProduct: state.currentNextProduct.concat(action.payload),
        loadNextLand: true
      };

    case GET_PRODUCT_NEXT_LAND_MEMBER_ERROR:
      return { ...state, error: action.payload, loadNextLand: true };

    case GET_PRODUCT_NEXT_GROUP_MEMBER_START:
      return {
        ...state,
        currentNextProductGroup: [],
        loadNextGroup: false
      };

    case GET_PRODUCT_NEXT_GROUP_MEMBER_SUCCESS:
      return {
        ...state,
        groupList: state.groupList.concat(action.payload),
        productList: state.productList.concat(action.payload),
        currentNextProduct: state.currentNextProduct.concat(action.payload),
        loadNextGroup: true
      };

    case GET_PRODUCT_NEXT_GROUP_MEMBER_ERROR:
      return { ...state, error: action.payload, loadNextGroup: true };

    case GET_PREV_DATA_SUCCESS:
      return {
        ...state,
        currentListProduct: action.payload,
        load: true
      };

    default:
      return { ...state };
  }
};

export default Account;
