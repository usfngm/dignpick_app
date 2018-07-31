import firebase from 'firebase';
import {
    Alert,
    AsyncStorage,
    Platform
} from 'react-native';

import axios from 'axios';

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

import {
    LOGIN_SUCCESS
} from '../Auth/ActionTypes';

import { changeAppRoot } from '../App/Actions'

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text
});

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text
});

export const confirmPasswordChanged = (text) => ({
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
});

export const nameChanged = (text) => ({
    type: NAME_CHANGED,
    payload: text
});

export const cityChanged = (text) => ({
    type: CITY_CHANGED,
    payload: text
});

export const mobileChanged = (text) => ({
    type: MOBILE_CHANGED,
    payload: text
});

export const editProfile = (user, navigator) => {
    return (dispatch) => {
        dispatch({ type: BEGIN_EDIT });
        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/register', {
            'user': user
        })
            .then(async function (response) {
                console.log(response.data);
                if (response.data.status == 'OK') {
                    await AsyncStorage.setItem('loggedIn', JSON.stringify(user));
                    dispatch({ type: EDIT_SUCCESS });
                    navigator.pop();
                }
                else {
                    dispatch({ type: EDIT_FAIL });
                    Alert.alert(
                        'Error',
                        error,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch(function (error) {
                Alert.alert(
                    'Error',
                    'Couldn\'t connect to the server. Please check your internet connection and try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
                dispatch({ type: EDIT_FAIL });
            });
    }
}

export const register = ({ email, password,
    confirmPassword, name, city, mobile }) => {
    return (dispatch) => {
        dispatch({ type: BEGIN_REGISTER });
        if (email && password &&
            confirmPassword && name && city && mobile) {
            if (password !== confirmPassword) {
                dispatch({ type: REGISTER_FAIL });
                Alert.alert(
                    '',
                    'The passwords does not match. Please try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            }
            else {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((response) => {
                        const uid = response.uid;
                        const user = {
                            uid: uid,
                            name: name,
                            email: email,
                            city: city,
                            mobile: mobile,
                            favPlaces: [],
                        };
                        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/register', {
                            'user': user
                        })
                            .then(async function (response) {
                                console.log(response.data);
                                if (response.data.status == 'OK') {
                                    await AsyncStorage.setItem('loggedIn', JSON.stringify(user));
                                    dispatch({ type: REGISTER_SUCCESS });
                                    dispatch({ type: LOGIN_SUCCESS, payload: user });
                                    dispatch(changeAppRoot('after-login'));
                                }
                                else {
                                    dispatch({ type: REGISTER_FAIL });
                                    Alert.alert(
                                        'Error',
                                        error,
                                        [
                                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            })
                            .catch(function (error) {
                                Alert.alert(
                                    'Error',
                                    'Couldn\'t connect to the server. Please check your internet connection and try again.',
                                    [
                                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false }
                                );
                                dispatch({ type: REGISTER_FAIL });
                            });
                    });
            }
        }
        else {
            dispatch({ type: REGISTER_FAIL });
            Alert.alert(
                '',
                'Please fill in all the required fields.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    }
}

