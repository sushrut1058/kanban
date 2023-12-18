//CustomButton.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const CustomButton = ({onPressHandler, title}) => {
    return(
        <Button title={title} onPress={onPressHandler} />
    );
};

export default CustomButton;