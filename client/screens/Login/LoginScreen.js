
//LoginScreen.js
import {React, useState} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function LoginScreen({navigation}) {

  const redir_signup = ()=>{
    navigation.navigate('SignupScreen');
  }
  const redir_home = ()=>{
    navigation.navigate('HomeScreen');
  }
  const login = () => {
    console.log("login pressed");
  }
  const forgot_password = () => {
    navigation.navigate("ForgotPassword");
  }
  const [email,changeEmail] = useState("")
  const [password,changePassword] = useState("")
  return (
    <View style={{padding:100}}>
      <CustomInput text={email} changeText={changeEmail} placeholder={"Email"} />
      <CustomInput text={password} changeText={changePassword} placeholder="Password" pass={true}/>
      <CustomButton onPressHandler={login} title="Login" />
      <CustomButton onPressHandler={forgot_password} title="Forgot password?" />
      <CustomButton onPressHandler={()=>navigation.goBack()} title="Back" />
      <CustomButton onPressHandler={redir_signup} title="Sign Up"/>
      <CustomButton onPressHandler={redir_home} title="Home"/>
    </View>
  );
};
