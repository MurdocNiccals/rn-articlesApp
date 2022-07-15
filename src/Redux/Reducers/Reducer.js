import * as actionTypes from '../Constants/Constants';

export const Reducer = (state = { article: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_REQUEST:
            return {
                loading: true,
                ...state
            }
        case actionTypes.GET_DATA:
            return {
                loading: false,
                article: [...state.article,...action.payload]
            }
        case actionTypes.GET_DATA_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.SEARCH_DATA_REQUEST:
            return {
                loading: true,
                ...state
            }
        case actionTypes.SEARCH_DATA:
            return {
                loading: false,
                article: [...state.article,...action.payload]
            }
        case actionTypes.SEARCH_DATA_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.RESET_DATA:
            return {
                loading: false,
                article: []
            }
        default:
            return state;
    }
}