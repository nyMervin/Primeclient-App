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
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
// import { StackActions, NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import styles from '../assets/style/Stylesheet';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import dashboard from './Dashbaord'
import {showSnackBar} from '@prince8verma/react-native-snackbar';
import Snackbar from '@prince8verma/react-native-snackbar';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

const home= '<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="500px" height="500px">    <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"/></svg>'
const home2= '<svg xmlns="http://www.w3.org/2000/svg" fill="#B0006C" viewBox="0 0 50 50" width="500px" height="500px">    <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"/></svg>'
const inbox= '<svg id="Capa_1" fill="#000000" enable-background="new 0 0 510 510" height="512" viewBox="0 0 510 510" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m382.21 79.135h89.921c8.284 0 15-6.716 15-15v-49.135c0-8.284-6.716-15-15-15h-109.918c-8.284 0-15 6.716-15 15 0 8.14-.003 41.191-.003 105.27h30v-36.135c0-2.761 2.239-5 5-5z"/><path d="m217.67 459.43h74.66v50.57h-74.66z"/><path d="m397.75 150.27h-20.54v74.28c22.469 6.813 38.515 28.532 36.582 53.603-1.946 25.247-22.341 45.602-47.591 47.506-30.325 2.286-55.721-21.74-55.721-51.589 0-23.32 15.49-43.08 36.73-49.52v-74.28h-147.67c33.43 26.05 54.97 66.68 54.97 112.25v166.91h240.49c8.284 0 15-6.716 15-15v-151.91c0-61.994-50.256-112.25-112.25-112.25z"/><path d="m224.51 429.43c0-11.189 0-160.369 0-166.91 0-61.905-50.376-112.25-112.26-112.25-61.883 0-112.25 50.352-112.25 112.25v151.91c0 8.284 6.716 15 15 15zm-75.21-144.45c-10.589 0-85.84 0-96.18 0-8.29 0-15-6.71-15-15 0-8.28 6.71-15 15-15h96.18c8.29 0 15 6.72 15 15 0 8.29-6.71 15-15 15z"/><path d="m340.48 274.07c0 11.99 9.75 21.74 21.73 21.74 11.99 0 21.74-9.75 21.74-21.74 0-11.955-9.742-21.74-21.74-21.74-11.947 0-21.73 9.733-21.73 21.74z"/></svg>'
const inbox2= '<svg id="Capa_1" fill="#B0006C" enable-background="new 0 0 510 510" height="512" viewBox="0 0 510 510" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m382.21 79.135h89.921c8.284 0 15-6.716 15-15v-49.135c0-8.284-6.716-15-15-15h-109.918c-8.284 0-15 6.716-15 15 0 8.14-.003 41.191-.003 105.27h30v-36.135c0-2.761 2.239-5 5-5z"/><path d="m217.67 459.43h74.66v50.57h-74.66z"/><path d="m397.75 150.27h-20.54v74.28c22.469 6.813 38.515 28.532 36.582 53.603-1.946 25.247-22.341 45.602-47.591 47.506-30.325 2.286-55.721-21.74-55.721-51.589 0-23.32 15.49-43.08 36.73-49.52v-74.28h-147.67c33.43 26.05 54.97 66.68 54.97 112.25v166.91h240.49c8.284 0 15-6.716 15-15v-151.91c0-61.994-50.256-112.25-112.25-112.25z"/><path d="m224.51 429.43c0-11.189 0-160.369 0-166.91 0-61.905-50.376-112.25-112.26-112.25-61.883 0-112.25 50.352-112.25 112.25v151.91c0 8.284 6.716 15 15 15zm-75.21-144.45c-10.589 0-85.84 0-96.18 0-8.29 0-15-6.71-15-15 0-8.28 6.71-15 15-15h96.18c8.29 0 15 6.72 15 15 0 8.29-6.71 15-15 15z"/><path d="m340.48 274.07c0 11.99 9.75 21.74 21.73 21.74 11.99 0 21.74-9.75 21.74-21.74 0-11.955-9.742-21.74-21.74-21.74-11.947 0-21.73 9.733-21.73 21.74z"/></svg>'
const transiction= '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.626px" height="511.627px" viewBox="0 0 511.626 511.627" xml:space="preserve"><g><g><path d="M118.771,200.999H27.406c-7.611,0-14.084,2.664-19.414,7.994C2.663,214.32,0,220.791,0,228.407v54.823 c0,7.61,2.663,14.078,7.992,19.406c5.33,5.329,11.803,7.994,19.414,7.994h91.365c7.611,0,14.084-2.665,19.414-7.994 c5.33-5.328,7.992-11.796,7.992-19.406v-54.823c0-7.616-2.662-14.087-7.992-19.414S126.382,200.999,118.771,200.999z"/><path d="M118.771,54.814H27.406c-7.611,0-14.084,2.663-19.414,7.993C2.663,68.137,0,74.61,0,82.221v54.821 c0,7.616,2.663,14.091,7.992,19.417c5.33,5.327,11.803,7.994,19.414,7.994h91.365c7.611,0,14.084-2.667,19.414-7.994 s7.992-11.798,7.992-19.414V82.225c0-7.611-2.662-14.084-7.992-19.417C132.855,57.48,126.382,54.814,118.771,54.814z"/><path d="M118.771,347.177H27.406c-7.611,0-14.084,2.662-19.414,7.994C2.663,360.502,0,366.974,0,374.585v54.826 c0,7.61,2.663,14.086,7.992,19.41c5.33,5.332,11.803,7.991,19.414,7.991h91.365c7.611,0,14.084-2.663,19.414-7.991 c5.33-5.324,7.992-11.8,7.992-19.41v-54.826c0-7.611-2.662-14.083-7.992-19.411S126.382,347.177,118.771,347.177z"/><path d="M484.215,200.999H210.131c-7.614,0-14.084,2.664-19.414,7.994s-7.992,11.798-7.992,19.414v54.823 c0,7.61,2.662,14.078,7.992,19.406c5.327,5.329,11.8,7.994,19.414,7.994h274.091c7.61,0,14.085-2.665,19.41-7.994 c5.332-5.328,7.994-11.796,7.994-19.406v-54.823c0-7.616-2.662-14.087-7.997-19.414 C498.3,203.663,491.833,200.999,484.215,200.999z"/><path d="M484.215,347.177H210.131c-7.614,0-14.084,2.662-19.414,7.994c-5.33,5.331-7.992,11.8-7.992,19.41v54.823 c0,7.611,2.662,14.089,7.992,19.417c5.327,5.328,11.8,7.987,19.414,7.987h274.091c7.61,0,14.085-2.662,19.41-7.987 c5.332-5.331,7.994-11.806,7.994-19.417v-54.823c0-7.61-2.662-14.085-7.997-19.41C498.3,349.846,491.833,347.177,484.215,347.177z"/><path d="M503.629,62.811c-5.329-5.327-11.797-7.993-19.414-7.993H210.131c-7.614,0-14.084,2.663-19.414,7.993 s-7.992,11.803-7.992,19.414v54.821c0,7.616,2.662,14.083,7.992,19.414c5.327,5.327,11.8,7.994,19.414,7.994h274.091 c7.61,0,14.078-2.667,19.41-7.994s7.994-11.798,7.994-19.414V82.225C511.626,74.613,508.964,68.141,503.629,62.811z"/></g></g></svg>'
const transiction2= '<svg version="1.1" fill="#B0006C" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.626px" height="511.627px" viewBox="0 0 511.626 511.627" xml:space="preserve"><g><g><path d="M118.771,200.999H27.406c-7.611,0-14.084,2.664-19.414,7.994C2.663,214.32,0,220.791,0,228.407v54.823 c0,7.61,2.663,14.078,7.992,19.406c5.33,5.329,11.803,7.994,19.414,7.994h91.365c7.611,0,14.084-2.665,19.414-7.994 c5.33-5.328,7.992-11.796,7.992-19.406v-54.823c0-7.616-2.662-14.087-7.992-19.414S126.382,200.999,118.771,200.999z"/><path d="M118.771,54.814H27.406c-7.611,0-14.084,2.663-19.414,7.993C2.663,68.137,0,74.61,0,82.221v54.821 c0,7.616,2.663,14.091,7.992,19.417c5.33,5.327,11.803,7.994,19.414,7.994h91.365c7.611,0,14.084-2.667,19.414-7.994 s7.992-11.798,7.992-19.414V82.225c0-7.611-2.662-14.084-7.992-19.417C132.855,57.48,126.382,54.814,118.771,54.814z"/><path d="M118.771,347.177H27.406c-7.611,0-14.084,2.662-19.414,7.994C2.663,360.502,0,366.974,0,374.585v54.826 c0,7.61,2.663,14.086,7.992,19.41c5.33,5.332,11.803,7.991,19.414,7.991h91.365c7.611,0,14.084-2.663,19.414-7.991 c5.33-5.324,7.992-11.8,7.992-19.41v-54.826c0-7.611-2.662-14.083-7.992-19.411S126.382,347.177,118.771,347.177z"/><path d="M484.215,200.999H210.131c-7.614,0-14.084,2.664-19.414,7.994s-7.992,11.798-7.992,19.414v54.823 c0,7.61,2.662,14.078,7.992,19.406c5.327,5.329,11.8,7.994,19.414,7.994h274.091c7.61,0,14.085-2.665,19.41-7.994 c5.332-5.328,7.994-11.796,7.994-19.406v-54.823c0-7.616-2.662-14.087-7.997-19.414 C498.3,203.663,491.833,200.999,484.215,200.999z"/><path d="M484.215,347.177H210.131c-7.614,0-14.084,2.662-19.414,7.994c-5.33,5.331-7.992,11.8-7.992,19.41v54.823 c0,7.611,2.662,14.089,7.992,19.417c5.327,5.328,11.8,7.987,19.414,7.987h274.091c7.61,0,14.085-2.662,19.41-7.987 c5.332-5.331,7.994-11.806,7.994-19.417v-54.823c0-7.61-2.662-14.085-7.997-19.41C498.3,349.846,491.833,347.177,484.215,347.177z"/><path d="M503.629,62.811c-5.329-5.327-11.797-7.993-19.414-7.993H210.131c-7.614,0-14.084,2.663-19.414,7.993 s-7.992,11.803-7.992,19.414v54.821c0,7.616,2.662,14.083,7.992,19.414c5.327,5.327,11.8,7.994,19.414,7.994h274.091 c7.61,0,14.078-2.667,19.41-7.994s7.994-11.798,7.994-19.414V82.225C511.626,74.613,508.964,68.141,503.629,62.811z"/></g></g></svg>'
const user= '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80.13px" height="80.13px" viewBox="0 0 80.13 80.13"  xml:space="preserve"><g><path d="M48.355,17.922c3.705,2.323,6.303,6.254,6.776,10.817c1.511,0.706,3.188,1.112,4.966,1.112 c6.491,0,11.752-5.261,11.752-11.751c0-6.491-5.261-11.752-11.752-11.752C53.668,6.35,48.453,11.517,48.355,17.922z M40.656,41.984 c6.491,0,11.752-5.262,11.752-11.752s-5.262-11.751-11.752-11.751c-6.49,0-11.754,5.262-11.754,11.752S34.166,41.984,40.656,41.984 z M45.641,42.785h-9.972c-8.297,0-15.047,6.751-15.047,15.048v12.195l0.031,0.191l0.84,0.263 c7.918,2.474,14.797,3.299,20.459,3.299c11.059,0,17.469-3.153,17.864-3.354l0.785-0.397h0.084V57.833 C60.688,49.536,53.938,42.785,45.641,42.785z M65.084,30.653h-9.895c-0.107,3.959-1.797,7.524-4.47,10.088 c7.375,2.193,12.771,9.032,12.771,17.11v3.758c9.77-0.358,15.4-3.127,15.771-3.313l0.785-0.398h0.084V45.699 C80.13,37.403,73.38,30.653,65.084,30.653z M20.035,29.853c2.299,0,4.438-0.671,6.25-1.814c0.576-3.757,2.59-7.04,5.467-9.276 c0.012-0.22,0.033-0.438,0.033-0.66c0-6.491-5.262-11.752-11.75-11.752c-6.492,0-11.752,5.261-11.752,11.752 C8.283,24.591,13.543,29.853,20.035,29.853z M30.589,40.741c-2.66-2.551-4.344-6.097-4.467-10.032 c-0.367-0.027-0.73-0.056-1.104-0.056h-9.971C6.75,30.653,0,37.403,0,45.699v12.197l0.031,0.188l0.84,0.265 c6.352,1.983,12.021,2.897,16.945,3.185v-3.683C17.818,49.773,23.212,42.936,30.589,40.741z"/></g></svg>'
const user2= '<svg version="1.1" id="Capa_1" fill="#B0006C" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80.13px" height="80.13px" viewBox="0 0 80.13 80.13"  xml:space="preserve"><g><path d="M48.355,17.922c3.705,2.323,6.303,6.254,6.776,10.817c1.511,0.706,3.188,1.112,4.966,1.112 c6.491,0,11.752-5.261,11.752-11.751c0-6.491-5.261-11.752-11.752-11.752C53.668,6.35,48.453,11.517,48.355,17.922z M40.656,41.984 c6.491,0,11.752-5.262,11.752-11.752s-5.262-11.751-11.752-11.751c-6.49,0-11.754,5.262-11.754,11.752S34.166,41.984,40.656,41.984 z M45.641,42.785h-9.972c-8.297,0-15.047,6.751-15.047,15.048v12.195l0.031,0.191l0.84,0.263 c7.918,2.474,14.797,3.299,20.459,3.299c11.059,0,17.469-3.153,17.864-3.354l0.785-0.397h0.084V57.833 C60.688,49.536,53.938,42.785,45.641,42.785z M65.084,30.653h-9.895c-0.107,3.959-1.797,7.524-4.47,10.088 c7.375,2.193,12.771,9.032,12.771,17.11v3.758c9.77-0.358,15.4-3.127,15.771-3.313l0.785-0.398h0.084V45.699 C80.13,37.403,73.38,30.653,65.084,30.653z M20.035,29.853c2.299,0,4.438-0.671,6.25-1.814c0.576-3.757,2.59-7.04,5.467-9.276 c0.012-0.22,0.033-0.438,0.033-0.66c0-6.491-5.262-11.752-11.75-11.752c-6.492,0-11.752,5.261-11.752,11.752 C8.283,24.591,13.543,29.853,20.035,29.853z M30.589,40.741c-2.66-2.551-4.344-6.097-4.467-10.032 c-0.367-0.027-0.73-0.056-1.104-0.056h-9.971C6.75,30.653,0,37.403,0,45.699v12.197l0.031,0.188l0.84,0.265 c6.352,1.983,12.021,2.897,16.945,3.185v-3.683C17.818,49.773,23.212,42.936,30.589,40.741z"/></g></svg>'


class Footer extends Component{

  constructor(props) {
    super(props);
    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state={
      name:''
    }
  }

  _loadInitialState= async() =>{
   
    //  Alert.alert(await AsyncStorage.getItem('user'));
      this.setState({
        user:await AsyncStorage.getItem('user')
      })

      console.log(JSON.stringify({
       
        id: this.props.UserId,
        
      }))
      
      fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_user_info',{
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
         
                  id: this.state.user,
                  
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState( { data: responseJson });
                
               if(this.state.data['status']==1){
                this.setState({ myData: this.state.data['data'] })
                //  console.log(this.state.myData)
                  this.setState({
                    name: this.state.myData['first_name'],
                    
                  })
               }
                // console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
         
            }).catch((error) => {
              console.error(error);
            });

            // this.timer = setInterval(()=> this.getMovies(), 1000)


            fetch('https://carnegiehillfintech.com/primeclientApi/Api/unread_notifications',{
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
         
                  id: this.state.user,
                  
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState( { newdata: responseJson });
                console.log(this.state.newdata)
                
                // console.log(this.state.notification)
                // console.log( counti)
                if(this.state.newdata['status']=="1"){
  
                  this.setState({ notification: this.state.newdata['data'] })
                  this.setState({alert:this.state.notification})
                var counti = Object.keys(this.state.notification).length;
                this.setState({
                  count:counti,
                  status:this.state.newdata['status']
                })
                
                // console.log(this.state.status1)

                let toast= Toast.show("You have recieved "+counti+" Notification", {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.TOP,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
                  
                  onHide: () => {
                    // fetch('https://carnegiehillfintech.com/primeclientApi/Api/check_balance',{
                    //   method: 'POST',
                    //   headers: {
                    //       Accept: 'application/json',
                    //       'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                 
                    //       id: this.state.user,
                          
                    //     })
                    // }).then((response) => response.json())
                    // .then((responseJson) => {
                    //     this.setState( { data: responseJson });
                    //      console.log(this.state.data)
                    //     if(this.state.data['status']==1){
                    //        this.setState({
                    //           balanceData:this.state.data['data']
                    //        })
                    //        if(this.state.balanceData['status']==0){
                    //         setTimeout(() => this.setState({
                    //           visible: true,
                    //           showAlert:true
                    //       }), 2000);
                    //        }
                    //     }
                        
                        
                    // }).catch((error) => {
                    //   console.error(error);
                    // }); 
  
                    setTimeout(() => this.setState({
                      // visible: true,
                      showAlert:true
                  }), 2000);
                  },
                  onHidden: () => {
                      // calls on toast\`s hide animation end.
                  }
              });
  
              setTimeout(function () {
                Toast.hide(toast);
            }, 5000);
                }
                else{
                  fetch('https://carnegiehillfintech.com/primeclientApi/Api/check_balance',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
               
                        id: this.state.user,
                        
                      })
                  }).then((response) => response.json())
                  .then((responseJson) => {
                      this.setState( { data: responseJson });
                       console.log(this.state.data)
                      if(this.state.data['status']==1){
                         this.setState({
                            balanceData:this.state.data['data']
                         })
                         console.log(this.state.balanceData)
                         if(this.state.balanceData['status']==0){
                          setTimeout(() => this.setState({
                            visible: true,
                            
                        }), 2000);
                         }
                      }
                      
                      
                  }).catch((error) => {
                    console.error(error);
                  }); 
                }
                var counti= 
               console.log(this.state.notification)
                
            }).catch((error) => {
              console.error(error);
            });

            this.timer = setInterval(()=> this.getapis(), 5000)
            
    }

    getapis=()=>{
      fetch('https://carnegiehillfintech.com/primeclientApi/Api/unread_notifications',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
   
            id: this.state.user,
            
          })
      }).then((response) => response.json())
      .then((responseJson) => {
          this.setState( { newdata: responseJson });
          console.log(this.state.newdata)
          
          // console.log(this.state.notification)
          // console.log( counti)
          if(this.state.newdata['status']=="1"){

            this.setState({ notification: this.state.newdata['data'] })
            this.setState({alert:this.state.notification})
          var counti = Object.keys(this.state.notification).length;
          this.setState({
            count:counti,
            status:this.state.newdata['status']
          })
          
          // console.log(this.state.status1) 
          }
          
          
          
         console.log(this.state.notification)
          
      }).catch((error) => {
        console.error(error);
      });
    }

    // read_notifications=()=>{
    //   fetch('https://carnegiehillfintech.com/primeclientApi/Api/unread_notifications',{
    //               method: 'POST',
    //               headers: {
    //                   Accept: 'application/json',
    //                   'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
             
    //                   id: this.state.user,
                      
    //                 })
    //             }).then((response) => response.json())
    //             .then((responseJson) => {
    //                 this.setState( { newdata: responseJson });
    //                 console.log(this.state.newdata)
                    
    //                 // console.log(this.state.notification)
    //                 // console.log( counti)
    //                 if(this.state.newdata['status']=="1"){
      
    //                   this.setState({ notification: this.state.newdata['data'] })
    //                   this.setState({alert:this.state.notification})
    //                 var counti = Object.keys(this.state.notification).length;
    //                 this.setState({
    //                   count:counti,
    //                   status:this.state.newdata['status']
    //                 })
                    
    //                 // console.log(this.state.status1)
    
    //               //   let toast= Toast.show("You have recieved "+counti+" Notification", {
    //               //     duration: Toast.durations.LONG,
    //               //     position: Toast.positions.TOP,
    //               //     shadow: true,
    //               //     animation: true,
    //               //     hideOnPress: true,
    //               //     delay: 0,
                      
    //               //     onHide: () => {
    //               //       setTimeout(() => this.setState({
    //               //         // visible: true,
    //               //         showAlert:true
    //               //     }), 2000);
    //               //     },
    //               //     onHidden: () => {
    //               //         // calls on toast\`s hide animation end.
    //               //     }
    //               // });
    //                 }
                    
                    
    //             }).catch((error) => {
    //               console.error(error);
    //             });
    // }

  componentDidMount(){

    this._loadInitialState().done()


   

  }

  

   render(){
   
   

    return(
        

      <View style={styles.nav}>
      
      <TouchableOpacity
       onPress={() => {
        this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Dashboard' })
          ],
        }))
      }} >
        
              <View style={{ marginTop:0, borderRadius:50}}>
              {/* <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/home.png')}/> */}
              <SvgXml xml={this.props.Page=="Home"?home2:home} width="30" height="30" />
              </View>
              <Text style={{fontFamily:"Raleway-Bold"}}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Transiction' , params:{id:this.props.UserId, name:this.state.name} })
                ],
              })) 
            }} >
              <View style={{ marginTop:0, borderRadius:50, alignItems:"center"}}>
              {/* <Image style={{height:35, marginLeft:20, width:35, resizeMode:"contain"}} source={require('../assets/images/transiction.png')}/> */}
              <SvgXml xml={this.props.Page=="Transiction"?transiction2:transiction} width="30" height="30" />
              </View>
              <Text style={{fontFamily:"Raleway-Bold"}}>Transaction</Text>
          </TouchableOpacity>
         <TouchableOpacity
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Notification' , params:{id:this.props.UserId, name:this.state.name} })
              ],
            })) 
          }}>
               <View style={{  marginTop:0, borderRadius:50}}>
               {/* <Image style={{height:35, width:35, resizeMode:"contain"}}  source={require('../assets/images/inbox.png')}/> */}
               <SvgXml xml={this.props.Page=="Inbox"?inbox2:inbox} width="30" height="30" />
               </View>
                {
                  this.state.status=="1"? <View style={{heigh:20, width:20, position:"absolute", top:0, left:15, borderRadius:10, backgroundColor:"#f00"}}>
                  <Text style={{color:"#fff", textAlign:"center"}}>{this.state.count.toString()}</Text>
                  </View>:null
                } 
                <Text style={{fontFamily:"Raleway-Bold"}}>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'UserProfile' , params:{id:this.props.UserId, name:this.state.name} })
                ],
              })) 
            }}>
               <View style={{  marginTop:0, borderRadius:50}}>
               {/* <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/user.png')}/> */}
               <SvgXml xml={this.props.Page=="Profile"?user2:user} width="30" height="30" />
               </View>
                <Text style={{fontFamily:"Raleway-Bold"}}>User</Text>
          </TouchableOpacity>
      </View>
          )
   }
}

export default  withNavigation(Footer);