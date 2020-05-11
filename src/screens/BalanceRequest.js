import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ImageBackground,
  AsyncStorage,
  Alert,ScrollView,WebView
} from 'react-native';
import styles from '../assets/style/Stylesheet';
import CodeInput from 'react-native-confirmation-code-input';
import OtpInputs from 'react-native-otp-inputs'
import Header from './Header';
import { Immersive } from 'react-native-immersive'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class RequestCompleted extends Component{
  
    otpRef = React.createRef()
 
    clearOTP = () => {
      otpRef.current.clear()
    }
    _loadInitialState= async() =>{
   
      //  Alert.alert(await AsyncStorage.getItem('user'));
        this.setState({
          user:await AsyncStorage.getItem('user')
        })
      }
      componentDidMount(){
        this._loadInitialState().done();
        Immersive.on()
Immersive.setImmersive(true)
      }

    checkOtp=(code)=>{
        Alert.alert(code)
    }

    render(){
        return(
           <View style={{width:"100%", height:"100%"}}>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
            <View style={{width:"100%", flexDirection:'row', justifyContent:"center", alignItems:"center" }}>
            <TouchableOpacity
             onPress={() => {
                this.props.navigation.navigate("Dashboard");
              }}>
               <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
            </TouchableOpacity>
                </View>
               <View style={{flex:1, paddingLeft:20, paddingRight:20, justifyContent:"center", alignItems:"center"}}>
               <Text style={{fontSize:28, fontFamily:"Raleway-Bold", textAlign:"center"}}>
                  Processing your Request, This may take about 5 to 10 minutes.
               </Text>
               <Text style={{textAlign:"center", fontFamily:"Raleway-Bold", marginTop:30, marginBottom:30}}>
                  To get your account balances immediately, download the 
                 regular  EastWest Bank Mobile App or contact your Account Officer.    
               </Text>
               
               </View>
               <TouchableOpacity
             onPress={() => {
                this.props.navigation.navigate("Dashboard",{id:this.state.user});
              }}>
               <Text style={{textAlign:"right" ,textDecorationLine:"underline" ,fontSize:20, margin:40, fontWeight:"bold" }}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
        
            
            
           </View>
        );
    }
}