import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';

const BottomSheetContent = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');
    const [tag, setTag] = useState('');
  
    return (
      <View style={styles.sheetContentContainer}>
        <View style={styles.sheetHeader}>
          <TouchableOpacity onPress={onCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.inputField}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.inputField}
          placeholder="Points"
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputField}
          placeholder="Tag"
          value={tag}
          onChangeText={setTag}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
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
    // Add other styles here as needed
  });
  

  export default BottomSheetContent;