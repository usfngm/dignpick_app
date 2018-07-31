import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import PlaceTag from './PlaceTag';

class TagsSelector extends Component {

    render() {
        return (
            <View style={styles.bigContainer}>
                <View style={styles.container}>
                    <View style={styles.row}>

                        <PlaceTag
                            img={require('../Common/imgs/outdoors.png')}
                            imgSelected={require('../Common/imgs/outdoors_selected.png')}
                            name={'outdoors'}
                        >
                            OUTDOORS
                        </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/home.png')}
                            imgSelected={require('../Common/imgs/home_selected.png')}
                            name={'atHome'}
                        >
                            AT HOME
                        </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/shisha.png')}
                            imgSelected={require('../Common/imgs/shisha_selected.png')}
                            name={'shisha'}
                        >
                            SHISHA
                        </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/indoors.png')}
                            imgSelected={require('../Common/imgs/indoors_selected.png')}
                            name={'indoors'}
                        >
                            INDOORS
                        </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/food.png')}
                            imgSelected={require('../Common/imgs/food_selected.png')}
                            name={'food'}
                        >
                            FOOD
                        </PlaceTag>

                    </View>
                    <View style={styles.row}>

                        <PlaceTag
                            img={require('../Common/imgs/date.png')}
                            imgSelected={require('../Common/imgs/date_selected.png')}
                            name={'date'}
                        >
                            DATE
                    </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/activity.png')}
                            imgSelected={require('../Common/imgs/activity_selected.png')}
                            name={'activity'}
                        >
                            ACTIVITY
                    </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/book.png')}
                            imgSelected={require('../Common/imgs/book_selected.png')}
                            name={'read'}
                        >
                            READ
                    </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/wifi.png')}
                            imgSelected={require('../Common/imgs/wifi_selected.png')}
                            name={'wifi'}
                        >
                            WIFI
                    </PlaceTag>

                        <PlaceTag
                            img={require('../Common/imgs/night.png')}
                            imgSelected={require('../Common/imgs/night_selected.png')}
                            name={'nightLife'}
                        >
                            NIGHT LIFE
                    </PlaceTag>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    bigContainer: {
        flex: 1,
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tag: {
        flex: 1
    },
    img: {
        height: 60,
        width: 60,
        alignSelf: 'center'
    },
    tagName: {
        textAlign: 'center',
        fontSize: 9
    }
};

export default TagsSelector;
