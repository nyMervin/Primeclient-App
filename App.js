/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  Image,
  AppState,
  AsyncStorage,
  StatusBar
} from "react-native";
// import { List, ListItem } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Agree from './src/screens/Agree'
import SetPassword from './src/screens/SetPassword'
import Dashboard from './src/screens/Dashbaord'
import BuyDollars from './src/screens/BuyDollars'
import NextBuyDollars from './src/screens/NextBuyDollars'
import OtpScreen from './src/screens/OtpScreen'
import SellDollar from './src/screens/SellDollar'
import NextSellDollar from './src/screens/NextSellDollar'
// import NextSellDollar from './src/screens/NextSellDollar'
import TimeDeposit from './src/screens/TimeDeposit'
import NextTimeDeposit from './src/screens/NextTimeDeposit'
import RequestCompleted from './src/screens/RequestCompleted'
import CallingScreen from './src/screens/CallingScreen'
import Transiction from './src/screens/Transiction'
import Requests from './src/screens/Requests'
import Notification from './src/screens/Notification'
import Header from './src/screens/Header'
import Footer from './src/screens/Footer'
import UserProfile from './src/screens/UserProfile.js'
import BalanceRequest from './src/screens/BalanceRequest'
import FixedIncome from './src/screens/FixedIncome'
import NextFixedIncome from './src/screens/NextFixedIncome'
import ChnagePassword from './src/screens/ChangePassword'
import ChangePassword from "./src/screens/ChangePassword";
import Help from "./src/screens/Help";
import RegitrationOtp from "./src/screens/RegistrationOtp";
import ForgotPassowrd from "./src/screens/ForgotPassowrd";
import ForgotOTP from "./src/screens/ForgotOTP";
import MobileOtp from "./src/screens/MobileOtp";
import { Immersive } from 'react-native-immersive'
// import firebase from 'react-native-firebase'

// import PushNotification from 'react-native-push-notification';
var PushNotification = require('react-native-push-notification');

// firebase.notifications().onNotification((notification) => {
//   // console.log(message)
//   const { title, body } = notification;
//   // alert(notification)
//   PushNotification.localNotification({
//     title: title,
//     message: body, // (required)
//   });
// });


PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log(token)
    AsyncStorage.setItem('token',token['token'])
  },

  onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
    let date = new Date(Date.now());
            
            PushNotification.localNotificationSchedule({
              foreground: true,
               message: notification['body'],
               date,
             });
  },

  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "91663435700",
  popInitialNotification: true,
  requestPermissions: true

});

const LoginStack = createStackNavigator({

  Login:
  { 
    screen: Login,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  Signup:
  { 
    screen: Signup,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  Agree:
  { 
    screen: Agree,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  Footer:
  { 
    screen: Footer,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  SetPassword:
  { 
    screen: SetPassword,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  Dashboard:
  { 
    screen: Dashboard,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  BuyDollars:
  { 
    screen: BuyDollars,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  SellDollar:
  { 
    screen: SellDollar,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  
  NextBuyDollars:
  { 
    screen: NextBuyDollars,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  NextSellDollar:
  { 
    screen: NextSellDollar,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  NextTimeDeposit:
  { 
    screen: NextTimeDeposit,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  OtpScreen:
  { 
    screen: OtpScreen,
    navigationOptions: { 
      header: null,
      // gesturesEnabled: true,
    },
  
  },
  TimeDeposit:
  { 
    screen: TimeDeposit,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  RequestCompleted:
  { 
    screen: RequestCompleted,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  CallingScreen:
  { 
    screen: CallingScreen,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  Transiction:
  { 
    screen: Transiction,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  Requests:
  { 
    screen: Requests,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  Notification:
  { 
    screen: Notification,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  Header:
  { 
    screen: Header,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  UserProfile:
  { 
    screen: UserProfile,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  BalanceRequest:
  { 
    screen: BalanceRequest,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  FixedIncome:
  { 
    screen: FixedIncome,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  NextFixedIncome:
  { 
    screen: NextFixedIncome,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  ChangePassword:
  { 
    screen: ChangePassword,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  Help:
  { 
    screen: Help,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  RegitrationOtp:
  { 
    screen: RegitrationOtp,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  ForgotPassowrd:
  { 
    screen: ForgotPassowrd,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  ForgotOTP:
  { 
    screen: ForgotOTP,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  MobileOtp:
  { 
    screen: MobileOtp,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
  
},
{
  // initialRouteName: 'MobileOtp',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#014cff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

export default createAppContainer(LoginStack);


class App extends Component {
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }



  componentDidMount(){
    Immersive.on()
Immersive.setImmersive(true)
console.log("hello")

  }

  


 
 
  
  render() {
      return (
      <LoginStack />
    );
   
  }
}
