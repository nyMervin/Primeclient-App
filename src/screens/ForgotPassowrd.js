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
import Snackbar from 'react-native-snackbar';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Immersive } from 'react-native-immersive'
export default class ForgotPassword extends Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            phone:""
        }
    }
    componentDidMount(){
        // console.log(this.props.navigation.state.params.id)
        Immersive.on()
        Immersive.setImmersive(true)
    }

    onSubmit=()=>{
    //   if(this.state.password==''){
    //     Snackbar.show({
    //       title: 'Password required',
    //       backgroundColor:'#f00',
    //       color:'#fff',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }
    //   else if(this.state.password.length < 5){
    //     Snackbar.show({
    //       title: 'Password must be atleast 6 characters',
    //       backgroundColor:'#f00',
    //       color:'#fff',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }
    //   else if(this.state.confirmPassword==''){
    //     Snackbar.show({
    //       title: 'Repeat password required',
    //       backgroundColor:'#f00',
    //       color:'#fff',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }
    //   else if(this.state.confirmPassword!=this.state.password){
    //     Snackbar.show({
    //       title: 'Repeat Password Not matched',
    //       backgroundColor:'#f00',
    //       color:'#fff',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   } 
    //   else{

    //     console.log(JSON.stringify({
    //       id:this.props.navigation.state.params.id,
    //       password: this.state.password,
    //        }))
     
    //   }

    if(this.state.email==''){
      Snackbar.show({
        title: 'Email required',
        backgroundColor:'#f00',
        color:'#fff',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
   
    else if(this.state.phone==''){
      Snackbar.show({
        title: 'Cellphone number required',
        backgroundColor:'#f00',
        color:'#fff',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
     

    else{

      console.log( JSON.stringify({
        // id:this.props.navigation.state.params.id,
        // password: ,
        email:this.state.email,
      cellphone:this.state.phone
      }))

    fetch('https://carnegiehillfintech.com/primeclientApi/Api/forget_password',{
        method: 'POST',
        headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    //   id:this.props.navigation.state.params.id,
      // password: ,
      email:this.state.email,
      cellphone:this.state.phone
    })
  
      }).then((response) => response.json())
      .then((responseJson) => {
        
        //  console.log(responseJson.rows.length);
          this.setState( { data: responseJson });
          console.log(this.state.data['message']);
          console.log(this.state.data['status']);
          if(this.state.data['status']==1){
            Alert.alert('Sent Otp',this.state.data['message'],[
              {
                'text':'Ok',
                onPress:() => {
                  this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName:'ForgotOTP', params:{id:this.state.data['data']} })
                    ],
                  }))
                  }
               
              }
            ])
            // this.props.navigation.navigate("ForgotOTP",{id:this.state.data['data']});
          }
       
        //   if(this.state.data['status']==1){
           
        //   }
        //   else{
        //       Alert.alert(this.state.data['message'])
        //   }
  
      }).catch((error) => {
        console.error(error);
      });


    }

   
       
    }

    render(){
        return(
            <ScrollView>
                 <View style={styles.container}>
            <View style={styles.newConatiner}>
                <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:20,
                  padding: 20, }}>
                   <Text style={styles.titleText}>Send Your OTP</Text>
                   <Text style={[styles.titleText,{marginBottom:20}]}>Pasword</Text>
                   {/* <Text style={{textAlign:"center", fontSize:15, marginBottom:15}}>
                   Password should be a combination of  6 numbers
                   </Text> */}
                   <Text style={{textAlign:"center", fontSize:17, marginBottom:15}}>Email</Text>
                             <TextInput style={styles.inputs}
                                placeholder="Email"
                                // secureTextEntry={true}
                                keyboardType={'default'} 
                                underlineColorAndroid='transparent'
                                onChangeText={email => this.setState({email})}/>
                                <Text style={{textAlign:"center", fontSize:17,marginBottom:15}}>Cellphone Number</Text>
                             <TextInput style={styles.inputs}
                                placeholder="Cellphone Number"
                                // secureTextEntry={true}
                                keyboardType={'default'} 
                                underlineColorAndroid='transparent'
                                onChangeText={phone => this.setState({phone})}/>
                                 {/* <Text style={{textAlign:"center", fontSize:17,marginBottom:15}}>Confirm Password</Text> */}
                            

                    <View style={styles.btnView}>
                             <TouchableOpacity style={[styles.Whitebtn,{marginBottom:30}]}
                              onPress={this.onSubmit}>
                                 <Text style={styles.blackText}>Send OTP</Text>
                             </TouchableOpacity>
                             
                         </View>
                </View>
                
            </View>
        </View>
            </ScrollView>
        );
    }
}