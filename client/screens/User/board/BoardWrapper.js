//HomeScreen.js
import {React, useContext, useState, useRef} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet,PanResponder, Animated, FlatList, Dimensions  } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import { AuthContext } from '../../../context/AuthContext';
import {Board} from './Board'


const BoardWrapper = () => {

  const {isAuthenticated, setAuthenticated, userObj, setUserObj, logout} = useContext(AuthContext);  

  const [tasks, setTasks] = useState([
    {key:1, title: '1', status: 'todo', points:3 },
    {key:2, title: '2', status: 'in_progress', points:4 },
    {key:3, title: '3', status: 'todo', points:1 },
    {key:4, title: '4', status: 'blocked', points:5}
  ]);

  const [desc, setDesc] = useState([
    {key:1, desc:"1st task"},
    {key:2, desc:"2nd task"},
    {key:3, desc:"3rd task"},
    {key:4, desc:"4th task"}
  ])

  
  return (
        <Board tasks={tasks} setTasks={setTasks} desc={desc} setDesc={setDesc}/>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  board: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  column: {
      flex: 1,
      padding: 10,
  },
  columnHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  taskList: {
      flexGrow: 0, // Prevents FlatList from setting flex: 1
  },
  taskCard: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 5,
      // marginBottom: 10,
  },
  taskText: {
      fontSize: 16,
  },
  // ... other styles ...
});


export default BoardWrapper;