import * as types from "../types/types";

const initalState = {
  carsloading: true,
  carsdata: [],
  carloading: true,
  filteredcarloading: true,
  filteredcarloadingnew: true,
  filteredcardata: [],
  filteredcardatanew: [],
  filterloading: true,
  filterloadingnew: true,
  filterdata: [],
  filterdatanew: [],
  filtermodelloading: true,
  filtermodeldata: [],
  filterbodystyleloading: true,
  filterbodystyledata: [],
  cardata: [],
  carsloadingnew: true,
  carsdatanew: [],
};

const dogReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.FETCH_CARS_DATA_BEGIN:
      return {
        ...state,
        carsloading: true,
      };
    case types.FETCH_CARS_DATA_SUCCESS:
      return {
        ...state,
        carsloading: false,
        carsdata: action.payload,
      };
    case types.FETCH_CARS_DATA_BEGIN_NEW:
      return {
        ...state,
        carsloadingnew: true,
      };
    case types.FETCH_CARS_DATA_SUCCESS_NEW:
      return {
        ...state,
        carsloadingnew: false,
        carsdatanew: action.payload,
      };
    case types.FETCH_SINGLE_CAR_DATA_BEGIN:
      return {
        ...state,
        carloading: true,
      };
    case types.FETCH_SINGLE_CAR_DATA_SUCCESS:
      // console.log(action.payload)
      return {
        ...state,
        carloading: false,
        cardata: action.payload,
      };
    case types.FETCH_FILTERED_CARS_BEGIN:
      return {
        ...state,
        filteredcarloading: true,
      };
    case types.FETCH_FILTERED_CARS_SUCCESS:
      return {
        ...state,
        filteredcarloading: false,
        filteredcardata: action.payload,
      };
    case types.FETCH_FILTERED_CARS_BEGIN_NEW:
      return {
        ...state,
        filteredcarloadingnew: true,
      };
    case types.FETCH_FILTERED_CARS_SUCCESS_NEW:
      return {
        ...state,
        filteredcarloadingnew: false,
        filteredcardatanew: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN:
      return {
        ...state,
        filterloading: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS:
      return {
        ...state,
        filterloading: false,
        filterdata: action.payload,
      };
    case types.FETCH_FILTERS_DATA_BEGIN_NEW:
      return {
        ...state,
        filterloadingnew: true,
      };
    case types.FETCH_FILTERS_DATA_SUCCESS_NEW:
      return {
        ...state,
        filterloadingnew: false,
        filterdatanew: action.payload,
      };
    case types.FETCH_FILTERS_MODEL_DATA_BEGIN:
      return {
        ...state,
        filtermodelloading: true,
      };
    case types.FETCH_FILTERS_MODEL_DATA_SUCCESS:
      return {
        ...state,
        filtermodelloading: false,
        filtermodeldata: action.payload,
      };
    case types.FETCH_FILTERS_BODYDTYLE_DATA_BEGIN:
      return {
        ...state,
        filterbodystyleloading: true,
      };
    case types.FETCH_FILTERS_BODYDTYLE_DATA_SUCCESS:
      return {
        ...state,
        filterbodystyleloading: false,
        filterbodystyledata: action.payload,
      };
    case types.FETCH_CARS_DATA_APPEND_SUCCESS_NEW:
      const cars = state.carsdatanew.cars
        ? state.carsdatanew.cars.concat(action.payload.cars)
        : action.payload.cars;
      return {
        ...state,
        carsloadingnew: false,
        carsdatanew: {
          count: action.payload.count,
          cars: cars,
        },
      };
    case types.FETCH_FILTERED_CARS_APPEND_SUCCESS_NEW:
      const filteredcars = state.filteredcardatanew.cars
        ? state.filteredcardatanew.cars.concat(action.payload.cars)
        : action.payload.cars;
      return {
        ...state,
        filteredcarloadingnew: false,
        filteredcardatanew: {
          count: action.payload.count,
          cars: filteredcars,
        },
      };
    case types.CLEAR_CARS:
      return {
        ...state,
        filteredcardatanew: [],
        carsdatanew: [],
      };
    default:
      return state;
  }
};

export default dogReducer;
