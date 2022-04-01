import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { exp } from "react-native/Libraries/Animated/Easing";
import { StyleSheet, View, Dimensions, Pressable, Image, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { location: null };

        // Bind
        this.requestLocation = this.requestLocation.bind(this);
    }

    componentDidMount() {
        this.setState({location: null});
        this.requestLocation();
    }

    requestLocation() {
        this.setState({ location: null });
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150000,
        })
            .then(location => {
                if (location == null){this.currentLocation_Validation(null)};
                this.setState({
                    location: location,
                });
            })
            .catch(ex => {
                const { code, message } = ex;
                // console.warn(code, message);
                console.log('Jana',code,message);
                this.currentLocation_Validation(code);
            });
    };


    currentLocation_Validation(code){
        if (code === 'CANCELLED') {
            Alert.alert('Location cancelled by user or by another request','Please check your location settings ?',[
                {text:'Ok', onPress: this.goToAppSettings},
                {text:'Cancel'}
            ]);
        }else if (code === 'TIMEOUT') {
            Alert.alert('Location request timed out','Please try again');
        }else if (code === 'UNAUTHORIZED') {
            Alert.alert('Authorization denied','Please enable your location on settings',[
                {text:'Ok', onPress: this.goToAppSettings},
                {text:'Cancel'}
            ]);
        }else if (code === 'UNAVAILABLE' || code == null) {
            Alert.alert('Location service is disabled or unavailable','Please check your location settings ?',[
                {text:'Ok', onPress: this.goToAppSettings},
                {text:'Cancel'}
            ]);
        }
        this.setState({
            location: null,
        });
    }

    goToAppSettings(){
        GetLocation.openAppSettings();
    }

    render() {
        return (
            <View style={styles.view}>
                <MapView
                showsUserLocation={this.state.location != null}
                    provider={PROVIDER_GOOGLE}
                    style={styles.view}
                    region={{
                        latitude: this.state.location == null ? 9.9252 : this.state.location['latitude'],
                        longitude: this.state.location == null ? 78.1198 : this.state.location['longitude'],
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Pressable style={styles.buttonView} onPress={this.requestLocation}>
                        <Image source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/CurrentLocation.png')} style={styles.locationIcon} resizeMode="stretch" />
                    </Pressable>
                </MapView>
            </View>
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
        height: '100%',
        width: '100%',
    },
    buttonView: {
        height: 42,
        width: 42,
        backgroundColor:'rgba(0,0,0,0.3)',
        marginTop: Dimensions.get('window').height - 180,
        marginLeft: Dimensions.get('window').width - 68,
        borderRadius: 21,
        borderColor: '#1C1C29',
        borderWidth: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationIcon: {
        height: 25,
        width: 20,
    }
})
export default Map;