import React from "react";
import {View,StyleSheet,Image, Dimensions} from 'react-native';

class Splash extends React.Component{
    constructor(props){
        super(props);
        this.state = { deviceWidth: Dimensions.get('window').width };
        setTimeout(() => {
            this.props.navigation.replace('Login')
        },2000);
    }
    
    render(){
        return(
            <View style={styles.view}>
                <Image 
                source={require('/Users/fssd/Documents/StockLift_RN/Assets/Images/logo-white-text.png')}
                style={styles.image}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1C1C29',
        flex:1,
    },
    image:{
        height:150,
        width:200,
    }
})
export default Splash;