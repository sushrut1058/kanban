
//OTP.js
import {React, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function OTPScreen({navigation}) {

  const [OTP,changeOTP] = useState("")

  context = useContext(AuthContext);
  const {isAuthenticated, userObj, setUserObj, setToken, isLoading} = context;

  useEffect(()=>{
    (isAuthenticated && userObj) ? navigation.navigate("HomeScreen") : console.log("Session vars not set")
  },[])
  return (
    <View style={{padding:100}}>
      <CustomInput text={OTP} changeText={changeOTP} placeholder="OTP" pass={true}/>
      <CustomButton onPressHandler={submitOTP} title="Submit OTP" />
      
      <CustomButton onPressHandler={()=>navigation.goBack()} title="Back" />
      
    </View>
  );
};
