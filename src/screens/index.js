import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import MyBudgetScreen from './Dashboard/MyBudgetScreen';
import ResultsScreen from './Dashboard/ResultsScreen';
import SuggestionsScreen from './Dashboard/SuggestionsScreen';
import TodaysOfferScreen from './Dashboard/TodaysOfferScreen';
import FavouritesScreen from './FavouritesScreen';
import PlaceScreen from './PlaceScreen';
import Drawer from './Drawer';
import RegisterScreen from './RegisterScreen';
import EditProfileScreen from './EditProfileScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('dashboard.mybudget', () => MyBudgetScreen, store, Provider);
  Navigation.registerComponent('dashboard.searchResults', () => ResultsScreen, store, Provider);
  Navigation.registerComponent('dashboard.suggestions', () => SuggestionsScreen, store, Provider);
  Navigation.registerComponent('dashboard.todaysOffer', () => TodaysOfferScreen, store, Provider);
  Navigation.registerComponent('drawer', () => Drawer, store, Provider);
  Navigation.registerComponent('favourites', () => FavouritesScreen, store, Provider);
  Navigation.registerComponent('dashboard.placeScreen', () => PlaceScreen, store, Provider);
  Navigation.registerComponent('registerScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('editProfile', () => EditProfileScreen, store, Provider);
}
