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
import { Form, TextValidator } from 'react-native-validator-form';
import styles from '../assets/style/Stylesheet';
import { Immersive } from 'react-native-immersive'
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
    import Snackbar from 'react-native-snackbar';
export default class Signup extends Component{

    constructor(props) {
        super(props);
        this.state={
            firstname:"",
            lastname:'',
            email:'',
            cellphone:'',
            PriPesoacc:'',
            secPesoAcc:'',
            dollarAcc:'',
            TDAcc:'',
            branch:'',
            branchcode:'',
            AccOficer:'',
            accOficerCell:'',
            isfirstnameFocused:true,
            islastnameFocused:true,
            isemailFocused:true,
            iscellphone:true,
            ispriPeso:true,
            issecPeso:true,
            isDollar:true,
            isTd:true,
            isbranch:true,
            fixedIncome:"",
            isfd:true,
            isbranchcode:true,
            tempArry:[],
            isDisable:false
        }
      }

      onhandlefirstname=(firstname)=>{

      }
      componentDidMount(){

        Immersive.on()
        Immersive.setImmersive(true)
            
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

    onSubmit=()=>{

       
            if(this.state.firstname==""){
                this.setState({
                    isfirstnameFocused:false  
                })
                Snackbar.show({
                    title: 'First Name required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            else if(this.state.lastname==""){
                this.setState({
                    islastnameFocused:false
                })
                Snackbar.show({
                    title: 'last name is required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            else if(this.state.email==""){
                this.setState({
                    isemailFocused:false
                })
                Snackbar.show({
                    title: 'Email is required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            else if(this.state.cellphone==""){
                this.setState({
                    iscellphone:false
                })
                Snackbar.show({
                    title: 'Cellphone is required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            else if(this.state.PriPesoacc==""){
                this.setState({
                    ispriPeso:false
                })
                Snackbar.show({
                    title: 'Primary peso account is required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            
            else if(this.state.dollarAcc==""){
                this.setState({
                    isDollar:false
                })
                Snackbar.show({
                    title: 'U.S Dollar account is required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            else if(this.state.TDAcc==""){
                this.setState({
                    isTd:false
                })
                Snackbar.show({
                    title: 'Time Deposite account required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            else if(this.state.fixedIncome==""){
              this.setState({
                  isfd:false
              })
              Snackbar.show({
                  title: 'Fixed Income Account is required',
                  backgroundColor:'#f00',
                  color:'#fff',
                  duration: Snackbar.LENGTH_SHORT,
                });
          }
            else if(this.state.branch==""){
                this.setState({
                    isbranch:false
                })
                Snackbar.show({
                    title: 'Branch is  required',
                    backgroundColor:'#f00',
                    color:'#fff',
                    duration: Snackbar.LENGTH_SHORT,
                  });
            }
            // else if(this.state.branchcode==""){
            //     this.setState({
            //         isbranchcode:false
            //     })
            //     Snackbar.show({
            //         title: 'Branch Code is required',
            //         backgroundColor:'#f00',
            //         color:'#fff',
            //         duration: Snackbar.LENGTH_SHORT,
            //       });
            // }
        else{

          this.setState({
            isDisable:true
          })

          console.log( JSON.stringify({
       
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            cellphone: "+61"+this.state.cellphone,
            email: this.state.email,
            primary_peso_account: this.state.PriPesoacc,
            secondary_peso_account: this.state.secPesoAcc,
            us_dollar_account: this.state.dollarAcc,
            time_deposit_account: this.state.TDAcc,
            branch:"",
            branch_code:this.state.branchcode,
            account_officer:this.state.AccOficer,
            account_officer_cell:"+61"+this.state.accOficerCell
            }))
            fetch('https://carnegiehillfintech.com/primeclientApi/Api/client_register',{
            method: 'POST',
            headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
       
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        cellphone: "+63"+this.state.cellphone,
        email: this.state.email,
        primary_peso_account: this.state.PriPesoacc,
        secondary_peso_account: this.state.secPesoAcc,
        us_dollar_account: this.state.dollarAcc,
        time_deposit_account: this.state.TDAcc,
        fixed_income_acc:this.state.fixedIncome,
        branch:this.state.branch,
        branch_code:this.state.branchcode,
        account_officer:this.state.AccOficer,
        account_officer_cell:"+63"+this.state.accOficerCell
        })
      
          }).then((response) => response.json())
          .then((responseJson) => {
            
            //  console.log(responseJson.rows.length);
              this.setState( { data: responseJson });
              console.log(this.state.data['message']);
              console.log(this.state.data['status']);
              this.setState({
                  id: this.state.data['data']
              })
              var count = Object.keys(responseJson).length;
              console.log(count);
      // Showing response message coming from server after inserting records.
              if(this.state.data['status']==1){
                Alert.alert('Sent Otp',this.state.data['message'],[
                  {
                    'text':'Ok',
                    onPress:() => {
                      this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName:'RegitrationOtp', params:{id:this.state.id} })
                        ],
                      }))
                      }
                   
                  }
                ])
                this.props.navigation.navigate("RegitrationOtp",{id:this.state.id});
              }
              else{
                Alert.alert(this.state.data['message'])
                this.setState({
                  isDisable:false
                })
              }
      
          }).catch((error) => {
            console.error(error);
          });
        }
      
    }

    render(){
        return(
             <ScrollView>
                  <View style={styles.container}>
                 <View style={styles.newConatiner}>
                     <Image source={require('../assets/images/logo_small.png')} style={styles.Smalllogo} />
                         <View style={[styles.form,{width:'100%', paddingLeft:20, paddingRight:20}]} >
                         <Text style={styles.titleText}>SIGN UP FORM</Text>
                        <View style={[styles.inputContainer,{width:'100%'}]}>
                             <View style={[styles.boxinput,{borderColor: this.state.isfirstnameFocused
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput 
                                       style={[styles.newinputs]}
                                        placeholder="First Name"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        onChangeText={firstname => this.setState({firstname, isfirstnameFocused:true})}/>
                                        
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.islastnameFocused
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Last Name"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        onChangeText={lastname => this.setState({lastname, islastnameFocused:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.isemailFocused
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        onChangeText={email => this.setState({email, isemailFocused:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.iscellphone
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1, flexDirection:'row'}]}>
                                <Text style={{margin:10, marginTop:7}}>+63</Text>
                             <TextInput style={[styles.newinputs,{width:"100%",marginLeft:0}]}
                                        placeholder="Cellphone"
                                        keyboardType="number-pad"
                                        maxLength={10}
                                        underlineColorAndroid='transparent'
                                        onChangeText={cellphone => this.setState({cellphone, iscellphone:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.ispriPeso
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Primary Peso Account"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        onChangeText={PriPesoacc => this.setState({PriPesoacc, ispriPeso:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.issecPeso
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Secondory Peso Account"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        onChangeText={secPesoAcc => this.setState({secPesoAcc, issecPeso:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.isDollar
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="U.S. Dollar Account"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        onChangeText={dollarAcc => this.setState({dollarAcc, isDollar:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.isTd
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Time Deposite Account"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        onChangeText={TDAcc => this.setState({TDAcc, isTd:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.isfd
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Fixed Income Account"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        onChangeText={fixedIncome => this.setState({fixedIncome, isTd:true})}/>
                             </View>
                             <View style={[styles.boxinput,{borderColor: this.state.isbranch
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <Picker
                               style={[styles.newinputs,{marginTop:-5}]}
                                selectedValue={this.state.branch}
                                // style={{height: 50, width: 100}}
                                onValueChange={(value, index) =>
                                  this.setState({branch: value})
                                }>
                                 <Picker.Item label="Select Branch" value="" />
                                  
                                {
                                  
                                this.state.tempArry.map((value, index)=>{
                                  return(
                                    <Picker.Item label={value.branch_name} value={value.branch_code} key={index} />
                                  )
                               } 
                               )
                                }
                                
                              </Picker>
                             </View>
                            
                             <View style={[styles.boxinput,{borderColor: this.state.isbranchcode
                                        ? '#fff'
                                        : 'red',
                                      borderWidth:1}]}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Branch Code"
                                        editable={false}
                                        value={this.state.branch}
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        onChangeText={branchcode => this.setState({branchcode, isbranchcode:true})}/>
                             </View>
                             <View style={styles.boxinput}>
                             <TextInput style={styles.newinputs}
                                        placeholder="Account Officer"
                                        keyboardType="email-address"
                                        underlineColorAndroid='transparent'
                                        onChangeText={AccOficer => this.setState({AccOficer})}/>
                             </View>
                             <View style={[styles.boxinput,{flexDirection:"row"}]}>
                                <Text style={{margin:10}}>+63</Text>
                             <TextInput style={[styles.newinputs,{width:"100%",marginLeft:0}]}
                                        placeholder="Accnt. Officer Cell"
                                        keyboardType="number-pad"
                                        maxLength={10}
                                        underlineColorAndroid='transparent'
                                        onChangeText={accOficerCell => this.setState({accOficerCell})}/>
                             </View>
                             
                         </View>
                         <View style={styles.btnView}>
                             <TouchableOpacity style={[styles.Whitebtn,{marginBottom:30}]}
                              onPress={this.onSubmit} disabled={this.state.isDisable} >
                                 <Text style={styles.blackText}>Next</Text>
                             </TouchableOpacity>
                             
                         </View>
                         </View>
                 </View>
             </View>
             </ScrollView>
        );
    }
}