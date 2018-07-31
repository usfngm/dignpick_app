import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

class ResultTag extends Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.text}>Recommended</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        width: 100,
        height: 20,
        backgroundColor: '#f500a6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
};

export default ResultTag;
