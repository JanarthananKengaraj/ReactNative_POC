/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View, StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/view/Spalsh'
import 'react-native-gesture-handler';
import Login from './src/view/Login';
import Signup from './src/view/Signup';
import TabNavigator from './TabNavigator';


const StackNavigator = () => {

  const RootStack = createStackNavigator();

  const gotTo_RootTab_Screen = () => {
    return (
      <TabNavigator />
    );
  }

  return (
    <RootStack.Navigator>
        <RootStack.Screen name='Splash' component={Splash} options={{
          animationEnabled: false,
          header: () => null
        }} />
        <RootStack.Screen name='Login' component={Login} options={{
          animationEnabled: false,
          header: () => null
        }} />
        <RootStack.Screen name='Signup' component={Signup} options={{
          animationEnabled: false,
          header: () => null
        }} />
        <RootStack.Screen name="gotTo_RootTab_Screen" component={gotTo_RootTab_Screen} options={{ headerShown: false }} />
      </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#1C1C29',
    flex: 1,
  }
})

export default StackNavigator;
