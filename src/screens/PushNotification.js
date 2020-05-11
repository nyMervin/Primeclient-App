import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Picker,
  StatusBar,
  AppState,
  alert
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class Notification extends Component{

    componentDidMount() {
        PushNotification.configure({
          onRegister: function(token) {
            console.log("TOKEN:", token);
            alert(token)
          },
          onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
          },
          senderID: "744340831943"
        });
        
      }
      
    render(){
        return(
            null
        )
    }
}