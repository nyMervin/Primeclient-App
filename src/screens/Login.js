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
import Modal from 'react-native-modal';
import { Immersive } from 'react-native-immersive'
import styles from '../assets/style/Stylesheet';
import Snackbar from 'react-native-snackbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
            password:'',
            UserEmail:'',
            isusername: true,
            ispassword: true, 
            user:'',
            visibleModalId: null,
            showforget:false,
            isDisable:false
        }
    }

    renderModalContent = () => (
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Cellphone No.</Text>
          <View style={{width:"100%", marginLeft:20, marginRight:20}}>
              <TextInput style={styles.modalinputs}
                            placeholder=""
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(cellno) => this.setState({cellno})}/>
          </View>
          {/* <TouchableHighlight style={styles.closeBtn}
           >
            
              <Text style={{color:"#02a8ee", textAlign:"center", marginTop:12}}>Submit</Text>
    
          </TouchableHighlight> */}
          <TouchableHighlight style={styles.closeBtn}
                  onPress={ this.sendOtp}>
                    <Text style={{color:"#02a8ee", textAlign:"center", marginTop:12}}>Submit</Text>
            </TouchableHighlight>
          {/* <Button style={{marginTop:20}} title="submit" onPress={() => this.setState({ visibleModal: null })}></Button> */}
          
        </View>
      );

    onSubmit=async()=>{

        if(this.state.UserEmail==""){
            this.setState({
                isusername:false
            })
            Snackbar.show({
                title: 'Email is required',
                backgroundColor:'#f00',
                color:'#fff',
                duration: Snackbar.LENGTH_SHORT,
              });
        }
        else if(this.state.password==""){
            this.setState({
                ispassword:false
            })
            Snackbar.show({
                title: 'Passowrd is required',
               
                backgroundColor:'#f00',
                color:'#fff',
                duration: Snackbar.LENGTH_SHORT,
              });
        }
        else{
          // alert(this.state.token)
          console.log(JSON.stringify({
            email:this.state.UserEmail,
            password: this.state.password,
            token:this.state.token,
            device_type:"Android"
             }))
             this.setState({
              isDisable:true
             })
            fetch('https://carnegiehillfintech.com/primeclientApi/Api/client_login',{
            method: 'POST',
            headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
       email:this.state.UserEmail,
       password: this.state.password,
       token:await AsyncStorage.getItem('token'),
       device_type:"Android"
        })
      
          }).then((response) => response.json())
          .then((responseJson) => {
            
            //  console.log(responseJson.rows.length);
              this.setState( { data: responseJson });
              console.log(this.state.data['message']);
              console.log(this.state.data['status']);
              this.setState({
                  newdata: this.state.data['data']
              })
            //   var count = Object.keys(responseJson).length;
              console.log(this.state.newdata);
              this.setState({
                  message:this.state.data['message'],
                  status:this.state.data['status']
              })
      // Showing response message coming from server after inserting records.
              if(this.state.data['status']==1){
                // this.props.navigation.navigate("Dashboard",{data:this.state.newdata});
                this.sendToDashbaord()
              }
              else{
                this.setState({
                    ispassword:false,
                    isusername:false,
                    showforget:true,
                    isDisable:false
                })
              }
      
          }).catch((error) => {
            console.error(error);
          });
        }
        
    }

    sendToDashbaord=()=>{
        AsyncStorage.setItem('user',this.state.newdata['id'])
        this.props.navigation.navigate('Dashboard', {
            data: this.state.newdata,
            id:this.state.newdata['id']
        });
    }

    componentDidMount(){
      Immersive.on()
      Immersive.setImmersive(true)
      AppState.addEventListener('change', this.handleAppStateChange);
        this._loadInitialState().done();

        PushNotification.configure({

          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function(token) {
            console.log(token['token'])
            AsyncStorage.setItem('token',token['token'])
          },
        
          // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
          senderID: "91663435700",
          popInitialNotification: true,
          requestPermissions: true
        
        });
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
      
      _loadInitialState= async() =>{
        var value = await AsyncStorage.getItem('user');
        // alert(await AsyncStorage.getItem('token'))
        this.setState({
          token: await AsyncStorage.getItem('token'),
          // DeviceType:await AsyncStorage.getItem('deviceType')
        })
        if( value !== null){
            this.props.navigation.navigate('Dashboard', {
                data: this.state.newdata,
                id: value
            });
        }
      }
    render(){
        return(
            <View style={{width:"100%", height:"100%", backgroundColor:"#DEDF38"}}>
                 <ScrollView>
                 <View style={[styles.container,{height:"100%"}]}>
                 <View style={styles.mainConatiner}>
                     <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
                     <View style={styles.loginContent}>
                         <View style={styles.inputContainer}>
                             {/* <Text>Email Id</Text> */}
                             <TextInput style={[styles.inputs,{borderColor: this.state.isusername
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={UserEmail => this.setState({UserEmail, isusername:true})}/>
                                {/* <Text>Password</Text> */}
                             <TextInput style={[styles.inputs,{borderColor: this.state.ispassword
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}
                                placeholder="Password"
                                secureTextEntry={true}
                                keyboardType={'default'} 
                                underlineColorAndroid='transparent'
                                onChangeText={password => this.setState({password, ispassword:true})}/>
                         </View>
                         {
                             this.state.status==0?<View>
                             <Text style={{color:"#f00", textAlign:"center"}}>{this.state.message}</Text>
                             </View>:null
                         }

                         <View style={styles.btnView}>
                             <TouchableOpacity style={[styles.Whitebtn]}
                              onPress={this.onSubmit} disabled={this.state.isDisable}>
                                 <Text style={styles.blackText}>SIGN IN</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.Textbtn}
                              onPress={() => {
                                this.props.navigation.navigate("Signup");
                              }}>
                                 <Text style={styles.whiteText}>SIGN UP</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.Textbtn, {marginTop:0}]}
                              onPress={() => {
                                this.props.navigation.navigate("Help");
                              }}>
                                 <Text style={styles.whiteText}>HELP</Text>
                             </TouchableOpacity>
                             {this.state.showforget?<TouchableOpacity style={[styles.Textbtn, {marginTop:0}]}
                               onPress={() => {
                                this.props.navigation.navigate("ForgotPassowrd");
                              }} >
                                 <Text style={styles.whiteText}>Forgot Password</Text>
                             </TouchableOpacity>:null}
                             <Modal
                                isVisible={this.state.visibleModal === 'fancy'}
                                backdropColor="#B4B3DB"
                                backdropOpacity={0.8}
                                animationIn="zoomInDown"
                                animationOut="zoomOutUp"
                                animationInTiming={600}
                                animationOutTiming={600}
                                backdropTransitionInTiming={600}
                                backdropTransitionOutTiming={600}
                                onBackdropPress={() => this.setState({ visibleModal: null })}
                                >
                                {this.renderModalContent()}
                                </Modal>
                         </View>
                         {/* <View style={styles.inputContainer}>
                             
                         </View> */}
                     </View>
                 </View>
             </View>
             </ScrollView>
            </View>
        );
    }
}