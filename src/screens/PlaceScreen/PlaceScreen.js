import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { PLACE_PAGE } from '../../reducers/App/PagesTypes';
import Tag from '../Common';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import GalleryItem from './GalleryItem';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class PlaceScreen extends Component {

    static navigatorStyle = {
        drawUnderTabBar: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            markers: []
        }
    }

    checkMarkers() {
        if (this.props.place.nearestBranch) {
            this.props.place.nearestBranch.geometry['latitude'] = this.props.place.nearestBranch.geometry.lat;
            this.props.place.nearestBranch.geometry['longitude'] = this.props.place.nearestBranch.geometry.lng;
            this.setState({
                markers: [{
                    'latitude': this.props.place.nearestBranch.geometry.lat,
                    'longitude': this.props.place.nearestBranch.geometry.lng
                }]
            });
        }
        else if (this.props.place.branches.length > 0) {
            this.props.place.branches[0].geometry['latitude'] = this.props.place.branches[0].geometry.lat;
            this.props.place.branches[0].geometry['longitude'] = this.props.place.branches[0].geometry.lng;
            this.setState({
                markers: [{
                    'latitude': this.props.place.branches[0].geometry.lat,
                    'longitude': this.props.place.branches[0].geometry.lng
                }]
            });
        }
    }

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
        this.checkMarkers();
    }

    topStatusBar() {
        if (Platform.OS == 'ios') {
            return (
                <View style={styles.topStatusBar} />
            );
        }
    }


    onNavigationEvent = (event) => {

        if (event.id == 'didAppear') {
            console.log("PLACE APPEARED");
            this.props.navigator.toggleTabs({
                to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
        }
    }

    renderGalleryImages() {
        return this.props.place.gallery.map((item, i) => {
            console.log(item);
            return (
                <GalleryItem
                    key={item.id}
                    img={{ 'uri': item.downloadURL }}
                />
            );
        });
    }

    renderAddress() {
        if (this.props.place.nearestBranch) {
            return this.props.place.nearestBranch.address;
        }
        else {
            if (this.props.place.branches.length > 0) {
                return this.props.place.branches[0].address;
            }
            else {
                return '';
            }
        }
    }

    renderMap() {
        if (this.props.place.nearestBranch) {
            this.props.place.nearestBranch.geometry['latitude'] = this.props.place.nearestBranch.geometry.lat;
            this.props.place.nearestBranch.geometry['longitude'] = this.props.place.nearestBranch.geometry.lng;
            return (
                <MapView
                    style={{
                        flex: 1,
                        height: 300,
                        marginTop: 15,
                    }}
                    initialRegion={{
                        latitude: this.props.place.nearestBranch.geometry.lat,
                        longitude: this.props.place.nearestBranch.geometry.lng,
                        latitudeDelta: 0.0022,
                        longitudeDelta: 0.0021,
                    }}
                >
                    {this.state.markers.map((marker, i) => (
                        <Marker
                            key={this.props.place.name + '' + i}
                            coordinate={marker}
                            title={this.props.place.name}
                        />
                    ))}
                </MapView>
            )
        }
        else {
            if (this.props.place.branches.length > 0) {
                this.props.place.branches[0].geometry['latitude'] = this.props.place.branches[0].geometry.lat;
                this.props.place.branches[0].geometry['longitude'] = this.props.place.branches[0].geometry.lng;
                return (
                    <MapView
                        style={{
                            flex: 1,
                            height: 300,
                            marginTop: 15,
                        }}
                        initialRegion={{
                            latitude: this.props.place.branches[0].geometry.lat,
                            longitude: this.props.place.branches[0].geometry.lng,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0021,
                        }}
                    >
                        {this.state.markers.map((marker, i) => (
                            <Marker
                                key={this.props.place.name + '' + i}
                                coordinate={marker}
                                title={this.props.place.name}
                            />
                        ))}
                    </MapView>
                )
            }
            else {
                return (
                    <MapView
                        style={{
                            flex: 1,
                            height: 300,
                            marginTop: 15,
                        }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                )
            }
        }
    }

    renderGallery() {
        if (this.props.place.gallery) {
            if (this.props.place.gallery.length > 0) {
                return (
                    <View style={styles.placeGalleryContainer}>
                        <Text style={styles.galleryTxtTitle}>
                            GALLERY
                    </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View style={styles.galleryImgsContainer}>
                                {this.renderGalleryImages()}
                            </View>
                        </ScrollView>
                    </View>
                );
            }
        }
    }


    render() {

        return (
            <View style={styles.container}>
                {this.topStatusBar()}
                <ScrollView>
                    <View>
                        <ImageBackground
                            source={this.props.place.coverPhotoURL ? { 'uri': this.props.place.coverPhotoURL } : require('../Dashboard/Common/imgs/noimg.png')}
                            defaultSource={require('../Dashboard/Common/imgs/noimg.png')}
                            loadingIndicatorSource={require('../Dashboard/Common/imgs/noimg.png')}
                            style={styles.tab_pic}
                        >
                            <View style={styles.tabdimmer}>
                            </View>
                            <View style={styles.topBtnsContainer}>
                                <Icon
                                    name="ios-arrow-back"
                                    size={30}
                                    onPress={() => {
                                        this.props.navigator.pop({
                                            animated: true, // does the pop have transition animation or does it happen immediately (optional)
                                            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                                        });
                                    }}
                                    style={styles.backBtn}
                                    color="#FFFFFF" />
                                <Icon
                                    name="ios-share-outline"
                                    size={30}
                                    style={styles.shareBtn}
                                    color="#FFFFFF" />

                            </View>
                            <View style={styles.placeNameContainer}>
                                <Text style={styles.placeNameTxt}>
                                    {this.props.place.name}
                                </Text>
                            </View>

                        </ImageBackground>
                        <View style={styles.placeDescriptionContainer}>
                            <View style={styles.placeDescTitleContainer}>
                                <Text style={styles.placeDescTitleText}>
                                    {this.props.place.name}
                                </Text>
                                <Tag />
                            </View>
                            <View>
                                <Text style={styles.placeDescText}>
                                    {this.props.place.description}
                                </Text>
                            </View>
                            <View style={styles.tel_tagsContainer}>
                                <View style={styles.telContainer}>
                                    <FoundationIcon
                                        name="telephone"
                                        color="#000000"
                                        size={21}
                                    />
                                    <Text style={styles.telTxt}>
                                        {this.props.place.hotline}
                                    </Text>
                                </View>
                                <View style={styles.tagsContainer}>
                                    <Image
                                        source={require('../Dashboard/Common/imgs/date.png')}
                                        style={styles.tag}
                                    />
                                    <Image
                                        source={require('../Dashboard/Common/imgs/wifi.png')}
                                        style={styles.tag}
                                    />
                                    <Image
                                        source={require('../Dashboard/Common/imgs/shisha.png')}
                                        style={styles.tag}
                                    />
                                    <Image
                                        source={require('../Dashboard/Common/imgs/indoors.png')}
                                        style={styles.tag}
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
                                    {this.renderAddress()}
                                </Text>
                            </View>
                        </View>
                        {this.renderGallery()}
                        <View style={{ marginTop: 30 }}>
                            <View style={styles.mapTitleContainer}>
                                <IoniconsIcon
                                    name="ios-compass-outline"
                                    size={40}
                                    color="#3c3f45"
                                />
                                <Text style={styles.mapTitletxt}>Map</Text>
                            </View>
                            {this.renderMap()}
                        </View>
                        <TouchableHighlight
                            style={styles.reserveBtnContainer}
                            underlayColor={'#0185be'}
                            onPress={() => {

                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}>
                                <IoniconsIcon
                                    name="ios-lock-outline"
                                    size={30}
                                    color="#FFFFFF"
                                />
                                <Text
                                    style={styles.reserveBtnText}
                                >
                                    RESERVE
                            </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    tab_pic: {
        height: 150,
        zIndex: 2,
        position: 'relative'
    },
    topStatusBar: {
        height: 22,
        backgroundColor: '#000000',
    },
    topBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 99
    },
    tabdimmer: {
        backgroundColor: '#000000',
        opacity: 0.5,
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    backBtn: {
        backgroundColor: 'rgba(0,0,0,0)',
        paddingTop: 10,
        paddingLeft: 15,
    },
    shareBtn: {
        backgroundColor: 'rgba(0,0,0,0)',
        paddingTop: 10,
        paddingRight: 15,
    },
    placeNameContainer: {
        alignItems: 'center',
        paddingBottom: 10,
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    placeNameTxt: {
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 20,
        padding: 8,
        fontSize: 14,
        alignSelf: 'flex-end'
    },
    placeDescriptionContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    placeDescTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeDescTitleText: {
        color: '#4e5259',
        fontSize: 17,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15,
        marginRight: 7,
    },
    placeDescText: {
        color: '#3c3f45',
        textAlign: 'justify',
        paddingLeft: 1,
        paddingRight: 1,
    },
    tel_tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 5,
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
    tagsContainer: {
        flexDirection: 'row',
        paddingBottom: 5,
    },
    tag: {
        height: 25,
        width: 25,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 3,
        paddingTop: 5
    },
    addressTxt: {
        paddingLeft: 6,
        color: '#3c3f45',
    },
    placeGalleryContainer: {
        paddingTop: 30
    },
    galleryTxtTitle: {
        color: '#4e5259',
        fontSize: 30,
        paddingLeft: 15,
        fontWeight: 'bold',
    },
    galleryImgsContainer: {
        flexDirection: 'row',
    },
    mapTitleContainer: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    mapTitletxt: {
        color: '#4e5259',
        fontSize: 30,
        paddingLeft: 7,
    },
    reserveBtnContainer: {
        alignSelf: 'center',
        backgroundColor: '#009de1',
        marginTop: 25,
        marginBottom: 30,
        padding: 8,
        borderWidth: 1,
        borderColor: '#009de1',
        borderRadius: 25,
        paddingLeft: 30,
        paddingRight: 30,
    },
    reserveBtnText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'center',
        paddingTop: 7,
        paddingLeft: 7
    }
};

const mapStateToProps = state => {
    console.log(state.dashboard.place);
    return {
        place: state.dashboard.place
    };
};

export default connect(mapStateToProps, null)(PlaceScreen);