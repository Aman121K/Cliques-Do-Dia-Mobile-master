import React, { Component } from 'react';
import { TouchableOpacity,TextInput,AsyncStorage, StyleSheet, Image, Platform,StatusBar,ImageBackground } from 'react-native';
import styles from '../../style/style';
import ProgressLoader from 'rn-progress-loader';
import Star from 'react-native-star-view';
import {
  Container,
  Header,
  Button,
  View,
  Item,
  Text,
  Icon,
  Body,
  Form,
  List,
  ListItem,
  Footer,
  FooterTab,
  Card,
  CardItem,
  cardBody,
  Switch,
  Input,
  Label,
  Left, Right,
  Title,
  Thumbnail,
  Content,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal"
import { baseURL } from '../../../app.config';

// import Icon from '@expo/vector-icons/Ionicons';
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
class Account1 extends Component {

  constructor(props)
  {
    super();
    this.state = {
      email: '',
      first_name: '',
      phone: '',
      userId:'',
      isModalVisible: false,

      NameModal: false,
      EmailModal: false,

      oldPswd:'',
      newPswd:'',
      reNewPswd:'',
      Categories:[],
      selectedTabId:1,
      CategoryName:[],
      Cities:[],
      Result:[],
      progressVisible:true,
      searchURL:'',
      searchText: '',
      loader: true,
      category_id:2,
      city_id:1,
      token:'',

      selectedIndex: 0,
      selectedTab: 0,
    }
    this.openDrawer = this.openDrawer.bind(this);

  }
  openDrawer() {
    this.props.navigation.toggleDrawer();
}
toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
};

toggleNameModal = () => {
  this.setState({ NameModal: !this.state.NameModal });
};
toggleEmailModal = () => {
  this.setState({ EmailModal: !this.state.EmailModal });
};

logout() {
  AsyncStorage.removeItem('token');
  this.props.navigation.navigate("Login");
};





async componentDidMount() {

  this.setState({
    token:  await AsyncStorage.getItem("token")
  });

  // console.log("token in My Account:",token);

  fetch(`${baseURL}/user/me`,
  {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.token,
    }
  })
  .then(response => response.json())
  .then((responseJson)=> {
    debugger;
    this.setState({
     Result: responseJson,
     email:responseJson.user.email,
     first_name:responseJson.user.first_name,
     phone:responseJson.user.phone
    });
    // console.log("email-----------:",this.state.Result.user.email);
    // console.log("name-----------:",this.state.Result.user.first_name);
    // console.log("phone-----------:",this.state.Result.user.phone);
  })
  .catch(error=>console.log(error)) //to catch the errors if any









  if(this.state.token==null||this.state.token==''||this.state.token==undefined)
  {
    this.props.navigation.navigate("Login");
  }
  // console.log(phone);
  // this.setState({
  //   email: email,
  //   first_name: first_name,
  //   phone: phone,
  //   userId:ID,
  // });
}

UpdateProfile() {
  // console.log("fn:");

  if(this.state.first_name=="" || this.state.email=="")
  {
    alert("Please fill the the field");
  }
  else{

   this.setState({
    progressVisible: true,
  });
  // console.log("User ID:",this.state.first_name);
  // console.log("oldPswd:",this.state.email);
  // console.log("oldPswd:",this.state.phone);



  // const encodedValue1 = encodeURIComponent(this.state.username);
  // const encodedValue2 = encodeURIComponent(this.state.password);

//  fetch(`http://168.187.116.75/kbiecapp/api/values/login?id=${encodedValue1}&pwd=${encodedValue2}`)
fetch(`${baseURL}/user/update-me`, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.state.token,
                            },
                            body: JSON.stringify({
                              first_name:this.state.first_name,
                              last_name:this.state.first_name,
                                phone:this.state.phone,
                              email:this.state.email
                            }),
                          })
  .then(response => response.json())
  .then((responseJson)=> {
   console.log(responseJson);

   this.setState({
    result: responseJson,
    // loading: false,
    EmailModal:false,
    NameModal:false,
    progressVisible: false,
   });

    //  if(this.state.result.status==true)
    //  {
    //   this.toggleModal,
    //   alert("Changed Successfully");
    //   this.setState({
    //     progressVisible: false,
    //     isModalVisible: !this.state.isModalVisible
    //   });
    //  }
    //  else{
    //   this.toggleModal,
    //   alert(this.state.result.message);
    //   this.setState({
    //     progressVisible: false,
    //     isModalVisible: !this.state.isModalVisible
    //   });
    //  }

  })


  .catch(error=>alert(error)) //to catch the errors if any
    }

  this.toggleModal
}


changepswd() {
  // console.log("fn:");

  if(this.state.oldPswd=="" || this.state.newPswd==""|| this.state.reNewPswd=="")
  {
    alert("Please enter password");
  }
  else{

   this.setState({
    progressVisible: true,
  });
  // console.log("User ID:",this.state.userId);
  // console.log("oldPswd:",this.state.oldPswd);
  // console.log("newPswd:",this.state.newPswd);
  // console.log("reNewPswd:",this.state.reNewPswd);


  // const encodedValue1 = encodeURIComponent(this.state.username);
  // const encodedValue2 = encodeURIComponent(this.state.password);

//  fetch(`http://168.187.116.75/kbiecapp/api/values/login?id=${encodedValue1}&pwd=${encodedValue2}`)
debugger;
fetch(`${baseURL}/user/update-password`, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.state.token,
                            },
                            body: JSON.stringify({
                              old_password: this.state.oldPswd,
                              password:this.state.newPswd,
                              password_confirmation:this.state.reNewPswd,

                            }),
                          })
  .then(response => response.json())
  .then((responseJson)=> {
   console.log(responseJson);
   this.setState({
    result: responseJson,
    // loading: false,
    progressVisible: false,
   });

     if(this.state.result.status==true)
     {
      this.toggleModal,
      alert("Changed Successfully");
      this.setState({
        progressVisible: false,
        isModalVisible: !this.state.isModalVisible
      });
     }
     else{
      this.toggleModal,
      alert(this.state.result.message);
      this.setState({
        progressVisible: false,
        isModalVisible: !this.state.isModalVisible
      });
     }

  })


  .catch(error=>alert(error)) //to catch the errors if any
    }

  this.toggleModal
}



  render() {




    if(IS_ANDROID){
      StatusBar.setBackgroundColor("rgba(0,0,0,0.2)")
      StatusBar.setBarStyle("light-content")
      StatusBar.setTranslucent(true)
    }
    // console.log(getStatusBarHeight());
    const starStyle = {
      width: 100,
      height: 20,
      marginBottom: 20,
    };
    return (

        <Container>
         <ScrollView
           keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps={true}
      >



         <Header style={[styles.Mainheader]} >
          <Left  style={[styles.headerLeft]}>
          {
          //   <Button  onPress={()=> this.props.navigation.navigate('Dashboard')} transparent>
          //    <Image style={{height:18,width:20}} source={require('./../../../assets/back.png')} />
          // </Button>
        }
          </Left>
          <Body style={[styles.headerBody]}>
            <Title> <Text style={[styles.colorWhite,styles.fontSize22,styles.ValignCenter,styles.fontWeight500,styles.alignCenter]}>Meu Perfil </Text></Title>
          </Body>
          <Right style={[styles.headerRight]}>
             {/* <Image style={[styles.Icon20,styles.ValignCenter]} source={require('./../../../assets/star.png')} /> */}

          </Right>
        </Header>

        <View style={[styles.marginT25,styles.marginLR10]}>

        <ListItem >
    <Body style={[styles.flexRow,styles.alignLeft]}>
      <Text  style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}>Email:</Text>
      {
              (this.state.Result.length!=0)?
      <Text  style={[styles.colorDarkGrey,styles.fontSize14,]}> {this.state.email} </Text>
      :<Text> null </Text>
      }
        <TouchableOpacity style={[styles.ValignCenter]} onPress={this.toggleEmailModal} >
            <Image style={{height:14,width:14}} source={require('./../../../assets/edit.png')} />
          </TouchableOpacity>
      </Body>
</ListItem>

<ListItem >
    <Body style={[styles.flexRow,styles.alignLeft]}>
      <Text  style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}>Nome:</Text>
      {
              (this.state.Result.length!=0)?
      <Text  style={[styles.colorDarkGrey,styles.fontSize14,]}>{this.state.first_name} </Text>
      :<Text> null </Text>
    }
         <TouchableOpacity style={[styles.ValignCenter]} onPress={this.toggleNameModal} >
            <Image style={{height:14,width:14}} source={require('./../../../assets/edit.png')} />
          </TouchableOpacity>
      </Body>
</ListItem>



<ListItem >
    <Body style={[styles.flexRow]}>
      <Text  style={[styles.colorDarkGrey,styles.fontSize14,styles.alignLeft,styles.fontWeight500]}>Telefone:</Text>
      {
              (this.state.Result.length!=0)?
      <Text  style={[styles.colorDarkGrey,styles.fontSize14,styles.alignRight]}> {this.state.Result.user.phone} </Text>
      : <Text  style={[styles.colorDarkGrey,styles.fontSize14,styles.alignRight]}> none </Text>

    }
      {/* <Text style={[styles.colorBlack,styles.Underline,styles.fontSize12,styles.alignRight]}> Change</Text> */}
    </Body>
</ListItem>


<ListItem >

<Body>
<TouchableOpacity transparent  onPress={this.toggleModal}>
     <Text style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500,styles.Underline]}>Alterar a Senha</Text>
   </TouchableOpacity>
</Body>

</ListItem>


<Modal isVisible={this.state.isModalVisible}>
          <View style={[styles.bgColorWhite]}>
         <View style={[styles.flexRow]}>

         <Text style={[styles.fontWeight500,styles.ValignCenter,styles.colorBlack,styles.fontSize16,styles.alignLeft,styles.marginL10,styles.marginT25]}> Alteração da Senha </Text>
            <Button transparent style={[ styles.alignRight,styles.marginR10,styles.marginT15]} onPress={this.toggleModal}>
               <Text style={[styles.colorDarkGrey]}> Fechar </Text>
            </Button>

          </View>


            <View  style={[styles.marginLR15,styles.marginTB20]}>
                     <Item >
                      <Input style={[styles.fontSize16]} placeholder="Senha Atual"
                        autoCapitalize="none"
                        maxLength={12}
                        returnKeyType="next"
                        autoFocus = {true}

                        autoCorrect={false}
                        secureTextEntry={true}
                       value={this.state.oldPswd}
                       onChangeText={(oldPswd) => this.setState({ oldPswd })}

                      />
                    </Item>

                    <Item >
                      <Input style={[styles.fontSize16]} placeholder="Nova Senha"
                       autoCapitalize="none"
                      //  onSubmitEditing={() => this.passwordInput.focus()}
                       autoCorrect={false}
                      secureTextEntry={true}
                       returnKeyType="next"
                       value={this.state.newPswd}
                       onChangeText={(newPswd) => this.setState({ newPswd })}

                      />
                    </Item>

                    <Item >
                      <Input style={[styles.fontSize16]} placeholder="Confirmar Senha"
                       autoCapitalize="none"
                      //  onSubmitEditing={() => this.passwordInput.focus()}
                       autoCorrect={false}
                      secureTextEntry={true}
                       returnKeyType="next"
                       value={this.state.reNewPswd}
                       onChangeText={(reNewPswd) => this.setState({ reNewPswd })}

                      />
                    </Item>
                    <Button  onPress={()=>this.changepswd()} block style={[styles.BackgroundGreen,styles.marginT30]}>
                    <Text   uppercase={false}>Alterar a Senha</Text>
                  </Button>
                </View>


          </View>
        </Modal>



        <Modal isVisible={this.state.NameModal}>
          <View style={[styles.bgColorWhite]}>
         <View style={[styles.flexRow]}>

         <Text style={[styles.fontWeight500,styles.ValignCenter,styles.colorBlack,styles.fontSize16,styles.alignLeft,styles.marginL10,styles.marginT25]}> Alteração do Nome </Text>
            <Button transparent style={[ styles.alignRight,styles.marginR10,styles.marginT15]} onPress={this.toggleNameModal}>
               <Text style={[styles.colorDarkGrey]}> Fechar </Text>
            </Button>

          </View>


            <View  style={[styles.marginLR15,styles.marginTB20]}>

                    <Item >
                      <Input style={[styles.fontSize16]} placeholder="Name"
                       autoCapitalize="none" Fechar
                      //  onSubmitEditing={() => this.passwordInput.focus()}
                       autoCorrect={false}
                       returnKeyType="next"
                       value={this.state.first_name}
                       onChangeText={(first_name) => this.setState({ first_name })}

                      />
                    </Item>


                    <Button  onPress={()=>this.UpdateProfile()} block style={[styles.BackgroundGreen,styles.marginT30]}>
                    <Text   uppercase={false}>Alterar Nome </Text>
                  </Button>
                </View>


          </View>
        </Modal>



        <Modal isVisible={this.state.EmailModal}>
          <View style={[styles.bgColorWhite]}>
         <View style={[styles.flexRow]}>

         <Text style={[styles.fontWeight500,styles.ValignCenter,styles.colorBlack,styles.fontSize16,styles.alignLeft,styles.marginL10,styles.marginT25]}> Alteração do email </Text>
            <Button transparent style={[ styles.alignRight,styles.marginR10,styles.marginT15]} onPress={this.toggleEmailModal}>
               <Text style={[styles.colorDarkGrey]}> Fechar </Text>
            </Button>

          </View>


            <View  style={[styles.marginLR15,styles.marginTB20]}>

                    <Item >
                      <Input style={[styles.fontSize16]} placeholder="Email"
                       autoCapitalize="none"
                      //  onSubmitEditing={() => this.passwordInput.focus()}
                       autoCorrect={false}
                       returnKeyType="next"
                       value={this.state.email}
                       onChangeText={(email) => this.setState({ email })}

                      />
                    </Item>


                    <Button  onPress={()=>this.UpdateProfile()} block style={[styles.BackgroundGreen,styles.marginT30]}>
                    <Text   uppercase={false}>Alterar Email </Text>
                  </Button>
                </View>


          </View>
        </Modal>


{/*
<ListItem >
<Body>
  <Text  style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}> Notifications</Text>
</Body>
<Right>
  <Switch value={false} />
</Right>
</ListItem> */}

<ListItem >

<Body>
 <TouchableOpacity transparent  onPress={()=>this.logout()}>
    <Text style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500,styles.Underline]}>Sair</Text>
  </TouchableOpacity>
</Body>

</ListItem>



</View>




       </ScrollView>
       <Footer style={[styles.bgColorWhite,styles.borderTop]}>
          <FooterTab style={[styles.bgColorWhite]}>
            <Button onPress={()=> this.props.navigation.navigate('Dashboard')}>
              <Image active style={[styles.icon20]} source={require('./../../../assets/home.png')} />
            </Button>
            {/* <Button  onPress={()=> this.props.navigation.navigate('Coupons')}>
            <Image style={[styles.icon20]} source={require('./../../../assets/coupon.png')} />
            </Button> */}

            <Button  onPress={()=> this.props.navigation.navigate('offers')}>
            <Image style={[styles.icon20]} source={require('./../../../assets/offer.png')} />
            </Button>

            <Button onPress={()=> this.props.navigation.navigate('Account1')}>
            <Image style={[styles.icon20]} source={require('./../../../assets/user.png')} />
            </Button>
          </FooterTab>
          </Footer>


      </Container>

    );
  }
}
export default Account1;
