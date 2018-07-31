import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StatusBar,
    ScrollView,
    Platform
} from 'react-native';
import NavBar from '../Common/NavBar';
import SuggestionItem from './SuggestionItem';
import SuggestionItemRev from './SuggestionItemRev';
import { connect } from 'react-redux';
import {
    nav_to
} from '../../../reducers/App/Actions';
import { DASHBOARD_PAGE } from '../../../reducers/App/PagesTypes';
import screens from '../../Global';

class SuggestionsScreen extends Component {

    constructor(props) {
        super(props);
        console.log('screenInstanceID', props.navigator.screenInstanceID)
        const screenID = props.navigator.screenInstanceID;
        //var obj = {};
        screens[screenID] = 'suggestion';
        //screens.push(obj);
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
    }

    onNavigationEvent = (event) => {

        if (event.id == 'didAppear') {
            screens.root = this.props.navigator.screenInstanceID;
            this.props.nav_to(DASHBOARD_PAGE);
            console.log('SUGGESTIONS APPEARED');
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
        StatusBar.setBarStyle('light-content', false);
        return (
            <View style={styles.container}>
                {this.topStatusBar()}
                <NavBar {...this.props} />
                <View style={[styles.topStatusBar, { height: 2 }]} />
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <SuggestionItem
                        title={'Cafe Supreme Maadi\'s New Branch'}
                        body={
                            'At Cafe Supreme, we\'re about so much ' +
                            'more than your average cup of coffee'
                        }
                        img={require('../Common/imgs/cafesupreme_suggestion.png')}
                    />
                    <SuggestionItemRev
                        title={'The Room'}
                        body={
                            'Room is an evolving and ever changing art space, ' +
                            'dance studio, and cafe, The multi-purpose space ' +
                            'offers professionals and aspiring artists as well ' +
                            'as lovers of the arts- a space to create, ' +
                            'collaborate. perform, and share ideas over ' +
                            'freshly brewed coffee'
                        }
                        img={require('../Common/imgs/theroom_suggestion.png')}
                    />

                    <SuggestionItem
                        title={'Buffalo Burger\'s New Branch'}
                        body={
                            'A visit to new cairo\'s latest ' +
                            'Buffalo Burger branch is a must. ' +
                            'The food, service and atmosphre are ' +
                            'perfect for a night-out with your ' +
                            'friends or family'
                        }
                        img={require('../Common/imgs/buffaloburger_suggestion.png')}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    content: {
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
export default connect(null, actions)(SuggestionsScreen);
