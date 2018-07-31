import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { setTags } from '../../../reducers/Dashboard/Actions';

class PlaceTag extends Component {

    constructor(props) {
        super(props);
    }

    renderImage() {
        if (this.props.tags[this.props.name]) {
            return (
                <Image
                    source={this.props.imgSelected}
                    style={styles.img}
                />
            );
        } else {
            return (
                <Image
                    source={this.props.img}
                    style={styles.img}
                />
            );
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={() => {
                    console.log(this.props.tags[this.props.name]);
                    if (this.props.tags[this.props.name]) {
                        this.props.setTags(this.props.name, false);
                        this.forceUpdate();
                    } else {
                        this.props.setTags(this.props.name, true);
                        this.forceUpdate();
                    }
                }}
            >
                <View style={styles.container}>
                    {this.renderImage()}
                    <Text style={styles.text}>{this.props.children}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    container: {
    },
    img: {
        height: 60,
        width: 60,
        alignSelf: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 10
    }
};

const mapStateToProps = state => {
    //console.log(state.dashboard.tag[this.props.name]);
    return {
        tags: state.dashboard.tags,
    };
};

const actions = {
    setTags
};

export default connect(mapStateToProps, actions)(PlaceTag);