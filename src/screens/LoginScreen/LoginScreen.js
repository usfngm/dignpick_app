import React, { Component } from 'react';
import {
    Text,
    View,
    StatusBar,
    ImageBackground,
    Image,
    TouchableHighlight,
    TextInput,
    Platform,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    PermissionsAndroid
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    loginUser,
    loginUserViaFacebook
} from '../../reducers/Auth/Actions';
import { changeAppRoot } from '../../reducers/App/Actions';
import {
    DASHBOARD_PAGE,
} from '../../reducers/App/PagesTypes';
import { requestLocationPermission } from '../../common';

async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Cool Photo App Camera Permission',
                'message': 'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
        } else {
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldFocusPassword: false
        };
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', false);
        StatusBar.setHidden(true);
        requestLocationPermission();
    }



    registerPage() {
        this.props.navigator.push({
            screen: 'registerScreen', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                drawUnderNavBar: true,
                navBarTransparent: true,
                navBarTranslucent: Platform.OS === 'ios',
            },
        });
    }

    facebookLogin() {
        this.props.loginUserViaFacebook();
    }

    gplusLogin() {

    }

    twitterLogin() {

    }

    onLoginSubmit() {
        console.log('email = ' + this.props.email);
        this.props.loginUser(this.props);
        //this.props.changeAppRoot('after-login');
    }

    onUsernameChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
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

    renderLoadingOverlay() {
        if (this.props.isLoading) {
            return (
                <View style={this.loadingStyler()}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Signing in</Text>
                </View>
            );
        }
    }

    renderKeyboardSpacer() {
        if (Platform.OS == 'ios') {
            return (
                <KeyboardSpacer />
            );
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('./imgs/login_bg.png')}
                style={styles.bgImage}
            >
                <View>
                    <ScrollView>
                        <View>
                            <View style={styles.container}>
                                <View style={styles.titleContainer}>
                                    <Image
                                        source={require('./imgs/dignpick.png')}
                                        resizeMode={'contain'}
                                        style={styles.appTitle}
                                    />
                                </View>

                                <View style={styles.loginFormContainer}>
                                    <View
                                        style={{
                                            alignSelf: 'stretch'
                                        }}
                                    >
                                        <TextInput
                                            placeholder='Username'
                                            keyboardType='email-address'
                                            autoCorrect={false}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            onChangeText={this.onUsernameChange.bind(this)}
                                            returnKeyType='next'
                                            value={this.props.email}
                                            style={styles.inputStyle}
                                        />
                                        <TextInput
                                            placeholder='Password'
                                            autoCorrect={false}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            returnKeyType="go"
                                            secureTextEntry
                                            onSubmitEditing={this.onLoginSubmit.bind(this)}
                                            onChangeText={this.onPasswordChange.bind(this)}
                                            style={styles.inputStyle}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                color: '#aeaeae',
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                fontSize: 22,
                                                marginBottom: 10
                                            }}
                                        >
                                            Or
                            </Text>
                                    </View>
                                    <View style={styles.socialbarStyle}>
                                        <TouchableHighlight
                                            style={[styles.socialBarItem, styles.twitterbarStyle]}
                                            underlayColor={'#099adc88'}
                                            onPress={() => this.twitterLogin()}
                                        >
                                            <Image
                                                source={require('./imgs/twitter_logo.png')}
                                                resizeMode={'contain'}
                                                style={{
                                                    flex: 1,
                                                    height: 30,
                                                    width: 30,
                                                }}
                                            />
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            style={[styles.socialBarItem, styles.gplusbarStyle]}
                                            underlayColor={'#c14f3d88'}
                                            onPress={() => this.gplusLogin()}
                                        >
                                            <Image
                                                source={require('./imgs/gplus_logo.png')}
                                                resizeMode={'contain'}
                                                style={{
                                                    flex: 1,
                                                    height: 30,
                                                    width: 30,
                                                }}
                                            />
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            style={[styles.socialBarItem, styles.facebookbarStyle]}
                                            underlayColor={'#44408888'}
                                            onPress={() => this.facebookLogin()}
                                        >
                                            <Image
                                                source={require('./imgs/fb_logo.png')}
                                                resizeMode={'contain'}
                                                style={{
                                                    flex: 1,
                                                    height: 30,
                                                    width: 30,
                                                }}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                [styles.text, {
                                                    marginTop: 40,
                                                    fontSize: 13
                                                }]
                                            }
                                        >
                                            Don't you have an account?
                        <Text style={{ color: '#00e7ff' }} onPress={() => this.registerPage()}>
                                                {' Register here'}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {this.renderKeyboardSpacer()}
                        </View>
                    </ScrollView>
                    {this.renderLoadingOverlay()}
                </View>
            </ImageBackground>


        );
    }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    titleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 200,
        justifyContent: 'center',
        flex: 1,
    },
    socialbarStyle: {
        flexDirection: 'row',
        height: 55,
        marginLeft: 20,
        marginRight: 20,
    },
    twitterbarStyle: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#099adcCC'
    },
    gplusbarStyle: {
        backgroundColor: '#c14f3dCC'
    },
    facebookbarStyle: {
        backgroundColor: '#444088CC',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    socialBarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 1,
        marginLeft: 1,
    },
    loginFormContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingLeft: 25,
        paddingRight: 25,
        flex: 5,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bgImage: {
        flex: 1,
        width: null,
        height: null,
    },
    appTitle: {
        width: '80%'
    },
    text: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontSize: 18,
    },
    loginFormText: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        marginBottom: 20,
        fontSize: 30,
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
        alignSelf: 'stretch'
    },
    loadingContainer: {
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 99,
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    loadingText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10,
    }
};

const mapStateToProps = state => {
    console.log(state);
    return {
        email: state.auth.email,
        password: state.auth.password,
        isLoading: state.auth.isLoading
    };
};

const actions = {
    emailChanged,
    passwordChanged,
    loginUser,
    changeAppRoot,
    loginUserViaFacebook
};
export default connect(mapStateToProps, actions)(LoginScreen);
