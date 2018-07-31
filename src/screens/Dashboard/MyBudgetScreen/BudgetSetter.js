import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import {
    budgetIncremented,
    budgetDecremented,
    peopleIncremented,
    peopleDecremented
} from '../../../reducers/Dashboard/Actions';

class BudgetSetter extends Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.title}>SET YOUR BUDGET</Text>
                <View style={styles.budgetSetter}>

                    <TouchableWithoutFeedback
                        onPress={() => { this.props.budgetDecremented(); }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.budgetSetterController}>-</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <Text
                        style={styles.budgetNum}
                    >
                        {this.props.budget}
                        <Text style={{ fontSize: 15 }}>{' L.E.'}</Text>
                    </Text>

                    <TouchableWithoutFeedback
                        onPress={() => { this.props.budgetIncremented(); }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.budgetSetterController}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

                <Text style={[styles.title, { marginTop: 30, marginBottom: 5 }]}>
                    NUMBER OF PEOPLE
                </Text>

                <View style={styles.budgetSetter}>

                    <TouchableWithoutFeedback
                        onPress={() => { this.props.peopleDecremented(); }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.peopleSetterController}>-</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text
                        style={styles.peopleNum}
                    >
                        {this.props.people}
                    </Text>

                    <TouchableWithoutFeedback
                        onPress={() => { this.props.peopleIncremented(); }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.peopleSetterController}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        paddingBottom: 15

    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#747474',
        marginTop: 15
    },
    budgetSetter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    budgetSetterController: {
        color: '#726f74',
        flex: 1,
        fontSize: 60,
        textAlign: 'center'
    },
    budgetNum: {
        flex: 2,
        color: '#282828',
        fontSize: 60,
        textAlign: 'center'
    },
    peopleNum: {
        flex: 1,
        color: '#282828',
        fontSize: 30,
        textAlign: 'center'
    },
    peopleSetterController: {
        color: '#726f74',
        flex: 1,
        fontSize: 40,
        textAlign: 'center'
    }
};

const mapStateToProps = state => {
    return {
        budget: state.dashboard.budget,
        people: state.dashboard.people,
    };
};

const actions = {
    budgetIncremented,
    budgetDecremented,
    peopleIncremented,
    peopleDecremented
};

export default connect(mapStateToProps, actions)(BudgetSetter);
