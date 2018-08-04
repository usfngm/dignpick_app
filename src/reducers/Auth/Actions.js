import axios from 'axios';
import firebase from 'firebase';
import {
    Alert,
    AsyncStorage,
    Platform
} from 'react-native';
import FBSDK, { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';


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
            dispatch({ type: LOGOUT });
            dispatch(changeAppRoot('login'));
        } catch (error) {
            console.log('STORAGE: FAILED TO REMOVE LOGIN');
        }
    };
}

export const loginUserViaFacebook = () => {
    return (dispatch) => {
        dispatch({ type: TRY_TO_LOGIN, payload: 'FB' });
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function (result) {
            if (result.isCancelled) {
                Alert.alert(
                    'Alert',
                    'Login via Facebook was canceled by the user.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
                dispatch({ type: LOGIN_FAILED });
            } else {
                AccessToken.getCurrentAccessToken().then(function (data) {

                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (result) {
                        console.log(result);
                        console.log("THIS UID");
                        console.log(result.user.uid);
                        var user = { 'uid': result.user.uid };
                        // Promise was successful
                        const responseDataCallback = (error, result) => {
                            if (error) {
                                console.log(error);
                                Alert.alert(
                                    'Error',
                                    'UNKNOWN_ERROR',
                                    [
                                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false }
                                );
                                dispatch({ type: LOGIN_FAILED });
                            } else {
                                // writeUserData(result.id, result.email, result.first_name, result.last_name, result.picture.data.url)
                                console.log("EMAIL: " + result.email);
                                console.log("ID: " + result.id);
                                console.log("FIRST NAME: " + result.first_name);
                                console.log("LAST NAME: " + result.last_name);
                                console.log("pic url: " + result.picture.data.url);
                                user['email'] = result.email;
                                user['name'] = result.first_name + ' ' + result.last_name;
                                user['profile_pic_url'] = result.picture.data.url;
                                user['mobile'] = '';
                                user['level'] = 'User';
                                user['favPlaces'] = [];
                                console.log(user);
                                axios.post('https://us-central1-dignpick.cloudfunctions.net/api/loginFacebook', {
                                    'user': user
                                })
                                    .then(async function (response) {
                                        console.log(response.data);
                                        await AsyncStorage.setItem('loggedIn', JSON.stringify(response.data));
                                        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
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
                            }
                        }

                        const dataRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: data.accessToken.toString(),
                                parameters: {
                                    fields: {
                                        string: 'id, first_name, last_name, email, picture'
                                    }
                                }
                            },
                            responseDataCallback
                        )

                        new GraphRequestManager().addRequest(dataRequest).start()
                    }, function (error) {
                        var code = error.code;
                        if (code == 'auth/account-exists-with-different-credential') {
                            var email = error.email;
                            axios.post('https://us-central1-dignpick.cloudfunctions.net/api/loginEmailOnly', {
                                'email': email
                            })
                                .then(async function (response) {
                                    console.log(response.data);
                                    await AsyncStorage.setItem('loggedIn', JSON.stringify(response.data));
                                    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
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
                        }
                        else {
                            dispatch({ type: LOGIN_FAILED });
                            console.log(error);
                            console.log(error.code);
                        }
                    })
                })
            }
        }, function (error) {
            console.log('Some error occured:' + error)
        })
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: TRY_TO_LOGIN, payload: 'DEFAULT' });
        console.log('Trying to log in using firebase...');
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            var uid = result.user.uid;
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
                        dispatch({ type: LOGIN_FAILED });
                    }
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