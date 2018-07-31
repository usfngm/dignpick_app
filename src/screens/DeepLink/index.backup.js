import { Platform } from 'react-native';
import {
    FAVOURITES_PAGE,
    DASHBOARD_PAGE,
    PLACE_PAGE,
    RESULT_SCREEN
} from '../../reducers/App/PagesTypes';

export default class DeepLinkHander {

    constructor(navigator, nav_to, screenName) {
        console.log("CONSTRUCTOR CALLED FROM " + screenName);
        this.navigator = navigator;
        this.nav_to = nav_to;
        this.screenName = screenName;
    }

    onSideMenuClick = (page) => {
        switch (page) {
            case DASHBOARD_PAGE:
                this.navigator.pop({
                    animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
                });
                return;
            case FAVOURITES_PAGE:
                this.navigator.push({
                    screen: 'favourites', // unique ID registered with Navigation.registerScreen
                    navigatorStyle: {
                        drawUnderNavBar: true,
                        navBarTransparent: true,
                        navBarTranslucent: Platform.OS === 'ios',
                    },
                });
                return;
            default:
                return;
        }
    }

    screenVisibilityHandler = () => {
        switch (this.screenName) {
            case FAVOURITES_PAGE:
                this.navigator.toggleTabs({
                    to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                    animated: true // does the toggle have transition animation or does it happen immediately (optional)
                });
                this.nav_to(FAVOURITES_PAGE);
                return;
            case PLACE_PAGE:
                this.navigator.toggleTabs({
                    to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                    animated: true // does the toggle have transition animation or does it happen immediately (optional)
                });
                this.navigator.setDrawerEnabled({
                    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    enabled: false // should the drawer be enabled or disabled (locked closed)
                });
                return;
            default:
                this.navigator.toggleTabs({
                    to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                    animated: true // does the toggle have transition animation or does it happen immediately (optional)
                });
                this.nav_to(DASHBOARD_PAGE);
                return;
        }
    }

    screenClosingHandler = () => {
        switch (this.screenName) {
            case PLACE_PAGE:
                this.navigator.setDrawerEnabled({
                    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    enabled: true // should the drawer be enabled or disabled (locked closed)
                });
                return;
            default:
                return;
        }
    }

    onNavigatorEvent = (event) => {
        console.log(event);
        if (event.type == 'DeepLink') {
            if (event.link == 'navigate') {
                this.onSideMenuClick(event.payload);
            }
        } else if (event.type == 'ScreenChangedEvent') {
            if (event.id == 'willAppear') {
                this.screenVisibilityHandler();
            }
            else if (event.id == 'willDisappear') {
                this.screenClosingHandler();
            }
        }
    }
}