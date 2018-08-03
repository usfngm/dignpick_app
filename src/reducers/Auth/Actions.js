import axios from 'axios';
import firebase from 'firebase';
import {
    Alert,
    AsyncStorage,
    Platform
} from 'react-native';


import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    TRY_TO_LOGIN,
    ADD_FAV_PLACE,
    REMOVE_FAV_PLACE
} from './ActionTypes';

import {
    changeAppRoot
} from '../App/Actions';

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text
});

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text
});

export const addFavPlace = (place) => {
    return (dispatch, getState) => {
        console.log('ADD FAV STATE');
        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/addFavPlace', {
            'user': getState().auth.user,
            'place': place
        })
            .then(function (response) {
                console.log('FAV PLACE OK');
            })
            .catch(function (error) {
                console.log("FAV PLACE ERROR");
            });
        var user = getState().auth.user;
        var placeID = place.id;
        user.favPlaces[placeID] = place;
        dispatch({
            type: ADD_FAV_PLACE,
            payload: user
        });
    };
}

export const removeFavPlace = (placeID) => {
    return (dispatch, getState) => {
        console.log('REMOVE FAV STATE');
        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/removeFavPlace', {
            'user': getState().auth.user,
            'placeID': placeID
        })
            .then(function (response) {
                console.log('REMOVE FAV PLACE OK');
            })
            .catch(function (error) {
                console.log("REMOVE FAV PLACE ERROR");
            });
        var user = getState().auth.user;
        delete user.favPlaces[placeID];
        dispatch({
            type: REMOVE_FAV_PLACE,
            payload: user
        });
    };
}

export const logout = () => {
    // CLEAN UP USER DATA HERE
    return async (dispatch) => {
        try {
            console.log('STORAGE: REMOVING LOGGED IN');
            await AsyncStorage.removeItem('loggedIn');
            firebase.auth().signOut();
        } catch (error) {
            console.log('STORAGE: FAILED TO REMOVE LOGIN');
        }
    };
}

export const listenForAuthChange = async (store) => {
    firebase.auth().onAuthStateChanged(async (user) => {
        console.log("STATE CHANGED");
        const value = await AsyncStorage.getItem('loggedIn');
        if (user) {
            axios.post('https://us-central1-dignpick.cloudfunctions.net/api/login', {
                'uid': user.uid
            })
                .then(async function (response) {
                    console.log(response.data);
                    await AsyncStorage.setItem('loggedIn', JSON.stringify(response.data.user));
                    store.dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
                    store.dispatch(changeAppRoot('after-login'));
                })
                .catch(function (error) {
                    if (!value) {
                        console.log(error);
                        Alert.alert(
                            'Error',
                            'Couldn\'t connect to the server. Please check your internet connection and try again.',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        );
                        store.dispatch({ type: LOGIN_FAILED });
                    }
                });
        }
        else {
            store.dispatch({ type: LOGOUT });
            store.dispatch(changeAppRoot('login'));
        }
    });
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: TRY_TO_LOGIN, payload: 'DEFAULT' });
        console.log('Trying to log in using firebase...');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log('DIDNT LOGIN BRUH ' + err);
                Alert.alert(
                    '',
                    'Wrong Email/Password\n\nPlease try again',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
                dispatch({ type: LOGIN_FAILED });
            });
    };
};