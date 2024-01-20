import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';

const BASE_URL = "http://192.168.1.5:8000/authlogic/";

export const verifyToken = async () => {
    try {
        const get_url = BASE_URL+"verifyToken";
        const token = await AsyncStorage.getItem("token");
        if(token!==null) {
            const response = await axios.get(get_url, {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':'JWT ${token}'
                }
            });

            if(response.status === 200){
                return userData;
            }        
        }
    } catch (error) {
        console.log(error)
        return null;
    }
    return null;
}

export const handleSignup = async (userData) => {
    
    return await axios.post(BASE_URL+"signup/",userData,
    {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const login = async (email, password) => {
    return axios.post(BASE_URL+"login/",
    {
        "Email": email,
        "password": password
    },
    {
        headers: { 'Content-Type':'application/json' }
    });
}