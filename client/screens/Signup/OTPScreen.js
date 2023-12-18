
//OTP.js
import {React, useState} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function OTPScreen({navigation}) {

  const [OTP,changeOTP] = useState("")
  
  return (
    <View style={{padding:100}}>
      <CustomInput text={OTP} changeText={changeOTP} placeholder="OTP" pass={true}/>
      <CustomButton onPressHandler={submitOTP} title="Submit OTP" />
      
      <CustomButton onPressHandler={()=>navigation.goBack()} title="Back" />
      
    </View>
  );
};
