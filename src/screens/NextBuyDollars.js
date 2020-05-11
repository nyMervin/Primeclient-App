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
import { StackActions, NavigationActions } from 'react-navigation';
import Header from './Header';
import styles from '../assets/style/Stylesheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class NextBuyDollars extends Component{

     constructor(props) {
          super(props);
          this.state={
             buyingRate:'',
             sellingRate:'',
             timeDepositefor1M:"",
             timeDepositefor5M:"",
             value:"",
             debitRate:''
          }
      }

     componentDidMount(){

          Immersive.on()
    Immersive.setImmersive(true)

          this._loadInitialState().done();
          console.log(this.props.navigation.state.params.value)
          fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_rates',{
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
          
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState( { data: responseJson });
                
                this.setState({ myData: this.state.data['data'] })
               
                this.setState({
                  buyingRate: this.state.myData['us_dollar_peso_rate_ew_buying_1y'],
                  sellingRate: this.state.myData['us_dollar_peso_rate_ew_selling_1y'],
                  timeDepositefor1M:this.state.myData['time_deposite_rates_for_1m_1y'],
                  timeDepositefor5M:this.state.myData['time_deposite_rates_for_5m_1y'],
                })
                console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
         
            }).catch((error) => {
              console.error(error);
            });

         var debitPeso= this.props.navigation.state.params.value*this.state.buyingRate 
         this.setState({
              debitRate: debitPeso
         })
     //     console.log(this.state.debitRate)
      }
      _loadInitialState= async() =>{
   
          //  Alert.alert(await AsyncStorage.getItem('user'));
            this.setState({
              user:await AsyncStorage.getItem('user')
            })
          }

          sendrequest=()=>{
               // var amount= props.navigation.state.params.value
              var debit_peso=this.props.navigation.state.params.value*this.state.sellingRate
               // console.log(JSON.stringify({
               
               //      id: this.state.user,
               //      amount:this.props.navigation.state.params.value,
               //      credit_dollar:this.props.navigation.state.params.value,
               //      debit_peso:debit_peso.toString() 
               // }))
               fetch('https://carnegiehillfintech.com/primeclientApi/Api/transactions_otp',{
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
               
                         id: this.state.user,
                         type:"Buy Dollar",
                        
                    })
               }).then((response) => response.json())
               .then((responseJson) => {
                    this.setState( { data: responseJson });
                    this.setState({ myData: this.state.data['data'] })
                    console.log(this.state.myData)
                    if(this.state.data['status']==1){
                         
                         // var value= 
                         Alert.alert('Send OTP',this.state.data['message'],[
                              {
                                'text':'Ok',
                                onPress:() => {
                                  this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [
                                      NavigationActions.navigate({ routeName:'OtpScreen', 
                                      params: {
                                        otpid:this.state.myData,
                                        id: this.state.user,
                                        amount:this.props.navigation.state.params.value,
                                        credit_dollar:this.props.navigation.state.params.value,
                                        debit_peso:debit_peso.toString(),
                                        type:"buy_dollar",
                                        tType:"Buy Dollar"
                                     } })
                                    ],
                                  }))
                                  }
                               
                              }
                            ])
                         // this.props.navigation.navigate("OtpScreen",{
                         //      otpid:this.state.myData,
                         //      id: this.state.user,
                         //      amount:this.props.navigation.state.params.value,
                         //      credit_dollar:this.props.navigation.state.params.value,
                         //      debit_peso:debit_peso.toString(),
                         //      type:"buy_dollar",
                         //      tType:"Buy Dollar"
                         //   });
                    }
                   
               }).catch((error) => {
                    console.error(error);
               });
               
             

               
          }

    render(){
         const debit= this.props.navigation.state.params.value*this.state.sellingRate
         console.log(debit)
     //     console.log(this.state.debitRate)
        return(
           <View style={{width:"100%", height:"100%"}}>
               <ScrollView>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
            <Header Name={this.props.navigation.state.params.name} />
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                   <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>U.S Dollars/Peso</Text>
                        {/* <Text style={[styles.titleText,{fontSize:17}]}>($10,000 and above)</Text> */}
                        <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between',
                         padding:10}}>
                             <Text style={{ fontSize:17}}>EW is Selling $ at </Text>
                             <Text style={{color:"#f00", fontSize:17}}>₱ {this.state.sellingRate}</Text>
                        </View>
                        <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between',
                         padding:10}}>
                             <Text style={{ fontSize:17}}>EW is Buying $ at </Text>
                             <Text style={{color:"#f00", fontSize:17}}>₱ {this.state.buyingRate}</Text>
                        </View>
                       
                   </View> 
                   <View style={[styles.TextContainer,{marginTop:30}]}>
                        <Text style={[styles.titleText,{marginTop:10, marginBottom:20}]}>Buy Dollars</Text>
                        {/* <Text style={[styles.titleText,{fontSize:17}]}>($10,000 and above)</Text> */}
                        <View style={{width:"100%", padding:10}}>
                             <Text style={{ fontSize:17, textAlign:"center"}}>How Much?</Text>
                             <View style={[styles.inputbox,{marginLeft:0, justifyContent:"center", alignItems:"center"}]}>
                                  <Text>${this.props.navigation.state.params.value}</Text>
                             </View>
                        </View>
                        <View style={{width:"100%", padding:10}}>
                             <Text style={{ fontSize:17, textAlign:"center"}}>Credit my Dollar Account</Text>
                             <View style={[styles.inputbox,{marginLeft:0, justifyContent:"center", alignItems:"center"}]}>
                                  <Text>${this.props.navigation.state.params.value}</Text>
                             </View>
                        </View>
                        <View style={{width:"100%", padding:10}}>
                             <Text style={{ fontSize:17, textAlign:"center"}}>DEBIT my Peso Account</Text>
                             <View style={[styles.inputbox,{marginLeft:0, justifyContent:"center", alignItems:"center"}]}>
                                  <Text>₱{debit}</Text>
                             </View>
                        </View>
                       
                   </View> 
                    
                   <View style={{width:"100%", padding:10}}>
                         <TouchableOpacity
                          onPress={this.sendrequest}>
                                 <Text style={{textDecorationLine:"underline", fontWeight:"bold", fontSize:24,
                                  textAlign:"center", marginBottom:35}}>Confirm</Text>
                             </TouchableOpacity>
                        </View>  
                </View>
                
            </View>
        </View>
           </ScrollView>
            <View style={styles.nav}>
            <TouchableOpacity
              
              onPress={() => {
                 this.props.navigation.navigate("Dashboard",{id:this.state.user,});
               }} >
                      <View
                        styles={{alignItems:"center", marginBottom: 10,}}>
                      <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/home.png')}/>
                       <Text>Home</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                   onPress={() => {
                      this.props.navigation.navigate("Transiction",{id:this.state.user, name:this.props.navigation.state.params.name});
                    }}>
                       <Image style={{height:35, width:35, marginLeft:20, resizeMode:"contain"}} source={require('../assets/images/transiction.png')}/>
                       <Text>Transaction</Text>
                  </TouchableOpacity>
                 <TouchableOpacity
                 
                  onPress={() => {
                      this.props.navigation.navigate("Notification",{id:this.state.user, name:this.props.navigation.state.params.name});
                    }}>
                       <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/inbox.png')}/>
                       <Text>Inbox</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                   onPress={() => {
                    this.props.navigation.navigate("UserProfile",{id:this.state.user, name:this.props.navigation.state.params.name});
                  }}>
                       <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/user.png')}/>
                       <Text>User</Text>
                  </TouchableOpacity>
            </View>
            
           </View>
        );
    }
}