import firebase from 'firebase';
require("firebase/firestore");
import { Platform, Alert } from 'react-native';
import axios from 'axios';
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
    OPEN_PLACE
} from './ActionTypes';
import {loadFavs} from '../Favourites/Actions';

export const setTags = (tag, state) => {
    return (dispatch, getState) => {
        var tags = getState().dashboard.tags;
        tags[tag] = state;
        dispatch({
            type: SET_TAGS,
            payload: tags
        });
    };
};

export const updateLocation = (loc) => ({
    type: UPDATE_LOCATION,
    payload: loc
})

export const budgetIncremented = () => ({
    type: BUDGET_INCREMENTED
});

export const budgetDecremented = () => ({
    type: BUDGET_DECREMENTED,
});

export const peopleIncremented = () => ({
    type: PEOPLE_INCREMENTED,
});

export const peopleDecremented = () => ({
    type: PEOPLE_DECREMENTED
});

export const openResult = (navigator, place) => {
    return (dispatch, getState) => {

        dispatch({
            type: OPEN_PLACE,
            payload: place
        });

        navigator.push({
            screen: 'dashboard.placeScreen', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                drawUnderNavBar: true,
                navBarTransparent: true,
                navBarTranslucent: Platform.OS === 'ios',
            },
        });
    }
}

// Search for recommendations 
export const budgetSearch = (navigator) => {
    return (dispatch, getState) => {
        navigator.toggleTabs({
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
            animated: true // does the toggle have transition animation or does it happen immediately (optional)
        });

        var favsLoaded = getState().dashboard.favsLoaded;
        var isLoadingFavs = getState().dashboard.isLoadingFavs;

        if (!favsLoaded && !isLoadingFavs)
        {
            loadFavs();
        }

        // Show loading spinner
        dispatch({ type: START_BUDGET_SEARCH });


        console.log("START SEARCHING YO");

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        var reqDone = false;
        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/budgetSearch', {
            'budget': getState().dashboard.budget,
            'people': getState().dashboard.people,
            'location': getState().dashboard.location,
            'tags': getState().dashboard.tags
        }, {
                cancelToken: source.token
            })
            .then(function (response) {
                reqDone = true;
                console.log(response.data);
                dispatch({ type: BUDGET_SEARCH_SUCCESS, payload: response.data });
                navigator.push({
                    screen: 'dashboard.searchResults', // unique ID registered with Navigation.registerScreen
                    navigatorStyle: {
                        drawUnderNavBar: true,
                        navBarTransparent: true,
                        navBarTranslucent: Platform.OS === 'ios',
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });


        setTimeout(() => {
            if (!reqDone) {
                source.cancel('Operation canceled by the user.');
                dispatch({ type: BUDGET_SEARCH_FAIL });
                navigator.toggleTabs({
                    to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                    animated: true // does the toggle have transition animation or does it happen immediately (optional)
                });
                Alert.alert(
                    'Error',
                    'Connection timeout. Please check your internet connection and try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            }
        }, 45000)

    };
}