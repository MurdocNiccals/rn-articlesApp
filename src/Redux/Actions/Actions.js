import * as actionTypes from '../Constants/Constants';
import { GetAllDataApi, SearchApi } from '../../Api/Api';


export const GetAllData = (page = 0) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_DATA_REQUEST
        });
        const data = await GetAllDataApi(page);
        dispatch({
            type: actionTypes.GET_DATA,
            payload: data
        });

    } catch (error) {
        console.log(error.response.status == 429);
        dispatch({
            type: actionTypes.GET_DATA_FAILED,
            payload: error
        });
    }
}

export const SearchData = (term,page = 0) => async (dispatch) =>{
    try {
        await dispatch({
            type:actionTypes.RESET_DATA
        });
        dispatch({
            type: actionTypes.SEARCH_DATA_REQUEST
        });
        const data = await SearchApi(term,page);
        dispatch({
            type: actionTypes.SEARCH_DATA,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH_DATA_FAILED,
            payload: error
        });
    }
}

export const RenderMoreSearchData = (term,page = 0) => async (dispatch) =>{
    try {
        dispatch({
            type: actionTypes.SEARCH_DATA_REQUEST
        });
        const data = await SearchApi(term,page);
        dispatch({
            type: actionTypes.SEARCH_DATA,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH_DATA_FAILED,
            payload: error
        });
    }
}

export const ResetData = () => async (dispatch) =>{
    try {
        await dispatch({
            type:actionTypes.RESET_DATA
        });
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH_DATA_FAILED,
            payload: error
        });
    }
}