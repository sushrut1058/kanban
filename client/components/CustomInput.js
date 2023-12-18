//CustomText.js
import React from 'react';
import { TextInput } from 'react-native';

const CustomInput = ({text, changeText,placeholder, pass=false}) => {
    return(
        <TextInput value={text} onChangeText={changeText} placeholder={placeholder} secureTextEntry={pass}/>
    );
};

export default CustomInput;