import { apiBaseUrl, callHandleArray } from "../helpers/common";
import * as actionTypes from "../types/types";
import { handleResponse } from "../helpers/userServices";

export const fetchFilternewBeginyears = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_YEAR,
  };
};
export const fetchFilternewSuccessyear = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_YEAR,
    payload: data,
  };
};

export function getfilterdyear(
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
  color
) {
  color = color.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginyears());
    const request = new Request(`${apiBaseUrl}/all-years`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
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
        color,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccessyear(data));
      });
  };
}
export const fetchFilternewBeginmake = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_MAKE,
  };
};
export const fetchFilternewSuccessmake = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_MAKE,
    payload: data,
  };
};

export function getfilterdmake(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginmake());
    const request = new Request(`${apiBaseUrl}/makess`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccessmake(data));
      });
  };
}
export const fetchFilternewBeginmodel = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_MODEL,
  };
};
export const fetchFilternewSuccessmodel = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_MODEL,
    payload: data,
  };
};
export function getfilterdmodel(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginmodel());
    const request = new Request(`${apiBaseUrl}/modelsss`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccessmodel(data));
      });
  };
}
//-------------------fuelllllll------------------------------------
export const fetchFilternewBeginfuel = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_FUEL,
  };
};
export const fetchFilternewSuccessfuel = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_FUEL,
    payload: data,
  };
};
export function getfilterdfuel(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginfuel());
    const request = new Request(`${apiBaseUrl}/fuelsss`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log(data)
        dispatch(fetchFilternewSuccessfuel(data));
      });
  };
}

//-------------------grade filter------------------------------------
export const fetchFilternewBeginGrade = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_GRADE,
  };
};
export const fetchFilternewSuccessGrade = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_GRADE,
    payload: data,
  };
};
export function getfilterdGrade(grade) {
  return (dispatch) => {
    dispatch(fetchFilternewBeginGrade());
    const request = new Request(`${apiBaseUrl}/gradesss`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ grade }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log("gradedata",data)
        dispatch(fetchFilternewSuccessGrade(data));
      });
  };
}
//-------------------vrt filter------------------------------------
export const fetchFilternewBeginVrt = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_VRT,
  };
};
export const fetchFilternewSuccessVrt = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_VRT,
    payload: data,
  };
};
export function getfilterdVrt(vrt) {
  return (dispatch) => {
    dispatch(fetchFilternewBeginVrt());
    const data = {
      vrt: [
        {
          id: 0,
          vrt: "All",
        },
        {
          id: 1,
          vrt: "Yes",
        },
        {
          id: 2,
          vrt: "No",
        },
      ],
    };
    dispatch(fetchFilternewSuccessVrt(data));
  };
}
//-------------------body styleeeeeee------------------------------------
export const fetchFilternewBeginbodystyle = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_BODYSTYLE,
  };
};
export const fetchFilternewSuccessbodystyle = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_BODYSTYLE,
    payload: data,
  };
};
export function getfilterdbodystyles(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginbodystyle());
    const request = new Request(`${apiBaseUrl}/bodystylesss`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccessbodystyle(data));
      });
  };
}
//-------------------conditionsssss------------------------------------
export const fetchFilternewBegincondition = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_CONDITION,
  };
};
export const fetchFilternewSuccesscondition = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_CONDITION,
    payload: data,
  };
};
export function getfilterdcondition(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBegincondition());
    const request = new Request(`${apiBaseUrl}/conditionss`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccesscondition(data));
      });
  };
}
//-------------------Mileage------------------------------------
export const fetchFilternewBeginmileage = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_MILEAGE,
  };
};
export const fetchFilternewSuccessmileage = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_MILEAGE,
    payload: data,
  };
};
export function getfilterdMileage(
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
  color,
  vrtFilter
) {
  color = color.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginmileage());
    const request = new Request(`${apiBaseUrl}/all-Mileage`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        console.log(data);

        dispatch(fetchFilternewSuccessmileage(data));
      });
  };
}
//-------------------conditionsssss------------------------------------
export const fetchFilternewBegintransmission = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_TRANSMISSION,
  };
};
export const fetchFilternewSuccesstransmission = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_TRANSMISSION,
    payload: data,
  };
};
export function getfilterdtransmission(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBegintransmission());
    const request = new Request(`${apiBaseUrl}/transmissionss`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccesstransmission(data));
      });
  };
}
//-------------------enginesssss------------------------------------
export const fetchFilternewBeginengine = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_ENGINE,
  };
};
export const fetchFilternewSuccessengine = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_ENGINE,
    payload: data,
  };
};
export function getfilterdengine(
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
  color,
  vrtFilter
) {
  color = color.toString();
  is_manheim_car = is_manheim_car.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBeginengine());
    const request = new Request(`${apiBaseUrl}/enginesss`, {
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccessengine(data));
      });
  };
}
//-------------------colorsssss------------------------------------
export const fetchFilternewBegincolor = () => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_BEGIN_COLOR,
  };
};
export const fetchFilternewSuccesscolor = (data) => {
  return {
    type: actionTypes.FETCH_FILTERS_DATA_SUCCESS_COLOR,
    payload: data,
  };
};
export function getfilterdcolor(
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
  color,
  vrtFilter
) {
  color = color.toString();
  return (dispatch) => {
    dispatch(fetchFilternewBegincolor());
    const request = new Request(`${apiBaseUrl}/colorsss`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
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
        color,
        vrtFilter,
      }),
    });

    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchFilternewSuccesscolor(data));
      });
  };
}
