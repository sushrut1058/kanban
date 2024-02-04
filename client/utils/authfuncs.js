import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';

const BASE_URL = "http://192.168.1.5:8000/authlogic/";

export const verifyToken = async () => {
    try {
        const get_url = BASE_URL+"token/verify/";
        const accessToken = await AsyncStorage.getItem("accessToken");
        if(accessToken) {
            const response = await axios.post(get_url,{}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if(response.status === 200){
                const userData = response.data;
                return response.data;
            }else return null;        
        }
    } catch (error) {
        console.log(error.response.data)
        return null;
    }
    return null;
}

export const refresh_Token = async ()=>{
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if(!refreshToken) return null;
    const get_url = BASE_URL+"token/refresh/";
    const response = await axios.post(get_url,{
            refresh: refreshToken
        },
        {
        headers: {
            'Content-Type':'application/json'
        },
    })

    if(!response) throw new Error('Couldnt generate access token through refresh');
       
    AsyncStorage.setItem('accessToken',response.data.access);

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