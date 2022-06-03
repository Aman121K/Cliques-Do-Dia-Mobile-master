import React, { Component } from 'react';
import { TouchableOpacity, TextInput,AsyncStorage, StyleSheet, Image, Platform,StatusBar,ImageBackground } from 'react-native';
import styles from '../../style/style';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Tabs from './components/Tabs';
// import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
// import { LoginButton } from 'react-native-fbsdk';
// GoogleSignin.configure({
//   androidClientId:'266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//   iosClientId: '266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//   scopes: ["profile", "email"]
// });
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
  Footer,
  FooterTab
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
 import MainHeader from '../../components/Header';
import { baseURL } from '../../../app.config';

// import Icon from '@expo/vector-icons/Ionicons';
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
class Coupons extends Component {

  constructor(props)
  {
    super();
    this.state = {
      token:'',
      Categories:[],
      selectedTabId:1,
      CategoryName:[],
      Cities:[],
      Result:[],
      searchURL:'',
      searchText: '',
      loader: true,
      category_id:2,
      city_id:1,
      userInfo: null,
      error: null,
      selectedIndex: 0,
      selectedTab: 0,
      selected: undefined,
      CouponResult:''
    }
    this.openDrawer = this.openDrawer.bind(this);
    this.TabSwitch = this.TabSwitch.bind(this);
    this.fetchData=this.fetchData.bind(this);

    // GoogleSignin.configure();
  }
  openDrawer() {
    this.props.navigation.toggleDrawer();
}

// async setupGoogleSignin() {
//   try {

//     await GoogleSignin.configure({
//       iosClientId: '266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//       androidClientId:'266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//       webClientId: '266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//       offlineAccess: true
//     });
//     const user = await GoogleSignIn.signInPromise();
//     setTimeout(() => {
//       alert(JSON.stringify(user));
//     }, 2000);
//     console.log("user from google sin in", user);
//   } catch (err) {
//     console.log("Google signin error", err.code, err.message);
//   }
// }

// _configureGoogleSignIn() {
//   try {
//   GoogleSignin.configure({
//     androidClientId:'266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//     iosClientId: '266564509095-caq9m2s1kcuva38h4rt8qtn3d8nqq4q4.apps.googleusercontent.com',
//     scopes: ["profile", "email"]
//   });}
//   catch (error) {
//     console.log("error:",error);
//   }
// }

// signIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     console.log("Info:--------",userInfo);
//     this.setState({ infoData:userInfo });
//     console.log("Info:-----ddfdf---",this.state.infoData);
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (f.e. sign in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//     } else {
//       // some other error happened
//     }
//   }
// };


//  _getCurrentUser() {
//   try {
//     const userInfo =  GoogleSignin.signIn();
//     this.setState({ userInfo, error: null });
//     console.log("dsdsdsd---------",this.state.userInfo);
//   } catch (error) {
//     const errorMessage =
//       error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
//     this.setState({
//       error: new Error(errorMessage),
//     });
//     console.log("error-----",this.state.error);
//   }
// }

TabSwitch = (index: number) => {
  this.setState(prevState => ({ ...prevState, selectedTab: index }))

  this.setState({selectedTabId:index+1}, () => {this.fetchData();});
 // this.signIn();
//  this._configureGoogleSignIn();
//  this._getCurrentUser();
}



fetchData(){
  this.setState({
    progressVisible: true,
  });

// console.log("cat id----: ",this.state.selectedTabId)
// console.log("city id----: ",this.state.city_id);
// console.log("searchText id----: ",this.state.searchText);


const url=`${baseURL}/user/coupons?coupon_status=${this.state.selectedTabId}`;

fetch(url,
  {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.token
   } }
  )
.then(response => response.json())
.then((responseJson)=> {
  // debugger;
  this.setState({
   Result: responseJson.data,
  });
  console.log("Result: ",this.state.Result);

  // this.state.Result.map( (x,i) =>
  // {
  //   console.log("Tittle:",x.title);  // value={x.id}  />
  //  console.log("images type---------------:",x.images.toString());
  //   console.log("min_price:",x.min_price);
  //   console.log("short_desc:",x.short_desc);
  //   console.log("id:",x.id);
  //   console.log("Tittle:",x.title);
  // })
  this.setState({
    progressVisible: false,
  });

})
.catch(error => console.log(error)) //to catch the errors if any


}
async componentDidMount(){
  this.setState({
    token:  await AsyncStorage.getItem("token"),
  });



// this.setupGoogleSignin();
  this.fetchData();
}


UseCoupon(id){



  // console.log("this.state.offer_id=",id);
    const URL=`${baseURL}/user/offer/${id}/use-coupon`

            // console.log("URL:",URL);
        fetch(URL,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.state.token
          } }
          )
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
          CouponResult: responseJson,
          });
          // console.log("Result of coupon: ",this.state.CouponResult);

           alert("concluída");
           this.fetchData();

          this.setState({
            progressVisible: false,
          });

        })
        .catch(error=>console.log(error)) //to catch the errors if any



  }


  NotUseCoupon(id){



    // console.log("not used this.state.offer_id=",id);
      const URL=`${baseURL}/user/offer/${id}/no-use-coupon`

              // console.log("URL:",URL);
          fetch(URL,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            } }
            )
          .then(response => response.json())
          .then((responseJson)=> {
            this.setState({
            CouponResult: responseJson,
            });
            // console.log("Result of coupon: ",this.state.CouponResult);

             alert("concluída");
             this.fetchData();

            this.setState({
              progressVisible: false,
            });

          })
          .catch(error=>console.log(error)) //to catch the errors if any



    }


  render() {
    const { selectedIndex,selectedTab } = this.state
    if(IS_ANDROID){
      StatusBar.setBackgroundColor("rgba(0,0,0,0.2)")
      StatusBar.setBarStyle("light-content")
      StatusBar.setTranslucent(true)
    }
    // console.log(getStatusBarHeight());
    return (

        <Container>


         <Header style={[styles.Mainheader]} >
          <Left  style={[styles.headerLeft]}>
          {/* <Button  onPress={this.openDrawer} transparent>
               <Image style={{height:20,width:20}} source={require('./../../../assets/menu.png')} />
          </Button> */}
          </Left>
          <Body style={[styles.headerBody]}>
            <Title> <Text style={[styles.colorWhite,styles.fontSize20,styles.fontWeight500,styles.alignCenter]}>Meus Coupons</Text></Title>
          </Body>
          <Right style={[styles.headerRight]}>


          </Right>
        </Header>




        <Tabs  selectedIndex={selectedTab} TabSwitch={this.TabSwitch}  values={['EMITIDOS', 'ENCERRADOS','UTILIZADOS']}/>

          {selectedTab === 0
                    &&
            <ScrollView>
          {
              (this.state.Result!=null)?
              this.state.Result.map( (x) =>
              (
                <Card style={[styles.marginLR5]}>
                  <CardItem cardBody>
                    <View style={[styles.marginTB10,styles.marginLR15]}>
                          <View style={[styles.flexRow,]}>
                              <Thumbnail square small source={{uri:x.image}} />
                                <Text style={[styles.ValignCenter,styles.marginL20,styles.fontWeight500,styles.fontSize17,styles.colorDarkGrey,styles.marginB5]}>{x.title}</Text>
                          </View>
                          <Text style={[styles.fontSize13,styles.marginT15,styles.colorDarkGrey]} >{x.short_desc}</Text>


                          <View style={[styles.flexRow,styles.marginTB10,styles.width100p]}>
                              <Text style={[styles.fontWeight400,styles.fontSize16,styles.colorDarkGrey]}>código:</Text>
                              <Text style={[styles.fontWeight500,styles.fontSize16,styles.colorDarkGrey]}> {x.coupon_code}</Text>

                              <Button  onPress={()=> this.UseCoupon(x.id)}
                               small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>Usei</Text>
                              </Button>

                              <Button  onPress={()=> this.NotUseCoupon(x.id)}
                               small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>Nao Usei</Text>
                              </Button>
                          </View>
                    </View>
                  </CardItem>
            </Card>
              ))
              :null

          }

            {/* <Card style={[styles.marginLR5]}>
                  <CardItem cardBody>
                    <View style={[styles.marginTB10,styles.marginLR15]}>
                          <View style={[styles.flexRow,]}>
                              <Thumbnail square small source={require('./../../../assets/sliders/2.jpg')} />
                                <Text style={[styles.ValignCenter,styles.marginL20,styles.fontWeight500,styles.fontSize17,styles.colorDarkGrey,styles.marginB5]}>Marisa</Text>
                          </View>
                          <Text style={[styles.fontSize13,styles.marginT15,styles.colorDarkGrey]} >Chopp Brahma em dobro1! Chopp Brahma em dobro1!</Text>


                          <View style={[styles.flexRow,styles.marginTB10,styles.width100p]}>
                              <Text style={[styles.fontWeight400,styles.fontSize16,styles.colorDarkGrey]}>código:</Text>
                              <Text style={[styles.fontWeight500,styles.fontSize16,styles.colorDarkGrey]}> 152634785</Text>
                              <Button small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>revê-lo</Text>
                              </Button>
                          </View>
                    </View>
                  </CardItem>
            </Card>


            <Card style={[styles.marginLR5]}>
                  <CardItem cardBody>
                    <View style={[styles.marginTB10,styles.marginLR15]}>
                          <View style={[styles.flexRow,]}>
                              <Thumbnail square small source={require('./../../../assets/sliders/4.jpeg')} />
                                <Text style={[styles.ValignCenter,styles.marginL20,styles.fontWeight500,styles.fontSize17,styles.colorDarkGrey,styles.marginB5]}>Botequim Floripa</Text>
                          </View>
                          <Text style={[styles.fontSize13,styles.marginT15,styles.colorDarkGrey]} >Chopp Brahma em dobro1!</Text>


                          <View style={[styles.flexRow,styles.marginTB10,styles.width100p]}>
                              <Text style={[styles.fontWeight400,styles.fontSize16,styles.colorDarkGrey]}>código:</Text>
                              <Text style={[styles.fontWeight500,styles.fontSize16,styles.colorDarkGrey]}> 152634785</Text>
                              <Button small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>revê-lo</Text>
                              </Button>
                          </View>
                    </View>
                  </CardItem>
            </Card>


            <Card style={[styles.marginLR5]}>
                  <CardItem cardBody>
                    <View style={[styles.marginTB10,styles.marginLR15]}>
                          <View style={[styles.flexRow,]}>
                              <Thumbnail square small source={require('./../../../assets/sliders/1.jpg')} />
                                <Text style={[styles.ValignCenter,styles.marginL20,styles.fontWeight500,styles.fontSize17,styles.colorDarkGrey,styles.marginB5]}>Cinepolis</Text>
                          </View>
                          <Text style={[styles.fontSize13,styles.marginT15,styles.colorDarkGrey]} >Chopp Brahma em dobro1! Chopp Brahma em dobro1!</Text>


                          <View style={[styles.flexRow,styles.marginTB10,styles.width100p]}>
                              <Text style={[styles.fontWeight400,styles.fontSize16,styles.colorDarkGrey]}>código:</Text>
                              <Text style={[styles.fontWeight500,styles.fontSize16,styles.colorDarkGrey]}> 152634785</Text>
                              <Button small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>revê-lo</Text>
                              </Button>
                          </View>
                    </View>
                  </CardItem>
            </Card> */}


</ScrollView>

        }

      {selectedTab === 1
              &&
              <ScrollView>

{
              (this.state.Result!=null)?
              this.state.Result.map( (x) =>
              (
                <Card style={[styles.marginLR5]}>
                  <CardItem cardBody>
                    <View style={[styles.marginTB10,styles.marginLR15]}>
                          <View style={[styles.flexRow,]}>
                              <Thumbnail square small source={{uri:x.image}} />
                                <Text style={[styles.ValignCenter,styles.marginL20,styles.fontWeight500,styles.fontSize17,styles.colorDarkGrey,styles.marginB5]}>{x.title}</Text>
                          </View>
                          <Text style={[styles.fontSize13,styles.marginT15,styles.colorDarkGrey]} >{x.short_desc}</Text>


                          <View style={[styles.flexRow,styles.marginTB10,styles.width100p]}>
                              <Text style={[styles.fontWeight400,styles.fontSize16,styles.colorDarkGrey]}>código:</Text>
                              <Text style={[styles.fontWeight500,styles.fontSize16,styles.colorDarkGrey]}> {x.coupon_code}</Text>
                              {/* <Button small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>revê-lo</Text>
                              </Button> */}
                          </View>
                    </View>
                  </CardItem>
            </Card>
              ))
              :null

          }

  </ScrollView>

            }
     {selectedTab === 2
              &&
              <ScrollView>
         {
              (this.state.Result!=null)?
              this.state.Result.map( (x) =>
              (
                <Card style={[styles.marginLR5]}>
                  <CardItem cardBody>
                    <View style={[styles.marginTB10,styles.marginLR15]}>
                          <View style={[styles.flexRow,]}>
                              <Thumbnail square small source={{uri:x.image}} />
                                <Text style={[styles.ValignCenter,styles.marginL20,styles.fontWeight500,styles.fontSize17,styles.colorDarkGrey,styles.marginB5]}>{x.title}</Text>
                          </View>
                          <Text style={[styles.fontSize13,styles.marginT15,styles.colorDarkGrey]} >{x.short_desc}</Text>


                          <View style={[styles.flexRow,styles.marginTB10,styles.width100p]}>
                              <Text style={[styles.fontWeight400,styles.fontSize16,styles.colorDarkGrey]}>código:</Text>
                              <Text style={[styles.fontWeight500,styles.fontSize16,styles.colorDarkGrey]}> {x.coupon_code}</Text>
                              {/* <Button small style={[styles.bgColorOrange,styles.alignRight,styles.marginT5]}>
                                <Text>revê-lo</Text>
                              </Button> */}
                          </View>
                    </View>
                  </CardItem>
            </Card>
              ))
                :null

            }


  </ScrollView>

     }
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
export default Coupons;
