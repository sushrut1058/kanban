//HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const HomeScreen = ({navigation}) => {

  const redir_signup = ()=>{
    navigation.navigate('SignupScreen');
  }
  const redir_login = ()=>{
    navigation.navigate('LoginScreen');
  }
  

  return (
    <View style={{padding:100}}>
      <Text>Home Screen</Text>
      <CustomButton onPressHandler={redir_signup} title="Sign Up"/>
      <CustomButton onPressHandler={redir_login} title="Login"/>
    </View>
  );
};

export default HomeScreen;