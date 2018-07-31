import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

class Tag extends Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Icon name="flame" color="#FFFFFF" size={13} />
                <Text style={styles.text}>Recommended</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        width: 100,
        height: 20,
        flexDirection: 'row',
        backgroundColor: '#f500a6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        paddingLeft: 3,
        color: '#FFFFFF'
    }
};

export default Tag;
