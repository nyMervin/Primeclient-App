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
  Picker,
  Alert,ScrollView,WebView
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from '../assets/style/Stylesheet';
// import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import {showSnackBar} from '@prince8verma/react-native-snackbar';
import Snackbar from '@prince8verma/react-native-snackbar';
// import Snackbar from 'react-native-snackbar-component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import Footer from './Footer';
import { Immersive } from 'react-native-immersive'
import RNZendeskChat from 'react-native-zendesk-ichat';
import CountDown from 'react-native-countdown-component';
import ZendeskSupport from '@synapsestudios/react-native-zendesk-support';
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
           count:'',
           fixed_income_acc:"",
           tempArry:[],
           branch_code:"",
           branch_name:"",
           ImageSource:{uri:"https://carnegiehillfintech.com/primeclientApi/assets/images/users/user_default.png" },
           cellno:""
        }
    }

    _loadInitialState= async() =>{
   
      //  Alert.alert(await AsyncStorage.getItem('user'));
        this.setState({
          user:await AsyncStorage.getItem('user')
        })
      }

    componentDidMount=()=>{

      Immersive.on()
      Immersive.setImmersive(true)
    
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
           const url = "https://carnegiehillfintech.com/primeclientApi/assets/images/users/"
            this.setState({
              firstname:this.state.myData['first_name'],
              lastname:this.state.myData['last_name'],
              cellphone:this.state.myData['cellphone'],
              email:this.state.myData['email'],
              primary_peso_account: this.state.myData['primary_peso_account'],
              secondary_peso_account: this.state.myData['secondary_peso_account'],
              us_dollar_account:this.state.myData['us_dollar_account'],
              time_deposit_account:this.state.myData['time_deposit_account'],
              // branch:this.state.myData['branch'],
              fixed_income_acc:this.state.myData['fixed_income_account'],
              branch_code:this.state.myData['branch_code'],
              account_officer:this.state.myData['account_officer'],
              account_officer_cell: this.state.myData['account_officer_cell'],
              image:url+this.state.myData['image'],
              branch_name:this.state.myData['branch_name']

              
            })
            let profile= {uri: this.state.image}
            if(this.state.myData['image'] == ""){
              this.setState({
                ImageSource:{uri:"https://carnegiehillfintech.com/primeclientApi/assets/images/users/user_default.png" },
          
              })
            }
            else{
              this.setState({ ImageSource: profile })
            }
            // console.log(this.state.buyingRate, this.state.sellingRate, this.state.timeDepositefor1M, this.state.timeDepositefor5M)
     
        }).catch((error) => {
          console.error(error);
        });


        fetch('https://carnegiehillfintech.com/primeclientApi/Api/get_branches',{
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
           
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState( { data: responseJson });
            console.log(this.state.data)
            var alldata= this.state.data['data']

            console.log(alldata)
            this.setState({
              tempArry:alldata
            })
           
        }).catch((error) => {
          console.error(error);
        });

       

    }

    update=()=>{

      console.log(JSON.stringify({
       
        // first_name: this.state.firstname,
        // last_name: this.state.lastname,
        // cellphone: "+63"+this.state.cellphone,
        // email: this.state.email,
        primary_peso_account: this.state.primary_peso_account,
        secondary_peso_account: this.state.secondary_peso_account,
        us_dollar_account: this.state.us_dollar_account,
        time_deposit_account: this.state.time_deposit_account,
        // branch:this.state.branch,
        branch_code:this.state.branch,
        account_officer:this.state.account_officer,
        account_officer_cell:this.state.account_officer_cell
        }))

      fetch('https://carnegiehillfintech.com/primeclientApi/Api/update_profile',{
            method: 'POST',
            headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
       
        // first_name: this.state.firstname,
        // last_name: this.state.lastname,
        // cellphone: "+63"+this.state.cellphone,
        // email: this.state.email,
        id:this.state.user,
        primary_peso_account: this.state.primary_peso_account,
        secondary_peso_account: this.state.secondary_peso_account,
        us_dollar_account: this.state.us_dollar_account,
        time_deposit_account: this.state.time_deposit_account,
        fixed_income_acc:this.state.fixed_income_acc,
        branch_code:this.state.branch_code,
        account_officer:this.state.account_officer,
        account_officer_cell:this.state.account_officer_cell
        })
      
          }).then((response) => response.json())
          .then((responseJson) => {
            
            //  console.log(responseJson.rows.length);
              this.setState( { data: responseJson });
              console.log(this.state.data['message']);
              console.log(this.state.data['status']);
             if(this.state.data['status']==1){
               Alert.alert(this.state.data['message'])
             }
      
          }).catch((error) => {
            console.error(error);
          });
       
    }


    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
  
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
  
        this.setState({
  
          ImageSource: source,
          data: response.data
  
        });
  
        this.uploadImageToServer()
      }
    });
  }

  renderModalContent = () => (
    <View style={styles.content}>
      
      <Text style={styles.contentTitle}>New Cellphone No.</Text>
      <View style={{width:"100%", marginLeft:20, marginRight:20}}>
                <View style={[styles.boxinput,{ flexDirection:'row'}]}>
                                <Text style={{margin:10, marginTop:7}}>+63</Text>
                             <TextInput style={[styles.newinputs,{width:"100%",marginLeft:0}]}
                                        placeholder="Cellphone"
                                        keyboardType="number-pad"
                                        maxLength={10}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(cellno) => this.setState({cellno})}/>
               </View>
      </View>
      {/* <TouchableHighlight style={styles.closeBtn}
       >
        
          <Text style={{color:"#02a8ee", textAlign:"center", marginTop:12}}>Submit</Text>

      </TouchableHighlight> */}
      {/* <TouchableOpacity style={[styles.closeBtn,{zIndex:100}]}
              >
                <Text style={{color:"#02a8ee", textAlign:"center", marginTop:12}}>Submit</Text>
        </TouchableOpacity> */}
      <Button style={{marginTop:20, zIndex:100}} title="submit" onPress={ this.sendOtp}></Button>
      
    </View>
  );

  uploadImageToServer=()=>{
   console.log(JSON.stringify({
    // userid:this.state.NumberHolder,
    id: this.state.user,
    image:this.state.data
  }))

    fetch('https://carnegiehillfintech.com/primeclientApi/Api/set_image',{
    method: 'POST',
    headers: {
  Accept: 'application/json',
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  // userid:this.state.NumberHolder,
  id: this.state.user,
  image:this.state.data
})

  }).then((response) => response.json())
  .then((responseJson) => {
    
    //  console.log(responseJson.rows.length);
      this.setState( { data: responseJson });
      console.log(this.state.data)
      console.log(this.state.data['message']);
      console.log(this.state.data['status']);
      // var count = Object.keys(responseJson).length;
      // console.log(count);

      if(this.state.data['status']== true){
           Alert.alert(
              this.state.data['message']
            )
      }
// Showing response message coming from server after inserting records.
      // Alert.alert(
      //   this.state.data['message']
      // )

  }).catch((error) => {
    console.error(error);
  });
  }

    logout=async() =>{
      var value = await AsyncStorage.removeItem('user')
      if(value==null){

        this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login' })
              ],
            }))
       
      //  this.props.navigation.navigate('Login');
      }
        
     }

     sendOtp=()=>{
     
    
 console.log(JSON.stringify({
   
  cellphone: this.state.cellno,

  id: this.state.user

}))

      fetch('https://carnegiehillfintech.com/primeclientApi/Api/number_otp', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      cellphone: "+63"+this.state.cellno,
   
      id: this.state.user
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
  
          this.setState( { data: responseJson });
         if(this.state.data['status'] == 1)
          {
              // this.props.navigation.navigate('Dashbaord');
              this.setState({ visibleModal: null })
              this.props.navigation.navigate("MobileOtp",{cellno: "+63"+this.state.cellno, id:this.state.user});
          }

          else if(this.state.data['status'] == 2){
            Alert.alert("Cannot edit your cell number. Try after " + this.state.data['data']);
          }
          else{ 
  
            Alert.alert(this.state.data['message']);
          }
  
        }).catch((error) => {
          console.error(error);
        });
  
      
    }
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
    //     customerName: this.state.firstname+" "+this.state.lastname,
    //     customerIcon: this.state.ImageSource['uri']
    //   }
    //   ZendeskSupport.setupIdentity(identity)
        RNZendeskChat.startChat({
          name: this.state.firstname+" "+this.state.lastname,
          email: this.state.email,
          phone: this.state.cellno,
          tags: [this.state.firstname+"tag1", this.state.firstname+"tag2"],
          department: 'someDepartment'
        })
    }
   

   
    render(){
        // const name= this.props.navigation.state.params.data['first_name']
        // console.log(this.props.navigation.state.params.data)
        // console.log(this.state.user)
        console.log(this.state.ImageSource['uri'])
        return(
           <View>
           
               <ScrollView>
                 <View style={styles.container}>
                <View style={[styles.newConatiner,{backgroundColor:"#fff", height:"100%"}]}>
               <View>
               <Header Name={this.state.firstname} /> 
               </View>
               <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", padding:20 }}>
               <TouchableOpacity
                                 onPress={this.SupportChat}>
                                 <Text style={{textDecorationLine:"underline", fontSize:16}}>Support</Text>
                    </TouchableOpacity>
                   <TouchableOpacity
                                 onPress={this.logout}>
                                 <Text style={{textDecorationLine:"underline", fontSize:16}}>Logout</Text>
                    </TouchableOpacity>
               </View>
                 <View style={{width:"100%", height:150, backgroundColor:"#DEDF38",
                  justifyContent:"center",alignItems:"center"}}>
                    
                    <View  style={{width:100, height:100, overflow: 'hidden',  borderRadius:50,}}>
                    <ImageBackground source={{uri:this.state.ImageSource['uri']}} style={{width:100, height:100, borderRadius:50, resizeMode:"cover"}}>
                    <TouchableOpacity style={{position:"relative", marginTop:53, marginLeft:53,  zIndex:100}}
                     onPress={this.selectPhotoTapped.bind(this)}>
                      <Icon name="edit" size={30} color="#fff"  />
                    </TouchableOpacity>
                    </ImageBackground>
                    </View>
                 </View>
                 <View style={{width:"100%", alignItems:"center", paddingTop:20, paddingBottom:20}}>
                   <Text style={{fontSize:22, fontFamily:"Raleway-Bold"}}>{this.state.firstname+" "+this.state.lastname}</Text>
                   <View style={{flexDirection:"row"}}><Text style={{ marginTop:10, fontFamily:"Raleway-Bold"}}>{this.state.cellphone}</Text>
                   <TouchableOpacity
                  onPress={() => this.setState({ visibleModal: 'fancy' })} ><Icon name="edit" style={{margin:10}} size={20} color="#000"  /></TouchableOpacity></View>
                   <Text style={{ marginTop:10, fontFamily:"Raleway-Bold"}}>{this.state.email}</Text>
                   
                 </View>
                 <View style={{width:"100%",  paddingTop:20, marginBottom:55, paddingBottom:20}}>
                 <Text style={{fontSize:20, marginTop:10, marginLeft:20, fontFamily:"Raleway-Bold", textAlign:"left"}}>Peso Bank Account</Text>
                  <View style={{flexDirection:"row", marginTop:10, width:"100%", paddingLeft:20, paddingRight:20,}}>
                  <TextInput style={[styles.newinputs,{ width:"80%", textAlign:"center", marginLeft:0, borderColor:"#000", borderWidth:1}]}
                                        placeholder="primary"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        value={this.state.primary_peso_account}
                                        underlineColorAndroid='transparent'
                                        onChangeText={primary_peso_account => this.setState({primary_peso_account})}/>
                   <Text style={{marginTop:5,marginLeft:10,}} >Primary</Text>
                  
                    </View>  
                    <View style={{flexDirection:"row", marginTop:10, fontFamily:"Raleway-Bold", width:"100%", paddingLeft:20, paddingRight:20,}}>
                    <TextInput style={[styles.newinputs,{marginLeft:0, width:"80%",  textAlign:"center", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Secondary"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        value={this.state.secondary_peso_account}
                                        underlineColorAndroid='transparent'
                                        onChangeText={secondary_peso_account => this.setState({secondary_peso_account})}/>
                   <Text style={{marginTop:5,marginLeft:10,}}>Secondary</Text>
                   
                    </View>   
                    <Text style={{fontSize:20, marginTop:10, fontFamily:"Raleway-Bold", marginLeft:20, textAlign:"left"}}>Dollar Bank Account</Text>   
                    <TextInput style={[styles.newinputs,{marginLeft:20,  textAlign:"center", marginRight:20,width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Dollar Bank Account"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        value={this.state.us_dollar_account}
                                        underlineColorAndroid='transparent'
                                        onChangeText={us_dollar_account => this.setState({us_dollar_account})}/>
                                        <Text style={{fontSize:20, marginLeft:20, marginTop:10, fontFamily:"Raleway-Bold", textAlign:"left"}}>Time deposite Account</Text>   
                    <TextInput style={[styles.newinputs,{marginLeft:20,  textAlign:"center", marginRight:20, width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Time deposite Account"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        value={this.state.time_deposit_account}
                                        underlineColorAndroid='transparent'
                                        onChangeText={time_deposit_account => this.setState({time_deposit_account})}/>
                                        <Text style={{fontSize:20, marginLeft:20, marginTop:10, fontFamily:"Raleway-Bold", textAlign:"left"}}>Fixed Income Account</Text>   
                                     
                                     <TextInput style={[styles.newinputs,{marginLeft:20,  textAlign:"center", marginRight:20, width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Fixed deposite Account"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        value={this.state.fixed_income_acc}
                                        underlineColorAndroid='transparent'
                                        onChangeText={fixed_income_acc => this.setState({fixed_income_acc})}/>
                                    
                    <Text style={{fontSize:20, marginTop:10, fontFamily:"Raleway-Bold", marginLeft:20, textAlign:"left"}}>Branch</Text>   
                    <TextInput style={[styles.newinputs,{marginLeft:20, marginRight:20,  textAlign:"center", width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Fixed deposite Account"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        editable={false}
                                        value={this.state.branch_name}
                                        underlineColorAndroid='transparent'
                                        onChangeText={fixed_income_acc => this.setState({fixed_income_acc})}/>
                      <Text style={{fontSize:20, marginTop:10, marginLeft:20, fontFamily:"Raleway-Bold", textAlign:"left"}}>Branch Code</Text>   
                    <TextInput style={[styles.newinputs,{marginLeft:20,marginRight:20,  textAlign:"center", width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Branch"
                                        keyboardType="number-pad"
                                        value={this.state.branch_code}
                                        maxLength={10}
                                        editable={false}
                                        underlineColorAndroid='transparent'
                                        onChangeText={branch_code => this.setState({branch_code})}/>
                      <Text style={{fontSize:20, marginTop:10, marginLeft:20, fontFamily:"Raleway-Bold", textAlign:"left"}}>Account Officer</Text>   
                    <TextInput style={[styles.newinputs,{marginLeft:20,marginRight:20, textAlign:"center", width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Account Officer"
                                        keyboardType="email-address"
                                        // maxLength={10}
                                        value={this.state.account_officer}
                                        underlineColorAndroid='transparent'
                                        onChangeText={account_officer => this.setState({account_officer})}/>
                      <Text style={{fontSize:20, marginTop:10, marginLeft:20, fontFamily:"Raleway-Bold", textAlign:"left"}}>Account Officer Cell</Text>   
                    <TextInput style={[styles.newinputs,{marginLeft:20,marginRight:20, textAlign:"center", width:"90%", borderColor:"#000", borderWidth:1}]}
                                        placeholder="Account Officer Cell"
                                        keyboardType="number-pad"
                                        // maxLength={10}
                                        value={this.state.account_officer_cell}
                                        underlineColorAndroid='transparent'
                                        onChangeText={account_officer_cell => this.setState({account_officer_cell})}/>

                                        <View style={styles.btnView}>
                                        <TouchableOpacity style={[styles.Whitebtn,{marginBottom:20, backgroundColor:"#DEDF38"} ]}
                                          onPress={this.update} >
                                            <Text style={styles.blackText}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Whitebtn,{marginBottom:30,backgroundColor:"#DEDF38"}]}
                                          onPress={()=>{
                                            this.props.navigation.navigate("ChangePassword",{id:this.state.user});
                                          }} >
                                            <Text style={styles.blackText}>Change Password</Text>
                                        </TouchableOpacity>
                                        </View>
                 </View>
                
            </View>
        </View>
           </ScrollView>
           <Footer UserId={this.state.user} Status={this.state.status} Page="Profile" /> 
          
            <Snackbar id={"root_app"}/>
            <Modal
                                isVisible={this.state.visibleModal === 'fancy'}
                                backdropColor="#B4B3DB"
                                backdropOpacity={0.8}
                                animationIn="zoomInDown"
                                animationOut="zoomOutUp"
                                animationInTiming={600}
                                animationOutTiming={600}
                                backdropTransitionInTiming={600}
                                backdropTransitionOutTiming={600}
                                onBackdropPress={() => this.setState({ visibleModal: null })}
                                >
                                {this.renderModalContent()}
                                </Modal>
           </View>
        );
    }
}