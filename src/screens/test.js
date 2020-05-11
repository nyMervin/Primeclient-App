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
// import Snackbar from 'react-native-snackbar';
import {showSnackBar} from '@prince8verma/react-native-snackbar';
import Snackbar from '@prince8verma/react-native-snackbar';
// import Snackbar from 'react-native-snackbar-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './Header';
export default class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
           buyingRate:'',
           sellingRate:'',
           timeDepositefor1M:"",
           timeDepositefor5M:"",
           snackIsVisible: false,
           user:"",
           count:''
        }
    }
    _loadInitialState= async() =>{
   
      //  Alert.alert(await AsyncStorage.getItem('user'));
        this.setState({
          user:await AsyncStorage.getItem('user')
        })
      }

    componentDidMount=()=>{
    //  const renderContent = () => 
      
    //   showSnackBar({
    //     message:<Text><Text>This is a sentence</Text>
    //     <Text style={{fontWeight: "bold"}}> with</Text>
    //     <Text> one word in bold</Text></Text>,
    //     position: 'top',
    //     // confirmText: 'OK',
    //     backgroundColor: "#323232",
    //     duration: 10000,
       
    // });
        this._loadInitialState().done();

        fetch('https://digimonk.net/primeclient/primeclientApi/Api/get_user_info',{
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
              firstname:this.state.myData['first_name'],
              lastname:this.state.myData['last_name'],
              cellphone:this.state.myData['cellphone'],
              email:this.state.myData['email'],
              primary_peso_account: this.state.myData['primary_peso_account'],
              secondary_peso_account: this.state.myData['secondary_peso_account'],
              us_dollar_account:this.state.myData['us_dollar_account'],
              time_deposit_account:this.state.myData['time_deposit_account'],
              branch:this.state.myData['branch'],
              branch_code:this.state.myData['branch_code'],
              account_officer:this.state.myData['account_officer'],
              account_officer_cell: this.state.myData['account_officer_cell'],

              
            })
            // console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
     
        }).catch((error) => {
          console.error(error);
        });
       

    }

    logout=async() =>{
      var value = await AsyncStorage.removeItem('user')
      if(value==null){
       
       this.props.navigation.navigate('Login');
      }
        
     }
   

   
    render(){
        // const name= this.props.navigation.state.params.data['first_name']
        // console.log(this.props.navigation.state.params.data)
        // console.log(this.state.user)
        return(
           <View>
           
               <ScrollView>
                 <View style={styles.container}>
                <View style={[styles.newConatiner]}>
               <View>
               <Header Name={this.state.firstname} /> 
               </View>
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                  
                   <View style={[styles.TextContainer,{paddingLeft:20, paddingRight:20}]}>
                        {/* <Text style={[styles.titleText,{fontSize:24}]}>What do you want to do?</Text> */}
                        {/* <Text style={[styles.titleText,{fontSize:17}]}>($10,000 and above)</Text> */}
                        <View style={{flexDirection:"row" ,marginBottom:20, marginTop:20, }}>
                            <Image source={require('../assets/images/userProfile.png')} style={{width:65, height:65, resizeMode:"contain"}}></Image>
                            <View style={{marginLeft:20, marginTop:5}}>
                                <Text style={{fontSize:22}}>{this.state.firstname+" "+this.state.lastname}</Text>
                                <TouchableOpacity
                                 onPress={this.logout}>
                                 <Text style={{textDecorationLine:"underline"}}>logout</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={{marginBottom:50}}>
                                <View style={{marginLeft:5, flexDirection:"row"}}>
                                   <Text style={{fontSize:18}}>Phone</Text>
                                   <Text style={{marginLeft:20, marginTop:2}}>{this.state.cellphone}</Text>
                                </View>
                                <View style={{marginLeft:5, flexDirection:"row"}}>
                                   <Text style={{fontSize:18}}>Email</Text>
                                   <Text style={{marginLeft:20, marginTop:2}}>{this.state.email}</Text>
                                </View>
                                <Text style={{fontSize:20, marginBottom:10, marginTop:10}}>Peso Bank Account</Text>
                                <View style={{flexDirection:"row"}}>
                                  <View style={{borderWidth:1, padding:5}}>
                                    <Text style={{fontSize:18}}>{this.state.primary_peso_account}</Text>
                                  </View>
                                  <Text style={{marginTop:6, marginLeft:20}}>primary</Text>
                                </View>
                                {/* <Text style={{fontSize:20, marginBottom:10, marginTop:10}}>Peso Bank Account</Text> */}
                                <View style={{flexDirection:"row", marginTop:10}}>
                                  <View style={{borderWidth:1, padding:5}}>
                                    <Text style={{fontSize:18}}>{this.state.secondary_peso_account}</Text>
                                  </View>
                                  <Text style={{marginTop:6, marginLeft:20}}>Secondry</Text>
                                </View>
                                <Text style={{fontSize:20, marginBottom:10, marginTop:10}}>Dollar Bank Account</Text>
                                <View style={{flexDirection:"row"}}>
                                  <View style={{borderWidth:1, padding:5}}>
                                    <Text style={{fontSize:18}}>{this.state.us_dollar_account}</Text>
                                  </View>
                                  {/* <Text style={{marginTop:6, marginLeft:20}}>primary</Text> */}
                                </View>
                                <Text style={{fontSize:20, marginBottom:10, marginTop:10}}>Time deposite Account</Text>
                                <View style={{flexDirection:"row"}}>
                                  <View style={{borderWidth:1, padding:5}}>
                                    <Text style={{fontSize:18}}>{this.state.time_deposit_account}</Text>
                                  </View>
                                  {/* <Text style={{marginTop:6, marginLeft:20}}>primary</Text> */}
                                </View>
                                <View style={{marginLeft:5, marginTop:10, flexDirection:"row"}}>
                                   <Text style={{fontSize:18}}>Branch</Text>
                                   <Text style={{marginLeft:20, marginTop:2}}>{this.state.branch}</Text>
                                </View>
                                <View style={{marginLeft:5, marginTop:10, flexDirection:"row"}}>
                                   <Text style={{fontSize:18}}>Branch Code</Text>
                                   <Text style={{marginLeft:20, marginTop:2}}>{this.state.branch_code}</Text>
                                </View>
                                <View style={{marginLeft:5, marginTop:10, flexDirection:"row"}}>
                                   <Text style={{fontSize:18}}>Account Officer</Text>
                                   <Text style={{marginLeft:20, marginTop:2}}>{this.state.account_officer}</Text>
                                </View>
                                <View style={{marginLeft:5, marginTop:10, flexDirection:"row"}}>
                                   <Text style={{fontSize:18}}>Account Officer Cell</Text>
                                   <Text style={{marginLeft:20, marginTop:2}}>{this.state.account_officer_cell}</Text>
                                </View>

                                <Text style={{fontSize:16, marginTop:20, marginBottom:30, textDecorationLine:"underline"}}>change your password</Text>
                            </View>
                       

                   </View>

                    
                </View>
                
            </View>
        </View>
           </ScrollView>
            <View style={styles.nav}>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Dashboard",{id:this.state.user, name:this.state.firstname});
              }} >
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/home.png')}/>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={() => {
                    this.props.navigation.navigate("Transiction",{id:this.state.user, name:this.state.firstname});
                  }} >
                     <Image style={{height:35, marginLeft:20, width:35, resizeMode:"contain"}} source={require('../assets/images/transiction.png')}/>
                     <Text>Transaction</Text>
                </TouchableOpacity>
               <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Notification",{id:this.state.user,  name:this.state.firstname});
                }}>
                     
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/inbox.png')}/>
                      {
                        this.state.status=="1"? <View style={{heigh:20, width:20, position:"absolute", top:0, left:15, borderRadius:10, backgroundColor:"#f00"}}>
                        <Text style={{color:"#fff", textAlign:"center"}}>{this.state.count.toString()}</Text>
                        </View>:null
                      } 
                      <Text>Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("UserProfile",{id:this.state.user,  name:this.state.firstname});
                }} >
                   <View style={{ borderColor:"#0f0", marginTop:0, borderWidth:2, borderRadius:50}}>
                     <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/user.png')}/>
                    </View>
                     <Text>User</Text>
                </TouchableOpacity>
            </View>
            <Snackbar id={"root_app"}/>
            
           </View>
        );
    }
}