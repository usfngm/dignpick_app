import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import thunk from "redux-thunk";
import reducers from "./reducers";
import firebase from 'firebase';
import {
  initializeApp,
  initializeAppLoggedIn
} from './reducers/App/Actions';
import {
  LOGIN_SUCCESS
} from './reducers/Auth/ActionTypes'
import { registerScreens } from "./screens";
import { Platform, AsyncStorage } from "react-native";
import { iconsMap, iconsLoaded } from './assets/app-icons';
import {
  DASHBOARD_PAGE,
  FAVOURITES_PAGE
} from './reducers/App/PagesTypes';
import { listenForAuthChange } from './reducers/Auth/Actions';


// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// screen related book keeping
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    this.init_app();
    firebase.initializeApp({
      apiKey: "AIzaSyCX4KRrTFjZWXp7ABFFN-8Q5jCFTTKvSLY",
      authDomain: "dignpick.firebaseapp.com",
      databaseURL: "https://dignpick.firebaseio.com",
      projectId: "dignpick",
      storageBucket: "dignpick.appspot.com",
      messagingSenderId: "649798915536"
    });
    listenForAuthChange(store);
  }

  init_app = async () => {
    var isLoggedIn = false;
    const value = await AsyncStorage.getItem('loggedIn');
    if (value !== null) {
      isLoggedIn = true;
    }
    iconsLoaded.then(() => {
      if (isLoggedIn) {
        store.dispatch(initializeAppLoggedIn());
        store.dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(value) });
      }
      else {
        store.dispatch(initializeApp());
      }
    });
  }

  onStoreUpdate() {
    const { root } = store.getState().app;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'loginScreen', // unique ID registered with Navigation.registerScreen
          },
          appStyle: {
            navBarHidden: true,
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarTransparent: true,
          },
          style: {
            navBarHidden: true,
            statusBarHidden: true,
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarTransparent: true,
          },
          animationType: 'fade'
        });
        return;
      case 'after-login':
        console.log("STARTING APP BOIIII");
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Today\'s Offer',
              screen: 'dashboard.todaysOffer',
              icon: iconsMap['local-offer']
            },
            {
              label: 'My Budget',
              screen: 'dashboard.mybudget',
              icon: iconsMap['attach-money']
            },
            {
              label: 'Suggestions',
              screen: 'dashboard.suggestions',
              icon: iconsMap['light-bulb']
            }
          ],
          tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
            tabBarButtonColor: '#827f85', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
            tabBarSelectedButtonColor: '#FFFFFF', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
            tabBarBackgroundColor: '#000000', // optional, change the background color of the tab bar
            initialTabIndex: 1,
          },
          appStyle: {
            navBarHidden: true,
            drawUnderNavBar: true,
            navBarTranslucent: true,
            disabledBackGesture: true,
            navBarTransparent: true,
            initialTabIndex: 1,
            tabBarBackgroundColor: '#000000'
          },
          style: {
            navBarHidden: true,
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarTransparent: true,
            disabledBackGesture: true,
          },
          drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
              screen: 'drawer', // unique ID registered with Navigation.registerScreen
            },
            style: { // ( iOS only )
              drawerShadow: false, // optional, add this if you want a side menu drawer shadow
              contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
              shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
            },
          },
          animationType: 'fade'
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}