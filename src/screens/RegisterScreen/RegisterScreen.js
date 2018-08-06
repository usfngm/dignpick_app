import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    TextInput,
    Picker,
    TouchableHighlight,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    nameChanged,
    cityChanged,
    mobileChanged,
    register
} from '../../reducers/Register/Actions';


var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class RegisterScreen extends Component {

    static navigatorStyle = {
        statusBarHidden: true,
        tabBarTranslucent: true
    };

    onUsernameChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onConfirmPasswordChange(text) {
        this.props.confirmPasswordChanged(text);
    }

    onNameChange(text) {
        this.props.nameChanged(text);
    }

    onCityChange(text) {
        this.props.cityChanged(text);
    }

    onMobileChange(text) {
        this.props.mobileChanged(text);
    }

    onRegisterSubmit() {
        this.props.register(this.props);
    }

    loadingStyler() {
        return {
            position: 'absolute',
            width: width,
            height: height,
            zIndex: 99,
            opacity: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            display: this.props.isLoading ? 'flex' : 'none'
        }
    }

    renderLoading() {
        if (this.props.isLoading) {
            return (
                <View style={this.loadingStyler()}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Creating your account...</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../LoginScreen/imgs/login_bg.png')}
                style={styles.bgImage}
            >
                <ScrollView>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.fieldTitle}>Email</Text>
                    <TextInput
                        placeholder='example@email.com'
                        keyboardType='email-address'
                        autoCorrect={false}
                        onChangeText={this.onUsernameChange.bind(this)}
                        value={this.props.email}
                        returnKeyType='next'
                        style={styles.inputStyle}
                    />
                    <Text style={styles.fieldTitle}>Password</Text>
                    <TextInput
                        placeholder='password'
                        secureTextEntry
                        onChangeText={this.onPasswordChange.bind(this)}
                        autoCorrect={false}
                        value={this.props.password}
                        returnKeyType='next'
                        style={styles.inputStyle}
                    />
                    <Text style={styles.fieldTitle}>Confirm Password</Text>
                    <TextInput
                        placeholder='confirm password'
                        secureTextEntry
                        autoCorrect={false}
                        returnKeyType='next'
                        value={this.props.confirmPassword}
                        onChangeText={this.onConfirmPasswordChange.bind(this)}
                        style={styles.inputStyle}
                    />
                    <Text style={styles.fieldTitle}>Full Name</Text>
                    <TextInput
                        placeholder='(ex: John Doe)'
                        autoCorrect={false}
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.props.name}
                        returnKeyType='next'
                        style={styles.inputStyle}
                    />
                    <Text style={styles.fieldTitle}>Address</Text>
                    <TextInput
                        placeholder='address'
                        autoCorrect={false}
                        onChangeText={this.onCityChange.bind(this)}
                        value={this.props.city}
                        returnKeyType='next'
                        style={[styles.inputStyle, { height: 120 }]}
                        multiline
                    />
                    <Text style={styles.fieldTitle}>Mobile Number</Text>
                    <TextInput
                        placeholder='0111-222-4512'
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        onChangeText={this.onMobileChange.bind(this)}
                        value={this.props.mobile}
                        returnKeyType='next'
                        style={styles.inputStyle}
                    />

                    <TouchableHighlight
                        style={styles.reserveBtnContainer}
                        underlayColor={'#0185be'}
                        onPress={this.onRegisterSubmit.bind(this)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                            <Text
                                style={styles.reserveBtnText}
                            >
                                Register
                            </Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
                {this.renderLoading()}
            </ImageBackground>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    title: {
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    fieldTitle: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontSize: 30,
        paddingLeft: 18,
        fontSize: 25,
        marginBottom: 10,
    },
    bgImage: {
        flex: 1,
        width: null,
        height: null,
    },
    inputStyle: {
        color: '#292929',
        backgroundColor: '#FFFFFF',
        paddingRight: 5,
        paddingLeft: 15,
        fontSize: 20,
        lineHeight: 23,
        height: 60,
        borderRadius: 7,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch'
    },
    reserveBtnContainer: {
        alignSelf: 'center',
        backgroundColor: '#009de1',
        marginTop: 25,
        marginBottom: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: '#009de1',
        borderRadius: 10,
        paddingLeft: 80,
        paddingRight: 80,
    },
    reserveBtnText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10,
    }
}

const mapStateToProps = state => {
    return {
        email: state.register.email,
        password: state.register.password,
        confirmPassword: state.register.confirmPassword,
        name: state.register.name,
        city: state.register.city,
        mobile: state.register.mobile,
        isLoading: state.register.isLoading,
    };
};

const actions = {
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    nameChanged,
    cityChanged,
    mobileChanged,
    register
}

export default connect(mapStateToProps, actions)(RegisterScreen);