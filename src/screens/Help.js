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
export default class Help extends Component{
  
   componentDidMount(){
    Immersive.on()
    Immersive.setImmersive(true)
   }

    render(){
        return(
           <View style={{width:"100%", height:"100%"}}>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
            <View style={{width:"100%", flexDirection:'row', justifyContent:"center", alignItems:"center" }}>
                   <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
                   {/* <Text style={{fontSize:22, marginRight:20, marginTop:30, textDecorationLine:"underline"}}>HI JOHN</Text> */}
                </View>
               <View style={{flex:1, paddingLeft:20, paddingRight:20, justifyContent:"center", alignItems:"center"}}>
                   <Text style={{fontSize:20, fontFamily:"Raleway-Bold",marginTop:40, textAlign:"center"}}>log in Tips</Text>
               <Text style={{textAlign:"center",fontSize:20, fontFamily:"Raleway-Bold", marginTop:20, marginBottom:0}}>
               Make sure you entered the correct User ID which is your registered Cell Phone Number for this App.
               </Text>
               <Text style={{textAlign:"center",fontSize:20, fontFamily:"Raleway-Bold", marginTop:30, marginBottom:30}}>
               Do not add a 0 before your cellpone number.
                For instance if your registered cellphone is 091728930, your user ID is 91728930.  
               </Text>
               <Text style={{textAlign:"center", fontSize:20, fontFamily:"Raleway-Bold", marginTop:20, marginBottom:30}}>
               Your password is composed of 6 numerical digits.
               </Text>
               
               </View>
               <View style={styles.btnView}>
                             <TouchableOpacity style={[styles.Whitebtn,{marginBottom:30, backgroundColor:"#DEDF38"}]}
                              onPress={() => this.props.navigation.goBack()} >
                                 <Text style={[styles.blackText,{color:"#fff"}]}>Go Back</Text>
                             </TouchableOpacity>
                             
                         </View>
            </View>
        </View>
        
            
            
           </View>
        );
    }
}