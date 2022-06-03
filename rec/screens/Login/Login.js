import React, { Component } from 'react';
import {
  TouchableOpacity, TextInput, StyleSheet, Image, AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import axios from 'axios';
import {
  Container, Header, Button,
  View, Item, Text,
  Body, Icon, Form,
  Input, Label, Title,
} from 'native-base';

import { baseURL } from '../../../app.config';
import styles from './../../style/style';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  offlineAccess:true,
  iosClientId:'952081920236-bo28tuhcnf4qr9s00tv0qmithclc5dop.apps.googleusercontent.com',
  webClientId:'952081920236-3v6tnd6jjk8v44bm9g08vd3odfdss42t.apps.googleusercontent.com'
});

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//   forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
//   accountName: '', // [Android] specifies an account name on the device that should be used
//   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
// });


class Login extends Component {
  state = {
    hidePassword: true,
    username: '',
    password: '',
    result: ''
  }

  async componentDidMount() {
    this.setState({ token:  await AsyncStorage.getItem('token') });


    if (this.state.token == null || this.state.token == '' || this.state.token == undefined) {
      LoginManager.logOut();
    }
    else {
      this.props.navigation.navigate("Dashboard");
    }
  }

  login = _ => {
    const { username, password } = this.state;

    if (username == '' || password == '') {
      alert('Por favor, digite a senha do nome de usuário');
    }
    else {
      this.setState({ progressVisible: true });
      //  fetch(`http://168.187.116.75/kbiecapp/api/values/login?id=${encodedValue1}&pwd=${encodedValue2}`)

      axios.defaults.headers.post['Accept'] = 'application/json';

      axios.post(`${baseURL}/login`, {
        email: username,
        password: password,
      })
      .then((responseJson)=> {
        this.setState({
          result: responseJson,
          // loading: false,
        });

        if (this.state.result.status) {
          AsyncStorage.clear();
debugger;
          AsyncStorage.setItem('token', responseJson.data.access_token);

          this.setState({ progressVisible: false });

          this.props.navigation.navigate('Dashboard');
        }
        else {
          this.setState({ progressVisible: false });
          alert('Email de usuário ou senha incorreta');
        }
      })
      .catch(error => {
        
        this.setState({ progressVisible: false });
        alert('Email de usuário ou senha incorreta');
      })
    }
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // alert(JSON.stringify(userInfo))
      // alert(JSON.stringify(userInfo.user.email));
      // alert(userInfo.user.email+''+userInfo.user.id+''+userInfo.user.name);
      // alert(userInfo.user.id);
      // alert(userInfo.user.name);

      this.setState({ userInfo });

      fetch(`${baseURL}/login/google`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_id:userInfo.user.id,
          email:userInfo.user.email,
          first_name:userInfo.user.name,
          last_name:userInfo.user.name
        })
      })
      .then(response => response.json())
      .then((responseJson)=> {
        // alert(responseJson.status);
        // alert(JSON.stringify(responseJson));
      //  alert(responseJson.access_token);

      AsyncStorage.clear();
     AsyncStorage.setItem('token',responseJson.access_token);
     // alert("Login Successfully");
     this.props.navigation.navigate('Dashboard');
        // alert("Offer Created Successfully.")
        // this.props.navigation.navigate('offers');
      })
      .catch(error=>{
        debugger;
        console.log(JSON.stringify(error))
      }) //to catch the errors if any

      // this.props.navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
      debugger;
      // alert(JSON.stringify(error))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  initUser(token) {
    fetch('https://graph.facebook.com/v3.2/me?fields=email,first_name,last_name&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {


      // Some user object has been set up somewhere, build that user here
      // alert(JSON.stringify(json))
      // alert(JSON.stringify(json));
      //  alert(JSON.stringify(json));
      //  alert(JSON.stringify(json.id));

       fetch(`${baseURL}/login/fb`,
       {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          facebook_id:json.id,
           first_name:json.first_name,
           last_name:json.last_name,
            email: json.email,
         })
       })
       .then(response => response.json())
       .then((responseJson)=> {
         // alert(responseJson.status);
          // alert(JSON.stringify(responseJson));
        // alert(responseJson.access_token);

       AsyncStorage.clear();
      AsyncStorage.setItem('token',responseJson.access_token);
      // alert("Login Successfully");
      this.props.navigation.navigate('Dashboard');
         // alert("Offer Created Successfully.")
         // this.props.navigation.navigate('offers');
       })
       .catch(error=>console.log(JSON.stringify(error))) //to catch the errors if any
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    return (
      <Container>
        <ProgressDialog
          visible={this.state.progressVisible}
          title="Buscando dados"
          message="por favor, espere..."
        />

        <View style={[styles.ValignCenter]}>
          <Text style={[styles.fontSize25,styles.alignCenter,styles.colorGreen]}>Assinar em</Text>
          <View  style={[styles.marginLR15,styles.marginT45]}>
            <Item >
              <Input style={[styles.fontSize16]} placeholder="Nome do usuario"
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType="next"
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
              />
            </Item>
          </View>

          <View  style={[styles.marginLR15]}>
            <Item >
              <Input placeholder="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
          </View>

          <View  style={[styles.marginLR15,styles.marginTB10]}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
            <Text uppercase={false} style={[styles.fontSize12,styles.colorDarkGrey],{alignSelf:'flex-end',marginRight:'3%',fontSize:13}}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.login}>
          <View  style={{backgroundColor:'#58b368',width:'90%',alignSelf:'center',padding:12,alignItems:'center',borderRadius:10,marginTop:'2%'}}>
            {/* <Button onPress={this.login} block style={styles.BackgroundGreen}> */}
              <Text uppercase={false} style={{color:'white'}}>Assinar em</Text>
            {/* </Button> */}
          </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',width:'90%',alignSelf:'center',alignItems:'center',marginTop:'5%',justifyContent:'space-between'}}>
            <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: .5,
              width:'42%'
            }}>
            </View>
            <View >
              <Text>OU</Text>
            </View>
            <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: .5,
              width:'43%'
            }}>
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignSelf:'center',marginTop:'5%'}}>
            <TouchableOpacity style={{backgroundColor:'#e14a4a',padding:10,width:'44%',borderRadius:10,alignItems:'center'}} onPress={()=>this._signIn()}>
            <View>
                <Text style={{color:'white'}}>Google</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#23447d',padding:10,width:'44%',borderRadius:10,alignItems:'center'}}>
            <View>
            <Text style={{color:'white'}}>Facebook</Text>
            </View>
            </TouchableOpacity>
          </View>

          {/* <LoginButton
            readPermissions = {['public_profile'], ['email']}
            style = {{ height: 30, marginLeft:15, marginRight:15 }}
            onLoginFinished = {(error, result) => {
              if (error) {
                //alert(error)
              } else if (result.isCancelled) {
                // console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //alert(data.accessToken.toString())
                    this.initUser(data.accessToken.toString())
                  }
                )
              }
            }}
            onLogoutFinished={(err) => {
              debugger;
              console.log("logout.")
            }}
          /> */}

          {/* <GoogleSigninButton
            style={{ marginLeft:10, marginRight:10, height: 40 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
          /> */}

          <View style={{flexDirection:'row',width:'90%',marginLeft:'15%',top:10}} >
            {/* <Button transparent block onPress={() => this.props.navigation.navigate('Register')} style={[styles.greenBorder]}> */}
            <Text style={[styles.colorGreen]}>Nao tem conta?</Text>
              <Text style={[styles.colorGreen]} onPress={() => this.props.navigation.navigate('Register')} uppercase={false}>Inscreva-se agora</Text>
         
          </View>
          <View style={{alignSelf:'center',marginTop:'15%'}}>
            <Text style={{fontSize:10,fontWeight:'400',}}>Version 0.1.0</Text>
          </View>
        </View>
      </Container>
    );
  }
}

export default Login;

// const styles=StyleSheet.create({
//   versionText:{
//     fontSize:15,
//     lineHeight:20,
//     fontWeight:'500'
//   }
// })
