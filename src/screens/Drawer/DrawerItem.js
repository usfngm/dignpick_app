import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

class DrawerItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                underlayColor={'#2e354b'}
                disabled={this.props.selected ? true : false}
                style={this.props.selected ? styles.selected : null}
                onPress={() => {
                    this.props.onPress();
                }}>
                <View style={styles.container}>
                    <Image style={styles.icon} source={this.props.icon} />
                    <Text style={styles.txt}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = {
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingLeft: 30,
    },
    txt: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 15,
    },
    selected: {
        backgroundColor: '#2e354b'
    }
};

export default DrawerItem;