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
        } catch (error) {
            console.log('STORAGE: FAILED TO REMOVE LOGIN');
        }
        dispatch({ type: LOGOUT });
        dispatch(changeAppRoot('login'));
    };
}

export const listenForAuthChange = async (store) => {
    firebase.auth().onAuthStateChanged(async (user) => {
        const value = await AsyncStorage.getItem('loggedIn');
        if (user) {
            if (value) {
                console.log('USER IS MARKED AS LOGGED IN ALREADY');
            }
            else {
                console.log("USER IS NOT MARKED AS LOGGED IN");
                firebase.auth().signOut();
            }
            console.log("logged in in FB");
        }
        else {
            console.log("LOGGED OUT IN FIB");
        }
    });
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: TRY_TO_LOGIN });
        console.log('Trying to log in using firebase...');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (response) => {
                console.log(response);
                const uid = response.uid;
                console.log('LOGGED IN WITH UID ' + uid);
                axios.post('https://us-central1-dignpick.cloudfunctions.net/api/login', {
                    'uid': uid
                })
                    .then(async function (response) {
                        console.log(response.data);
                        await AsyncStorage.setItem('loggedIn', JSON.stringify(response.data.user));
                        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
                        dispatch(changeAppRoot('after-login'));
                    })
                    .catch(function (error) {
                        console.log(error);
                        Alert.alert(
                            'Error',
                            'Couldn\'t connect to the server. Please check your internet connection and try again.',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        );
                        dispatch({ type: LOGIN_FAILED });
                    });
            })
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