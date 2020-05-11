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
import CodeInput from 'react-native-confirmation-code-input';
import OtpInputs from 'react-native-otp-inputs'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class BuyDollars extends Component{
  
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            checkotp:false,
            cellno:"",
            isDisable:false
            }
        }
    otpRef = React.createRef()
 
    clearOTP = () => {
      otpRef.current.clear()
    }

    checkOtp=(code)=>{
        // Alert.alert(code)
        console.log(code)
        // this.state.value= code.nativeEvent.text
        this.setState({
            value:code
        })
        console.log(this.state.value)
    }
    componentDidMount(){
     console.log(this.props.navigation.state.params.rates)
     Immersive.on()
     Immersive.setImmersive(true)
       this._loadInitialState().done();
    }

    _loadInitialState= async() =>{
   
     //  Alert.alert(await AsyncStorage.getItem('user'));
       this.setState({
         user:await AsyncStorage.getItem('user')
       })

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
              
              this.setState({ myData: this.state.data['data'] })
            //  console.log(this.state.myData)
              this.setState({
                name: this.state.myData['first_name'],
                cellno:this.state.myData['cellphone']
                
              })
              // console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
       
          }).catch((error) => {
            console.error(error);
          });

     }

    handleSubmit=()=>{
        console.log(this.props.navigation.state.params.type)
        this.setState({
             isDisable:true
        })
        if(this.props.navigation.state.params.type=="buy_dollar"){
            console.log(JSON.stringify({
                otp:this.state.value,
                otpid: this.props.navigation.state.params.otpid,
                id: this.props.navigation.state.params.id,
                amount: this.props.navigation.state.params.amount,
                credit_dollar: this.props.navigation.state.params.credit_dollar,
                debit_peso: this.props.navigation.state.params.debit_peso,
           }))
               fetch('https://carnegiehillfintech.com/primeclientApi/Api/buy_dollar_request',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otp:this.state.value,
                        otpid: this.props.navigation.state.params.otpid,
                        id: this.props.navigation.state.params.id,
                        amount: this.props.navigation.state.params.amount,
                        credit_dollar: this.props.navigation.state.params.credit_dollar,
                        debit_peso: this.props.navigation.state.params.debit_peso,

                   })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                    this.setState({ myData: this.state.data['data'] })
                    if(this.state.data['status']==1){
                         this.props.navigation.navigate("RequestCompleted",{id:this.props.navigation.state.params.id});
                    }
                    else{
                         this.setState({
                              checkotp:true,
                              isDisable:false
                          })
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
        }
        else if(this.props.navigation.state.params.type=="sell_dollar"){
            console.log(JSON.stringify({
                otp:this.state.value,
                otpid: this.props.navigation.state.params.otpid,
                 id: this.props.navigation.state.params.id,
                 amount:this.props.navigation.state.params.amount,
                 debit_dollar:this.props.navigation.state.params.debit_dollar,
                 credit_peso:this.props.navigation.state.params.credit_peso,
            }))
            fetch('https://carnegiehillfintech.com/primeclientApi/Api/sell_dollar_request',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otp:this.state.value,
                        otpid: this.props.navigation.state.params.otpid,
                         id: this.props.navigation.state.params.id,
                         amount:this.props.navigation.state.params.amount,
                         debit_dollar:this.props.navigation.state.params.debit_dollar,
                         credit_peso:this.props.navigation.state.params.credit_peso,
                    })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                   
                    this.setState({ myData: this.state.data['data'] })

                    if(this.state.data['status']==1){
                         console.log("hello")
                         this.props.navigation.navigate("RequestCompleted",{id:this.props.navigation.state.params.id});
                    }
                    else{
                         this.setState({
                              checkotp:true,
                              isDisable:false
                          })
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
        }
        else if(this.props.navigation.state.params.type=="time_deposit"){
            console.log(JSON.stringify({
                otp:this.state.value,
                otpid: this.props.navigation.state.params.otpid,
                 id: this.props.navigation.state.params.id,
                 amount:this.props.navigation.state.params.amount,
                //  debit_dollar:this.props.navigation.state.params.value,
                rate : this.props.navigation.state.params.rate
            }))
            fetch('https://carnegiehillfintech.com/primeclientApi/Api/time_deposit_request',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otp:this.state.value,
                        otpid: this.props.navigation.state.params.otpid,
                         id: this.props.navigation.state.params.id,
                         amount:this.props.navigation.state.params.amount,
                        //  debit_dollar:this.props.navigation.state.params.value,
                        rate : this.props.navigation.state.params.rate
                    })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                    this.setState({ myData: this.state.data['data'] })
                    if(this.state.data['status']==1){
                         this.props.navigation.navigate("RequestCompleted",{id:this.props.navigation.state.params.id});
                    }
                    else{
                         this.setState({
                              checkotp:true,
                              isDisable:false
                          })
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
        }
        else if(this.props.navigation.state.params.type=="fixed_income"){
            console.log(JSON.stringify({
                otp:this.state.value,
                otpid: this.props.navigation.state.params.otpid,
                 id: this.props.navigation.state.params.id,
                 amount:this.props.navigation.state.params.amount,
                 rates:1+","+this.props.navigation.state.params.rates,
                 debit_peso:this.props.navigation.state.params.debit_peso,
                 // credit_peso:debit_peso.toString() 
            }))
            fetch('https://carnegiehillfintech.com/primeclientApi/Api/fixed_income_request',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        otp:this.state.value,
                        otpid: this.props.navigation.state.params.otpid,
                         id: this.props.navigation.state.params.id,
                         amount:this.props.navigation.state.params.amount,
                         rates:1+","+this.props.navigation.state.params.rates,
                         debit_peso:this.props.navigation.state.params.debit_peso,
                         // credit_peso:debit_peso.toString() 
                    })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                    this.setState({ myData: this.state.data['data'] })
                    if(this.state.data['status']==1){

                        
                         this.props.navigation.navigate("RequestCompleted",{id:this.props.navigation.state.params.id});
                    }
                    else{
                         this.setState({
                              checkotp:true,
                              isDisable:false
                          })
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
        }
    }

    resendotp=()=>{
         console.log(JSON.stringify({
          //     otp:this.state.value,
              otpid: this.props.navigation.state.params.otpid,
               id: this.props.navigation.state.params.id,
               type:this.props.navigation.state.params.tType,

          //     //  debit_dollar:this.props.navigation.state.params.value,
          //     rate : this.props.navigation.state.params.rate
          }))
     fetch('https://carnegiehillfintech.com/primeclientApi/Api/resend_transactions_otp',{
          method: 'POST',
          headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          //     otp:this.state.value,
              otpid: this.props.navigation.state.params.otpid,
               id: this.props.navigation.state.params.id,
               type:this.props.navigation.state.params.tType,

          //     //  debit_dollar:this.props.navigation.state.params.value,
          //     rate : this.props.navigation.state.params.rate
          })
     }).then((response) => response.json())
     .then((responseJson) => {
          this.setState( { data: responseJson });
          this.setState({ myData: this.state.data['data'] })
          if(this.state.data['status']==1){
              Alert.alert("OTP resent")
          }
          else{
              Alert.alert(this.state.data['message'])
              
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
                   <View style={{width:"100%", height:150, justifyContent:"center"}}>
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
                             <TouchableOpacity style={[styles.Whitebtn,{marginBottom:20, backgroundColor:"#DEDF38"}]}
                              onPress={this.handleSubmit} disabled={this.state.isDisable} >
                                 <Text style={[styles.blackText,{color:"#fff"}]}>Send</Text>
                             </TouchableOpacity>
                             
                         </View> 
                   <Text style={{fontSize:18, textAlign:"center", marginTop:15, fontFamily:"Raleway-Regular"}}>Please type the verification code sent to your cellphone {this.state.cellno}.</Text>
                    <Text style={{fontSize:18, textAlign:"center", marginTop:15, fontFamily:"Raleway-Regular"}}>If the boxes turned ‘red,’ double check your verification code. Otherwise please press resend code.</Text>
                    {this.state.checkotp?
                    <View>
                        <Text style={{color:"#f00"}}>You entered wrong OTP. Try again</Text>
                    <TouchableOpacity
                     onPress={this.resendotp}>
                        <Text style={{fontSize:18, textAlign:"center", color:"#0FAD01", marginTop:15, fontFamily:"Raleway-Regular"}}>Resend Code</Text>
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