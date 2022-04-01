import React from "react";
import { StyleSheet, Dimensions, Image, View, Text, Pressable, Alert } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFonts from "../utils/CustomFonts";
import Helper from "../utils/Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_Constants from "../utils/API_Constants";
import { ActivityIndicator } from "react-native";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { deviceWidth: Dimensions.get('window').width };
        this.state = {
            selectedSegmentIndex: 0,
            email: "",
            password: "",
            boolValue: true,
        }
        //Binding
        this.validateTF = this.validateTF.bind(this);
    }



    componentDidMount() {
        this.setState({ selectedSegmentIndex: 0 });
    }

    validateTF(key, text) {
        if (Helper.trim_String(text)) {
            if (key == 'Email') {
                this.setState({
                    email: text
                })
            } else if (key == 'Password') {
                this.setState({
                    password: text
                })
            }
        }
    }

    loginButtonAction() {
        if (this.state.email == '' || this.state.email == undefined || !Helper.isEmailValid(this.state.email)) {
            Alert.alert('Enter valid email')
        } else if (this.state.password == '' || this.state.password === undefined) {
            Alert.alert('Enter your password')
        } else {
            this.loginAction();
        }
    }

    check_userData(userData) {
        console.log(userData);
        if ((userData != null || userData != undefined) && Object.keys(userData).length > 0) {
            if (userData.email != this.state.email) {
                Alert.alert('Warning', 'Please enter your registered email')
            } else if (userData.password != this.state.password) {
                Alert.alert('Warning', 'Please enter your valid password for this email id')
            } else {
                this.setUserLogin();
            }
        } else {
            Alert.alert('Please complete registration befor login', 'Go to signup screen ?', [
                { text: 'Yes', onPress: () => this.props.navigation.replace('Signup') },
                { text: 'No' },
            ])
        }
    }

    loginAction() {
        try {
            AsyncStorage.getItem(API_Constants.userInfo_Key)
                .then(result => {
                    this.check_userData(result != null ? JSON.parse(result) : null);
                })
        } catch (error) {
            this.check_userData(null);
        }
    }

    setUserLogin() {
        Helper.setUserLogin(API_Constants.userLoginStatus_Key)
            .then(result => {
                setTimeout(() => {
                    console.log('loginStatus Successfull');
                    this.props.navigation.replace('gotTo_RootTab_Screen');
                }, 2000)
            }).catch(error => {
                console.log('error', error);
                Alert.alert('Login failed', error);
            });
    }

    socialSignIn_Btn_Actions() {
        Alert.alert('In-Progress', [{ text: 'Ok' }]);
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.view}>
                    <Image
                        source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/logo-white-text.png')}
                        style={styles.image_logo}
                    />
                    <View style={styles.segmentView}>
                        <Pressable style={[{ backgroundColor: this.state.selectedSegmentIndex == 0 ? '#ffffff' : '#2B2B3E' }, styles.segmentButton]}>
                            <Text style={[{ color: this.state.selectedSegmentIndex == 0 ? '#2B2B3E' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Regular]}>Login</Text>
                        </Pressable>
                        <Pressable style={[{
                            backgroundColor: this.state.selectedSegmentIndex == 1 ? '#ffffff' : '#2B2B3E', marginLeft
                                : 15
                        }, styles.segmentButton]} onPress={() => this.props.navigation.replace('Signup')}>
                            <Text style={[{ color: this.state.selectedSegmentIndex == 1 ? '#2B2B3E' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Regular]}>Signup</Text>
                        </Pressable>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={[{ fontSize: 22, color: '#ffffff', textAlign: 'center', height: 30, marginTop: 15, }, CustomFonts.Robto_Regular]}>Log In</Text>
                        <TextInput placeholder='Email' placeholderTextColor="#ffffff95" keyboardType="email-address" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={text => this.validateTF('Email', text)} value={this.state.email} />
                        <TextInput placeholder='Password' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.validateTF('Password', text)} value={this.state.password} />
                        <View style={styles.forgotPasswordView}>
                            <Pressable style={styles.forgotPasswordButton}>
                                <Text style={[styles.forgotPasswordText, CustomFonts.Robto_Regular]}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                        <View style={styles.loginBtnView}>
                            <Pressable style={styles.loginBtn} onPress={this.loginButtonAction.bind(this)}>
                                <Text style={[styles.loginBtnText, CustomFonts.Robto_Bold]}>Log In</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.continueLblView}>
                        <Text style={[styles.continueLable, CustomFonts.Robto_Regular]}>Or Continue with:</Text>
                    </View>
                    <View style={styles.socialSigninView}>
                        <Pressable style={[styles.socialSigninBtn, { marginRight: 20 }]} onPress={this.socialSignIn_Btn_Actions.bind(this)}>
                            <Image
                                source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/apple.png')}
                                style={styles.socialSiginImage}
                                resizeMode="stretch"
                            />
                        </Pressable>
                        <Pressable style={[styles.socialSigninBtn, { marginRight: 20 }]} onPress={this.socialSignIn_Btn_Actions}>
                            <Image
                                source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/facebook.png')}
                                style={styles.socialSiginImage}
                                resizeMode="stretch"
                            />
                        </Pressable>
                        <Pressable style={[styles.socialSigninBtn, { marginRight: 20 }]} onPress={this.socialSignIn_Btn_Actions}>
                            <Image
                                source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/google.png')}
                                style={styles.socialSiginImage}
                                resizeMode="stretch"
                            />
                        </Pressable>
                        <Pressable style={styles.socialSigninBtn} onPress={this.socialSignIn_Btn_Actions}>
                            <Image
                                source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/linkedin.png')}
                                style={styles.socialSiginImage}
                                resizeMode="stretch"
                            />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        alignItems: 'center',
        backgroundColor: '#1C1C29',
        flex: 1,
    },
    view: {
        backgroundColor: '#1C1C29',
        alignItems: 'center',
    },
    image_logo: {
        height: 110,
        width: 150,
        marginTop: 15,
    },
    segmentView: {
        flexDirection: 'row',
        marginTop: 30,
    },
    segmentButton: {
        height: 45,
        width: (Dimensions.get('window').width - 47.5) / 2, // 20 (Left space) + 20 (Rigth Space) + 15/2 = 7.5(Space between buttons)
        borderRadius: 30.0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    segmentButtonText: {
        textAlign: 'center',
    },
    inputView: {
        height: 280,
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#2B2B3E',
        borderRadius: 10,
        marginTop: 15,
    },
    textField: {
        height: 45,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        borderRadius: 30,
        backgroundColor: '#1C1C29',
        color: '#ffffff',
        paddingLeft: 15,
    },
    forgotPasswordText: {
        color: '#E7C528',
        fontSize: 17,
        textAlign: 'center',
    },
    forgotPasswordButton: {
        width: 180,
        flex: 1,
    },
    forgotPasswordView: {
        alignItems: 'center',
        height: 35,
        width: Dimensions.get('window').width - 40,
        marginTop: 15,
    },
    loginBtnView: {
        alignItems: 'center',
        height: 40,
        width: Dimensions.get('window').width - 40,
        marginTop: 5
    },
    loginBtn: {
        justifyContent: 'center',
        width: 166,
        backgroundColor: '#25AFF7',
        flex: 1,
        borderRadius: 30,
    },
    loginBtnText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    continueLblView: {
        marginTop: 15,
        height: 21,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueLable: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
    },
    socialSigninView: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    socialSigninBtn: {
        height: 60,
        width: 60,
    },
    socialSiginImage: {
        height: 55,
        width: 55,
    },
    activityIndicator_Style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login;