import {
    INITIALIZE,
    CHANGE_ROOT,
    NAV_TO
} from './ActionTypes';
import {
    DASHBOARD_PAGE,
    FAVOURITES_PAGE
} from './PagesTypes';

export const initializeApp = () => {
    // The init app logic goes here
    return (dispatch) => {
        dispatch(changeAppRoot('login'));
        dispatch({ type: INITIALIZE });
    };
};

export const initializeAppLoggedIn = () => {
    return (dispatch) => {
        dispatch(changeAppRoot('after-login'));
        dispatch({ type: INITIALIZE });
    }
};

export const nav_to = (page) => ({
    type: NAV_TO,
    payload: page
});

export const changeAppRoot = (root) => ({
    type: CHANGE_ROOT,
    payload: root
});