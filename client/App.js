// App.js
import React from 'react';
import { useNavigator } from '@react-navigation/native';
import {Text, View} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {AuthContext, AuthProvider} from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};