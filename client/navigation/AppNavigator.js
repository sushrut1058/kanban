// AppNavigator.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/User/HomeScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ForgotPassword from '../screens/Login/ForgotPassword';
import OTPScreen from '../screens/Signup/OTPScreen';

const Stack = createNativeStackNavigator();

function AppNavigator(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
