import { apiBaseUrl, callHandleArray } from "../helpers/common";
import * as actionTypes from "../types/types";
import { handleResponse } from "../helpers/userServices";

export const fetchCarsStart = () => {
  return {
    type: actionTypes.FETCH_CARS_DATA_BEGIN,
  };
};

export const fetchCarsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_CARS_DATA_SUCCESS,
    payload: data.data,
  };
};

export const fetchCarsnewStart = () => {
  return {
    type: actionTypes.FETCH_CARS_DATA_BEGIN_NEW,
  };
};

export const fetchCarsnewSuccess = (data) => {
  return {
    type: actionTypes.FETCH_CARS_DATA_SUCCESS_NEW,
    payload: data.data,
  };
};

export const fetchAndAppendCarsnewSuccess = (data) => {
  return {
    type: actionTypes.FETCH_CARS_DATA_APPEND_SUCCESS_NEW,
    payload: data.data,
  };
};


export const fetchSingleCarStart = () => {
  return {
    type: actionTypes.FETCH_SINGLE_CAR_DATA_BEGIN,
  };
};

export const fetchSingleCarSuccess = (data) => {
  return {
    type: actionTypes.FETCH_SINGLE_CAR_DATA_SUCCESS,
    payload: data.data,
  };
};

export const fetchFilteredCarBegin = () => {
  return {
    type: actionTypes.FETCH_FILTERED_CARS_BEGIN,
  };
};

export const fetchFilteredCarSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERED_CARS_SUCCESS,
    payload: data.Data,
  };
};

export const fetchFilteredCarnewBegin = () => {
  return {
    type: actionTypes.FETCH_FILTERED_CARS_BEGIN_NEW,
  };
};

export const fetchFilteredCarnewSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERED_CARS_SUCCESS_NEW,
    payload: data.Data,
  };
};
export const fetchAndAppendFilteredCarnewSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERED_CARS_APPEND_SUCCESS_NEW,
    payload: data.Data,
  };
};

export const clearFilteredCarnew = () => {
  return {
    type: actionTypes.CLEAR_CARS,
  };
};

export const fetchFilterBegin = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN,
  };
};

export const fetchFilterSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchFilternewBegin = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_NEW,
  };
};

export const fetchFilternewSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_NEW,
    payload: data,
  };
};

export const fetchFilterModelBegin = () => {
  return {
    type: actionTypes.FETCH_FILTERS_MODEL_DATA_BEGIN,
  };
};

export const fetchFilterModelSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_MODEL_DATA_SUCCESS,
    payload: data.data,
  };
};
export const fetchFilterBodyStyleBegin = () => {
  return {
    type: actionTypes.FETCH_FILTERS_BODYDTYLE_DATA_BEGIN,
  };
};

export const fetchFilterBodyStyleSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_BODYDTYLE_DATA_SUCCESS,
    payload: data.data,
  };
};
export function getfiltermodel(make) {
  return (dispatch) => {
    dispatch(fetchFilterModelBegin());
    const request = new Request(`${apiBaseUrl}/filterdata-model/` + make, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('model filters data :'+JSON.stringify(data));
        dispatch(fetchFilterModelSuccess(data));
      });
  };
}
export function getfilterbodystyle(model) {
  return (dispatch) => {
    dispatch(fetchFilterBodyStyleBegin());
    const request = new Request(`${apiBaseUrl}/filterdata-bodystyle/` + model, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('model filters data :'+JSON.stringify(data));
        dispatch(fetchFilterBodyStyleSuccess(data));
      });
  };
}
export function getfilters(
  Year,
  Make,
  Model,
  Fuel,
  body_style,
  Condition,
  Mileage,
  transmission_type,
  engine,
  color
) {
  return (dispatch) => {
    dispatch(fetchFilterBegin());
    const request = new Request(`${apiBaseUrl}/filterdata`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        Year,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        Mileage,
        transmission_type,
        engine,
        color,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('filters data :'+JSON.stringify(data));
        dispatch(fetchFilterSuccess(data));
      });
  };
}
export function getfiltersnew(
  Year,
  Make,
  Model,
  Fuel,
  body_style,
  Condition,
  Mileage,
  transmission_type,
  engine,
  color
) {
  return (dispatch) => {
    dispatch(fetchFilternewBegin());
    const request = new Request(`${apiBaseUrl}/filterdata2`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        Year,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        Mileage,
        transmission_type,
        engine,
        color,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('filters data :'+JSON.stringify(data));
        dispatch(fetchFilternewSuccess(data));
      });
  };
}
export function getcarslisting($pagenumber) {
  return (dispatch) => {
    dispatch(fetchCarsStart());
    const request = new Request(`${apiBaseUrl}/allcars/` + $pagenumber, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchCarsSuccess(data));
      });
  };
}

export function getcarslistingnew(
  $pagenumber,
  $limit = 10,
  pricefilter = "",
  mileagefilter = "",
  vrtfilter = ""
) {
  return (dispatch) => {
    dispatch(fetchCarsnewStart());
    const request = new Request(
      `${apiBaseUrl}/allcarsnew/` + $pagenumber + "/" + $limit,
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ pricefilter, mileagefilter, vrtfilter }),
      }
    );

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        if (data.data.techinal_specifications) {
          data.data.techinal_specifications = JSON.parse(
            data.data.techinal_specifications
          );
        } else {
        }
        // if(vrtfilter && (vrtfilter === "Yes" || vrtfilter === "No")){
          // console.log('listing append')
          // dispatch(fetchAndAppendCarsnewSuccess(data));
        // }else{
          // console.log('listing no append')
          dispatch(fetchCarsnewSuccess(data));
        // }
        
      });
  };
}

export function getcar(car_id) {
  return (dispatch) => {
    dispatch(fetchSingleCarStart());
    const request = new Request(`${apiBaseUrl}/get-car2new/` + car_id, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log(data.data)
        if (data.data.techinal_specifications) {
          data.data.techinal_specifications = JSON.parse(
            data.data.techinal_specifications
          );
        } else {
        }
        dispatch(fetchSingleCarSuccess(data));
        return data;
      });
  };
}
export function getFilteredCars(
  Year,
  Make,
  Model,
  Fuel,
  body_style,
  Condition,
  Mileage,
  transmission_type,
  engine,
  pagenum
) {
  return (dispatch) => {
    dispatch(fetchFilteredCarBegin());
    const request = new Request(`${apiBaseUrl}/filtered-cars`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        Year,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        Mileage,
        transmission_type,
        engine,
      }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getFilteredCars: '+JSON.stringify(data))
        if (data.data.techinal_specifications) {
          data.data.techinal_specifications = JSON.parse(
            data.data.techinal_specifications
          );
        } else {
        }
        dispatch(fetchFilteredCarSuccess(data));
      });
  };
}

export function getFilteredCarsnew(
  is_manheim_car,
  premium_car,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
  Make,
  Model,
  Fuel,
  body_style,
  Condition,
  minMileage,
  maxMileage,
  transmission_type,
  engine,
  pagenum,
  limit,
  pricefilter,
  mileagefilter,
  color,
  vrt,
  grade,
) {
  color = color ? color.toString() : "";
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilteredCarnewBegin());
    const request = new Request(`${apiBaseUrl}/filtered-cars2new`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        is_manheim_car,
        premium_car,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        Make,
        Model,
        Fuel,
        body_style,
        Condition,
        minMileage,
        maxMileage,
        transmission_type,
        engine,
        pagenum,
        limit,
        pricefilter,
        mileagefilter,
        color,
        grade,
        vrt,
      }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getFilteredCars: '+JSON.stringify(data))
        // if(vrt && (vrt === "Yes" || vrt === "No")){
        //   console.log(vrt)
        //   console.log('filter append ')
          // dispatch(fetchAndAppendFilteredCarnewSuccess(data));
        // }else{
          // console.log('filter no append ')
          dispatch(fetchFilteredCarnewSuccess(data));
        // }
      });
  };
}
