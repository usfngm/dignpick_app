import React, { Component } from 'react';
import {
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    Text,
    ImageBackground,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import ResultTag from './ResultTag';
import { nav_to } from '../../../reducers/App/Actions';
import { addFavPlace, removeFavPlace } from '../../../reducers/Auth/Actions';
import { toggleFav } from '../../../reducers/Favourites/Actions';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            size: this.props.results.length
        }
    }

    renderDrinks() {
        return (
            <Text>+{this.props.results[this.state.current - 1].drink.name}</Text>
        );
    }

    renderDishes() {
        return (
            <Text>+{this.props.results[this.state.current - 1].dish.name}</Text>
        );
    }

    renderPrice() {
        var price = this.props.results[this.state.current - 1].drink.price + this.props.results[this.state.current - 1].dish.price;
        return (
            <Text>TOTAL: {price} EGP</Text>
        );
    }

    prev() {
        if ((this.state.current - 1) > 0) {
            this.setState({
                current: this.state.current - 1
            })
        }
    }
    next() {
        if ((this.state.current + 1) <= this.state.size) {
            this.setState({
                current: this.state.current + 1
            })
        }
    }

    renderCounter() {
        return (
            <Text style={styles.counter}>{this.state.current} / {this.state.size}</Text>
        )
    }

    toggleFavPlace = () => {
        console.log('wtf? again');
        this.props.toggleFav(this.props.place);
    }

    renderLikeBtn() {
        try {
            var favPlaces = this.props.favPlaces;
            if (favPlaces.indexOf(this.props.place.uid) != -1) {
                return (
                    <IoniconsIcon
                        name="md-heart"
                        size={20}
                        color="#000000"
                    />
                );
            }
            else {
                return (
                    <IoniconsIcon
                        name="md-heart-outline"
                        size={20}
                        color="#000000"
                    />
                );
            }
        }
        catch (err) {
            return (
                <IoniconsIcon
                    name="md-heart-outline"
                    size={20}
                    color="#000000"
                />
            );
        }
    }

    render() {
        return (
            <View
                style={styles.container}>
                <TouchableHighlight
                    underlayColor={'#f3f3f3'}
                    onPress={this.props.onPress}
                >
                    <View>
                        <View style={styles.topbar}>
                            <ResultTag style={styles.tag} />
                            <Text>{this.props.name}</Text>
                            <View style={styles.loc}>
                                <Image
                                    source={require('../Common/imgs/loc_icon.png')}
                                    style={styles.img}
                                />
                                <Text style={styles.locText}>{this.props.loc} km away</Text>
                            </View>
                        </View>
                        <View style={styles.placeimgContainer}>
                            <ImageBackground
                                defaultSource={this.props.waitingimg}
                                loadingIndicatorSource={this.props.waitingimg}
                                source={this.props.img}
                                style={styles.placeimg}
                            >
                                <View style={styles.bookingBtnContainer}>
                                    <Image
                                        source={require('../Common/imgs/bell_icon.png')}
                                        style={styles.bookingImg}
                                        resizeMode={'center'}
                                    />
                                    <Text style={styles.bookingText}>BOOK</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.offerContainer}>
                            <View style={styles.offerContents}>
                                <View style={styles.drinks}>
                                    <Text style={{ fontWeight: 'bold' }}>DRINKS</Text>
                                    <View style={styles.offerItems}>
                                        {this.renderDrinks()}
                                    </View>
                                </View>
                                <View style={styles.dishes}>
                                    <Text style={{ fontWeight: 'bold' }}>MAIN DISH</Text>
                                    <View style={styles.offerItems}>
                                        {this.renderDishes()}
                                    </View>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.toggleFavPlace();
                                    }}
                                    style={styles.likeBtnContainer}>
                                    {this.renderLikeBtn()}
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.bottomTabContainer}>
                            <View style={styles.placeTags}>
                                <Image
                                    source={require('../Common/imgs/date.png')}
                                    style={styles.placeTagsImgs}
                                    resizeMode={'contain'}
                                />
                                <Image
                                    source={require('../Common/imgs/wifi.png')}
                                    style={styles.placeTagsImgs}
                                    resizeMode={'contain'}
                                />
                                <Image
                                    source={require('../Common/imgs/outdoors.png')}
                                    style={styles.placeTagsImgs}
                                    resizeMode={'contain'}
                                />
                            </View>
                            <View style={styles.offerCost}>
                                <Text style={styles.offerCostTxt}>
                                    {this.renderPrice()}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.navigatorContainer}>
                    <TouchableWithoutFeedback
                        style={{
                            flex: 1,
                        }}
                        underlayColor={'#f3f3f3'}
                        onPress={() => {
                            this.prev();
                        }}>
                        <View style={styles.navArrowContainerLeft}>
                            <IoniconsIcon
                                style={styles.navArrowLeft}
                                name="ios-arrow-back"
                                size={30}
                                color="#000000"
                            />
                            <Text style={styles.navArrowText}>Previous</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.renderCounter()}
                    <TouchableWithoutFeedback
                        style={{
                            flex: 1,
                            backgroundColor: 'black'
                        }}
                        underlayColor={'#f3f3f3'}
                        onPress={() => {
                            this.next();
                        }}>
                        <View style={styles.navArrowContainerRight}>
                            <Text style={styles.navArrowText}>Next</Text>
                            <IoniconsIcon
                                style={styles.navArrowRight}
                                name="ios-arrow-forward"
                                size={30}
                                color="#000000"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = {
    navArrowText: {
        paddingBottom: 3,
    },
    navArrowRight: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    navArrowLeft: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    navArrowContainerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    navArrowContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
    counter: {
        color: '#595858',
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center'
    },
    navigatorContainer: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    container: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#FFFFFF'
    },
    topbar: {
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
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
        backgroundColor: '#CFCFCF',
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
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    placeTags: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    offerCost: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 15,
    },
    offerCostTxt: {
        color: 'red',
        fontWeight: 'bold'
    },
    placeTagsImgs: {
        width: 30,
        height: 30,
        paddingRight: 5,
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        favPlaces: state.favs.rawFavs
    };
};

const actions = {
    nav_to,
    addFavPlace,
    removeFavPlace,
    toggleFav
};
export default connect(mapStateToProps, actions)(Result);

