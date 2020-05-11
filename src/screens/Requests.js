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
// import Snackbar from 'react-native-snackbar';
import {showSnackBar} from '@prince8verma/react-native-snackbar';
import Snackbar from '@prince8verma/react-native-snackbar';
// import Snackbar from 'react-native-snackbar-component';
import Header from './Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Requests extends Component{

    constructor(props) {
        super(props);
        this.state={
           buyingRate:'',
           sellingRate:'',
           timeDepositefor1M:"",
           timeDepositefor5M:"",
           snackIsVisible: false,
           user:"",
           count:'',
           temparry:[]
        }
    }

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
        console.log(JSON.stringify({
       
            id: this.props.navigation.state.params.id,
            
          }))

        fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_transaction',{
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
              this.setState( { newdata: responseJson });
             console.log(this.state.newdata)
             this.setState({
                temparry:this.state.newdata['data']
             })
            //  this.state.temparry= this.state.data
              
          }).catch((error) => {
            console.error(error);
          });

          this.fetchData()
    }

    fetchData=()=>{
        console.log(this.state.user)
    }
    
    // _fetchData = async () => {
    //   try {
    //     await fetch('https://mywebsite.com/endpoint/');
    //     // alertWithType parameters: type, title, message, payload, interval.
    //     // There are 4 pre-defined types: info, warn, success, error.
    //     // payload object with source property overrides image source prop. (optional)
    //     // interval overrides closeInterval prop. (optional)
    //     this.dropDownAlertRef.alertWithType('success', 'Success', 'Fetch data is complete.');
    //   } catch (error) {
    //     this.dropDownAlertRef.alertWithType('error', 'Error', error.message);
    //   }
    // };

   
    render(){
        // const name= this.props.navigation.state.params.data['first_name']
        // console.log(this.props.navigation.state.params.data)
        // console.log(this.state.user)
        return(
           <View style={{flex:1, height:"100%"}}>
           
               <ScrollView>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
            <Header Name={this.props.navigation.state.params.name} />
                
                <Text style={{fontSize:28, textAlign:"center", marginBottom:20, marginTop:30}}>Pending Request</Text>
               {

                    this.state.temparry.map((value, index)=>{
                        return(
                        
                            <View style={styles.list} key={index}>
                            <View style={{width:"60%", alignItems:"center"}}>
                            {  
                                value.type=="Buy Dollar"?<Text style={{fontSize:17}}>Bought U.S. Dollars </Text>
                                :<Text style={{fontSize:17}}>Sold U.S. Dollars </Text>
                            }
                               <Text style={{fontSize:17, color:"#0f0"}}>Compeleted</Text>
                            </View>
                            { value.type=="Buy Dollar"?<View style={{width:"40%"}}>
                              <Text style={{fontSize:17}}>${value.credit_amount}</Text>
                              <Text style={{fontSize:17}}>₱{value.debit_amount}</Text>
                            </View>:<View style={{width:"40%"}}>
                              <Text style={{fontSize:17}}>${value.debit_amount}</Text>
                              <Text style={{fontSize:17}}>₱{value.credit_amount}</Text>
                            </View>}
                         </View>
                        )
                    } 
                    )
                   
               }
                
            </View>
        </View>
           </ScrollView>
            <View style={styles.nav}>

            <TouchableOpacity
              
              onPress={() => {
                 this.props.navigation.navigate("Dashbaord",{id:this.state.user,});
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
                  <TouchableOpacity>
                       <Image style={{height:35, width:35, resizeMode:"contain"}} source={require('../assets/images/user.png')}/>
                       <Text>User</Text>
                  </TouchableOpacity>
            </View>
            <Snackbar id={"root_app"}/>
            
           </View>
        );
    }
}