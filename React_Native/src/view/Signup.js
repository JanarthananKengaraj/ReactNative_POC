import React from "react";
import { View, Pressable, Text, StyleSheet, Dimensions, Image, TextInput, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomFonts from "../utils/CustomFonts";
import SelectDropdown from 'react-native-select-dropdown';
import Helper from "../utils/Helper";
import isEmailValid from "../utils/Helper";
import trim_String from "../utils/Helper";
import valid_String from "../utils/Helper";
import API_Constants from "../utils/API_Constants";
import Api_Handler from "../utils/API_Handler";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { deviceWidth: Dimensions.get('window').width };
        this.state = {
            selectedSegmentIndex: 1,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            jobTitle: '',
            company: '',
            city: '',
            state: '',
            country: '',
            role: '',
            termsAccepted: false,
            tf_Name: 'Name',
        }

        // Bind
        this.textField_OnChange = this.textField_OnChange.bind(this);
    }

    componentDidMount() {
        this.setState({ selectedSegmentIndex: 1 });
        this.setState({ termsAccepted: false });
        this.setState({ role: 'Male' });
    }

    textField_OnChange(key, text) {
        if (Helper.trim_String(text)) {
            if (key == 'First_Name') {
                this.setState({ firstName: text });
            } else if (key == 'Last_Name') {
                this.setState({ lastName: text })
            } else if (key == 'Email') {
                this.setState({ email: text })
            } else if (key == 'Password') {
                this.setState({ password: text })
            } else if (key == 'Confirm_Password') {
                this.setState({ confirmPassword: text })
            } else if (key == 'Job_Title') {
                this.setState({ jobTitle: text })
            } else if (key == 'Company') {
                this.setState({ company: text })
            } else if (key == 'City') {
                this.setState({ city: text })
            } else if (key == 'State') {
                this.setState({ state: text })
            } else if (key == 'Country') {
                this.setState({ country: text })
            }
        }
    }

    signupBtnAction() {
        if (Helper.valid_String(this.state.firstName) == '') {
            Alert.alert('Warning!', 'Please enter your first name');
        } else if (Helper.valid_String(this.state.lastName) == '') {
            Alert.alert('Warning!', 'Please enter your last name');
        } else if (Helper.valid_String(this.state.role) == '') {
            Alert.alert('Warning!', 'Please select your gender');
        } else if ((Helper.valid_String(this.state.email) == '') || (!Helper.isEmailValid(this.state.email))) {
            Alert.alert('Warning!', 'Please enter your valid email');
        } else if (Helper.valid_String(this.state.password) == '') {
            Alert.alert('Warning!', 'Please enter your password');
        } else if (Helper.valid_String(this.state.password).length < 6) {
            Alert.alert('Warning!', 'Password should be greater than 6 characters');
        } else if (Helper.valid_String(this.state.confirmPassword) == '') {
            Alert.alert('Warning!', 'Please enter your confirm password');
        } else if (Helper.valid_String(this.state.confirmPassword) != Helper.valid_String(this.state.password)) {
            Alert.alert('Warning!', "Your confirm password doesn't match with your password");
        } else if (Helper.valid_String(this.state.jobTitle) == '') {
            Alert.alert('Warning!', 'Please enter your job title');
        } else if (Helper.valid_String(this.state.company) == '') {
            Alert.alert('Warning!', 'Please enter your company name');
        } else if (Helper.valid_String(this.state.city) == '') {
            Alert.alert('Warning!', 'Please enter your city name');
        } else if (Helper.valid_String(this.state.state) == '') {
            Alert.alert('Warning!', 'Please enter your state name');
        } else if (Helper.valid_String(this.state.country) == '') {
            Alert.alert('Warning!', 'Please enter your country name');
        } else if (this.state.termsAccepted == false) {
            Alert.alert('Warning!', 'Please accept our terms and condition');
        } else {
            this.callSignupAPI();
        }
    }

    socialSignIn_Btn_Actions() {
        Alert.alert('In-Progress', [{ text: 'Ok' }]);
    }

    callSignupAPI() {
        Api_Handler.getAPI(API_Constants.signup_API, 'GET').then(response => {
            setTimeout(() => {
                this.storeUserData_Locally();
            }, 2000)
        }).catch(error => {
            Alert.alert('Warning!', error);
        });
    }

    storeUserData_Locally() {
        var dict = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            jobTitle: this.state.jobTitle,
            company: this.state.company,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            gender: this.state.role,
        }
        Helper.saveData(API_Constants.userInfo_Key, dict)
            .then(result => {
                setTimeout(() => {
                    Alert.alert('Your account has been registered sucessfully', 'Please login with your valid credentials to enter inside the app',[
                        {text:'Ok', onPress:() => this.props.navigation.replace('Login')}
                    ]);
                }, 2000)
            }).catch(error => {
                Alert.alert('Registration failed', 'Please try again');
            });
    }

    selectGender(value) {
        this.setState({ role: this.state.role == 'Male' ? 'Female' : 'Male' })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView>
                    <View style={styles.view}>
                        <Image
                            source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/logo-white-text.png')}
                            style={styles.image_logo}
                        />
                        <View style={styles.segmentView}>
                            <Pressable style={[{ backgroundColor: this.state.selectedSegmentIndex == 0 ? '#ffffff' : '#2B2B3E' }, styles.segmentButton]} onPress={() => this.props.navigation.replace('Login')}>
                                <Text style={[{ color: this.state.selectedSegmentIndex == 0 ? '#2B2B3E' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Regular]}>Login</Text>
                            </Pressable>
                            <Pressable style={[{
                                backgroundColor: this.state.selectedSegmentIndex == 1 ? '#ffffff' : '#2B2B3E', marginLeft
                                    : 15
                            }, styles.segmentButton]}>
                                <Text style={[{ color: this.state.selectedSegmentIndex == 1 ? '#2B2B3E' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Regular]}>Signup</Text>
                            </Pressable>
                        </View>
                        <View style={styles.inputView}>
                            <Text style={[styles.pageTitle, CustomFonts.Robto_Regular]}>Create Account</Text>
                            <TextInput placeholder='First Name' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('First_Name', text)} value={this.state.firstName} />
                            <TextInput placeholder='Last Name' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Last_Name', text)} value={this.state.lastName} />
                            <View style={styles.genderView}>
                                <Pressable style={[{ backgroundColor: this.state.role == 'Male' ? '#E2E2E2' : '#1C1C29' }, styles.genderButton]} onPress={this.selectGender.bind(this)}>
                                    <Text style={[{ color: this.state.role == 'Male' ? '#1C1C29' : '#E2E2E2' }, styles.segmentButtonText, CustomFonts.Robto_Regular]}>Male</Text>
                                </Pressable>
                                <Pressable style={[{
                                    backgroundColor: this.state.role == 'Female' ? '#E2E2E2' : '#1C1C29', marginLeft: 15
                                }, styles.genderButton]} onPress={this.selectGender.bind(this)}>
                                    <Text style={[{ color: this.state.role == 'Female' ? '#1C1C29' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Regular]}>Female</Text>
                                </Pressable>
                            </View>
                            <TextInput placeholder='Email' keyboardType="email-address" placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Email', text)} value={this.state.email} />
                            <TextInput placeholder='Password' placeholderTextColor="#ffffff95" secureTextEntry={true} style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Password', text)} value={this.state.password} />
                            <TextInput placeholder='Confirm password' placeholderTextColor="#ffffff95" secureTextEntry={true} style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Confirm_Password', text)} value={this.state.confirmPassword} />
                            <TextInput placeholder='Job title' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Job_Title', text)} value={this.state.jobTitle} />
                            <TextInput placeholder='Company' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Company', text)} value={this.state.company} />
                            <TextInput placeholder='City' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('City', text)} value={this.state.city} />
                            <TextInput placeholder='State' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('State', text)} value={this.state.state} />
                            <TextInput placeholder='Country' placeholderTextColor="#ffffff95" style={[{ fontSize: 14 }], CustomFonts.Robto_Regular, styles.textField} onChangeText={(text) => this.textField_OnChange('Country', text)} value={this.state.country} />
                            <View style={styles.terms_View}>
                                <Pressable style={{ height: 28, width: 28, marginLeft: 10 }} onPress={() => this.setState({ termsAccepted: !this.state.termsAccepted })}>
                                    <Image style={{ height: 22, width: 22, marginTop: 15.5 }} source={this.state.termsAccepted ? require('/Users/fssd/Documents/StockLift_RN/Assets/Images/Checked.png') : require('/Users/fssd/Documents/StockLift_RN/Assets/Images/Unchecked.png')} />
                                </Pressable>
                                <Text style={[{ marginLeft: 15, fontSize: 15, color: '#88888B', marginTop: 13.5 }, CustomFonts.Robto_Regular]}>Please accept our Terms & Conditions and Privacy Policy</Text>
                            </View>
                            <View style={styles.signupBtnView}>
                                <Pressable style={styles.signupBtn} onPress={this.signupBtnAction.bind(this)}>
                                    <Text style={[styles.signupBtnText, CustomFonts.Robto_Bold]}>Sign Up</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.continueLblView}>
                            <Text style={[styles.continueLable, CustomFonts.Robto_Regular]}>Or Continue with:</Text>
                        </View>
                        <View style={styles.socialSigninView}>
                            <Pressable style={[styles.socialSigninBtn, { marginRight: 20 }]} onPress={this.socialSignIn_Btn_Actions}>
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
                </ScrollView>
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
        height: 107,
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
        height: 845,
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#2B2B3E',
        borderRadius: 10,
        marginTop: 15,
    },
    pageTitle: {
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center',
        height: 30,
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
    selectroleView: {
        flexDirection: 'row',
        height: 45,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
    },
    selectRoleText: {
        fontSize: 14,
        color: '#ffffff',
        width: 80,
        marginLeft: 20,
    },
    roleSelectionView: {
        backgroundColor: '#1C1C29',
        width: Dimensions.get('window').width - 40 - 20 - 80 - 20, // (PageWidth)-(left&rigth spaces)-(Inner view left and right origin spaces)-(select role text width)-(space),
        borderRadius: 20,
    },
    terms_View: {
        flexDirection: 'row',
        height: 55,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
    },
    signupBtnView: {
        alignItems: 'center',
        height: 40,
        width: Dimensions.get('window').width - 40,
        marginTop: 15
    },
    signupBtn: {
        justifyContent: 'center',
        width: 166,
        backgroundColor: '#25AFF7',
        flex: 1,
        borderRadius: 30,
    },
    signupBtnText: {
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
    genderView: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    genderButton: {
        height: 40,
        width: (Dimensions.get('window').width - 80) / 2, // 20 (Left space) + 20 (Rigth Space) + 15/2 = 7.5(Space between buttons)
        borderRadius: 30.0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    genderButtonText: {
        textAlign: 'center',
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

export default Signup;