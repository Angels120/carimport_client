import { apiBaseUrl, callHandleArray } from "../helpers/common";
import * as actionTypes from "../types/types";
import { handleResponse } from "../helpers/userServices";

export const fetchLeadsStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_LEADS_BEGIN,
  };
};
export const fetchLeadsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_LEADS_SUCCESS,
    payload: data.data,
  };
};

export const fetchMakeModelStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_MAKEMODEL_BEGIN,
  };
};
export const fetchMakeModelSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_MAKEMODEL_SUCCESS,
    payload: data,
    /* change make */
  };
};

export const fetchQueriesStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_QUERIES_BEGIN,
  };
};
export const fetchQueriesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_QUERIES_SUCCESS,
    payload: data.data,
  };
};

export const fetchTransactionStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_TRANSACTION_BEGIN,
  };
};
export const fetchTransactionSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_TRANSACTION_SUCCESS,
    payload: data.Data,
  };
};

export const fetchCommonStatesStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_STATES_BEGIN,
  };
};
export const fetchCommonStatesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_STATES_SUCCESS,
    payload: data.Data,
  };
};
export const fetchCommonBlogsStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_BLOGS_BEGIN,
  };
};
export const fetchCommonBlogsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_BLOGS_SUCCESS,
    payload: data.data,
  };
};
export const fetchCommonBlogStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_BLOG_BEGIN,
  };
};
export const fetchCommonBlogSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_BLOG_SUCCESS,
    payload: data.data,
  };
};

export const fetchCommonPageStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_PAGE_BEGIN,
  };
};
export const fetchCommonPageSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_PAGE_SUCCESS,
    payload: data.data,
  };
};
export const fetchCommonHomePageStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_HOMEPAGE_BEGIN,
  };
};
export const fetchCommonHomePageSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_HOMEPAGE_SUCCESS,
    payload: data.data,
  };
};
export const fetchCommonPagesStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_PAGES_BEGIN,
  };
};
export const fetchCommonPagesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_PAGES_SUCCESS,
    payload: data.data,
  };
};

export const fetchCommonFaqsStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_FAQS_BEGIN,
  };
};
export const fetchCommonFaqsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_FAQS_SUCCESS,
    payload: data.data,
  };
};

export const fetchCommonFaqStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_FAQ_BEGIN,
  };
};
export const fetchCommonFaqSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_FAQ_SUCCESS,
    payload: data.data,
  };
};

export const fetchCommonPostsStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_POSTS_BEGIN,
  };
};
export const fetchCommonPostsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_POSTS_SUCCESS,
    payload: data.data,
  };
};
export const fetchCommonReviewsStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_REVIEWS_BEGIN,
  };
};
export const fetchCommonReviewsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_REVIEWS_SUCCESS,
    payload: data.data,
  };
};
export const fetchCommonSettingsStart = () => {
  return {
    type: actionTypes.FETCH_COMMON_SETTINGS_BEGIN,
  };
};
export const fetchCommonSettingsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_COMMON_SETTINGS_SUCCESS,
    payload: data.data,
  };
};

export function getsettings() {
  return (dispatch) => {
    dispatch(fetchCommonSettingsStart());
    const request = new Request(`${apiBaseUrl}/get-settings`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('settings'+JSON.stringify(data))
        dispatch(fetchCommonSettingsSuccess(data));
      });
  };
}
export function getMakeModels() {
  return (dispatch) => {
    dispatch(fetchMakeModelStart());
    const request = new Request(`${apiBaseUrl}/get-MakeModels`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('settings'+JSON.stringify(data))
        dispatch(fetchMakeModelSuccess(data));
      });
  };
}
export function getstates() {
  return (dispatch) => {
    dispatch(fetchCommonStatesStart());
    const request = new Request(`${apiBaseUrl}/get-states`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('statesdata'+JSON.stringify(data))
        dispatch(fetchCommonStatesSuccess(data));
      });
  };
}

export function getblogs() {
  return (dispatch) => {
    dispatch(fetchCommonBlogsStart());
    const request = new Request(`${apiBaseUrl}/get-blogs`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonBlogsSuccess(data));
      });
  };
}
export function getblog(slug) {
  return (dispatch) => {
    dispatch(fetchCommonBlogStart());
    const request = new Request(`${apiBaseUrl}/get-blog/` + encodeURIComponent(slug).replace(/[!'()*]/g, escape), {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonBlogSuccess(data));
      });
  };
}
export function getpage(slug) {
  return (dispatch) => {
    dispatch(fetchCommonPageStart());
    const request = new Request(`${apiBaseUrl}/get-content/` + slug, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonPageSuccess(data));
      });
  };
}
export function gethomepage() {
  return (dispatch) => {
    dispatch(fetchCommonHomePageStart());
    const request = new Request(`${apiBaseUrl}/get-homepage-content`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonHomePageSuccess(data));
      });
  };
}
export function getpages() {
  return (dispatch) => {
    dispatch(fetchCommonPagesStart());
    const request = new Request(`${apiBaseUrl}/user/get-pages`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "X-Auth-Token": `${localStorage.getItem("token")}`,
      }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonPagesSuccess(data));
      });
  };
}

export function getfaqs() {
  return (dispatch) => {
    dispatch(fetchCommonFaqsStart());
    const request = new Request(`${apiBaseUrl}/get-faq`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonFaqsSuccess(data));
      });
  };
}
export function getfaq(faq_id) {
  return (dispatch) => {
    dispatch(fetchCommonFaqStart());
    const request = new Request(`${apiBaseUrl}/get-faq/` + faq_id, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('getblogsdddd'+JSON.stringify(data))
        dispatch(fetchCommonFaqsSuccess(data));
      });
  };
}
export function getQueries() {
  return (dispatch) => {
    dispatch(fetchQueriesStart());
    const request = new Request(`${apiBaseUrl}/user/get-Queries`, {
      method: "GET",
      headers: new Headers({
        "X-Auth-Token": `${localStorage.getItem("token")}`,
      }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('Leadsdata'+JSON.stringify(data))
        dispatch(fetchQueriesSuccess(data));
      });
  };
}

export function getTransactions(slug) {
  return (dispatch) => {
    dispatch(fetchTransactionStart());
    const request = new Request(`${apiBaseUrl}/user/get-transactions/${slug}`, {
      method: "GET",
      headers: new Headers({
        "X-Auth-Token": `${localStorage.getItem("token")}`,
      }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('Leadsdata'+JSON.stringify(data))
        dispatch(fetchTransactionSuccess(data));
      });
  };
}

export function getLeads() {
  return (dispatch) => {
    dispatch(fetchLeadsStart());
    const request = new Request(`${apiBaseUrl}/user/get-leads`, {
      method: "GET",
      headers: new Headers({
        "X-Auth-Token": `${localStorage.getItem("token")}`,
      }),
    });
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('Leadsdata'+JSON.stringify(data))
        dispatch(fetchLeadsSuccess(data));
      });
  };
}

export function getPosts(breeder_id) {
  return (dispatch) => {
    dispatch(fetchCommonPostsStart());
    const request = new Request(
      `${apiBaseUrl}/user/get-breeder-posts/` + breeder_id,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
      }
    );
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('POSTSdata'+JSON.stringify(data))
        dispatch(fetchCommonPostsSuccess(data));
      });
  };
}

export function getReviews(breeder_id) {
  return (dispatch) => {
    dispatch(fetchCommonReviewsStart());
    const request = new Request(
      `${apiBaseUrl}/user/get-breeder-reviews/` + breeder_id,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "X-Auth-Token": `${localStorage.getItem("token")}`,
        }),
      }
    );
    return fetch(request)
      .then(handleResponse)
      .then((data) => {
        // console.log('POSTSdata'+JSON.stringify(data))
        dispatch(fetchCommonReviewsSuccess(data));
      });
  };
}
