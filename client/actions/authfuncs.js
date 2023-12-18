import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const BASE_URL = "http://192.168.1.5:8000/authlogic/";

export const signup = async ({navigation}, userData) => {
    try{
        const post_url = BASE_URL+"signup/"
        const response = await axios.post(post_url,userData,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userId', response.data.id);
        redir({navigation,response});
        console.log(response.data);
    } catch (error){
        console.error(error);
        throw error;
    }
}

export const redir = async ({navigation,response}) => {
    console.log("redirecting");
    const token = response.data["token"];
    AsyncStorage.setItem("authToken", token);
    navigation.navigate('HomeScreen');
    console.log("redirected");
}