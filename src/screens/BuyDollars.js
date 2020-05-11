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
import Header from './Header';
import { Immersive } from 'react-native-immersive'
import styles from '../assets/style/Stylesheet';
import Snackbar from 'react-native-snackbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class BuyDollars extends Component{
     constructor(props) {
          super(props);
          this.state={
             buyingRate:'',
             sellingRate:'',
             timeDepositefor1M:"",
             timeDepositefor5M:"",
             value:""
          }
      }

     componentDidMount(){
      Immersive.on()
      Immersive.setImmersive(true)
          this._loadInitialState().done();
          
          // console.log(this.props.navigation.state.params.data)
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
      }
      _loadInitialState= async() =>{
   
          //  Alert.alert(await AsyncStorage.getItem('user'));
            this.setState({
              user:await AsyncStorage.getItem('user')
            })
          }
          next=()=>{
            if(this.state.value==""){
              Snackbar.show({
                title: 'Amount is required',
                backgroundColor:'#f00',
                color:'#fff',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
            else{
              this.props.navigation.navigate("NextBuyDollars",{value: this.state.value, name:this.props.navigation.state.params.name });
            }
          }

    render(){
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
                             <Text style={{color:"#f00", fontSize:17}}>₱{this.state.sellingRate}</Text>
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
                             <TextInput style={[styles.inputbox,{marginLeft:0, marginBottom:30}]}
                                        placeholder="$"
                                        placeholderTextColor="#000"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        value={this.state.value}
                                        onChangeText={value => this.setState({value})}/>
                        </View>
                       
                   </View> 
                   <View style={{width:"100%", padding:10}}>
                         <TouchableOpacity
                            onPress={this.next}>
                                 <Text style={{textDecorationLine:"underline", fontWeight:"bold", fontSize:20,
                                  textAlign:"right", marginBottom:40}}>Next</Text>
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