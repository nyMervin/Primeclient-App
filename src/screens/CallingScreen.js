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
  Linking,
  Alert,ScrollView,WebView
} from 'react-native';
import styles from '../assets/style/Stylesheet';
import CodeInput from 'react-native-confirmation-code-input';
import OtpInputs from 'react-native-otp-inputs'
import { Immersive } from 'react-native-immersive'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class CallingScreen extends Component{
  
  constructor(props) {
    super(props);
    this.state={
      bankNumber:""
    }
}
    otpRef = React.createRef()

    _loadInitialState= async() =>{
   
      //  Alert.alert(await AsyncStorage.getItem('user'));
        this.setState({
          user:await AsyncStorage.getItem('user')
        })
      }
      componentDidMount(){
        this._loadInitialState().done();
        Immersive.on()
        Immersive.setImmersive(true)
        fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_user_info',{
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
     
              id: this.props.navigation.state.params.id,
              
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState( { data: responseJson });
            
            this.setState({ myData: this.state.data['data'] })
           console.log(this.state.myData)
            this.setState({
             accountOfficer_cell: this.state.myData['account_officer_cell'],
              
            })
            console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
     
        }).catch((error) => {
          console.error(error);
        });

        fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_numbers',{
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
     
              id: this.props.navigation.state.params.id,
              
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState( { numbers: responseJson });
            var numbersData= this.state.numbers["data"]
           var bankdata= numbersData[1]
           var bankNumber= bankdata['phone_number']
           this.setState({
            bankNumber:bankNumber
           })
           console.log(numbersData[1]) 
           
           
           
        }).catch((error) => {
          console.error(error);
        });
      }
 
    clearOTP = () => {
      otpRef.current.clear()
    }

    checkOtp=(code)=>{
        Alert.alert(code)
    }

    dialCall = () => {
 
        let phoneNumber = '';
     
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:'+this.state.accountOfficer_cell;
        }
        else {
          phoneNumber = 'telprompt:'+this.state.accountOfficer_cell;
        }
     
        Linking.openURL(phoneNumber);
      };

      onbankcare =()=>{

        let phoneNumber = '';
     
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:'+this.state.bankNumber;
        }
        else {
          phoneNumber = 'telprompt:'+this.state.bankNumber;
        }
     
        Linking.openURL(phoneNumber);

      }

    render(){
        return(
           <View style={{width:"100%", height:"100%"}}>
               <ScrollView>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
                <View style={{width:"100%", flexDirection:'row', alignItems:"center" }}>
                   <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
                   {/* <Text style={{fontSize:22, marginRight:20, marginTop:30, textDecorationLine:"underline"}}>HI JOHN</Text> */}
                </View>
                <Text style={{fontSize:28, textAlign:"center", marginTop:30}}>Who do your want to  Call?</Text>
                 <View style={{flex:2, paddingTop:50, paddingBottom:50, height:"90%", justifyContent:"center", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                        <TouchableOpacity
                         style={{ width:130,}}
                         onPress={this.onbankcare}>
                        <Image source={require('../assets/images/CustomerCare.png')} style={{height:130, width:130, resizeMode:"contain"}} />
                        </TouchableOpacity>
                      <Text style={{fontSize:28, textAlign:"center"}}>Bank Costumer Care</Text>
                  
                </View>
                <View style={{flex:2, paddingTop:50, paddingBottom:50, height:"90%", justifyContent:"center", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                       <TouchableOpacity
                       style={{ width:130,}}
                       onPress={this.dialCall}>
                       <Image source={require('../assets/images/OfficerCell.png')} style={{height:130, width:130, resizeMode:"contain"}} />
                       </TouchableOpacity>
                       <Text style={{fontSize:28, textAlign:"center"}}>Account Officer Cell</Text>
                  
                </View>
                
            </View>
        </View>
           </ScrollView>
            
            
           </View>
        );
    }
}