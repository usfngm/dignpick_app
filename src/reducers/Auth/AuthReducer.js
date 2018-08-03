import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    TRY_TO_LOGIN,
    ADD_FAV_PLACE,
    REMOVE_FAV_PLACE
} from './ActionTypes';

const INIT_STATE = {
    email: '',
    password: '',
    user: null,
    isLoading: false,
    loginMethod: ''
};

export default (state = INIT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            console.log(state.isLoading);
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case TRY_TO_LOGIN:
            return { ...state, isLoading: true, loginMethod: action.payload };
        case LOGIN_SUCCESS:
            console.log('YOU HAVE LOGGED IN');
            return { ...state, user: action.payload, isLoading: false };
        case LOGIN_FAILED:
            console.log('LOGIN FAILED');
            return { ...state, isLoading: false };
        case ADD_FAV_PLACE:
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

