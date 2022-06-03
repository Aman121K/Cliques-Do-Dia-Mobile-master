import React, { Component } from 'react';
import { TouchableOpacity,TextInput, StyleSheet,AsyncStorage, Image, Platform,StatusBar,ImageBackground,Alert } from 'react-native';
import styles from '../../style/style';
import ProgressLoader from 'rn-progress-loader';
import { ProgressDialog,Confirm } from 'react-native-simple-dialogs';
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
import axios from 'axios';
import { baseURL } from '../../../app.config';

// import Icon from '@expo/vector-icons/Ionicons';
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
class OfferDetail extends Component {

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
      CouponResult:[],
      progressVisible:true,
      searchURL:'',
      searchText: '',
      loader: true,
      category_id:2,
      city_id:1,
      offer_id:'',
      dialogVisible:false,
      selectedIndex: 0,
      selectedTab: 0,
    }
    this.openDrawer = this.openDrawer.bind(this);
    this.fetchData=this.fetchData.bind(this);
  }
  openDrawer() {
    this.props.navigation.toggleDrawer();
}

ConfirmCoupon(){


  Alert.alert(
    'Geração de Cupom',
    'Você tem certeza?',
    [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Gerar', onPress: () => this.GenerateCoupon()},
    ],
    {cancelable: false},
  );

}

GenerateCoupon(){
  // console.log(process.env);



// console.log("this.state.offer_id=",this.state.offer_id);
  const URL=`${baseURL}/user/offer/${this.state.offer_id}/generate-coupon`

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
        if (responseJson.status == true) {
          this.setState({
            CouponResult: responseJson
          });
        }
        // console.log("Result of coupon: ",this.state.CouponResult);

        alert(responseJson.message);

        this.setState({
          progressVisible: false,
        });

      })
      .catch(error=>console.log(error)) //to catch the errors if any



}

fetchData(){
  const { navigation } = this.props;
  const itemId = navigation.getParam('itemId');



  this.setState({
    progressVisible: true,
    ItemId:itemId
  });



  // console.log("id-----",itemId);

const url=`${baseURL}/single-post?id=${itemId}`;

axios.get(url)
.then((responseJson)=> {
  if (responseJson.data) {
    this.setState({
      Result: responseJson.data.data,
      offer_id:responseJson.data.data.id
    });
  }
  // console.log("Result: ",this.state.Result);

  // console.log("image: ",this.state.Result.images);
  // console.log("short_desc: ",this.state.Result.short_desc);



  // this.state.Result.map( (x,i) =>
  // {
  //   console.log("Tittle:",x.title);  // value={x.id}  />
  //  console.log("images type---------------:",x.images.toString());
  //   console.log("min_price:",x.min_price);
  //   console.log("short_desc:",x.short_desc);
  //   console.log("id:",x.id);
  //   console.log("Tittle:",x.title);
  //})
  this.setState({
    progressVisible: false,
  });

})
.catch(error => {
  debugger;
  console.log(error)
}) //to catch the errors if any


}

async componentDidMount(){

  this.setState({
    token:  await AsyncStorage.getItem("token"),
  });

    this.fetchData();
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
         <ScrollView>



         <Header style={[styles.Mainheader]} >
          <Left  style={[styles.headerLeft]}>
          {
          // <Button onPress={this.openDrawer}  transparent>
          // <Image style={{height:15,width:18}} source={require('./../../../assets/menu.png')} />
          //</Button>
          }
          </Left>
          <Body style={[styles.headerBody]}>
            <Title> <Text style={[styles.colorWhite,styles.fontSize22,styles.ValignCenter,styles.fontWeight500,styles.alignCenter]}>Macarronada Italiana</Text></Title>
          </Body>
          <Right style={[styles.headerRight]}>
          {// <Image style={[styles.Icon20,styles.ValignCenter]} source={require('./../../../assets/star.png')} />
}
          </Right>
        </Header>

        {/* <Confirm
            title="Confirm Dialog"
            message="Are you sure about that?"
            visible={this.state.dialogVisible}
            onTouchOutside={() => this.setState({dialogVisible: false})}
            positiveButton={{
                title: "YES",
                onPress: () => alert("hello")
            }}
            negativeButton={{
                title: "NO",
                onPress: () => this.setState({dialogVisible: false})
            }}
        /> */}


        <ProgressLoader
                visible={this.state.visible}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"} />

        {/* <Image style={[styles.ProductBG]} source={require('./../../../assets/sliders/1.jpg')} /> */}
{
  (this.state.Result.images)?
        <ImageBackground  resizeMode="cover" style={[styles.ProductBG]}
        source={{uri:this.state.Result.images}}>
            <View style={[styles.paddingLR20,styles.paddingTB20,styles.ValignBottom,styles.bgColorBlack]}>

                <Text  style={[styles.marginTB20,styles.colorWhite,styles.ValignCenter,styles.fontSize25,styles.fontWeight500]}> {this.state.Result.title}</Text>
                <Text  style={[styles.marginTB20,styles.colorWhite,styles.ValignCenter,styles.fontSize14,styles.fontWeight400]}>
               {this.state.Result.short_desc}
                  </Text>

        <View style={[styles.flexRow,styles.marginT5]}>
             <Text style={[styles.fontSize14,styles.colorGreen,styles.LineThrough]}> deR$ </Text>
             <Text style={[styles.fontSize16,styles.colorWhite,styles.LineThrough]}> {this.state.Result.min_price}</Text>

             <Text style={[styles.fontSize14,styles.colorGreen]}>     porR$ </Text>
             <Text style={[styles.fontSize16,styles.colorWhite]}> {this.state.Result.max_price} </Text>


        </View>

            </View>

      </ImageBackground>
      :null
}
            <View style={[styles.marginB10]}>
            <Button
                onPress={()=> this.ConfirmCoupon()}
                style={[styles.bgcolorLightGreen]} full>
                <Text>Gerar Cupom</Text>
          </Button>
            </View>

            <View style={[styles.marginT5,styles.marginB20,styles.marginLR15]}>

            <View style={[styles.marginT5,styles.marginB20]}>
                                  <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14,styles.fontWeight500]}>Detalhes da Oferta:</Text>
                                  <Text  style={[styles.colorDarkGrey,styles.fontSize14]}>{this.state.Result.description}</Text>

                  </View>

                  <View style={[styles.marginT5,styles.marginB20]}>
                                  <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14,styles.fontWeight500]}> Dias Da Semana:</Text>




                      <View style={[styles.flexRow,styles.flexWrap]}>
                      {
                        (this.state.Result.amenities)?
                        this.state.Result.amenities.map( (x,i) =>
                         (
                          <View style={[styles.flexRow,styles.width49p,styles.marginT15,styles.marginL5]}>
                            <Image style={[styles.icon16]} source={require('./../../../assets/check.png')} />
                            <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14]}>   {x}</Text>
                          </View>
                         )):null
                      }
                      </View>


                      {/* <View style={[styles.flexRow]}>
                          <View style={[,styles.width49p,styles.flexRow,styles.marginT15,styles.marginL5]}>
                            <Image style={[styles.icon16]} source={require('./../../../assets/check.png')} />
                            <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14]}>    Sexta-feira</Text>
                          </View>

                          <View style={[styles.width49p,styles.flexRow,styles.marginT15,styles.marginL5]}>
                            <Image style={[styles.icon16]} source={require('./../../../assets/check.png')} />
                            <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14]}>   Domingo</Text>
                          </View>
                      </View> */}







                  </View>






            <View style={[styles.marginT5]}>
               <Text  style={[styles.marginL5,styles.colorDarkGrey,styles.marginB5,styles.fontSize14,styles.fontWeight500]}>Classificação:</Text>
                <View style={[styles.flexRow]}>
                     <Star score={this.state.Result.rating} style={starStyle} />
                      <Text style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14,styles.fontWeight500]}> {this.state.Result.rating && this.state.Result.rating.toFixed(1)} /5</Text>
                </View>
                </View>



                  <View style={[styles.marginTB5]}>
                                  <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14,styles.fontWeight500]}>CONTATO:</Text>
                                          <Text  style={[styles.colorDarkGrey,styles.fontSize14,]}>{this.state.Result.address}</Text>

                      <View style={[styles.flexRow,styles.marginT15]}>
                         <Image style={[styles.icon18]} source={require('./../../../assets/call.png')} />
                         <Text  style={[styles.colorDarkGrey,styles.marginB5,styles.fontSize14,styles.fontWeight500]}>  {this.state.Result.phone}</Text>
                      </View>

                  </View>


            </View>





        <View style={[styles.marginTBLR5]}>
        <Button  onPress={() => {
            this.props.navigation.navigate('Comments', {
              itemId: this.state.ItemId});
          }} style={[styles.bgColorOrange]} full>
            <Text>Avaliações</Text>
          </Button>
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
export default OfferDetail;
