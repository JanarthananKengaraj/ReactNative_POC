import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";
import { exp } from "react-native/Libraries/Animated/Easing";
import { StyleSheet, View, Text, Image, Dimensions, Pressable, FlatList, ActivityIndicator } from 'react-native';
import CustomFonts from "../utils/CustomFonts";
import Api_Handler from "../utils/API_Handler";
import getTeamList from "../utils/API_Handler";
import API_Constants from "../utils/API_Constants";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { selectedSegmentIndex: 0 };
        this.state = { teamList_Data: null };
        this.state = { api: '' };
        this.state = { loadedAPI: false };

        this.getSelectedTeamList = this.getSelectedTeamList.bind(this)
    }

    componentDidMount() {
        this.setState({selectedSegmentIndex: 0 });
        this.getiPhoneTeamList();
    }

    getTeamList(index,api) {
        Api_Handler.getAPI(api, 'GET').then(response => {
            setTimeout(() => {
                this.setState({
                    teamList_Data: response,
                    loadedAPI: true,
                    selectedSegmentIndex:index,
                })
            }, 2000)
        }).catch(error => {
                this.setState({
                    teamList_Data: null,
                    loadedAPI: true,
                })
            });
    }


    getSelectedTeamList(index){
        this.setState({teamList_Data: null});
        this.setState({loadedAPI: false});
        let api = index == 0 ? API_Constants.iPhoneTeam_List_API : API_Constants.androidTeam_List_API
        this.getTeamList(index,api);
    }

    getiPhoneTeamList() {
        this.getSelectedTeamList(0);
        
    }

    getAndroidTeamList() {
        this.getSelectedTeamList(1);    
    }

    render() {
        return (
            <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.safeAreaView}>
                <View style={styles.activityIndicator_Style}>
                    <ActivityIndicator size="large" color="#ffffff" animating={!this.state.loadedAPI} hidesWhenStopped={true} />
                </View>
                <View style={styles.view}>
                    <View style={styles.headerView}>
                        <Text style={[{ textAlign: 'left', fontSize: 20, fontFamily: '.../Assets/Fonts/Roboto/Roboto-Bold' }, styles.title]}>Hi, Welcome to React Native App</Text>
                        <Image style={styles.profileImage} source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/EmptyUserProfileImage.png')} resizeMode="stretch" />
                    </View>
                    <View style={styles.segmentView}>
                        <Pressable style={[{ backgroundColor: this.state.selectedSegmentIndex == 0 ? '#ffffff' : '#2B2B3E' }, styles.segmentButton]} onPress={this.getiPhoneTeamList.bind(this)}>
                            <Text style={[{ color: this.state.selectedSegmentIndex == 0 ? '#2B2B3E' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Bold]}>iPhone</Text>
                        </Pressable>
                        <Pressable style={[{
                            backgroundColor: this.state.selectedSegmentIndex == 1 ? '#ffffff' : '#2B2B3E', marginLeft
                                : 15
                        }, styles.segmentButton]} onPress={this.getAndroidTeamList.bind(this)}>
                            <Text style={[{ color: this.state.selectedSegmentIndex == 1 ? '#2B2B3E' : '#ffffff' }, styles.segmentButtonText, CustomFonts.Robto_Bold]}>Andriod</Text>
                        </Pressable>
                    </View>
                    <FlatList
                        style={{ flexGrow: 0, marginTop: 15, }}
                        data={this.state.teamList_Data}
                        renderItem={({ item }) => (
                            <View style={styles.listView}>
                                <View style={styles.listHeaderView}>
                                    <Image style={styles.listProfileImage} source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/EmptyUserProfileImage.png')} resizeMode="stretch" />
                                    <Text style={[{ fontFamily: '.../Assets/Fonts/Roboto/Roboto-Bold', textAlign: 'left', alignItems: 'center' }, styles.listUserName]}>{item['name']}</Text>
                                </View>
                                <View style={styles.listBodyView}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.bodyTitle, CustomFonts.Robto_Regular, { textAlign: 'left', fontSize: 15 }]}>Gender</Text>
                                        <Text style={[styles.description, CustomFonts.Robto_Regular, { textAlign: 'left', fontSize: 15 }]}>-  {item.gender}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.bodyTitle, CustomFonts.Robto_Regular, { textAlign: 'left', fontSize: 15 }]}>City</Text>
                                        <Text style={[styles.description, CustomFonts.Robto_Regular, { textAlign: 'left', fontSize: 15 }]}>-  {item.city}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.bodyTitle, CustomFonts.Robto_Regular, { textAlign: 'left', fontSize: 15 }]}>About</Text>
                                        <Text style={[styles.description, CustomFonts.Robto_Regular, { textAlign: 'left', fontSize: 15 }]} numberOfLines={2}>-  {item.About}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
    headerView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        width: Dimensions.get('window').width - 20,
        height: 50,
    },
    title: {
        color: '#ffffff',
        marginLeft: 10,
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginRight: 10,
        marginLeft: 40,
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
        alignItems: 'center',
    },
    segmentButtonText: {
        textAlign: 'center',
    },
    listView: {
        height: 200,
        width: Dimensions.get('window').width - 40,
        backgroundColor: '#2B2B3E',
        borderRadius: 10,
        marginTop: 15,
    },
    listHeaderView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    listProfileImage: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        marginLeft: 10,
    },
    listUserName: {
        fontSize: 21,
        color: '#ffffff',
        marginLeft: 15,
        width: Dimensions.get('window').width - 40 - 10 - 40 - 15 - 10, // 40 = Left & Right origin space & 10 profile image left space & 40 profile image width & 15 name left space & 10 name right side space
    },
    listBodyView: {
        backgroundColor: '#404151',
        height: 110,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    bodyTitle: {
        marginTop: 10,
        marginLeft: 10,
        width: 50,
        color: '#ffffff'
    },
    description: {
        marginTop: 10,
        marginLeft: 10,
        color: '#ffffff',
        width: Dimensions.get('window').width - 40 - 20 - 20 - 70
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
export default Home;