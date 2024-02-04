//Signup Screen
import {React,useContext,useState} from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {handleSignup} from '../../utils/authfuncs';
import { AuthContext } from '../../context/AuthContext';

const SignupScreen = () => {
  
  context = useContext(AuthContext);
  const {setAuthenticated, isAuthenticated, userObj, setUserObj, logout} = context;

  const navigation = useNavigation();

  const signUp = async ()=>{
    try{
      const formData = {
        'Name': name,
        'Username': username,
        'Phone': phone,
        'Email': email,
        'password': password,
        'DOB':'2000-11-26'
      }
      const response = await handleSignup(formData);

      if(!response.ok){
        throw new Error ("Signup failed!")
      }

      // const data = await response.json();

      AsyncStorage.setItem('accessToken',response.access);
      AsyncStorage.setItem('refreshToken',response.refresh);
      setUserObj(response.user);
      navigation.navigate(HomeScreen);

      // if (response && response.data.token) {
      //   await AsyncStorage.setItem('token', response.data.token);
      //   setAuthenticated(true);
      //   setUserObj(response.data);
      //   console.log("[SignUp] ",isAuthenticated);
      //   console.log("[SignUp] ",response.data);
      //   navigation.navigate('HomeScreen');
      // }
    }catch (e) {
      console.error(e);
    } 
  }

  const [name,changeName] = useState("")
  const [phone,changePhone] = useState("")
  const [email,changeEmail] = useState("")
  const [username,changeUsername] = useState("")
  const [password,changePassword] = useState("")

  return (
    (!isAuthenticated || !userObj) ?
    <>
      <View style={{padding:100}}>
        <Text>Sign Up Screen</Text>
        <CustomInput text={name} changeText={changeName} placeholder="Name" />
        <CustomInput text={phone} changeText={changePhone} placeholder="+91 9999999999"/>
        <CustomInput text={email} changeText={changeEmail} placeholder="Email" />
        <CustomInput text={username} changeText={changeUsername} placeholder="Username" />
        <CustomInput text={password} changeText={changePassword} placeholder="Password" pass={true}/>
        <CustomButton onPressHandler={signUp} title="Sign Up!"/>
        <CustomButton onPressHandler={() => navigation.navigate('HomeScreen')} title="Home"/>
        <CustomButton onPressHandler={() => navigation.navigate('LoginScreen')} title="Login"/>
      </View>
    </>
    :
    navigation.navigate("HomeScreen")
  );
};

export default SignupScreen;