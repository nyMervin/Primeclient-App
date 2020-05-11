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
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import styles from '../assets/style/Stylesheet';
import CodeInput from 'react-native-confirmation-code-input';
import OtpInputs from 'react-native-otp-inputs'
import { Immersive } from 'react-native-immersive'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class BuyDollars extends Component{
  
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            checkotp:false,
            isDisable:false
            }
        }
    otpRef = React.createRef()
 
    clearOTP = () => {
      otpRef.current.clear()
    }

    checkOtp=(code)=>{
        // Alert.alert(code)
        this.setState({
            checkotp:false
        })
        console.log(code)
        // this.state.value= code.nativeEvent.text
        this.setState({
            value:code
        })
        console.log(this.state.value)
    }
    componentDidMount(){
        Immersive.on()
        Immersive.setImmersive(true)
       console.log( this.props.navigation.state.params.value)
    }

    handleSubmit=()=>{
        console.log(JSON.stringify({
            otp:this.state.value,
            id: this.props.navigation.state.params.id,
           

       }))
       this.setState({
           isDisable:true
       })
        fetch('https://carnegiehillfintech.com/primeclientApi/Api/check_reg_otp',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otp:this.state.value,
                        id: this.props.navigation.state.params.id,
                       

                   })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                    this.setState({ myData: this.state.data['data'] })
                    if(this.state.data['status']==1){
                         this.props.navigation.navigate("Agree",{id:this.props.navigation.state.params.id});
                    }
                    else{
                        this.setState({
                            checkotp:true,
                            isDisable:false
                        })
                        // Alert.alert('Error!',this.state.data['message'],[
                        //     {
                        //       'text':'Ok',
                        //     //   onPress:() => {
                        //     //       this.props.navigation.navigate("Login");
                        //     //     }
                        //       onPress:()=>{
                        //         this.props.navigation.dispatch(StackActions.reset({
                        //           index: 0,
                        //           actions: [
                        //             NavigationActions.navigate({ routeName: 'Signup' })
                        //           ],
                        //         }))
                        //       }
                        //     }
                        //   ])
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
    }

    render(){
        return(
           <View style={{width:"100%", height:"100%"}}>
               <ScrollView>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
                <View style={{width:"100%", flexDirection:'row', alignItems:"center" }}>
                <TouchableOpacity
             onPress={() => {
                this.props.navigation.navigate("Dashboard");
              }}>
               <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
            </TouchableOpacity>{/* <Text style={{fontSize:22, marginRight:20, marginTop:30, textDecorationLine:"underline"}}>HI JOHN</Text> */}
                </View>
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                   <View style={{width:"100%", height:180, justifyContent:"center"}}>
                        <Text style={[styles.titleText,{fontSize:35}]}>Verification Code</Text>
                        {/* <Text style={[styles.titleText,{fontSize:17}]}>($10,000 and above)</Text> */}
                       {/* <Button title="Clear" onPress={this.clearOTP} /> */}
                        <OtpInputs
                        ref={this.otpRef}
                        handleChange={code => this.checkOtp(code)}
                        numberOfInputs={5}
                        inputStyles={{borderColor:'#f00', borderWidth:1}}
                       
                        inputStyles={[styles.otpContainer,{borderColor:this.state.checkotp?"#f00":"#000"}]}
                        
                        />
                       
                   </View> 
                   <View style={styles.btnView}>
                             <TouchableOpacity style={[styles.Whitebtn,{marginBottom:30, backgroundColor:"#DEDF38"}]}
                              onPress={this.handleSubmit} disabled={this.state.isDisable} >
                                 <Text style={[styles.blackText,{color:"#fff"}]}>Send</Text>
                             </TouchableOpacity>
                             
                         </View> 
                   <Text style={{fontSize:18, textAlign:"center", marginTop:20, fontFamily:"Raleway-Regular"}}>Please type the verification code sent to your cellphone.</Text>
                   
                    {/* <Text style={{fontSize:18, textAlign:"center", marginTop:20, fontFamily:"Raleway-Regular"}}>If the boxes turned ‘red,’ 
                    double check your verification code. Otherwise please press resend code.</Text> */}
                   {this.state.checkotp?
                    <View>
                        <Text style={{color:"#f00"}}>You entered wrong otp. Try again</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize:18, textAlign:"center", color:"#0FAD01", marginTop:20, fontFamily:"Raleway-Regular"}}>Resend Code</Text>
                    </TouchableOpacity>
                    </View>:null}
                </View>
                
            </View>
        </View>
           </ScrollView>
            {/* <View style={styles.nav}>

            <TouchableOpacity>
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/home.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/transiction.png')}/>
                </TouchableOpacity>
               <TouchableOpacity>
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/inbox.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/user.png')}/>
                </TouchableOpacity>
            </View> */}
            
           </View>
        );
    }
}