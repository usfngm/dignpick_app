import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
} from 'react-native';
import ResultTag from './ResultTag';

class SuggestionItemRev extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                    <ResultTag style={styles.tag} />
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.desc}>
                        {this.props.body}
                    </Text>
                </View>
                <View style={styles.imgContainer}>
                    <ImageBackground
                        source={this.props.img}
                        style={styles.img}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
    },
    imgContainer: {
        flex: 1,
    },
    dataContainer: {
        paddingLeft: 5,
        paddingTop: 5,
        flex: 1,
        paddingBottom: 50,
    },
    img: {
        flex: 1,
    },
    tag: {
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    desc: {
        color: '#b9b8b9',
        paddingTop: 15
    }
};

export default SuggestionItemRev;
