import React, { Component } from 'react';
import {
    TouchableHighlight,
    Image,
    Platform,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { budgetSearch } from '../../../reducers/Dashboard/Actions';

class SearchButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                style={styles.container}
                underlayColor={'#517eb0'}
                onPress={() => {
                    this.props.budgetSearch(this.props.navigator);
                }}
            >
                <Image
                    style={styles.img}
                    source={require('../Common/imgs/searchbtn.png')}
                    resizeMode={'contain'}
                />
            </TouchableHighlight>
        );
    }
}

const navBatHeight = getNavBarHeight => {
    if (Platform.OS == 'ios') {

        let d = Dimensions.get('window');
        const { height, width } = d;

        if (height === 812 || width === 812)
            return 88 // iPhone X navbar height (regular title);
        else

            return 64 // iPhone navbar height;
    } else
        return 54 //android portrait navbar height;
}

const styles = {
    container: {
        backgroundColor: '#729dcd',
        height: 100,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 49
    },
    img: {
        width: '60%'
    }
};

const actions = {
    budgetSearch
};

export default connect(null, actions)(SearchButton);

