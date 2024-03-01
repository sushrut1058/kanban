import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { DragDrop } from './DragDrop';
// Assumes task has properties like title
const PlaceholderTicket = ({onDrop, task, coords, gwidth, gheight }) => {
    // console.log(coords);

  if (!task) return null; // Don't render if there's no task
  return (
    <DragDrop position={coords} onDrop={onDrop}>
      <View style={[styles.placeholder, {width:gwidth, height:gheight}]}>
        <View style={styles.taskTitle}>
          <Text style={styles.taskText} numberOfLines={2} ellipsizeMode='tail'>{task.title}</Text>
        </View>
        <View key={task.key} style={[styles.pointsContainer,{left: gwidth/2-windowHeight*0.025}]}>
          <Text style={styles.points}>5</Text>
        </View>
      </View>
    </DragDrop>    
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#8000FF',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    position: 'absolute',
    zIndex: 1000, // Ensure it's above other components
  },
  taskText: {
    fontSize: 14,
    color:'white'
  },
  taskTitle:{
    flex:0.5,
    alignItems:'center',
  },pointsContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: windowHeight*0.05/2,
    width: windowHeight*0.05,
    height: windowHeight*0.05,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:10,
    flex:0.5
  },
  points: {
    color: 'white',
    fontSize: 16,
  },

});

export default PlaceholderTicket;
