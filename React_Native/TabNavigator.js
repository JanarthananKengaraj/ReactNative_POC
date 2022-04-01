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
import Map from './src/view/Map';
import Home from './src/view/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome5IconProps } from 'react-native-vector-icons/FontAwesome5';
import { back } from 'react-native/Libraries/Animated/Easing';
import Profile from './src/view/Profile';


const icon = <FontAwesome5 name={'comments'} />;

const TabNavigator = () => {

  const RootTab = createBottomTabNavigator();

  return (
    <RootTab.Navigator
    screenOptions={({route})=>({
      tabBarStyle:{backgroundColor:'#2A2B3F'},
      tabBarShowLabel:false,
      tabBarIcon: ({focused,size,color}) =>{
        let iconName = (route.name == 'Home') ? 'home' : (route.name == 'Map') ? 'globe-americas' : (route.name == 'Profile') ? 'user-alt' : ''
        size = focused ? 26 : 20
        color = focused ? '#ffffff' : '#C0C0C0'
        return(
          <FontAwesome5Icon name={iconName} size={size} color={color}/>
        )
      }
    })}
    >
      <RootTab.Screen name='Home' component={Home} options={{
        animationEnabled: false,
        header: () => null
      }} />
      <RootTab.Screen name='Map' component={Map} options={{
        animationEnabled: false,
        header: () => null
      }} />
      <RootTab.Screen name='Profile' component={Profile} options={{
        animationEnabled: false,
        header: () => null
      }} />
    </RootTab.Navigator>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#1C1C29',
    flex: 1,
  }
})

export default TabNavigator;
