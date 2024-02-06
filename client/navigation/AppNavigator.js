// AppNavigator.js
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/User/HomeScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ForgotPassword from '../screens/Login/ForgotPassword';
import OTPScreen from '../screens/Signup/OTPScreen';
import { AuthContext } from '../context/AuthContext';
import BoardWrapper from '../screens/User/board/BoardWrapper';

const Stack = createNativeStackNavigator();

function AppNavigator(){
  const {isAuthenticated, userObj} = useContext(AuthContext);
  console.log("[AppNavigator] ",isAuthenticated);
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
        {
          (!isAuthenticated || !userObj) ?
          <>
          <Stack.Screen name="LoginScreen" component={LoginScreen}/>
          <Stack.Screen name="SignupScreen" component={SignupScreen}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          </>
          :
          <>
          <Stack.Screen name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen name="BoardScreen" component={BoardWrapper}/>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
