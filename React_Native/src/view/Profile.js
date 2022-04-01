import React from "react";
import { Alert, FlatList, StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_Constants from "../utils/API_Constants";
import CustomFonts from "../utils/CustomFonts";
import { ScrollView } from "react-native-gesture-handler";
import Helper from "../utils/Helper";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userInfo_ValueArray: [] };
        this.state = { userInfo_KeyArray: ['First Name', 'Last Name', 'Password', 'Email', 'Job Title', 'Company', 'City', 'State', 'Country', 'Gender'] };


        this.getUserData();
    }

    componentDidMount() {
        this.getUserData();
    }

    logout(){
        Helper.removeUserLogin(API_Constants.userLoginStatus_Key)
        .then(result => {
            setTimeout(() => {
                console.log('Logout Successfull');
                this.props.navigation.navigate('Login');
            }, 2000)
        }).catch(error => {
            console.log('error',error);
            Alert.alert('Logout failed', error);
        });
    }

    getUserData() {
        try {
            AsyncStorage.getItem(API_Constants.userInfo_Key)
                .then(result => {
                    if ((result != null || result != undefined) && Object.keys(JSON.parse(result)).length > 0) {
                        this.setState({ userInfo_ValueArray: Object.values(JSON.parse(result)) });
                    } else {
                        Alert.alert('User info not found !!', 'Please try again after some time');
                    }
                })
        } catch (error) {
            Alert.alert('User info not found !!', error);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                    <View style={styles.titleView}>
                        <Text style={[styles.title, CustomFonts.Robto_Bold, { fontSize: 30 }]}> Profile </Text>
                    </View>
                    <View style={styles.bodyView}>
                        <FlatList
                            style={{ flexGrow: 0, marginTop: 15, }}
                            data={this.state.userInfo_ValueArray}
                            renderItem={({ item, index }) => (
                                <View style={styles.listView}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[CustomFonts.Robto_Bold, { textAlign: 'left', fontSize: 20, color: '#ffffff', width: 100 }]}>{this.state.userInfo_KeyArray[index]}</Text>
                                        <Text style={[CustomFonts.Robto_Bold, { textAlign: 'left', fontSize: 20, color: '#C0C0C0' }]}>-  {item}</Text>
                                    </View>
                                    <View style={[styles.seperatorView, { height: index == this.state.userInfo_ValueArray.length - 1 ? 0.0 : 0.2 }]}></View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{ height: 0.5, backgroundColor: '#C0C0C0', width: Dimensions.get('window').width - 50 }}></View>
                        <Pressable style={[{ backgroundColor: '#C0C0C0' }, styles.logoutButton]} onPress={this.logout.bind(this)}>
                            <Text style={[CustomFonts.Robto_Bold, styles.logoutText]}>Logout</Text>
                        </Pressable>
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
    titleView: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        height: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
    title: {
        color: '#ffffff',
        textAlign: 'center',
    },
    flatListView: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        backgroundColor: '#2B2B3E',
        borderRadius: 10,
    },
    listView: {
        marginTop: 0,
        height: 50,
        width: Dimensions.get('window').width - 80,
        justifyContent: 'center'
    },
    seperatorView: {
        backgroundColor: '#C0C0C0',
        marginTop: 10,
        width: Dimensions.get('window').width - 40,
    },
    bodyView: {
        alignItems: 'center',
        width: Dimensions.get('window').width - 40,
        flex: 1,
        marginTop: 20,
        backgroundColor: '#2B2B3E',
        borderRadius: 15,
    },
    logoutButton: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 45,
        width: 130,
        borderRadius: 30,
        marginTop: 20,
    },
    logoutText: {
        textAlign: 'center',
        color: '#1C1C29',
        fontSize: 20,
    }
})


export default Profile;