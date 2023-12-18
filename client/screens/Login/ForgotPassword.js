import {React, useState} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

export default function ForgotPassword({navigation}){
    return (
        <View style={{padding: 100}}>
            <CustomButton title="Back" onPressHandler={()=>navigation.goBack()}/>
        </View>
    );
}