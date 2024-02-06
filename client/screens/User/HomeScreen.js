//HomeScreen.js
import {React, useContext, useState, useRef, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet,PanResponder, Animated, FlatList, Dimensions  } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragDrop } from '../../components/DragDrop';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import BoardWrapper from './board/BoardWrapper'
import { getBoard, getBoardList } from '../../utils/boardServices';


const HomeScreen = ({navigation}) => {

  const {isAuthenticated, setAuthenticated, userObj, setUserObj, logout} = useContext(AuthContext);  
  const [boards, setBoards] = useState([]); // State to store the list of boards

  useEffect(() => {
    // Fetch the list of boards when the component mounts
    const fetchBoards = async () => {
      const fetchedBoards = await getBoardList();
      if (fetchedBoards) {
        setBoards(fetchedBoards); // Update the state with the fetched boards
      }
    };
    fetchBoards();
  }, []); // Empty dependency array means this effect runs once on mount

  // Render each board in the list
  const renderBoard = ({ item }) => (
    <View style={styles.boardItem}>
      <CustomButton onPressHandler={() => navigation.navigate("BoardScreen", { id: item.board_id })} title={`Board: ${item.board_id}`} />
    </View>
  );

  return (
    <View>
      <Text>HomeScreen</Text>
     
      <CustomButton onPressHandler={()=>navigation.navigate("BoardScreen")} title="New Board"/>
      <FlatList
        data={boards}
        renderItem={renderBoard}
        keyExtractor={item => item.board_id.toString()}
      />
      <CustomButton onPressHandler={logout} title="Logout"/>
    </View>
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
  boardItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  boardTitle: {
    fontSize: 20,
  },
  // ... other styles ...
});

export default HomeScreen;