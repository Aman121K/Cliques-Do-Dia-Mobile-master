import React, { Component } from 'react';
import {
  Container, Header, Button,
  View, Item, Text,
  Body, Icon, Form,
  Input, Label, Title,
} from 'native-base';
import { ProgressDialog } from 'react-native-simple-dialogs';
import {
  TouchableOpacity, TextInput, StyleSheet, Image, AsyncStorage, KeyboardAvoidingView
} from 'react-native';

import { baseURL } from '../../../app.config';
import styles from '../../style/style';

class Register extends Component {
  state = {
    hidePassword: true,
    fname: '',
    lname: '',
    phone: '',
    username: '',
    password: '',
    cpassword: '',
    progressVisible:false,
    result:''
  }

  async componentDidMount() {
    const email = await AsyncStorage.getItem("email");
    const first_name = await AsyncStorage.getItem("first_name");
    const phone = await AsyncStorage.getItem("phone");

    // if(email==null||email==''||email==undefined)
    // {
    //   this.props.navigation.navigate("Login");
    // }
  }

  signup() {
    const { username, password, fname, lname, phone, cpassword } = this.state;
    if (username == '' || password == '' || fname == '' || lname == '' || phone == '' || cpassword == '') {
      alert('Please enter all the fields');
    }
    else {
      this.setState({ progressVisible: true });
      // console.log("username:",typeof(this.state.username));
      // console.log("password:",typeof(this.state.password));
      // console.log("fname:",typeof(this.state.fname));
      // console.log("lname:",typeof(this.state.lname));
      // console.log("phone:",typeof(this.state.phone));
      // console.log("cpassword:",typeof(this.state.cpassword));

      // console.log("username:",this.state.username);
      // console.log("password:",this.state.password);
      // console.log("fname:",this.state.fname);
      // console.log("lname:",this.state.lname);
      // console.log("phone:",this.state.phone);
      // console.log("cpassword:",this.state.cpassword);

      // const encodedValue1 = encodeURIComponent(this.state.username);
      // const encodedValue2 = encodeURIComponent(this.state.password);

      //  fetch(`http://168.187.116.75/kbiecapp/api/values/login?id=${encodedValue1}&pwd=${encodedValue2}`)
      fetch(`${baseURL}/new-profile`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.username,
          first_name: this.state.fname,
          last_name:this.state.lname,
          phone: this.state.phone,
          password:this.state.password,
          password_confirmation:this.state.cpassword,
        }),
      })
      .then(response => response.json())
      .then((responseJson)=> {
        console.log(responseJson);
        this.setState({
          result: responseJson,
          progressVisible: false,
        });

        if (this.state.result.status) {
          alert('Registration succeed');
          // AsyncStorage.setItem('username',this.state.username);
          // AsyncStorage.setItem('password',this.state.password);

          // AsyncStorage.setItem('email',this.state.result.user.email);
          // AsyncStorage.setItem('first_name',this.state.result.user.first_name);
          // AsyncStorage.setItem('phone',this.state.result.user.phone);

          // console.log(this.state.result.user.email);
          // console.log(this.state.result.user.first_name);
          // console.log(this.state.result.user.phone);

          this.props.navigation.navigate('Login');
          this.setState({ progressVisible: false });
        }
        else {
          console.log(this.state.result.message.email);
          alert("Algo deu errado no lado do servidor");
          this.setState({ progressVisible: false });
        }
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    }
  }

  managePasswordVisibility = _ => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container} enabled>
        <ProgressDialog
          visible={this.state.progressVisible}
          title=" Fetching Data"
          message="Please wait..."
        />

        <View style={[]}>
          <Text style={[styles.fontSize25,styles.alignCenter,styles.marginT45,styles.colorGreen]}>Novo Cadastro</Text>
          <View  style={[styles.marginLR30,styles.marginT45]}>
            <Item >
              <Input style={[styles.fontSize16]} placeholder="Primeiro Nome"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType="next"
                value={this.state.fname}
                onChangeText={(fname) => this.setState({ fname })}
              />
            </Item>
          </View>

          <View style={[styles.marginLR30]}>
            <Item>
              <Input
                style={[styles.fontSize16]}
                placeholder="Segundo Nome"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType="next"
                value={this.state.lname}
                onChangeText={(lname) => this.setState({ lname })}
              />
            </Item>
          </View>

          <View  style={[styles.marginLR30]}>
            <Item >
              <Input
                style={[styles.fontSize16]}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType="next"
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
              />
            </Item>
          </View>

          <View style={[styles.marginLR30]}>
            <Item >
              <Input
                style={[styles.fontSize16]} placeholder="Telefone"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='number-pad'
                returnKeyType="next"
                value={this.state.phone}
                onChangeText={(phone) => this.setState({ phone })}
              />
            </Item>
          </View>

          <View style={[styles.marginLR30]}>
            <Item>
              <Input placeholder="Senha"
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}
              />
            </Item>

            <Item >
              <Input
                placeholder="Confirmar Senha"
                value={this.state.cpassword}
                onChangeText={(cpassword) => this.setState({ cpassword })}
                secureTextEntry={true}
              />
            </Item>
          </View>

          <View  style={[styles.marginLR30,styles.marginTB15]}>
            <Button onPress={this.signup.bind(this)} block style={styles.BackgroundGreen}>
              <Text uppercase={false}>Cadastro</Text>
            </Button>
          </View>

          <View style={[styles.marginLR30,styles.marginTB15]}>
            <Button transparent block  onPress={() => this.props.navigation.navigate('Login')} style={[styles.greenBorder]}>
              <Text style={[styles.colorGreen]}  uppercase={false}>Já possui conta?</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Register;
