import * as types from "../types/types";

const initalState = {
  yearsloading: true,
  yearsdata: [],
  makesloading: true,
  makesdata: [],
  modelsloading: true,
  modelsdata: [],
  fuelloading: true,
  fueldata: [],
  gradeloading: true,
  gradeData: [],
  vrtloading: true,
  vrtData: [],
  bodystyleloading: true,
  bodystyledata: [],
  conditionloading: true,
  conditiondata: [],
  mileageloading: true,
  mileagedata: [],
  transmissionloading: true,
  transmissiondata: [],
  engineloading: true,
  enginedata: [],
  colorloading: true,
  colordata: [],
};

const FilterReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.FETCH_FILTERS_DATA_BEGIN_YEAR:
      return {
        ...state,
        yearsloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_YEAR:
      return {
        ...state,
        yearsloading: false,
        yearsdata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_MAKE:
      return {
        ...state,
        makesloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_MAKE:
      return {
        ...state,
        makesloading: false,
        makesdata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_MODEL:
      return {
        ...state,
        modelsloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_MODEL:
      return {
        ...state,
        modelsloading: false,
        modelsdata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_FUEL:
      return {
        ...state,
        fuelloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_FUEL:
      return {
        ...state,
        fuelloading: false,
        fueldata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_GRADE:
      return {
        ...state,
        gradeloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_GRADE:
      return {
        ...state,
        gradeloading: false,
        gradeData: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_VRT:
      return {
        ...state,
        vrtloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_VRT:
      return {
        ...state,
        vrtloading: false,
        vrtData: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_BODYSTYLE:
      return {
        ...state,
        bodystyleloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_BODYSTYLE:
      return {
        ...state,
        bodystyleloading: false,
        bodystyledata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_CONDITION:
      return {
        ...state,
        conditionloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_CONDITION:
      return {
        ...state,
        conditionloading: false,
        conditiondata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_MILEAGE:
      return {
        ...state,
        mileageloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_MILEAGE:
      return {
        ...state,
        mileageloading: false,
        mileagedata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_TRANSMISSION:
      return {
        ...state,
        transmissionloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_TRANSMISSION:
      return {
        ...state,
        transmissionloading: false,
        transmissiondata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_ENGINE:
      return {
        ...state,
        engineloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_ENGINE:
      return {
        ...state,
        engineloading: false,
        enginedata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_COLOR:
      return {
        ...state,
        colorloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_COLOR:
      return {
        ...state,
        colorloading: false,
        colordata: action.payload,
      };
    default:
      return state;
  }
};

export default FilterReducer;
