import {
    BUDGET_INCREMENTED,
    BUDGET_DECREMENTED,
    PEOPLE_DECREMENTED,
    PEOPLE_INCREMENTED,
    START_BUDGET_SEARCH,
    BUDGET_SEARCH_SUCCESS,
    BUDGET_SEARCH_FAIL,
    UPDATE_LOCATION,
    SET_TAGS,
    OPEN_PLACE,
} from './ActionTypes';

import {
    LOAD_FAVS,
    LOAD_FAVS_FAIL,
    LOAD_FAVS_SUCCESS
} from '../Favourites/ActionTypes';

const INIT_STATE = {
    budget: 200,
    people: 2,
    loading: false,
    location: null,
    results: [],
    error: null,
    tags: {
        'outdoors': false,
        'atHome': false,
        'shisha': false,
        'indoors': false,
        'food': false,
        'date': false,
        'activity': false,
        'read': false,
        'wifi': false,
        'nightLife': false
    },
    place: null,
    favsLoaded: false,
    isLoadingFavs: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case BUDGET_INCREMENTED:
            return { ...state, budget: (state.budget + 50) };
        case BUDGET_DECREMENTED:
            if (state.budget > 50) {
                return { ...state, budget: (state.budget - 50) };
            } else return state;
        case PEOPLE_INCREMENTED:
            return { ...state, people: (state.people + 1) };
        case PEOPLE_DECREMENTED:
            if (state.people > 1) {
                return { ...state, people: (state.people - 1) };
            } else return state;
        case START_BUDGET_SEARCH:
            return { ...state, loading: true };
        case BUDGET_SEARCH_SUCCESS:
            return { ...state, loading: false, results: action.payload };
        case BUDGET_SEARCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_LOCATION:
            return { ...state, location: action.payload };
        case SET_TAGS:
            return { ...state, tags: action.payload };
        case OPEN_PLACE:
            return { ...state, place: action.payload };
        case LOAD_FAVS:
            return { ...state, isLoadingFavs: true };
        case LOAD_FAVS_FAIL:
            return { ...state, isLoadingFavs: false };
        case LOAD_FAVS_SUCCESS:
            return { ...state, isLoadingFavs: false, favsLoaded: true };
        default:
            return state;
    }
};



