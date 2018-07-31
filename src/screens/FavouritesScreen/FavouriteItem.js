import React, { Component } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    ImageBackground,
    Image,
} from 'react-native';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeFav } from '../../reducers/Favourites/Actions';
class FavouriteItem extends Component {

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <View style={styles.topbar}>
                        <Text
                            style={{
                                paddingLeft: 15,
                                fontSize: 17,
                                color: '#434b55',
                                alignSelf: 'center',
                                textAlign: 'left',

                            }}
                        >{this.props.name}</Text>
                        <MaterialCommunityIcons
                            name="close"
                            color="#434b55"
                            size={21}
                            style={{
                                paddingRight: 15,
                                alignSelf: 'center',

                            }}
                            onPress={this.props.removeFavOnPress}
                        />
                    </View>
                    <TouchableHighlight
                        underlayColor={'#f3f3f3'}
                        onPress={this.props.onPress}
                    >
                        <View>
                            <View style={styles.placeimgContainer}>
                                <ImageBackground
                                    defaultSource={this.props.waitingimg}
                                    loadingIndicatorSource={this.props.waitingimg}
                                    source={this.props.img}
                                    style={styles.placeimg}
                                >
                                </ImageBackground>
                            </View>

                            <View style={styles.bottomTabContainer}>
                                <View style={styles.telContainer}>
                                    <FoundationIcon
                                        name="telephone"
                                        color="#000000"
                                        size={21}
                                    />
                                    <Text style={styles.telTxt}>
                                        {this.props.tel}
                                    </Text>
                                </View>
                                <View style={styles.placeTags}>
                                    <Image
                                        source={require('../Dashboard/Common/imgs/date.png')}
                                        style={styles.placeTagsImgs}
                                        resizeMode={'contain'}
                                    />
                                    <Image
                                        source={require('../Dashboard/Common/imgs/wifi.png')}
                                        style={styles.placeTagsImgs}
                                        resizeMode={'contain'}
                                    />
                                    <Image
                                        source={require('../Dashboard/Common/imgs/outdoors.png')}
                                        style={styles.placeTagsImgs}
                                        resizeMode={'contain'}
                                    />
                                </View>
                            </View>
                            <View style={styles.addressContainer}>
                                <FontAwesomeIcon
                                    name="location-arrow"
                                    color="#000000"
                                    size={21}
                                />
                                <Text style={styles.addressTxt}>
                                    {this.props.address}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topbar: {
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loc: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    tag: {
        marginRight: 5,
        marginLeft: 10,
    },
    img: {
        height: 25,
        width: 25,
        marginRight: 5
    },
    locText: {
        color: '#39aad6'
    },
    placeimgContainer: {
        width: '100%',
        height: 130,
    },
    placeimg: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    bookingBtnContainer: {
        backgroundColor: '#ededed',
        flexDirection: 'row',
        height: 35,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookingText: {
        color: '#666666',
        fontSize: 11,
        alignSelf: 'center'
    },
    bookingImg: {
        height: 20,
        width: 20,
        marginRight: 3,
        alignSelf: 'center'
    },
    offerContainer: {
        padding: 7,
    },
    offerContents: {
        flexDirection: 'row'
    },
    likeBtnContainer: {

    },
    drinks: {
        flex: 1,
        paddingTop: 5,
    },
    dishes: {
        flex: 1,
        paddingTop: 5,
    },
    likeBtn: {
        height: 20,
        width: 20,
    },
    offerItems: {
        paddingLeft: 10,
        paddingTop: 5
    },
    bottomTabContainer: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    placeTags: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    placeTagsImgs: {
        width: 30,
        height: 30,
        paddingRight: 5,
    },
    telContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    telTxt: {
        paddingLeft: 4,
        color: '#3c3f45',
        paddingBottom: 5,
        fontSize: 13
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
    },
    addressTxt: {
        paddingLeft: 8,
        color: '#3c3f45',
    },
};

export default FavouriteItem;

