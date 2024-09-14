import * as types from "../types/types";

const initalState = {
  userloading: true,
  singleuser: [],
  breederloading: true,
  breederdata: [],
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.FETCH_USER_DATA_BEGIN:
      return {
        ...state,
        userloading: true,
      };
    case types.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        userloading: false,
        singleuser: action.payload,
      };
    case types.FETCH_BREEDER_DATA_BEGIN:
      return {
        ...state,
        breederloading: true,
      };
    case types.FETCH_BREEDER_DATA_SUCCESS:
      return {
        ...state,
        breederloading: false,
        breederdata: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
