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
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    nameChanged,
    cityChanged,
    mobileChanged,
    editProfile
} from '../../reducers/Register/Actions';


var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class EditProfileScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigatorStyle = {
        drawUnderTabBar: true,
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

    onEditSubmit() {
        var user = this.props.user;
        user.name = this.props.name;
        user.mobile = this.props.mobile;
        user.city = this.props.city;
        this.props.editProfile(user, this.props.navigator);
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

    componentWillMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent)
    }

    componentDidMount() {
        this.props.nameChanged(this.props.user.name);
        this.props.cityChanged(this.props.user.city);
        this.props.mobileChanged(this.props.user.mobile);
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
            console.log("EDIT PROFILE APPEARED");
            this.props.navigator.toggleTabs({
                to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../LoginScreen/imgs/login_bg.png')}
                style={styles.bgImage}
            >
                <ScrollView>
                    <Text style={styles.title}>Edit Profile</Text>
                    <Text style={styles.fieldTitle}>Email</Text>
                    <TextInput
                        value={this.props.user.email}
                        autoCorrect={false}
                        onChangeText={this.onUsernameChange.bind(this)}
                        returnKeyType='next'
                        style={[styles.inputStyle, { color: 'gray' }]}
                        editable={false}
                    />
                    <Text style={styles.fieldTitle}>Full Name</Text>
                    <TextInput
                        placeholder='(ex: John Doe)'
                        value={this.props.name}
                        autoCorrect={false}
                        onChangeText={this.onNameChange.bind(this)}
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
                        style={[styles.reserveBtnContainer, { marginBottom: 20 }]}
                        underlayColor={'#0185be'}
                        onPress={this.onEditSubmit.bind(this)}
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
                                Update Info
                        </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={[styles.cancelBtnContainer, { marginTop: 0 }]}
                        underlayColor={'#aa0000'}
                        onPress={() => {
                            this.props.navigator.pop();
                        }}
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
                                Cancel
                        </Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
                <View style={this.loadingStyler()}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Updating your account...</Text>
                </View>
            </ImageBackground>
        )
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
    cancelBtnContainer: {
        alignSelf: 'center',
        backgroundColor: 'red',
        marginTop: 25,
        marginBottom: 30,
        padding: 15,
        borderWidth: 1,
        borderColor: 'red',
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
        user: state.auth.user,
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
    editProfile
}

export default connect(mapStateToProps, actions)(EditProfileScreen);