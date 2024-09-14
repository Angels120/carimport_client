import * as types from "../types/types";

const initalState = {
    statesloading: true,   
    states: [],
    postsloading: true,
    posts: [],
    reviewloading: true,
    reviewsdata: [],
    leadsloading: true,
    leadsdata: [],
    settings:[],
    settingsloading:true,
    blogs:[],
    blogsloading:true,
    faqs:[],
    faqsloading:true,
    faq:[],
    faqloading:true,
    blog:[],
    blogloading:true,
    homepageloading: true,
    homepagedata: [],
    pageloading: true,
    page: [],
    pagesloading: true,
    pages: [],
    queriesloading: true,
    queriesdata: [],
    makemodels: [],
    makemodelsloading: true,
    transactions: [],
    transactionsloading: true,
}

const commonReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.FETCH_COMMON_LEADS_BEGIN:
            return {
                ...state,
                leadsloading: true
            }
        case types.FETCH_COMMON_LEADS_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                leadsloading: false,
                leadsdata: action.payload
            }
        case types.FETCH_COMMON_MAKEMODEL_BEGIN:
            return {
                ...state,
                makemodelsloading: true
            }
        case types.FETCH_COMMON_MAKEMODEL_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                makemodelsloading: false,
                makemodels: action.payload
            }
        case types.FETCH_COMMON_QUERIES_BEGIN:
            return {
                ...state,
                queriesloading: true
            }
        case types.FETCH_COMMON_QUERIES_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                queriesloading: false,
                queriesdata: action.payload
            }
        case types.FETCH_COMMON_STATES_BEGIN:
            return {
                ...state,
                statesloading: true
            }
        case types.FETCH_COMMON_STATES_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                statesloading: false,
                states: action.payload
            }
        case types.FETCH_COMMON_BLOGS_BEGIN:
            return {
                ...state,
                blogsloading: true
            }
        case types.FETCH_COMMON_BLOGS_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                blogsloading: false,
                blogs: action.payload
            }
        case types.FETCH_COMMON_BLOG_BEGIN:
            return {
                ...state,
                blogloading: true
            }
        case types.FETCH_COMMON_BLOG_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                blogloading: false,
                blog: action.payload
            }
        case types.FETCH_COMMON_PAGE_BEGIN:
            return {
                ...state,
                pageloading: true
            }
        case types.FETCH_COMMON_PAGE_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                pageloading: false,
                page: action.payload
            }
        case types.FETCH_COMMON_HOMEPAGE_BEGIN:
            return {
                ...state,
                homepageloading: true
            }
        case types.FETCH_COMMON_HOMEPAGE_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                homepageloading: false,
                homepagedata: action.payload
            }
        case types.FETCH_COMMON_PAGES_BEGIN:
            return {
                ...state,
                pagesloading: true
            }
        case types.FETCH_COMMON_PAGES_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                pagesloading: false,
                pages: action.payload
            }
        case types.FETCH_COMMON_FAQS_BEGIN:
            return {
                ...state,
                faqsloading: true
            }
        case types.FETCH_COMMON_FAQS_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                faqsloading: false,
                faqs: action.payload
            }
        case types.FETCH_COMMON_FAQ_BEGIN:
            return {
                ...state,
                faqloading: true
            }
        case types.FETCH_COMMON_FAQ_SUCCESS:
            // console.log('action.payload'+action.payload)
            return {
                ...state,
                faqloading: false,
                faq: action.payload
            }
        case types.FETCH_COMMON_POSTS_BEGIN:
            return {
                ...state,
                postsloading: true
            }
        case types.FETCH_COMMON_POSTS_SUCCESS:
            return {
                ...state,
                postsloading: false,
                posts: action.payload
            }
        case types.FETCH_COMMON_REVIEWS_BEGIN:
            return {
                ...state,
                reviewloading: true
            }
        case types.FETCH_COMMON_REVIEWS_SUCCESS:
            return {
                ...state,
                reviewloading: false,
                reviewsdata: action.payload
            }
        case types.FETCH_COMMON_SETTINGS_BEGIN:
            return {
                ...state,
                settingsloading: true
            }
        case types.FETCH_COMMON_SETTINGS_SUCCESS:
            return {
                ...state,
                settingsloading: false,
                settings: action.payload
            }
        case types.FETCH_COMMON_TRANSACTION_BEGIN:
            return {
                ...state,
                transactionsloading: true
            }
        case types.FETCH_COMMON_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactionsloading: false,
                transactions: action.payload
            }
        default:
            return state
    }
}
export default commonReducer;