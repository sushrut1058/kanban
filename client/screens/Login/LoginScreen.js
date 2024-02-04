
//LoginScreen.js
import {React, useEffect,useContext, useState} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../User/HomeScreen';
import {login} from '../../utils/authfuncs';


export default function LoginScreen() {

  const {setAuthenticated, isAuthenticated, userObj, setUserObj, isLoading} = useContext(AuthContext);
  const navigation = useNavigation();
  const [email,changeEmail] = useState("")
  const [password,changePassword] = useState("")

  const onPressLogin = async () => {
    try{
      response = await login(email, password);
      
      console.log(response);
      if(!response){
        throw new Error('Failed to login');
      }

      // const data = await response.json();

      AsyncStorage.setItem('accessToken', response.data.access);
      AsyncStorage.setItem('refreshToken', response.data.refresh);
      setUserObj(response.data.user);
      setAuthenticated(true);
      navigation.navigate(HomeScreen);
      

      // if(response && response.data.token){
      //   await AsyncStorage.setItem('token', response.data.token);
      //   setAuthenticated(true);
      //   setUserObj(response.data.token);
      //   navigation.navigate(HomeScreen);
      // }
    }catch(e){
      console.log(e);
    }
  }
  
  return (
    (!isAuthenticated || !userObj) ?
    <>
      <View style={{padding:100}}>
        <CustomInput text={email} changeText={changeEmail} placeholder={"Email"} />
        <CustomInput text={password} changeText={changePassword} placeholder="Password" pass={true}/>
        <CustomButton onPressHandler={onPressLogin} title="Login" />
        <CustomButton onPressHandler={()=>navigation.navigate("ForgotPassword")} title="Forgot password?" />
        <CustomButton onPressHandler={()=>navigation.goBack()} title="Back" />
        <CustomButton onPressHandler={()=>navigation.navigate('SignupScreen')} title="Sign Up"/>
        <CustomButton onPressHandler={()=>navigation.navigate('HomeScreen')} title="Home"/>
      </View>
    </>
    :
    navigation.navigate("HomeScreen")
  );
};
