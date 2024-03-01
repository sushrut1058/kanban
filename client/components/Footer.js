import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you've installed react-native-vector-icons

const Footer = ({ onInfoPress, onAddPress, onDeletePress }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={onInfoPress}>
        <Icon name="info" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onAddPress}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDeletePress}>
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // Add padding at the bottom if needed
    paddingTop: 20, // Add padding at the top for spacing
    height: height*0.0936,
    backgroundColor:'black',
    opacity:0.7
  },
  // Add more styles if needed
});

export default Footer;
