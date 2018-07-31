import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

class GalleryItemOriginal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={this.props.img}
                    style={styles.img}
                />
                <Text style={styles.topTxt}>
                    {this.props.title}
                </Text>
                <Text style={styles.botTxt}>
                    {this.props.subtitle}
                </Text>
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
        marginBottom: 30
    },
    img: {
        width: 200,
        height: 200,
    },
    topTxt: {
        fontSize: 25,
        lineHeight: 25,
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    botTxt: {
        color: '#757575',
        alignSelf: 'center',
        paddingBottom: 17,
        textAlign: 'center',
    }
};

export default GalleryItemOriginal;