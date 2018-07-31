import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

class PlacePicker extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image 
                style={styles.arrows}
                source={require('../Common/imgs/previous_arrow.png')} 
                />
                <Text style={styles.text}>Heliopolis</Text>
                <Image 
                style={styles.arrows}
                source={require('../Common/imgs/next_arrow.png')} 
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        backgroundColor: '#494949',
        height: 50,
        alignItems: 'center'
    },
    text: {
        color: '#FFFFFF',
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    },
    arrows: {
        height: 40,
        width: 40,
    }
};

export default PlacePicker;
