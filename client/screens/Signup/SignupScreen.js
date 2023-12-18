//Signup Screen
import {React,useState} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {signup} from '../../actions/authfuncs';
const SignupScreen = ({navigation}) => {
  
  const redir_login = ()=>{
    navigation.navigate('LoginScreen');
  }
  const redir_home = ()=>{
    navigation.navigate('HomeScreen');
  }
  const SignUp = ()=>{
    const formData = {
      'Name': name,
      'Username': username,
      'Phone': phone,
      'Email': email,
      'password': password
    }
    signup({navigation},formData);

  }
  const [name,changeName] = useState("")
  const [phone,changePhone] = useState("")
  const [email,changeEmail] = useState("")
  const [username,changeUsername] = useState("")
  const [password,changePassword] = useState("")

  return (
    <View style={{padding:100}}>
      <Text>Sign Up Screen</Text>
      <CustomInput text={name} changeText={changeName} placeholder="Name" />
      <CustomInput text={phone} changeText={changePhone} placeholder="+91 9999999999"/>
      <CustomInput text={email} changeText={changeEmail} placeholder="Email" />
      <CustomInput text={username} changeText={changeUsername} placeholder="Username" />
      <CustomInput text={password} changeText={changePassword} placeholder="Password" pass={true}/>
      <CustomButton onPressHandler={SignUp} title="Sign Up!"/>
      <CustomButton onPressHandler={redir_home} title="Home"/>
      <CustomButton onPressHandler={redir_login} title="Login"/>
    </View>
  );
};

export default SignupScreen;