import {
    INITIALIZE,
    CHANGE_ROOT,
    NAV_TO
} from './ActionTypes';

import {
    DASHBOARD_PAGE
} from './PagesTypes';

const INIT_STATE = {
    root: 'undefined',
    sideMenuSelected: DASHBOARD_PAGE
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_ROOT:
            if (action.payload != state.root) {
                return { ...state, root: action.payload };
            }
            else return state;
        case NAV_TO:
            if (state.sideMenuSelected == action.payload) {
                console.log('SAME SIDE MENU SO RETURNING SAME STATE');
                return { ...state };
            }
            else {
                console.log('NEW SIDE MENU SO UPDATING TO ' + action.payload);
                return { ...state, sideMenuSelected: action.payload };
            }
        default:
            return state;
    }
};

