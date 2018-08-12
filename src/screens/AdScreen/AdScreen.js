import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { changeAppRoot } from '../../reducers/App/Actions';

var progress = 0;

class AdScreen extends Component {

    static navigatorStyle = {
        drawUnderTabBar: true,
    };


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
        setTimeout(() => {
            progress += 10;
            this.forceUpdate();
        }, 1000);
    }

    onNavigationEvent = (event) => {
        console.log('AD ' + event.id);
        if (event.id == 'willAppear') {
            this.props.navigator.toggleTabs({
                to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
            this.props.navigator.setDrawerEnabled({
                side: "left",
                enabled: false
            });
        }
        else if (event.id == 'willDisappear') {
            this.props.navigator.setDrawerEnabled({
                side: "left",
                enabled: true
            });
        }
    }

    renderProgress() {
        return {
            position: 'absolute',
            width: progress + '%',
            height: 1,
            top: 25,
            alignSelf: 'flex-start',
            backgroundColor: '#FFFFFF'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={this.renderProgress()}>
                </View>
                <Text style={{ color: '#FFFFFF' }}>Hello</Text>
            </View>
        )
    }


}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    pb: {

    }
}

const mapStateToProps = state => {
    return {
    };
};

const actions = {
    changeAppRoot
};

export default connect(mapStateToProps, actions)(AdScreen);