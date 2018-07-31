import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigator.toggleDrawer({
                                side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                                animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                            });
                        }}
                    >
                        <Image
                            source={require('./imgs/menu_icon.png')}
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <Text style={styles.searchBarText}>
                        {this.props.title == undefined ? 'DASHBOARD' : this.props.title}
                    </Text>
                    <Image
                        source={require('./imgs/search_icon.png')}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    navBarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    navBarContents: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    container: {

    },
    searchBar: {
        height: 50,
        backgroundColor: '#ededed',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    searchBarText: {
        fontSize: 20,
        color: '#ae587a'
    },
    navBar: {
        backgroundColor: '#1d1521',
        height: 70,
        justifyContent: 'center',
    },
    navBarTabs: {
        flexDirection: 'row',
    },
    navBarTextSelected: {
        color: '#FFFFFF',
        textAlign: 'center',
        paddingBottom: 5
    },
    navBarText: {
        color: '#9e9c9f',
        textAlign: 'center',
        paddingBottom: 5
    },
    navBarSelectorContainer: {
        flexDirection: 'row',
        paddingTop: 10
    },
    navBarSelectorSelected: {
        height: 2,
        backgroundColor: '#60d4d0',
        width: '90%'
    },
    navBarSelector: {
        height: 2,
        width: '90%'
    }
};

export default NavBar;

