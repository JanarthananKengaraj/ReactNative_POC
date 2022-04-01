import React from "react";
import GetLocation from 'react-native-get-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

class Helper extends React.Component {
    constructor(props) {
        super(props);
    }

    static isEmailValid(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log('Valid Email', reg.test(email))
        return reg.test(email);
    }

    static valid_String(string_Val) {
        return ((string_Val == '') || (string_Val == undefined)) ? '' : string_Val
    }

    static trim_String(value) {
        let regSpace = new RegExp(/\s/);
        return !regSpace.test(value);
    }

    static async saveData(key,object){
        try {
            await AsyncStorage.setItem(key,JSON.stringify(object));
            return true
        } catch (error) {
            Alert.alert('Error',error);
            return false
        }
    }

    static getData(key){
        try {
            AsyncStorage.getItem(key)
            .then(result => {
                return JSON.parse(result);
            })
        } catch (error) {
            return null
        }
    }

    static async setUserLogin(login_key){
        try {
            await AsyncStorage.setItem(login_key,'1');
            return true
        } catch (error) {
            return false
        }
    }

    static async removeUserLogin(login_key){
        try {
            await AsyncStorage.removeItem(login_key);
            return true
        } catch (error) {
            return false
        }
    }
    

};

export default (Helper);