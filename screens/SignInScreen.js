import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AppRegistry,
    StatusBar,
    Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import {AuthContext} from '../components/context';

import Users from '../model/users';

const SignInScreen = () => {

  const [data, setData] = React.useState({
      username: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const TextInputChange = (val) => {
    if(val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6 ) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }
   

  const updateSecureTextEntry =() => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if( val.trim().length >= 4 ) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }

  }

  const loginHandle = (userName, password) => {

    const foundUser = Users.filter( item => {
      return userName == item.username && password == item.password;
    } );

    if ( data.username.length == 0 || data.password.length == 0) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        {text: 'Okay'}
      ]);
      return;
    }

    if ( foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'}
      ]);
      return;
    }
    signIn(foundUser);
  }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
          <View style={styles.header}>
            <Text style={styles.text_header}><Text style={styles.text_header2}>
                Freedom Hall</Text> ticket scannner</Text>
          </View>
          <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}>
            <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                  <FontAwesome style={{
                marginTop:8
              }}
                    name="user-o"
                    color='#05375a'
                    size={20}
                  />
                  <TextInput
                    placeholder = "Your username..."
                    autoCapitalize="none"
                    style={styles.TextInput}
                    onChangeText={(val)=> TextInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                  />
                 {data.check_textInputChange ?
                 <Animatable.View
                    animation="bounceIn"
                 >
                    <Feather style={{
                      marginTop:8
                    }}
                      name="check-circle"
                      color="green"
                      size={20}
                    />
                  </Animatable.View>
                :null}
              </View>
              { data.isValidUser ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Username must be 4 characters long</Text>
              </Animatable.View>
              }

              <Text style={[styles.text_footer,{
                marginTop:20
              }]}>Password</Text>
              <View style={styles.action}>
                  <Feather style={{
                marginTop:8
              }}
                    name="lock"
                    color='#05375a'
                    size={20}
                  />
                  <TextInput
                    placeholder = "Your password..."
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.TextInput}
                    autoCapitalize="none"
                    onChangeText={(val)=> handlePasswordChange(val)}
                  />
                  <TouchableOpacity
                    onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ?
                    <Feather style={{
                      marginTop:8
                    }}
                      name="eye-off"
                      color="gray"
                      size={20}
                    />
                    :
                    <Feather style={{
                      marginTop:8
                    }}
                      name="eye"
                      color="gray"
                      size={20}
                    />
                    }
                  </TouchableOpacity>
              </View>
              { data.isValidPassword ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Password must be 6 characters long</Text>
              </Animatable.View>
              }

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {loginHandle( data.username, data.password)}}
                >
                <LinearGradient
                  colors={['#009387','#009390']}
                  style={styles.signIn}>
                  <Text style={[styles.textSign,{
                    color:'white'
                  }]}><AntDesign
                          name="scan1"
                          color='white'
                          size={20}
                        />  PRESS ME</Text>
                  </LinearGradient>
                  </TouchableOpacity>
              </View>
          </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#009387'
    },
    header:{
      flex:3,
      justifyContent:'flex-end',
      paddingHorizontal:30,
      marginBottom:75
    },
    footer:{
      flex:5,
      backgroundColor:'white',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      paddingHorizontal:20,
      paddingVertical:30
    },
    text_header:{
      color:'white',
      fontWeight:'bold',
      fontFamily: 'monospace',
      fontSize:20
    },
    text_header2:{
      color:'white',
      fontWeight:'bold',
      fontFamily: 'serif',
      paddingLeft:50,
      fontSize:45
    },
    text_footer: {
      color: '#05375a',
      marginTop:10,
      borderBottomWidth:1,
      borderBottomColor:'#f2f2f2',
      fontSize:15,
      paddingBottom:5
    },
    action:{
      flexDirection:'row',
      marginTop:10,
      borderBottomWidth:1,
      borderBottomColor:"#f2f2f2",
      paddingBottom:5
    },
    TextInput: {
      flex:1,
      height:40,
      paddingLeft:10,
      fontSize: 16,
      color:'#05375a'
    },
    button: {
      alignItems:'center',
      marginTop:50
    },
    signIn:{
      width:'100%',
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    },
    textSign:{
      fontSize:18,
      fontWeight:'bold'
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
});

AppRegistry.registerComponent('AndroidFonts', () => AndroidFonts);
