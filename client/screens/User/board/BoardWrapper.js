import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, ImageBackground, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput,TouchableWithoutFeedback, Keyboard } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import { getBoard, updateBoard, deleteBoard } from '../../../utils/boardServices';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Board from './Board';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

const status = ['todo', 'in_progress', 'blocked', 'done'];

const BoardWrapper = ({ route, navigation }) => {
  const boardId = route.params?.id || 0;
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState([]);
  const [Task,setTask] = useState(null);


  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['50%', '60%','80%'], []);

  const handleAddPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setBottomSheetVisible(true);
    console.log("startcall");
  };

  // Close the bottom sheet and remove the overlay
  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
    setTask(null);
    console.log("closecall");
  };

  const fetchBoard = async () => {
    try {
      const boardData = await getBoard(boardId);
      setTasks(boardData.tasks);
      setDesc(boardData.descriptions);
    } catch (e) {
      console.error(e);
    }
  };
  

  useEffect(() => {
    if (boardId) {
      fetchBoard();
    }
    console.log(desc);
  }, []);

  useFocusEffect(
    useCallback(()=>{
      if (boardId) {
        fetchBoard();
      }
      console.log(desc);
    },[])
  )

  // Define other functions like saveTable and deleteTable here

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
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [tag, setTag] = useState('');

  const onSave = () => {
    let newId = (tasks.length+1).toString();

      const newTask = {
        key:newId,
        title:title,
        status:tag,
      }
      const newDesc = {
        key:newId,
        desc:description
      }
      setTasks([...tasks,newTask]);
      setDesc([...desc, newDesc]);
    
    // setTag('');
    // setTitle('');
    // setDescription('');
    // setPoints('');
  }

  const onCancel = (  ) => {

  }

  const image = { uri: "https://i.pinimg.com/564x/f2/f1/c3/f2f1c39217bd937765322fd52dcc2b3a.jpg" };
  
  return (
    
    <GestureHandlerRootView style={styles.cunt} >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.cunt}>
      <ImageBackground source={image} style={styles.image}>

      
      <Header leftIconName="arrow-back" rightIconName="save" onLeftIconPress={() => navigation.goBack()} onRightIconPress={() => saveTable()}/>

      <Board tasks={tasks} setTasks={setTasks} style={{flex:1}} setOverlay={setBottomSheetVisible} overlay={isBottomSheetVisible} setKey={setTask}/>

      <Footer onAddPress={handleAddPress} onInfoPress={()=>console.log("infopressed")} onDeletePress={()=>deleteTable()}/>

      <View style={[isBottomSheetVisible?styles.overlay:{zIndex:-1}]} onTouchStart={()=>{handleClosePress()}}></View>
      
      <View style={[Task?styles.infoBox:{zIndex:-1}]} >
        <View style={{...StyleSheet.absoluteFillObject}}>
          <View style={{zIndex:50}}>
            <Text style={{color:'white'}}>{Task?Task.title:"lololoo"}</Text>
          </View>
        </View>
      </View>
      
      <BottomSheet ref={bottomSheetRef} style={{zIndex:500}} index={-1} snapPoints={snapPoints} enablePanDownToClose={true} onClose={()=>{handleClosePress}} >
        <View style={styles.sheetContentContainer}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={onCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.inputField} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.inputField} placeholder="Description" value={description} onChangeText={setDescription} multiline />
          <TextInput  style={styles.inputField} placeholder="Points" value={points} onChangeText={setPoints} keyboardType="numeric" />
          <TextInput style={styles.inputField} placeholder="Tag" value={tag} onChangeText={setTag} />
        </View>
      </BottomSheet>

     </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
    </GestureHandlerRootView>
    
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  cunt:{
    flex:1,
    backgroundColor:'grey'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Shadow overlay
  },
  bottomSheetContent: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  sheetContentContainer: {
    padding: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  infoBox:{
    width:'75%',
    height:'30%',
    backgroundColor:'#8000FF',
    position:'absolute',
    left:windowWidth*0.125
  }
});

export default BoardWrapper;
