//HomeScreen.js
import {React, useContext, useState, useRef} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet,PanResponder, Animated, FlatList, Dimensions  } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragDrop } from '../../components/DragDrop';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';



const HomeScreen = ({navigation}) => {

  const {isAuthenticated, setAuthenticated, userObj, setUserObj, logout} = useContext(AuthContext);  

  const [tasks, setTasks] = useState([
    {key:1, title: '1', status: 'todo' },
    {key:2, title: '2', status: 'in_progress' },
    {key:3, title: '3', status: 'todo' },
    {key:4, title: '4', status: 'blocked'}
  ]);

  const [dropCounter, setDropCounter] = useState(0);
    
  const COLUMN_STATUS = ['todo', 'in_progress', 'blocked', 'done'];

  const handleDrop = (taskId, {x, y}) => {
    // Logic to determine the new status of the task based on the drop coordinates (x, y)
    // This is a simplified example, you'll need to adjust it based on your layout
    // // For example:
    
    const screenWidth = Dimensions.get('window').width;
    const columnWidth = screenWidth / COLUMN_STATUS.length;
    const columnIndex = Math.min(
        COLUMN_STATUS.length - 1,
        Math.floor(x / columnWidth)
    );

    const newStatus = COLUMN_STATUS[columnIndex];

    // // Find the task and update its status
    const updatedTasks = tasks.map(task => {
        if (task.key === taskId) {
            return { ...task, status: newStatus };
        }
        return task;
    });
    setTasks(updatedTasks);
    setDropCounter(dropCounter+1);
    // console.log(updatedTasks);
    // TODO: Make an API call to persist the change
};

  const renderTask = ({ item }) => (
    <DragDrop key={item.key} onDrop={({x,y}) => handleDrop(item.key, {x, y})}>
      <View style={styles.taskCard}>
          <Text style={styles.taskText}>{item.title}</Text>
      </View>
    </DragDrop>
  );
  
  const renderColumn = (status) => (
    <View key={status + dropCounter} style={styles.column}>
        <Text style={styles.columnHeader}>{status.toUpperCase()}</Text>
        {tasks.filter((task) => task.status === status).map((taskItem) => renderTask({ item: taskItem }))}
    </View>   
  );

  const saveTable = () => {
    
  }

  return (
    
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Text style={styles.header}>Planning Board</Text>
        <View style={styles.board}>
            {/* {renderColumn('todo')}
            {renderColumn('in_progress')}
            {renderColumn('blocked')}
            {renderColumn('done')} */}
            {COLUMN_STATUS.map(renderColumn)}

        </View>
      </GestureHandlerRootView>
      <CustomButton onPressHandler={saveTable} title="Save" />
      <CustomButton onPressHandler={logout} title="Logout" />
    </View>
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


export default HomeScreen;