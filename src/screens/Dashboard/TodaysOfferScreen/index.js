import React, { Component } from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import {
    nav_to
} from '../../../reducers/App/Actions';
import NavBar from '../Common/NavBar';
import screens from '../../Global';
import { DASHBOARD_PAGE } from '../../../reducers/App/PagesTypes';
class TodaysOfferScreen extends Component {

    constructor(props) {
        super(props);
        console.log('screenInstanceID', props.navigator.screenInstanceID)
        const screenID = props.navigator.screenInstanceID;
        screens[screenID] = 'offers';
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
    }

    onNavigationEvent = (event) => {

        if (event.id == 'didAppear') {
            screens.root = this.props.navigator.screenInstanceID
            this.props.nav_to(DASHBOARD_PAGE);
            console.log('Todays Offer APPEARED');
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

    topStatusBar() {
        if (Platform.OS == 'ios') {
            return (
                <View style={styles.topStatusBar} />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.topStatusBar()}
                <NavBar {...this.props} />
                <View style={[styles.topStatusBar, { height: 2 }]} />
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
};

const actions = {
    nav_to
};
export default connect(null, actions)(TodaysOfferScreen);