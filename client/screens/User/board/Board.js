import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import PlaceholderTicket from '../../../components/PlaceholderTicket';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Width = windowWidth*0.4;
const Height = windowHeight*0.1196;

const Board = ({tasks,setTasks,setOverlay, setKey}) => {

  const [Task, setTask] = useState(null);
  const [isDragging, setDragging] = useState(false);
  const [coords,setCoords] = useState([null,null]);

  const title = {
    "todo": "To-do",
    "in_progress": "In Progress",
    "blocked": "Temporarily Abandoned",
    "done": "Done"
  }

  const renderTaskContainer = (status) => (
    <View key={status} style={[styles.outerTaskContainer, {flex:1}]}>
      <View style={styles.taskContainer1}></View>
    <View style={styles.taskContainer} >
      <View style={styles.containerTitle}>
        <Text style={{color:'white'}}>{title[status].toUpperCase()}</Text>
      </View>
      <ScrollView horizontal={true} style={{alignContent:'center', flexDirection:'row'}}>
      <View style={[styles.cont]}>
        {tasks.filter(task => task.status === status).map(task => (
            <TaskCard task={task} key={task.key.toString()}  />
        ))}  
      </View>
     </ScrollView>
    </View>
    </View>
  );

  const TaskCard = ({ task, onPress }) => {
    const isBeingDragged = task===Task;
    // console.log(isBeingDragged);
    return (
      <View style={[styles.outerTaskCard,isBeingDragged?styles.invisible:{}]}>
        <View style={styles.itemContainer1}></View>
        <View key={task.key} style={styles.itemContainer}>
        
          <TouchableOpacity style={styles.touchableArea}  key={task.key} onPress={()=>getInfo(task)} onLongPress={(e)=>{setTask(task);handleLongPress(e);}}>
          </TouchableOpacity>
          
          <View style={styles.taskCard}>
            <View style={styles.taskTitle}>
              <Text style={styles.taskText} numberOfLines={2} ellipsizeMode='tail'>{task.title}</Text>
            </View>
            <View key={task.key} style={[styles.pointsContainer]}>
              <Text style={styles.points}>5</Text>
            </View>
          </View>
        
        </View>
      </View>
    );
  };

  const handleLongPress = (e)=>{
    // console.log(e.nativeEvent)
    setCoords([e.nativeEvent.pageX-e.nativeEvent.locationX,e.nativeEvent.pageY-e.nativeEvent.locationY-Height])
    console.log(coords,isDragging);
    setDragging(true);
  }
  const dragOff = ()=>{
    setDragging(false);
    setTask(null);
    console.log(isDragging);
  }
  const determineDropRegion = (x, y) => {
    // Placeholder logic to determine region based on x, y coordinates
    if (y < windowHeight*0.2967) return 'todo';
    if (y >= windowHeight * 0.2967 && y < windowHeight * 0.4998) return 'in_progress';
    if (y >= windowHeight * 0.4998 && y < windowHeight * 0.7029) return 'blocked';
    return 'done';
  };
  const onDrop = ({x,y}) => {
    const tag = determineDropRegion(x,y);
    updatedTasks = tasks.map( t => {
      if(t.key===Task.key){
        return {...t,status:tag};
      }
      return t;
    });
    setTasks(updatedTasks);
    dragOff();
  }

  const getInfo = (task) => {
    setOverlay(true);
    setKey(task);
    // console.log(overlay);
  }

  const disappear = () => {
    setActivateOverlay(false);
  }

  const status = ['todo', 'in_progress', 'blocked', 'done'];
  
  return (
      <View style={styles.container}>

        <PlaceholderTicket task={Task} coords={coords} gwidth={Width} gheight={Height} onDrop={onDrop}/>

        {status.map(status => renderTaskContainer(status))}
        
        {isDragging && (
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={dragOff}>
            <View style={styles.overlay} />
          </TouchableOpacity>
        )}
        
      </View>
  );

}


const styles = StyleSheet.create({
  outerTaskContainer:{
    height:windowHeight*0.1777,
    marginBottom:windowHeight*0.0254,
    width:'95%',
    marginLeft:windowWidth*0.025
  },
  container: {
    flex: 1,
    width: '100%',
    height:'100%'
  },
  taskContainer: {
    width: '100%',
  },
  taskContainer1: {
    width: '100%',
    backgroundColor:'black',
    opacity:0.49,
    ...StyleSheet.absoluteFillObject,
    borderRadius:10
  },
  containerTitle: {
    fontSize: 18,
    // position:'absolute',
    fontWeight: 'bold',
    alignItems:'center',
    backgroundColor:'#8000FF',
    height:windowHeight*0.0379
  },
  cont:{
    flexDirection: 'row'
  },
  scrollContentContainer: {
    alignItems: 'center', // Center items vertically in the scroll view
  },
  taskCard: {
    borderRadius: 5,
    width: Width, // Adjust width as necessary
    height: Height
  },
  taskText: {
    fontSize: 14,
    color:'white'
  },
  taskTitle:{
    flex:0.5,
    alignItems:'center',
  },
  pointsContainer: {
    position: 'absolute',
    backgroundColor: '#8000FF',
    borderRadius: windowHeight*0.05/2,
    width: windowHeight*0.05,
    height: windowHeight*0.05,
    justifyContent: 'center',
    alignItems: 'center',
    left: Width/2-windowHeight*0.025,
    bottom:10,
    flex:0.5
  },
  points: {
    color: 'white',
    fontSize: 16,
  },
  itemContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10
  },
  touchableArea: {
    ...StyleSheet.absoluteFillObject,
    // zIndex: 1, // Ensure the touchable area is above the item
  },
  itemContainer1:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'black',
    opacity:0.49,
    borderRadius:10,
    borderColor:'#8000FF',
    borderWidth:2
  },
  outerTaskCard:{
    padding:5
  },
  overlay:{
    zIndex:50
  },
  overlayInfo:{
    zIndex:50,
    backgroundColor:'black',
    opacity:0.5
  },
  invisible:{
    opacity:0
  }
});


export default Board;