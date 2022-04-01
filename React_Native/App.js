/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  View, StyleSheet, State
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_Constants from './src/utils/API_Constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { autoLogin: false };
  }

  componentDidMount() {
    this.checkUserData();
  }

  componentWillUnmount(){
    this.setState({autoLogin:false});
  }

  checkUserData() {
    try {
      AsyncStorage.getItem(API_Constants.userLoginStatus_Key)
        .then(result => {
          let status = ((result != null || result != undefined));
          this.setState({autoLogin:status == true && status == '1'});
        }).catch(error=>{
          this.setState({autoLogin:false});
        })
    } catch (error) {
      this.setState({autoLogin:false});
    }
  }


  render() {
    return (
      <NavigationContainer>
        {/* {this.state.autoLogin ? <TabNavigator /> : <StackNavigator />} */}
        <StackNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#1C1C29',
    flex: 1,
  }
})

export default App;
