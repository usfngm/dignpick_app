import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import NavBar from '../Dashboard/Common/NavBar';
import {
    FAVOURITES_PAGE
} from '../../reducers/App/PagesTypes';
import { nav_to } from '../../reducers/App/Actions';
import { loadFavs, removeFav } from '../../reducers/Favourites/Actions';
import { openResult } from '../../reducers/Dashboard/Actions';
import FavouriteItem from './FavouriteItem';
import screens from '../Global';

class FavouritesScreen extends Component {

    static navigatorStyle = {
        drawUnderTabBar: true,
    };


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
    }

    componentDidMount() {
        this.props.loadFavs();
    }

    topStatusBar() {
        if (Platform.OS == 'ios') {
            return (
                <View style={styles.topStatusBar} />
            );
        }
    }

    onNavigationEvent = (event) => {

        if (event.id == 'didAppear') {
            console.log("FAV APPEARED");
            this.props.nav_to(FAVOURITES_PAGE);
            this.props.navigator.toggleTabs({
                to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
        }
    }

    renderFavs() {
        var favPlaces = this.props.favs;
        if (favPlaces.length > 0) {
            return (
                <ScrollView style={{ flex: 1 }}>
                    <View>
                        {this.renderResults()}
                    </View>
                </ScrollView>
            );
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{marginRight: 10, marginLeft: 10, textAlign: 'center', color: '#3A3A3A'}}>The list is empty. Try adding some restaurants to your list and try again.</Text>
                </View>
            )
        }
    }

    renderResults() {
        var favPlaces = this.props.favs;
        return favPlaces.map((result, i) => {
            if (result.coverPhotoURL) {
                return (
                    <FavouriteItem
                        onPress={() => {
                            this.props.openResult(this.props.navigator, result);
                        }}
                        removeFavOnPress={() => {
                            this.props.removeFav(result.uid);
                        }}
                        key={result.name + i}
                        place={result}
                        name={result.name}
                        tel={result.hotline}
                        img={{ 'uri': result.coverPhotoURL }}
                        waitingimg={require('../Dashboard/Common/imgs/noimg.png')}
                        address={result.branches[0].address}
                    />
                )
            }
            else {
                return (
                    <FavouriteItem
                        onPress={() => {
                            this.props.openResult(this.props.navigator, result);
                        }}
                        removeFavOnPress={() => {
                            this.props.removeFav(result.uid);
                        }}
                        key={result.name + i}
                        place={result}
                        name={result.name}
                        tel={result.hotline}
                        img={require('../Dashboard/Common/imgs/noimg.png')}
                        address={result.branches[0].address}
                    />
                )
            }
        });
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

    render() {
        return (
            <View style={styles.container}>
                <View style={this.loadingStyle()}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
                {this.topStatusBar()}
                <NavBar
                    {...this.props}
                    title='FAVOURITES'
                />
                <View style={[styles.topStatusBar, { height: 2 }]} />
                {this.renderFavs()}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#e1eaef'
    },
    topStatusBar: {
        height: 22,
        backgroundColor: '#000000',
    },
    loadingText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10,
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isLoading: state.favs.isLoading,
        favs: state.favs.favs
    };
};

const actions = {
    nav_to,
    loadFavs,
    openResult,
    removeFav
};

export default connect(mapStateToProps, actions)(FavouritesScreen);