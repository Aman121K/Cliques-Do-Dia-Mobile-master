import React, { Component } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Platform,Image, ImageBackground,StatusBar ,StatusBarManager,AsyncStorage  } from 'react-native';

import styles, { colors } from '../../style/style';
import MyWorkoutsStyle from './style/MyWorkoutsStyle';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
  Card,
  CardItem,
  Footer,
  FooterTab,
  cardBody,
  Input,
  Label,
  Left, Right,
  Title,
  Thumbnail,
  Content,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { baseURL } from '../../../app.config';

// import Icon from '@expo/vector-icons/Ionicons';
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
const SLIDER_1_FIRST_ITEM = 1;

class Comments extends Component {

  constructor(props)
  {
    super();
    this.state = {
      l1:10,
      l2:20,
      l3:30,
      l4:40,
      l5:50,
      l6:60,
      Result:[],
      ItemId:'',
      token:'',
      Review:'',
      Ratings:0,
      l1T:false,
      l2T:false,
      l3T:false,
      l4T:false,
      l5T:false,
      l6T:false,
      progressVisible: false
    }
    this.openDrawer = this.openDrawer.bind(this);
    this.onIncrementDecrement1= this.onIncrementDecrement1.bind(this);
    this.onIncrementDecrement2= this.onIncrementDecrement2.bind(this);
    this.onIncrementDecrement3= this.onIncrementDecrement3.bind(this);
    this.onIncrementDecrement4= this.onIncrementDecrement4.bind(this);
  }
  openDrawer() {
    this.props.navigation.toggleDrawer();
}

ratingCompleted(rating) {
  console.log("Rating is: " + rating)
  this.setState({
    Ratings:rating
  });
}

onIncrementDecrement1(){
  if(this.state.l1T==true){this.setState({l1:this.state.l1-1,l1T:false})}
  else{this.setState({l1:this.state.l1+1,l1T:true,})}
}
onIncrementDecrement2(){
if(this.state.l2T==true){this.setState({l2:this.state.l2-1,l2T:false})}
else{this.setState({l2:this.state.l2+1,l2T:true,})}
}
onIncrementDecrement3(){
if(this.state.l3T==true){this.setState({l3:this.state.l3-1,l3T:false})}
else{this.setState({l3:this.state.l3+1,l3T:true,})}
}
onIncrementDecrement4(){
if(this.state.l4T==true){this.setState({l4:this.state.l4-1,l4T:false})}
else{this.setState({l4:this.state.l4+1,l4T:true,})}
}

async componentDidMount() {
  const { navigation } = this.props;
  const itemId = navigation.getParam('itemId');

  this.setState({
    token:  await AsyncStorage.getItem("token"),
  });

  this.setState({
    ItemId:itemId
  });

  console.log("id-----",itemId);
this.FetchReviews(itemId);

}

FetchReviews(itemId){

  const url=`${baseURL}/single-post?id=${itemId}`

  this.setState({ progressVisible: true });

      fetch(url)
      .then(response => response.json())
      .then((responseJson)=> {
        debugger;
        this.setState({
        Result: responseJson.data,
        });
        console.log("Result: ",this.state.Result);

        console.log("reviews: ",this.state.Result.review.all_reviews);

        this.setState({
          progressVisible: false,
        });

      })
      .catch(error=>console.log(error)) //to catch the errors if any
      .finally(() => {
        this.setState({ progressVisible: false });
      })

}

PostReview(){

  console.log("Posttttttttt",this.state.token);
  const URL= `${baseURL}/user/offer/${this.state.ItemId}/post-review`

  this.setState({ progressVisible: true });

  axios.post(URL,
    JSON.stringify({
      title:this.state.Review,
      review:this.state.Review,
      rating:this.state.Ratings
    }),
    {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.token,
    },
  })
  .then((responseJson)=> {
    // alert(responseJson.status);
    alert(JSON.stringify(responseJson.data.message.replace("", '')));

    let response = this.state.Result;

    response.review.all_reviews.push(responseJson.data.data);
    this.setState({
      Result: response,
    });
   // console.log(responseJson);
   // this.setState({ Review:''})
   // this.FetchReviews(this.state.ItemId);
    //  alert("Offer Created Successfully.")
    // this.props.navigation.navigate('offers');
  })
  .catch(error => {
    alert(JSON.stringify(error))
  }) //to catch the errors if any
  .finally(() => {
    this.setState({
      progressVisible: false,
      Review: '',
      Ratings: ''
    })
  })






}





  render() {

    if(IS_ANDROID){
      StatusBar.setBackgroundColor("rgba(0,0,0,0.2)")
      StatusBar.setBarStyle("light-content")
      StatusBar.setTranslucent(true)
    }

    const starStyle = {
      width: 100,
      height: 20,
      marginBottom: 20,
    };

    // console.log(getStatusBarHeight());
    return (

        <Container style={[styles.bgcolorGray]}>

          <Header searchBar rounded style={[MyWorkoutsStyle.header]} >
              <Left  style={[styles.headerLeft]}>
                {
                // <Button  onPress={()=>this.props.navigation.pop(1)}

                // transparent>
                //    <Image style={{height:20,width:20}} source={require('./../../../assets/back.png')} />
                // </Button>
              }
              </Left>
              <Body style={[styles.headerBody]}>
                  <Text style={[styles.fontSize22,styles.colorWhite,styles.fontWeight500]}>AVALIAÇÕES </Text>
              </Body>
              <Right  style={[styles.headerRight]}>
              {/* <Image style={{height:25,width:25}} source={require('./../../../assets/Timeline/edit.png')} /> */}
              </Right>
          </Header>

          <ProgressDialog
            visible={this.state.progressVisible}
            title="Buscando dados"
            message="por favor, espere..."
          />



        <ScrollView keyboardShouldPersistTaps={'always'} >


        <Card transparent>
            <CardItem cardBody>

                <View  style={[styles.width100p,styles.marginB20,styles.containerMain]}>
                   <AirbnbRating
                        onFinishRating={(rating)=>this.ratingCompleted(rating)}
                        count={5}
                        style={[styles.marginL15]}
                        reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                        defaultRating={0}
                        size={25}
                      />

                </View>

            </CardItem>



            <CardItem cardBody>

                <Item regular style={[styles.width100p,styles.marginT20]}>

                         <Thumbnail  style={[styles.marginL10]} small source={require('./../../../assets/MyWorkouts/2.png')} />
                    <Input style={styles.inputComment}
                    value={this.state.Review}
                    onChangeText={(Review) => this.setState({ Review })}
                    placeholder='Deixe seus pensamentos...'
                    placeholderTextColor="#B6B6B6"

                    />
                    <TouchableOpacity onPress={()=> this.PostReview()} >
                        <Text
                        style={[styles.colorGreen,styles.fontWeight500,styles.fontSize16,styles.marginLR15]}>
    postá-lo</Text>

                    </TouchableOpacity>

                </Item>

            </CardItem>
          </Card>




          {
              (this.state.Result.length!=0)?
         this.state.Result.review.all_reviews.map( (x,i) =>
         (
        <Card transparent>
            <CardItem cardBody>
              <View style={[styles.flexRow,styles.marginTB10,styles.marginLR15]}>
                    <Thumbnail small source={{uri:x.user_profile}} />
                    <Body style={[ styles.Width60p,]}>
                      <Text style={[ styles.alignLeft,styles.marginL15,styles.fontSize14,styles.fontWeight500]}>{x.user_fname}</Text>

                      <Text style={[ styles.alignLeft,styles.marginT10,styles.colorBlack,styles.marginL15,styles.fontSize14]} note> {x.description}</Text>

                      <View style={[styles.flexRow,styles.alignLeft,styles.marginL10,styles.marginT5]}>
                         <Star score={x.rating} style={starStyle} />
                          <Text style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}> {x.rating}/5</Text>
                      </View>

                    </Body>
                    {/* <View style={[ styles.Width60p,styles.flexRow,]}>
                        <Text style={[styles.ValignTop,styles.colorGrey,styles.fontSize14,styles.paddingT5]}>1d ago</Text>
                     </View> */}
              </View>
            </CardItem>
          </Card>
         ))
          :
          <Card transparent>
          <CardItem cardBody>
            <View style={[styles.flexRow,styles.marginTB10,styles.marginLR15]}>

                  <Body style={[ styles.Width60p,]}>

                    <Text style={[ styles.alignLeft,styles.marginT10,styles.colorBlack,styles.marginL15,styles.fontSize14]} note> No Reviews</Text>

                  </Body>
            </View>
          </CardItem>
        </Card>
        }

{/*

          <Card transparent>
            <CardItem cardBody>
              <View style={[styles.flexRow,styles.marginTB10,styles.marginLR15]}>
                    <Thumbnail small source={require('./../../../assets/MyWorkouts/4.png')} />
                    <Body style={[ styles.Width60p,]}>
                      <Text style={[ styles.alignLeft,styles.marginL15,styles.fontSize14,styles.fontWeight500]}>maccza wodkav</Text>

                      <Text style={[ styles.alignLeft,styles.marginT10,styles.colorBlack,styles.marginL15,styles.fontSize14]} note>Good place.</Text>

                      <View style={[styles.flexRow,styles.alignLeft,styles.marginL10,styles.marginT5]}>
                         <Star score={4.2} style={starStyle} />
                          <Text style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}>  4.2/5</Text>
                      </View>
                    </Body>
                    <View style={[ styles.Width60p,styles.flexRow,]}>
                        <Text style={[styles.ValignTop,styles.colorGrey,styles.fontSize14,styles.paddingT5]}>1d ago</Text>
                     </View>
              </View>
            </CardItem>
          </Card>


          <Card transparent>
            <CardItem cardBody>
              <View style={[styles.flexRow,styles.marginTB10,styles.marginLR15]}>
                    <Thumbnail small source={require('./../../../assets/MyWorkouts/3.png')} />
                    <Body style={[ styles.Width60p,]}>
                      <Text style={[ styles.alignLeft,styles.marginL15,styles.fontSize14,styles.fontWeight500]}>Liza Miryac</Text>

                      <Text style={[ styles.alignLeft,styles.marginT10,styles.colorBlack,styles.marginL15,styles.fontSize14]} note>One time place.</Text>

                      <View style={[styles.flexRow,styles.alignLeft,styles.marginL10,styles.marginT5]}>
                         <Star score={5} style={starStyle} />
                          <Text style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}>  5/5</Text>
                      </View>
                    </Body>
                    <View style={[ styles.Width60p,styles.flexRow,]}>
                        <Text style={[styles.ValignTop,styles.colorGrey,styles.fontSize14,styles.paddingT5]}>1d ago</Text>
                     </View>
              </View>
            </CardItem>
          </Card>


          <Card transparent>
            <CardItem cardBody>
              <View style={[styles.flexRow,styles.marginTB10,styles.marginLR15]}>
                    <Thumbnail small source={require('./../../../assets/MyWorkouts/4.png')} />
                    <Body style={[ styles.Width60p,]}>
                      <Text style={[ styles.alignLeft,styles.marginL15,styles.fontSize14,styles.fontWeight500]}>Liza Miryac</Text>

                      <Text style={[ styles.alignLeft,styles.marginT10,styles.colorBlack,styles.marginL15,styles.fontSize14]} note>That is not right, we have to  do it. we can't do like that please tell them we will go and do that.</Text>

                      <View style={[styles.flexRow,styles.alignLeft,styles.marginL10,styles.marginT5]}>
                         <Star score={1.1} style={starStyle} />
                          <Text style={[styles.colorDarkGrey,styles.fontSize14,styles.fontWeight500]}>  1.1/5</Text>
                      </View>
                    </Body>
                    <View style={[ styles.Width60p,styles.flexRow,]}>
                        <Text style={[styles.ValignTop,styles.colorGrey,styles.fontSize14,styles.paddingT5]}>1d ago</Text>
                     </View>
              </View>
            </CardItem>
          </Card> */}

        </ScrollView>

        </Container>
    );
  }
}
export default Comments;
