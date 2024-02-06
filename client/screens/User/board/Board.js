//BoardWrapper.js
import {useMemo, React, useContext, useState, useRef, useEffect} from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet,PanResponder, Animated, TextInput,FlatList, Dimensions  } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { AuthContext } from '../../../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragDrop } from '../../../components/DragDrop';
import { getBoard, updateBoard, createBoard, deleteBoard } from '../../../utils/boardServices';
import BottomSheet from '@gorhom/bottom-sheet';

const BoardWrapper = ({route, navigation}) => {
  
}