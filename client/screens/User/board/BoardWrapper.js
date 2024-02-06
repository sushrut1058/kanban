//BoardWrapper.js
import {useMemo, React, useContext, useState, useRef, useEffect, useCallback} from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet,PanResponder, Animated, TextInput,FlatList, Dimensions  } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { AuthContext } from '../../../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragDrop } from '../../../components/DragDrop';
import { getBoard, updateBoard, createBoard, deleteBoard } from '../../../utils/boardServices';
import BottomSheet from '@gorhom/bottom-sheet';

const BoardWrapper = ({route, navigation}) => {
    // const navigation = useNavigation();
  const {isAuthenticated, setAuthenticated, userObj, setUserObj, logout} = useContext(AuthContext);  
  const boardId = route.params?.id || 0;
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ['60%', '70%', '80%'], []);

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    bottomSheetRef.current.snapToIndex(0); // Open the bottom sheet
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
        // Bottom sheet is fully closed
        setSelectedTask(null); // Reset selected task
    }
  }, []);

  useEffect(() => {
      const fetchBoard = async () => {
          try {
              setLoading(true);
              const boardData = await getBoard(boardId);
              setTasks(boardData.tasks);
              setDesc(boardData.descriptions);
              setLoading(false);
          } catch (e) {
              console.error(e);
              setError(e);
              setLoading(false);
          }
      };

      if (boardId) {
          fetchBoard();
      }
  }, [boardId]);

  const saveTable = ()=>{
    const boardData = {
        'title':"Second Board",
        'tasks':tasks,
        'descriptions':desc
    }
    try{
        updateBoard(boardId,boardData);
    }catch (e){
        console.log(e);
    }
  }

  const deleteTable = async () => {
    try {
      await deleteBoard(boardId);
      console.log('Board deleted');
      navigation.goBack(); // Navigate back after deleting
    } catch (e) {
        console.error(e);
    }
  }
  
  const [dropCounter, setDropCounter] = useState(0);
  const COLUMN_STATUS = ['todo', 'in_progress', 'blocked', 'done'];

  const handleDrop = (taskId, {x, y}) => {
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
    // TODO: Make an API call to persist the change
};

  const renderTask = ({ item }) => (
    <DragDrop key={item.key} onDrop={({x,y}) => handleDrop(item.key, {x, y})}>
      <TouchableOpacity onPress={() => handleTaskPress(item)} style={styles.taskCard}>
          <Text style={styles.taskText}>{item.title}</Text>
      </TouchableOpacity>
    </DragDrop>
  );
  
  const  renderColumn = (status) => (
    <View key={status + dropCounter} style={styles.column}>
        <Text style={styles.columnHeader}>{status.toUpperCase()}</Text>
        {tasks.filter((task) => task.status === status).map((taskItem) => renderTask({ item: taskItem }))}
    </View>   
  );

  return (
    <GestureHandlerRootView style={styles.flex1}>
    <View style={styles.container}>
      
        <Text style={styles.header}>Planning Board</Text>
        <View style={styles.board}>
            {COLUMN_STATUS.map(renderColumn)}
        </View>
        
      <CustomButton title="Save" onPressHandler={saveTable}/>
      <CustomButton title="Delete" onPressHandler={deleteTable}/>
      <CustomButton title="Back" onPressHandler={()=>navigation.goBack()}/>
    </View>
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} style={styles.bottomSheet} onChange={handleSheetChanges} enablePanDownToClose={true}>
        <View style={styles.contentContainer}>
            {selectedTask && (
                <>
                    <Text style={styles.containerHeadline}>Task Details</Text>
                    {/* ... task details and editing options ... */}
                </>
            )}
        </View>
    </BottomSheet>

    </GestureHandlerRootView>
    
    
    
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
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
      marginBottom: 10
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
  flex1: {
    flex: 1,
  },
  bottomSheet: {
      // ... your bottom sheet styles ...
  },
  contentContainer: {
      // ... your content container styles ...
  },
  containerHeadline: {
      // ... your container headline styles ...
  },



});

export default BoardWrapper;