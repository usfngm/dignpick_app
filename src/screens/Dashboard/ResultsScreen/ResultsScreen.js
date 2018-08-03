import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StatusBar,
    ScrollView,
    Platform,
    ActivityIndicator
} from 'react-native';
import NavBar from '../Common/NavBar';
import Result from './Result';
import { updateLocation, openResult } from '../../../reducers/Dashboard/Actions';
import { connect } from 'react-redux';
import { RESULT_SCREEN } from '../../../reducers/App/PagesTypes';


class ResultsScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
    }


    onNavigationEvent = (event) => {

        if (event.id == 'didAppear') {
            console.log("Results APPEARED");
            this.props.navigator.toggleTabs({
                to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
        }
    }

    componentDidMount() {
        if (!this.props.location) {
            console.log('REQUESTING POSITION');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("GOT POSITION");
                    console.log(position);
                    this.props.updateLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => { },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }
    }

    renderResults() {
        return this.props.results.map((result, i) => {
            console.log(result.place);
            if (result.place.coverPhotoURL) {
                return (
                    <Result
                        key={result.place.name + i}
                        onPress={() => {
                            this.props.openResult(this.props.navigator, result.place);
                        }}
                        results={result.results}
                        name={result.place.name}
                        place={result.place}
                        loc={result.place.shortestDistance ? result.place.shortestDistance : '-'}
                        img={{ 'uri': result.place.coverPhotoURL }}
                        waitingimg={require('../Common/imgs/noimg.png')}
                    />
                );
            }
            else {
                return (
                    <Result
                        key={result.place.name + i}
                        onPress={() => {
                            this.props.openResult(this.props.navigator, result.place);
                        }}
                        results={result.results}
                        name={result.place.name}
                        place={result.place}
                        loc={result.place.shortestDistance ? result.place.shortestDistance : '-'}
                        img={require('../Common/imgs/noimg.png')}
                    />
                );
            }
        });
    }

    topStatusBar() {
        if (Platform.OS == 'ios') {
            return (
                <View style={styles.topStatusBar} />
            );
        }
    }

    loadingStyle() {
        return {
            zIndex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: '#000000',
            opacity: 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            display: this.props.isLoading ? 'flex' : 'none'
        }
    }

    renderLoading() {
        if (this.props.isLoading) {
            return (
                <View style={this.loadingStyle()}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            );
        }
    }

    render() {
        StatusBar.setBarStyle('light-content', false);
        if (this.props.results.length > 0) {
            return (
                <View style={styles.container}>
                    {this.renderLoading()}
                    {this.topStatusBar()}
                    <NavBar {...this.props} />
                    <View style={[styles.topStatusBar, { height: 2 }]} />
                    <ScrollView
                        style={styles.content}
                        showsVerticalScrollIndicator={false}
                    >
                        {this.renderResults()}
                    </ScrollView>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    {this.topStatusBar()}
                    <NavBar {...this.props} />
                    <View style={[styles.topStatusBar, { height: 2 }]} />
                    <View style={styles.innerContainer}>
                        <Text>Sorry, nothing matches your search criteria.</Text>
                        <Text
                            style={styles.tryagain}
                            onPress={() => {
                                this.props.navigator.pop();
                            }}
                        >
                            Please try again
                        </Text>
                    </View>
                </View>
            );
        }
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ededed'
    },
    tryagain: {
        textDecorationLine: 'underline'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topStatusBar: {
        height: 22,
        backgroundColor: '#000000',
    },
    content: {
        width: '95%',
        flex: 1,
        alignSelf: 'center'
    },
};

const mapStateToProps = state => {
    console.log(state);
    return {
        results: state.dashboard.results,
        error: state.dashboard.error,
        user: state.auth.user,
        location: state.dashboard.location,
        isLoading: state.dashboard.isLoadingFavs,
    };
};

const actions = {
    updateLocation,
    openResult
};
export default connect(mapStateToProps, actions)(ResultsScreen);

