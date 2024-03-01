import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons

const { height } = Dimensions.get('window'); // Get screen height

const Header = ({ leftIconName, rightIconName, onLeftIconPress, onRightIconPress }) => {
  return (
    <View>
      <View style={styles.headerContainer1}></View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onLeftIconPress}>
          <Icon name={leftIconName} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FinishQuick</Text>
        <TouchableOpacity onPress={onRightIconPress}>
          <Icon name={rightIconName} size={24} color="#fff" /> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height*0.0936,
    marginBottom:height*0.0254,
    marginTop:height*0.01
  },
  headerContainer1: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    position:'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height*0.0936,
    backgroundColor: 'black', // Change the background color as needed
    marginBottom:height*0.0254,
    opacity:0.7
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // Center the title, assuming icons have similar widths
    flex: 1,
    textAlign: 'center',
    color:'white'
  },
  
});

export default Header;
