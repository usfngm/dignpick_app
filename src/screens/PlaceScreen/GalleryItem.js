import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

class GalleryItem extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={this.props.img}
                    defaultSource={require('../Dashboard/Common/imgs/noimgbox.png')}
                    // loadingIndicatorSource={require('../Dashboard/Common/imgs/noimgbox.png')}
                    style={styles.img}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#FFFFFF',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    img: {
        width: 200,
        height: 200,
    }
};

export default GalleryItem;