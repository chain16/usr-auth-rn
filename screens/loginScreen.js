import React from 'react';
import {View,Button,Text} from 'react-native'
import * as firebase from 'firebase';
import MainTaNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements'

firebase.initializeApp({
    apiKey: "AIzaSyCfFWc9KYP3Na0Q5gxB8FjWv83JTLM7DYM",
    authDomain: "usr-auth-rn.firebaseapp.com",
    databaseURL: "https://usr-auth-rn.firebaseio.com",
    projectId: "usr-auth-rn",
    storageBucket: "usr-auth-rn.appspot.com",
    messagingSenderId: "1092894899371"
  });


export default class Login extends React.Component{
    constructor(props){
      super(props);
      this.state = {email:'', password:'', error:'',loading:false};


}


onLoginPress(){
  this.setState({error:'', loading:true});
  const{email, password} = this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    this.setState({error:'', loading:false});
    this.props.navigation.navigate('Main');

  })
  .catch(() => {
    this.setState({error: 'Authentication failed',loading:false});
  })
}

onSignUpPress(){
  this.setState({error:'', loading:true});
  const{email, password} = this.state;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    this.setState({error:'', loading:false});
    this.props.navigation.navigate('Main');

  })
  .catch(() => {
    this.setState({error: 'Authentication failed',loading:false});
  })
}
 renderButtonOrLoading(){
   if(this.state.loading){
     return<Text> Loading</Text>
   }
   return <View>
      <Button onPress={this.onLoginPress.bind(this)}
      title='Login'/>
      <Button onPress={this.onSignUpPress.bind(this)}
      title='Sign up'/>
   </View>
 }
 render(){
   return(
     <View>
        <FormLabel>Email</FormLabel>
        <FormInput
        value ={this.state.email}
        onChangeText={email => this.setState({email})}
        placeholder='me@example.com'
        />

        <FormLabel>Password</FormLabel>
        <FormInput
        value = {this.state.password}
        secureTextEntry
        placeholder='******'
        onChangeText={password => this.setState({password})}/>
        <Text>{this.state.error}</Text>
        {this.renderButtonOrLoading()}

     </View>

   )

 }
}
