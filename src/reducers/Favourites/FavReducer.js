import {
    LOAD_FAVS,
    LOAD_FAVS_FAIL,
    LOAD_FAVS_SUCCESS,
    REMOVE_FAV,
    REMOVE_FAV_FAIL,
    REMOVE_FAV_SUCCESS,
    TOGGLE_FAV,
    TOGGLE_FAV_SUCCESS,
    TOGGLE_FAV_FAIL,
    ADD_FAV,
    ADD_FAV_FAIL,
    ADD_FAV_SUCCESS
} from './ActionTypes';

const INIT_STATE = {
    favs: [],
    isLoading: false,
    rawFavs: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_FAVS:
            return { ...state, isLoading: true };
        case LOAD_FAVS_SUCCESS:
            return { ...state, isLoading: false, favs: action.payload.favs, rawFavs: action.payload.rawFavs }
        case LOAD_FAVS_FAIL:
            return { ...state, isLoading: false }
        case REMOVE_FAV:
            return { ...state, isLoading: true }
        case REMOVE_FAV_SUCCESS:
            return { ...state, isLoading: false, favs: action.payload.favs, rawFavs: action.payload.rawFavs }
        case REMOVE_FAV_FAIL:
            return { ...state, isLoading: false, favs: action.payload.favs, rawFavs: action.payload.rawFavs }
        case ADD_FAV_SUCCESS:
            return { ...state, isLoading: false, favs: action.payload.favs, rawFavs: action.payload.rawFavs }
        case ADD_FAV_FAIL:
            return { ...state, isLoading: false, favs: action.payload.favs, rawFavs: action.payload.rawFavs }
        default:
            return state;
    }
};



