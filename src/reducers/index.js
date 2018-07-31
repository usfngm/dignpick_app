import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import AppReducer from './App';
import DashboardReducer from './Dashboard';
import RegisterReducer from './Register';
import FavReducer from './Favourites';

export default combineReducers({
    auth: AuthReducer,
    dashboard: DashboardReducer,
    app: AppReducer,
    register: RegisterReducer,
    favs: FavReducer
});
