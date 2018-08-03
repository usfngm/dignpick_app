import React, { Component } from 'react';

import {
    View,
    StatusBar,
    Platform,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
    Text,
    ScrollView,
    PermissionsAndroid
} from 'react-native';

import { connect } from 'react-redux';
import BudgetSetter from './BudgetSetter';
import PlacePicker from './PlacePicker';
import TagsSelector from './TagsSelector';
import SearchButton from './SearchButton';
import NavBar from '../Common/NavBar';
import { requestLocationPermission } from '../../../common';

import {
    budgetIncremented,
    budgetDecremented,
    peopleIncremented,
    peopleDecremented,
    updateLocation
} from '../../../reducers/Dashboard/Actions';

import {
    nav_to
} from '../../../reducers/App/Actions';

import { loadFavs } from '../../../reducers/Favourites/Actions';

import {
    FAVOURITES_PAGE,
    DASHBOARD_PAGE
} from '../../../reducers/App/PagesTypes';

import screens from '../../Global';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class MyBudgetScreen extends Component {

    constructor(props) {
        super(props);
        console.log('screenInstanceID', props.navigator.screenInstanceID)
        const screenID = props.navigator.screenInstanceID;
        screens[screenID] = 'budget';
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
    }

    componentDidMount() {
        requestLocationPermission();
        console.log('REQUESTING POSITION BRO');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("GOT POSITION");
                console.log(position);
                this.props.updateLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            },
            (error) => { console.log("ERROR = " + error); },
        );
        this.props.loadFavs();
        console.log('called LOAD FAVS');
    }

    loadingStyler() {
        return {
            position: 'absolute',
            width: width,
            height: height,
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center',
            display: this.props.isLoading ? 'flex' : 'none'
        }
    }

    renderLoading() {
        if (this.props.isLoading) {
            return (
                <ImageBackground
                    source={require('../../../assets/loading_bg.jpeg')}
                    style={this.loadingStyler()}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Getting Results...</Text>
                </ImageBackground>
            );
        }
    }

    topStatusBar() {
        if (Platform.OS == 'ios') {
            StatusBar.setHidden(false);
            return (
                <View style={styles.topStatusBar} />
            );
        }
    }

    onNavigationEvent = (event) => {

        if (event.id == 'didAppear') {
            screens.root = this.props.navigator.screenInstanceID;
            this.props.nav_to(DASHBOARD_PAGE);
            console.log(screens);
            console.log('BUDGET APPEARED');
            this.props.navigator.toggleTabs({
                to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
        }

        // handle a deep link
        if (screens.root == this.props.navigator.screenInstanceID) {
            if (event.type == 'DeepLink') {
                const page = event.link;
                if (page == 'fav') {
                    this.props.navigator.push({
                        screen: 'favourites'
                    });
                }
                else if (page == 'dash') {
                    this.props.navigator.popToRoot({
                    });
                    this.props.navigator.switchToTab({
                        tabIndex: 1 // (optional) if missing, this screen's tab will become selected
                    });
                }
                else if (page == 'editProfile') {
                    this.props.navigator.push({
                        screen: 'editProfile'
                    });
                }
            }
        }
    }

    render() {
        StatusBar.setBarStyle('light-content', false);

        return (
            <View style={styles.container}>
                {this.topStatusBar()}
                <NavBar {...this.props} />
                <View style={[styles.topStatusBar, { height: 2 }]} />
                <ScrollView>
                    <View style={styles.bodyContainer}>
                        <BudgetSetter style={styles.budgetSetter} />
                        <PlacePicker />
                        <TagsSelector />
                    </View>
                </ScrollView>
                <SearchButton {...this.props} />
                {this.renderLoading()}
            </View>

        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    topStatusBar: {
        height: 22,
        backgroundColor: '#000000',
    },
    bodyContainer: {
        flex: 1,
        alignSelf: 'stretch',
        marginBottom: 10
    },
    budgetSetter: {

    },
    loadingText: {
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)',
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: 10,
    }
};

const mapStateToProps = state => {
    return {
        budget: state.dashboard.budget,
        people: state.dashboard.people,
        isLoading: state.dashboard.loading,
        location: state.dashboard.location
    };
};

const actions = {
    budgetIncremented,
    budgetDecremented,
    peopleIncremented,
    peopleDecremented,
    nav_to,
    updateLocation,
    loadFavs
};

export default connect(mapStateToProps, actions)(MyBudgetScreen);
