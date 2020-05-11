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
import { Immersive } from 'react-native-immersive'
import styles from '../assets/style/Stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Agree extends Component{

    componentDidMount(){
        Immersive.on()
Immersive.setImmersive(true)
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.newConatiner}>
                <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:40,
                  padding: 20, }}>
                   <Text style={styles.titleText}>Accept Terms</Text>
                   <Text style={[styles.titleText,{marginBottom:20}]}>and Conditions</Text>
                   <Text style={styles.titleText}>By creating an account, you </Text>
                    <Text style={styles.titleText}> agree to the eastwest </Text>
                    <Text style={styles.titleText}>Terms of Services and </Text>
                    <Text style={[styles.titleText,{marginBottom:20}]}>Privacy Policy </Text>

                    <View style={styles.btnView}>
                             <TouchableOpacity style={[styles.Whitebtn,{marginBottom:30}]}
                             
                              onPress={() => {
                                this.props.navigation.navigate("SetPassword",{id:this.props.navigation.state.params.id})
                              }}>
                                 <Text style={styles.blackText}>I Agree</Text>
                             </TouchableOpacity>
                             
                         </View>
                </View>
                
            </View>
        </View>
        );
    }
}