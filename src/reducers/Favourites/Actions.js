import { Alert } from 'react-native';
import axios from 'axios';
import {
    LOAD_FAVS,
    LOAD_FAVS_FAIL,
    LOAD_FAVS_SUCCESS,
    REMOVE_FAV,
    REMOVE_FAV_FAIL,
    REMOVE_FAV_SUCCESS,
    TOGGLE_FAV,
    TOGGLE_FAV_SUCCESS,
    TOGGLE_FAV_FAIL,
    ADD_FAV,
    ADD_FAV_FAIL,
    ADD_FAV_SUCCESS
} from './ActionTypes';




export const removeFav = (place) => {
    return (dispatch, getState) => {

        var rawFavs_ = JSON.parse(JSON.stringify(getState().favs.rawFavs));
        var favs_ = JSON.parse(JSON.stringify(getState().favs.favs));

        var rawFavs = JSON.parse(JSON.stringify(getState().favs.rawFavs));
        var favs = JSON.parse(JSON.stringify(getState().favs.favs));

        var index = rawFavs.indexOf(place);
        if (index !== -1) {
            rawFavs.splice(index, 1);
            favs.splice(index, 1);
        }

        dispatch({
            type: REMOVE_FAV_SUCCESS,
            payload: { 'favs': favs, 'rawFavs': rawFavs }
        });

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        var reqDone = false;
        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/setFavPlaces', {
            'user': getState().auth.user,
            'favPlaces': rawFavs
        }, {
                cancelToken: source.token
            })
            .then(function (response) {
                reqDone = true;
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: REMOVE_FAV_FAIL,
                    payload: { 'favs': favs_, 'rawFavs': rawFavs_ }
                });
                Alert.alert(
                    'Error',
                    'Bad Request. Please try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            });


        setTimeout(() => {
            if (!reqDone) {
                source.cancel('Operation canceled by the user.');
                dispatch({
                    type: REMOVE_FAV_FAIL,
                    payload: { 'favs': favs_, 'rawFavs': rawFavs_ }
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
    }
}

export const loadFavs = () => {
    return (dispatch, getState) => {
        if (!getState().favs.rawFavs) {
            dispatch({
                type: LOAD_FAVS
            });

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            var reqDone = false;
            console.log('requesting fav places');
            console.log(getState().auth.user);
            axios.post('https://us-central1-dignpick.cloudfunctions.net/api/getFavPlaces', {
                'user': getState().auth.user
            }, {
                    cancelToken: source.token
                })
                .then(function (response) {
                    reqDone = true;
                    console.log(response.data);
                    var favPlaces_processed = response.data;
                    var favPlaces = [];
                    favPlaces_processed.forEach((place) => {
                        favPlaces.push(place.uid);
                    });
                    dispatch({
                        type: LOAD_FAVS_SUCCESS,
                        payload: { 'favs': response.data, 'rawFavs': favPlaces }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({
                        type: LOAD_FAVS_FAIL
                    });
                });


            setTimeout(() => {
                if (!reqDone) {
                    source.cancel('Operation canceled by the user.');
                    dispatch({
                        type: LOAD_FAVS_FAIL
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
        }
    }
}

export const addFav = (place) => {
    return (dispatch, getState) => {

        var rawFavs_ = JSON.parse(JSON.stringify(getState().favs.rawFavs));
        var favs_ = JSON.parse(JSON.stringify(getState().favs.favs));

        var rawFavs = JSON.parse(JSON.stringify(getState().favs.rawFavs));
        var favs = JSON.parse(JSON.stringify(getState().favs.favs));
        favs.push(place);
        rawFavs.push(place.uid);
        dispatch({
            type: ADD_FAV_SUCCESS,
            payload: { 'favs': favs, 'rawFavs': rawFavs }
        });

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        var reqDone = false;
        axios.post('https://us-central1-dignpick.cloudfunctions.net/api/setFavPlaces', {
            'user': getState().auth.user,
            'favPlaces': rawFavs
        }, {
                cancelToken: source.token
            })
            .then(function (response) {
                reqDone = true;
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);

                dispatch({
                    type: ADD_FAV_FAIL,
                    payload: { 'favs': favs_, 'rawFavs': rawFavs_ }
                });
                Alert.alert(
                    'Error',
                    'Bad Request. Please try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            });


        setTimeout(() => {
            if (!reqDone) {
                source.cancel('Operation canceled by the user.');
                dispatch({
                    type: ADD_FAV_FAIL,
                    payload: { 'favs': favs_, 'rawFavs': rawFavs_ }
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

    }
}


export const toggleFav = (place) => {
    return (dispatch, getState) => {
        console.log('checking toggle fav');
        console.log(getState().dashboard.favsLoaded);
        if (getState().dashboard.favsLoaded) {
            console.log('working');
            var rawFavs = JSON.parse(JSON.stringify(getState().favs.rawFavs));
            var favs = JSON.parse(JSON.stringify(getState().favs.favs));
            var index = rawFavs.indexOf(place.uid);
            if (index !== -1) { // remove
                dispatch(removeFav(place.uid));
            }
            else { // add
                dispatch(addFav(place));
            }
        }
    }
}
