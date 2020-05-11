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
import { Immersive } from 'react-native-immersive'
import {showSnackBar} from '@prince8verma/react-native-snackbar';
import Snackbar from '@prince8verma/react-native-snackbar';
// import Snackbar from 'react-native-snackbar-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './Header';
import Footer from './Footer';
export default class Transiction extends Component{

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
            if(this.state.newdata['status']==1){
              this.setState({
                temparry:this.state.newdata['data']
             })
            }
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
                 <View style={[styles.container,{marginBottom:60}]}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff", }]}>
                <View>
               <Header Name={this.props.navigation.state.params.name} /> 
               </View>
                <Text style={{fontSize:28, textAlign:"center", fontFamily:"Raleway-Bold", marginBottom:20, marginTop:30}}>Transactions History</Text>
              {
                  this.state.temparry.map((value, index)=>{

                    return(
                      <View style={{marginBottom:10}}>
                         
                         {
                          
                          <View style={[styles.list, {paddingBottom:20}]} key={index}>
                                <View style={{width:"60%", paddingLeft:20}}>
                                {
                                  value.type=="Buy Dollar"?<Text style={{fontSize:17, textAlign:"center"}}>Bought U.S. Dollars</Text>
                                  :value.type=="Sell Dollar"?<Text style={{fontSize:17, textAlign:"center"}}>Sold U.S. Dollars</Text> 
                                  :value.type=="Time Deposit"?<Text style={{fontSize:17, textAlign:"center"}}>Placed Time Deposite</Text>
                                  :<Text style={{fontSize:17, textAlign:"center"}}>Placed Fixed Income</Text>
                                }
                                
                                 <Text style={{textAlign:"center"}}><Text style={{color:"#0FAD01"}}>Completed </Text><Text> {value.completed_on}</Text></Text>
                                </View>
                                <View style={{width:"40%", paddingLeft:20, paddingRight:20}}>
                                {
                                  value.type=="Buy Dollar"?<View>
                                    <Text style={{textAlign:"center"}}>$ {value.credit_amount}</Text>  
                                    <Text style={{textAlign:"center"}}>₱ {value.debit_amount}</Text> 
                                  </View>
                                  :value.type=="Sell Dollar"?<View>
                                  <Text style={{textAlign:"center"}}>$ {value.debit_amount}</Text>  
                                  <Text style={{textAlign:"center"}}>₱ {value.credit_amount}</Text> 
                                </View>
                                  :value.type=="Time Deposit"?<View>
                                  {/* <Text style={{textAlign:"center"}}>$ </Text>   */}
                                  <Text style={{textAlign:"center"}}>₱ {value.debit_amount}</Text> 
                                </View>
                                  :<View>
                                  {/* <Text style={{textAlign:"center"}}>$ </Text>   */}
                                  <Text style={{textAlign:"center"}}>₱ {value.debit_amount}</Text> 
                                </View>
                                }
                                 
                                </View>
                          </View>
                         }
                         
                      </View>
                    )
                  })
                    
                                
              } 
              
                
            </View>
        </View>
           </ScrollView>
           <Footer UserId={this.state.user} Status={this.state.status} Page="Transiction" /> 
           
            <Snackbar id={"root_app"}/>
            
           </View>
        );
    }
}