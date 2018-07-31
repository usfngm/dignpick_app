import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    NAME_CHANGED,
    CITY_CHANGED,
    MOBILE_CHANGED,
    REGISTER_SUCCESS,
    BEGIN_REGISTER,
    REGISTER_FAIL,
    BEGIN_EDIT,
    EDIT_SUCCESS,
    EDIT_FAIL
} from './ActionTypes';

const INIT_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    city: '',
    mobile: '',
    isLoading: false,
};

export default (state = INIT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case NAME_CHANGED:
            return { ...state, name: action.payload };
        case CITY_CHANGED:
            return { ...state, city: action.payload };
        case MOBILE_CHANGED:
            return { ...state, mobile: action.payload };
        case BEGIN_REGISTER:
            return { ...state, isLoading: true };
        case REGISTER_SUCCESS:
            return { ...state, isLoading: false };
        case REGISTER_FAIL:
            return { ...state, isLoading: false };
        case BEGIN_EDIT:
            return { ...state, isLoading: true }
        case EDIT_SUCCESS:
            return { ...state, isLoading: false }
        case EDIT_FAIL:
            return { ...state, isloading: false }
        default:
            return state;
    }
};

