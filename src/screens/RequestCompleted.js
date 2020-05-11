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
import CodeInput from 'react-native-confirmation-code-input';
import OtpInputs from 'react-native-otp-inputs'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ZendeskSupport from '@synapsestudios/react-native-zendesk-support';
import RNZendeskChat from 'react-native-zendesk-ichat';
import { Immersive } from 'react-native-immersive'
export default class RequestCompleted extends Component{
  
    // otpRef = React.createRef()
 
    // clearOTP = () => {
    //   otpRef.current.clear()
    // }
    _loadInitialState= async() =>{
   
      //  Alert.alert(await AsyncStorage.getItem('user'));
        this.setState({
          user:await AsyncStorage.getItem('user')
        })
      }
      componentDidMount(){

        Immersive.on()
        Immersive.setImmersive(true)
        
        this._loadInitialState().done();
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
            email : this.state.myData['email'],
              firstname: this.state.myData['first_name'],
              lastname:  this.state.myData['last_name'],
              cellphone:this.state.myData['cellphone']
            })
            // console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
     
        }).catch((error) => {
          console.error(error);
        });
      }

    // checkOtp=(code)=>{
    //     Alert.alert(code)
    // }

    SupportChat=()=>{
    //   const config = {
    //     appId: "9f3a95dc9e87f2bd0735b62084f40b520a8f9f1dd67a2e95",
    //     zendeskUrl: "https://nytelecon.zendesk.com",
    //     clientId: "mobile_sdk_client_43bd6e7712288b6e79d5"
    //   }
    //   ZendeskSupport.initialize(config);
    //   const options = {
    //     articleVotingEnabled: false,
    //     hideContactSupport: false,
    //     showConversationsMenuButton: true,
    //     withContactUsButtonVisibility: 'OFF'
    //   }
    //   ZendeskSupport.showHelpCenterWithOptions({ options })
    //   ZendeskSupport.showHelpCenterWithOptions({ options })
    // // ZendeskSupport.showCategoriesWithOptions(['categoryId'], { options })
    // // ZendeskSupport.showSectionsWithOptions(['sectionId'], { options })
    // ZendeskSupport.showLabelsWithOptions(['tacocat'], { options })
    //   const identity = {
    //     customerEmail: this.state.email,
    //     customerName: this.state.firstname+" "+this.state.lastname
    //   }
    //   ZendeskSupport.setupIdentity(identity)
          RNZendeskChat.startChat({
            name: this.state.firstname+" "+this.state.lastname,
            email: this.state.email,
            phone: this.state.cellphone,
            tags: [this.state.firstname+"tag1", this.state.firstname+"tag2"],
            department: 'someDepartment'
          })
    }

    render(){
        return(
           <View style={{width:"100%", height:"100%"}}>
               <ScrollView>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff" }]}>
                <View style={{width:"100%", flexDirection:'row', justifyContent:"space-between", alignItems:"center" }}>
                <TouchableOpacity
             onPress={() => {
                this.props.navigation.navigate("Dashboard");
              }}>
               <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
            </TouchableOpacity>
             <TouchableOpacity
              
              onPress={() => {
                 this.props.navigation.navigate("Dashboard");
               }} >
                      
                      <Image style={{height:35, width:35, marginRight:20, resizeMode:"contain"}} source={require('../assets/images/home.png')}/>
                       
                  </TouchableOpacity>
                </View>
                 <View style={{flex:1, paddingTop:50, paddingBottom:50, height:"90%", justifyContent:"center", alignItems:"center", marginTop:5,
                  padding: 20, }}>

                      <Text style={{fontSize:28, fontFamily:"Raleway-Bold", textAlign:"center"}}>Your request has been received</Text>
                  
                </View>
               
                
            </View>
        </View>
           </ScrollView>
            <View style={styles.nav2}>
              
            <View style={{width:"100%", marginBottom:20, flexDirection:"row", justifyContent:"space-between"}}>
                 <TouchableOpacity
                  onPress={this.SupportChat}>
                    <Image source={require('../assets/images/message.png')} style={{height:45, width:50, resizeMode:"contain"}} /> 
                </TouchableOpacity>   
                <TouchableOpacity 
                   onPress={() => {
                    this.props.navigation.navigate("CallingScreen",{id:this.state.user});
                  }}>
                    <Image source={require('../assets/images/call.png')} style={{height:45, width:50, resizeMode:"contain"}} />
                </TouchableOpacity>
                     
            </View>
            
            </View>
            
           </View>
        );
    }
}