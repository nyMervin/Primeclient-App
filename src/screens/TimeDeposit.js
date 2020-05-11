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
import Snackbar from 'react-native-snackbar';
import styles from '../assets/style/Stylesheet';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class BuyDollars extends Component{
     constructor(props) {
          super(props);
          this.state={
             buyingRate:'',
             value3Index:0,
             sellingRate:'',
             timeDepositefor1M:"",
             timeDepositefor5M:"",
             tempArry:[],
             Ammountrange:"1m",
             value:"",
             timerange:"",
             checkData:[
                 {label: "₱1M and above", value: "1m"},
                 {label: "₱5M and above", value: "5m"}],
             for_1m:[
                
            ],
            for_5m:[
               
           ]
          }
      }

     componentDidMount(){

      Immersive.on()
      Immersive.setImmersive(true)
          this._loadInitialState().done();
          // console.log(this.props.navigation.state.params.data)
          fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_time_deposit_rate',{
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
          
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState( { data: responseJson });
                
                this.setState({ myData: this.state.data['data'] })
               var count = Object.keys(this.state.data['data']).length;
               console.log(count)
                console.log( this.state.data['data'])
                var allArray=[]
                var valueArry=[]
                for(let i=0;i<count; ++i){
                    console.log(this.state.myData[i])
                    var newdata= this.state.myData[i]
                    var time= newdata['time']
                    var rate= newdata['rate']
                    var newtime= time.split(',')
                    var newrate= rate.split(',')
                   var newArray=[]
                    for(let j=0; j<newtime.length; ++j){
                        var array= <Text><Text style={{fontWeight:"bold"}}>{newtime[j]}  year</Text><Text> at</Text><Text style={{fontWeight:"bold"}}> {newrate[j]}</Text><Text>% interest Rate</Text></Text>
                        // console.log(array)
                        newArray.push({label:array, value: newtime[j]+','+newrate[j]})
                     
                    }
                    console.log(newArray)
                    allArray.push({title:newdata['ammount_range'], data:newArray})
                     
    // console.log(newrate)
                }
                for(let k=0; k<allArray.length; ++k){
                   var key= allArray[k]
                   var key2= key['data']
                //    console.log(key2)
                  valueArry.push(key2)
                }

                var value_for_1m= valueArry[0]
                var value_for_5m= valueArry[1]
               this.setState({
                    for_1m: value_for_1m,
                    for_5m: value_for_5m
               })


                console.log(valueArry[0])
                // console.log(allArray.data)
                this.setState({
                    tempArry:allArray
                })
                // console.log(this.state.tempArry[1])
                
                // console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
         
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

          submit=()=>{
            if(this.state.value==""){
              Snackbar.show({
                title: 'Amount is required',
                backgroundColor:'#f00',
                color:'#fff',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
            else if(this.state.timerange==""){
              Snackbar.show({
                title: 'Select Time range',
                backgroundColor:'#f00',
                color:'#fff',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
            else{
              // Alert.alert( this.state.timerange)
              this.props.navigation.navigate("NextTimeDeposit",{value: this.state.value, name:this.props.navigation.state.params.name , rate: this.state.timerange });
              // this.props.navigation.navigate("NextSellDollar",{value: this.state.value,  });
            }
          }
        

    render(){
        console.log(this.state.Ammountrange)
        console.log(this.state.timerange)
        return(
           <View style={{width:"100%", height:"100%"}}>
               <ScrollView>
                 <View style={styles.container}>
            <View style={[styles.newConatiner,{backgroundColor:"#fff"}]}>
            <Header Name={this.props.navigation.state.params.name} />
                 <View style={{width:'100%', height:"100%", alignItems:"center", marginTop:5,
                  padding: 20, }}>
                   <View style={{width:"100%", alignItems:"center", paddingLeft:10, paddingRight:10}}>
                        <Text style={styles.titleText}>Time Deposit Rates</Text>
                        <View >
                                    <Text style={[styles.titleText,{fontSize:17, marginTop:30}]}>Select Amount Range</Text>
                                    <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between',
                                     padding:10}}>
                                         <RadioForm 
                                        //  style={styles.inputsRadio}
                                          radio_props={this.state.checkData}  
                                          initial={0}
                                          animation={true}
                                          formHorizontal={false}  
                                          buttonSize={15}
                                          
                                          buttonOuterSize={25}
                                          buttonColor={'#000'}
                                        //   initial={0}
                                          buttonWrapStyle={{marginRight: 20}}
                                          buttonOuterColor="#000"
                                          labelHorizontal={true}
                                          labelStyle={{fontSize: 18, color: '#000'}}  
                                          buttonInnerColor={'#fff'}
                                          onPress={(value) => {this.setState({Ammountrange:value})}}
                                          />
                                         {/* <Text style={{color:"#f00", fontSize:17}}>₱{this.state.sellingRate}</Text> */}
                                    </View>
                                    <Text style={[styles.titleText,{fontSize:17, marginTop:30}]}>Select Time Range</Text>
                                    
                                    <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between',
                                     padding:10}}>
                                    {
                                        this.state.Ammountrange=='1m'?
                                        <RadioForm 
                                        //  style={styles.inputsRadio}
                                          radio_props={this.state.for_1m}  
                                          initial={-1}
                                          animation={true}
                                          formHorizontal={false}  
                                          buttonSize={15}
                                          
                                          buttonOuterSize={25}
                                          buttonColor={'#000'}
                                        //   initial={0}
                                          buttonWrapStyle={{marginRight: 20}}
                                          buttonOuterColor="#000"
                                          labelHorizontal={true}
                                          labelStyle={{fontSize: 18, color: '#000'}}  
                                          buttonInnerColor={'#fff'}
                                          onPress={(value) => {this.setState({timerange:value})}}
                                          />: <RadioForm 
                                          //  style={styles.inputsRadio}
                                            radio_props={this.state.for_5m}  
                                            initial={-1}
                                            animation={true}
                                            formHorizontal={false}  
                                            buttonSize={15}
                                            
                                            buttonOuterSize={25}
                                            buttonColor={'#000'}
                                            // initial={0}
                                            buttonWrapStyle={{marginRight: 20}}
                                            buttonOuterColor="#000"
                                            labelHorizontal={true}
                                            labelStyle={{fontSize: 18, color: '#000'}}  
                                            buttonInnerColor={'#fff'}
                                            onPress={(value) => {this.setState({timerange:value})}}
                                            />
                                    }
                                    </View>
                                  </View>

                   </View>  
                   <View style={[styles.TextContainer,{marginTop:30}]}>
                        {/* <Text style={[styles.titleText,{marginTop:10, marginBottom:20}]}>Buy Dollars</Text> */}
                        {/* <Text style={[styles.titleText,{fontSize:17}]}>($10,000 and above)</Text> */}
                        <View style={{width:"100%", padding:10}}>
                             <Text style={{ fontSize:17, textAlign:"center"}}>How Much?</Text>
                             <TextInput style={[styles.inputbox,{marginLeft:0, marginBottom:20}]}
                                        placeholder="₱"
                                        placeholderTextColor="#000"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        value={this.state.value}
                                        onChangeText={value => this.setState({value})}/>
                        </View>
                       
                   </View> 
                   <View style={{width:"100%", padding:10, marginBottom:30}}>
                         <TouchableOpacity
                            onPress={this.submit}>
                                 <Text style={{textDecorationLine:"underline", fontWeight:"bold", fontSize:20,
                                  textAlign:"right", marginBottom:15}}>Next</Text>
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