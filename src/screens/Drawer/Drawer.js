import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    Platform,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import DrawerItem from './DrawerItem';

import {
    changeAppRoot,
    nav_to
} from '../../reducers/App/Actions';

import {
    logout
} from '../../reducers/Auth/Actions';

import {
    DASHBOARD_PAGE,
    FAVOURITES_PAGE
} from '../../reducers/App/PagesTypes';

import screens from '../Global';


class Drawer extends Component {

    setNavigationRoot(cb) {

    }

    topStatusBar() {
        if (Platform.OS == 'ios') {
            return (
                <View style={styles.topStatusBar} />
            );
        }
    }

    closeDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
            animated: true, // does the toggle have transition animation or does it happen immediately (optional)
            to: 'closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.topStatusBar()}
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('./imgs/avatar.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.avatarTxtContainer}>
                        <Text style={styles.avatarTxtName}>{this.props.name}</Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.closeDrawer();
                                this.props.navigator.handleDeepLink({ link: "editProfile" });
                            }}
                        >
                            <View>
                                <Text style={styles.avatarTxtEditProfile}>Edit Profile</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.drawerItemsContainer}>
                        <DrawerItem
                            icon={require('./imgs/reservation_icon.png')}
                            name={'RESERVATION'}
                            selected={this.props.sideMenuSelected === 'RESERVATION' ? true : false}
                        />
                        <View style={styles.separator} />
                        <DrawerItem
                            icon={require('./imgs/directory_icon.png')}
                            name={'DIRECTORY'}
                        />
                        <View style={styles.separator} />
                        <DrawerItem
                            icon={require('./imgs/dashboard_icon.png')}
                            name={'DASHBOARD'}
                            onPress={() => {
                                this.props.navigator.toggleDrawer({
                                    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                                    animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                                    to: 'closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
                                });
                                this.props.nav_to(DASHBOARD_PAGE);
                                this.props.navigator.handleDeepLink({ link: "dash" });
                            }}
                            selected={this.props.sideMenuSelected === DASHBOARD_PAGE ? true : false}
                        />
                        <View style={styles.separator} />
                        <DrawerItem
                            icon={require('./imgs/favourites_icon.png')}
                            name={'FAVOURITES'}
                            onPress={() => {
                                this.props.nav_to(FAVOURITES_PAGE);
                                this.closeDrawer();
                                this.props.navigator.handleDeepLink({ link: "fav" });
                            }}
                            selected={this.props.sideMenuSelected === FAVOURITES_PAGE ? true : false}
                        />
                        <View style={styles.separator} />
                        <DrawerItem
                            icon={require('./imgs/suggestions_icon.png')}
                            name={'SUGGESTIONS'}
                        />
                        <View style={styles.separator} />
                        <DrawerItem
                            icon={require('./imgs/search_icon.png')}
                            name={'SEARCH'}
                        />
                        <View style={styles.separator} />
                        <DrawerItem
                            icon={require('./imgs/settings_icon.png')}
                            name={'SETTINGS'}
                        />
                        <View style={styles.separator} />
                        <TouchableHighlight
                            style={styles.logoutBtnContainer}
                            underlayColor={'#2e354b'}
                            onPress={() => {
                                this.props.logout();
                            }}
                        >
                            <Text style={styles.logoutBtnTxt}>LOGOUT</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View >
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#171a25',
        width: Dimensions.get('window').width * 0.8,
        flex: 1
    },
    topStatusBar: {
        height: 22,
        backgroundColor: '#000000',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 13,
        marginTop: 15
    },
    avatar: {
        width: 70,
        height: 70,
    },
    avatarTxtName: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
    },
    avatarTxtEditProfile: {
        color: '#7a7c7e',
        marginLeft: 5,
        marginTop: 3,
        fontSize: 14
    },
    avatarTxtContainer: {
        justifyContent: 'center'
    },
    drawerItemsContainer: {
        marginTop: 15,
        flex: 1
    },
    separator: {
        backgroundColor: '#2e354b',
        height: 1,
        paddingLeft: 27
    },
    logoutBtnContainer: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutBtnTxt: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold'
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        sideMenuSelected: state.app.sideMenuSelected,
        name: state.auth.user.name,
    };
};

const actions = {
    changeAppRoot,
    nav_to,
    logout
};

export default connect(mapStateToProps, actions)(Drawer);