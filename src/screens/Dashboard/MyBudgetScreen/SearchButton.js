import React, { Component } from 'react';
import {
    TouchableHighlight,
    Image,
    Platform
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

const styles = {
    container: {
        backgroundColor: '#729dcd',
        height: 100,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '60%'
    }
};

const actions = {
    budgetSearch
};

export default connect(null, actions)(SearchButton);

