import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
      flex: 1,
    //   width: '100%',
      height:'100%',
      justifyContent: 'center',
      fontFamily:"roboto",
      alignItems: 'center',
    //   backgroundColor:'#000'
    },
    mainConatiner:{
        width:"100%",
        height:"100%",
        backgroundColor:"#DEDF38",
        alignItems:"center",
        justifyContent:"center"
    },
    newConatiner:{
        width:"100%",
        height:"100%",
        backgroundColor:"#DEDF38",
        // alignItems:"center",
        // justifyContent:"center"
    },
    logo:{
       
        width: 180,
        height: 86,
        resizeMode:"contain",
        // top:173
        bottom:60,
        marginTop:120
    },
    Smalllogo:{
        width: 60,
        height: 60,
        margin:15,
        resizeMode:"contain",
       
    },
    loginContent:{
        width:"100%"
    },
    inputContainer:{
        // flex:1,
        // width:"100%",
        marginLeft:40,
        marginRight:40,
        
    },
    inputs:{
        width:'100%',
        // flex:1,
        height:38,
        backgroundColor:"#fff",
        // borderWidth:1,
        // borderColor:"#ff00000"
        borderRadius:4,
        marginBottom:30,
        textAlign:"center"
    },
    boxinput:{
        width:'100%',
        // flex:1,
        height:38,
        backgroundColor:"#fff",
     
        borderRadius:4,
        marginBottom:30,
        textAlign:"center"
    },
    otpContainer:{
        // borderColor:"#f00",
        borderWidth:1,
        borderRadius:4
    },
    inputbox:{
        width:'100%',
        // flex:1,
        height:38,
        backgroundColor:"#fff",
        borderWidth:2,
        borderColor:"#000",
        // marginBottom:20,
        // borderRadius:4,
        marginTop:10,
        marginBottom:50,
        textAlign:"center"
    },
    newinputs:{
        marginLeft:40
    },
    btnView:{
        width:"100%",
        alignItems:"center"
    },
    Whitebtn:{
        // height:38,
        backgroundColor:"#fff",
        borderRadius:24.5,
        marginTop:25,
        paddingLeft:25,
        paddingRight:25,
        paddingTop:10,
        paddingBottom:10
    },
   Textbtn:{
        // height:38,
        // backgroundColor:"#fff",
        borderRadius:24.5,
        marginTop:15,
        paddingLeft:25,
        paddingRight:25,
        paddingTop:10,
        paddingBottom:10
    },
    blackText:{
        fontSize:20,
        color:'#000'

    },
    whiteText:{
        fontSize:22,
        color:'#fff',
        fontWeight: 'bold',

    },
    form:{
        width:"100%",
        alignItems:"center"
    },
    titleText:{
        fontSize:20,
        color:'#000',
        // fontWeight:"bold",
        fontFamily:"Raleway-Bold",
        textAlign:"center"
        
    },
    TextContainer:{
        width:"100%",
        // marginLeft:60,
        // marginRight:60,
        // borderWidth:1,
        paddingLeft:40,
        paddingRight:40
    },
    nav:{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        // height:65,
        paddingRight:20,
        paddingLeft:20,
        paddingTop:10,
        backgroundColor:"#fff",
        alignSelf:'flex-end',
        flexDirection:"row",
        justifyContent:"space-between",
        fontFamily:"roboto",
        shadowOffset: { width: 10, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 7,
      },
      nav2:{
        position:"absolute",
        bottom:30,
        right:0,
        left:0,
        height:55,
        paddingRight:30,
        paddingLeft:30,
        paddingTop:10,
        backgroundColor:"#fff",
        alignSelf:'flex-end',
        flexDirection:"row",
        justifyContent:"space-between",
        
      },
      list:{
          width:"100%",
          minHeight:80,
          backgroundColor:"#ddd",
          borderBottomColor:"#ccc",
          borderBottomWidth:1,
          flexDirection:"row",
          justifyContent:"space-between",
          paddingTop:20,
          paddingBottom:20
          
      },
      content: {
        backgroundColor: '#DEDF38',
        padding: 22,
        fontFamily:"roboto",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      contentTitle: {
        fontSize: 24,
        marginBottom: 12,
        fontFamily:"roboto",
        color:"#fff"
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      scrollableModal: {
        height: 300,
      },
      scrollableModalContent1: {
        height: 200,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scrollableModalText1: {
        fontSize: 20,
        color: 'white',
      },
      scrollableModalContent2: {
        height: 200,
        backgroundColor: '#A9DCD3',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scrollableModalText2: {
        fontSize: 20,
        color: 'white',
        fontFamily:"roboto",
      },
      customBackdrop: {
        flex: 1,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
      },
      customBackdropText: {
        marginTop: 10,
        fontSize: 17,
      },
      modalinputs:{
        height:45,
        width:"100%",
        backgroundColor:"#fff",
        borderRadius:30,
        // marginBottom:20
      },
      closeBtn:{
        backgroundColor:"#fff",
        borderRadius:30,
        height:45,
        paddingLeft:20,
        paddingRight:20,
        marginTop:20,
        alignItems:"center"
      },

  });
  