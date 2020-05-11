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
// import Snackbar from 'react-native-snackbar';
import {showSnackBar} from '@prince8verma/react-native-snackbar';
import Snackbar from '@prince8verma/react-native-snackbar';
// import Snackbar from 'react-native-snackbar-component';
import Header from './Header';
import Footer from './Footer';
import { Immersive } from 'react-native-immersive'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Notification extends Component{

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
           temparry:[],
           temparry1:[]
        }
    }

    _loadInitialState= async() =>{
   
        //  Alert.alert(await AsyncStorage.getItem('user'));
          this.setState({
            user:await AsyncStorage.getItem('user')
          })

          this.fetchData()
        }

    componentDidMount(){

      Immersive.on()
      Immersive.setImmersive(true)
   
        this._loadInitialState().done();
        console.log(JSON.stringify({
       
            id: this.props.navigation.state.params.id,
            
          }))

        

          // fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_transaction',{
          //   method: 'POST',
          //   headers: {
          //       Accept: 'application/json',
          //       'Content-Type': 'application/json'
          //     },
          //     body: JSON.stringify({
       
          //       id: this.props.navigation.state.params.id,
                
          //     })
          // }).then((response) => response.json())
          // .then((responseJson) => {
          //     this.setState( { data: responseJson });
          //    console.log(this.state.data)
          //    var tranData= this.state.data['data']
          //   if(this.state.data['status']==1){
          //    var count= Object.keys(this.state.data['data']).length;
          //     console.log(tranData)
          //     // this.state.temparry.push(this.state.data['data'])
          //     for(let i=0; i<count; ++i){
          //       this.state.temparry.push(tranData)
          //     }
          //     console.log(this.state.temparry)
          //   //   this.setState({
          //   //     temparry1:this.state.data['data']
          //   //  })
          //   }
          //   //  this.state.temparry= this.state.data
              
          // }).catch((error) => {
          //   console.error(error);
          // });

        
    }

    fetchData=()=>{
      fetch('https://carnegiehillfintech.com/primeclientApi/Api/read_notification_f1',{
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

          
          
      }).catch((error) => {
        console.error(error);
      });


      fetch('https://carnegiehillfintech.com/primeclientApi/Api/read_notification_fall',{
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
          // alert("getnotification")
          
          
      }).catch((error) => {
        console.error(error);
      });

        fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_notifications',{
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
              this.setState( { newdata: responseJson });
             console.log(this.state.newdata)
             if(this.state.newdata['status']==1){
                
             this.setState({
              temparry:this.state.newdata['data']
           })
             }
            //  this.state.temparry= this.state.data
              
          }).catch((error) => {
            console.error(error);
          });

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
                 <View style={[styles.container,{marginBottom:60}]}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff",}]}>
            <View>
               <Header Name={this.props.navigation.state.params.name} /> 
               </View>
               
                <Text style={{fontSize:28, textAlign:"center", marginBottom:20, marginTop:30}}>Inbox</Text>
               {
                  this.state.temparry.map((value, index)=>{
                    return(
                      <View style={{marginBottom:10}}>
                        
                        {
                            <View style={styles.list} key={index}>
                                <View style={{width:"100%", paddingLeft:20}}>
                                <Text style={{fontSize:17, fontFamily:"Raleway-Regular"}}>{value.notification}</Text>
                              <Text style={{textAlign:"right", marginRight:10, fontFamily:"Raleway-Bold"}}>{value.send_at}</Text>  
                             </View>
                            </View>
                            // :value.type=="UER"?<View style={[styles.list, {paddingBottom:20}]} key={index}>
                            //     <View style={{width:"60%", paddingLeft:20}}>
                            //     <Text style={{fontSize:17, textAlign:"center"}}>{value.notification}</Text>
                                
                            // </View>
                            // <View style={{width:"40%", paddingLeft:20, paddingRight:20}}>
                            // <Text style={{textAlign:"center"}}>{value.send_at}</Text>  
                            // </View>
                            // </View>:value.type=="TDR"?<View style={[styles.list, {paddingBottom:20}]} key={index}>
                            //     <View style={{width:"60%", paddingLeft:20}}>
                            //     <Text style={{fontSize:17, textAlign:"center"}}>{value.notification}</Text>
                                
                            // </View>
                            // <View style={{width:"40%", paddingLeft:20, paddingRight:20}}>
                            // <Text style={{textAlign:"center"}}>{value.send_at}</Text>  
                            // </View>
                            // </View>:value.type=="ALERT"?<View style={[styles.list, {paddingBottom:20}]} key={index}>
                            //     <View style={{width:"60%", paddingLeft:20}}>
                            //     <Text style={{fontSize:17, textAlign:"center"}}>{value.notification}</Text>
                                
                            // </View>
                            // <View style={{width:"40%", paddingLeft:20, paddingRight:20}}>
                            // <Text style={{textAlign:"center"}}>{value.send_at}</Text>  
                            // </View>
                            // </View>:null
                        }
 
                       
                     
                      </View>  
                    )
                } 
                )
                    
                   
               }


                
                
            </View>
        </View>
           </ScrollView>
           <Footer UserId={this.state.user} Status={this.state.status} Page="Inbox" /> 
          
            <Snackbar id={"root_app"}/>
            
           </View>
        );
    }
}