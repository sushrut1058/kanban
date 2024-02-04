// src/services/boardService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://192.168.1.5:8000/actions/board/";

const getAuthToken = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    return accessToken ? `Bearer ${accessToken}` : '';
};

export const getBoard = async (boardId) => {
    try {
        const token = await getAuthToken();
        const response = await axios.get(`${API_BASE_URL}boards/${boardId}/`, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching board:', error);
        throw error;
    }
};

export const updateBoard = async (boardId, boardData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.put(`${API_BASE_URL}boards/${boardId}/`, boardData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating board:', error);
        throw error;
    }
};

export const deleteBoard = async (boardId) => {
    try {
        const token = await getAuthToken();
        await axios.delete(`${API_BASE_URL}boards/${boardId}/`, {
            headers: {
                'Authorization': token
            }
        });
    } catch (error) {
        console.error('Error deleting board:', error);
        throw error;
    }
};
