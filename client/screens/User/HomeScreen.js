//HomeScreen.js
import {React, useContext, useState} from 'react';
import { View, Text, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = ({navigation}) => {

  const {isAuthenticated, setAuthenticated, userObj, setUserObj, logout} = useContext(AuthContext);

  const redir_signup = ()=>{
    navigation.navigate('SignupScreen');
  }
  const redir_login = ()=>{
    navigation.navigate('LoginScreen');
  }
  

  return (
    <View style={{padding:100}}>
      <Text>Home Screen</Text>
      <CustomButton onPressHandler={logout} title="Logout"/>
    </View>
  );
};

export default HomeScreen;