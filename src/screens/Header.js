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
  AppState,
  Alert,ScrollView,WebView
} from 'react-native';
import styles from '../assets/style/Stylesheet';
import { withNavigation } from 'react-navigation';

import { TouchableOpacity } from 'react-native-gesture-handler';

class Header extends Component{

    constructor(props) {
        super(props);
        this.state={
          date:'',
          time:'',
           
        }
    }

    gettime=()=>{
      var day = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); 
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
          if (day < 10) {
        day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        if (hours < 10) {
          hours = '0' + hours;
          }
          if (min < 10) {
              min = '0' + min;
          }
      var dateTime= day + '/' + month + '/' + year;
      var time= hours+":"+min
      // var newdate= this.state.date.split(' ')
      this.setState({
        date:dateTime,
        time:time
      })
    }

 componentDidMount(){
   

    this.timer = setInterval(()=> this.gettime(), 1000)
    AppState.addEventListener('change', this.handleAppStateChange);
    
 }

 componentWillUnmount() {
  AppState.removeEventListener('change', this.handleAppStateChange);
}

handleAppStateChange(appState) {
  if (appState === 'background') {
    // let date = new Date(Date.now() + (this.state.seconds * 1000));

    // if (Platform.OS === 'ios') {
    //   date = date.toISOString();
    // }

    // PushNotification.localNotificationSchedule({
    //   message: "My Notification Message",
    //   date,
    // });
    console.log("background")
  }
  else if(appState === 'active'){
    console.log("forground")
  }
}

    render(){
        // const { navigate } = this.props.navigation;  
    return(
        <View style={{width:"100%", flexDirection:'row', justifyContent:"space-between" }}>
            <TouchableOpacity
             onPress={() => {
                this.props.navigation.navigate("Dashboard");
              }}>
               <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
            </TouchableOpacity>
             <View>
             <Text style={{fontSize:18, textAlign:"right",marginRight:20, fontFamily:"Raleway-Regular", marginTop:30, }}>Hi {this.props.Name} </Text>
                   <Text style={{fontSize:18, marginRight:20,fontFamily:"Raleway-Regular", marginTop:10, }}>{this.state.date+"  "+this.state.time}</Text>
            </View>     
                
        </View>
    )
    }
}
// onpress=()=>{
        
//     this.props.navigation.navigate("Dashboard");
  
// }
// const Header=({ navigation , Name})=>{
   
//     return(
//                 <View style={{width:"100%", flexDirection:'row', justifyContent:"space-between" }}>
//                     <TouchableHighlight
//                      onPress={() => this.props.navigation.navigate('Dashboard')}>
//                        <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
//                     </TouchableHighlight>
                          
//                            <Text style={{fontSize:22, marginRight:20, marginTop:30, textDecorationLine:"underline"}}>Hi {Name} </Text>
//                 </View>
//             )
// }

export default  withNavigation(Header);