import React, { Component } from 'react';
import { TouchableOpacity,SafeAreaView,StatusBar,AsyncStorage, TextInput, StyleSheet,Platform,Image, ImageBackground } from 'react-native';
import styles, { colors } from '../../style/style';
import ProgressLoader from 'rn-progress-loader';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../style/style';
import Tabs from './components/Tabs';
import {
  Container,
  Header,
  Button,
  View,
  Segment,
  Picker,
  Item,
  Text,
  Icon,
  Body,
  Form,
  List,
  LayoutAnimation,
  ListItem,
  Card,
  Footer,
FooterTab,
  CardItem,
  cardBody,
  Input,
  Label,
  Left, Right,
  Title,
  Thumbnail,
  Content,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import CarouselItem from './components/CarouselItem';
import axios from 'axios';
import { baseURL } from '../../../app.config';
import ActionButton from 'react-native-action-button';

// import Icon from '@expo/vector-icons/Ionicons';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const styles1 = StyleSheet.create({
  actionButtonIcon: {
    bottom: 40,
  },
});

class Dashboard extends Component {

  constructor(props)
  {
    super();
    this.state = {
      Categories:[],
      selectedTabId:2,
      CategoryName:[],
      Cities:[],
      Result:[],
      searchURL:'',
      searchText: '',
      loader: true,
      category_id:2,
      city_id:1,
      token:'',
Images:[],
      selectedIndex: 0,
      selectedTab: 0,
      selected: undefined,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      ENTRIES1: [
              {
                  title: 'Beautiful and dramatic Antelope Canyon',
                  subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                 illustration: 'https://d1m6qo1ndegqmm.cloudfront.net/uploadimages/sales_offer_mainpic_20090513124212sahibaan_banner.JPG'
              },
              {
                  title: 'Earlier this morning, NYC',
                  subtitle: 'Lorem ipsum dolor sit amet',
                 illustration: 'https://d1m6qo1ndegqmm.cloudfront.net/uploadimages/coupons/9159-Legacy-Restaurant_500x200.jpg'
              },
              {
                  title: 'White Pocket Sunset',
                  subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                 illustration: 'https://i.ibb.co/ynq4Gb9/C6-Lh-Chqw-BJRe-KWIh-Wy-Q9.jpg'
              },
              {
                  title: 'Acrocorinth, Greece',
                  subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                 illustration: 'https://i.ibb.co/7n8S6KB/Pvq7-BOht-T1c4-EPh4sp8-I.jpg'
              },
          ],
      isActionButtonVisible: true,

    }
    this.openDrawer = this.openDrawer.bind(this);
    this.TabSwitch = this.TabSwitch.bind(this);
    this.fetchData=this.fetchData.bind(this);
  }

  _listViewOffset = 0

  openDrawer() {
    this.props.navigation.toggleDrawer();
}

  fetchData() {
    const { city_id, selectedTabId, token } = this.state;

    this.setState({ progressVisible: true });

    const url = `${baseURL}/user/offers?category_id=${selectedTabId}&city_id=${city_id}`;

    axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => {
      this.setState({ Result: response.data.data });

      return response;
    })
    .finally(response => {
      this.setState({ progressVisible: false });

      debugger;
      if (response) {
        if (response.response.status == 500) {
          debugger;
          AsyncStorage.removeItem('token');

          this.props.navigation.navigate("Login");
        }
      }
    })

    this.carausalImages();
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('token');

    this.setState({ token: token });

    // console.log("token in Dashboard:", token);
    // console.log("idddddd:",email);
    if (token == null || token == '' || token == undefined) {
      this.props.navigation.navigate('Login');
    }

    // console.log("will mount");
    axios.get(`${baseURL}/categories`)
    .then(response => {
      this.setState({ Categories: response.data.data });

      // console.log("Cate-----------:",this.state.Categories);

      response.data.data.map((x,i) => {
        this.state.CategoryName.push(x.name);
        // console.log("CatName:",this.state.CategoryName);  // value={x.id}  />
      })
    })
    .catch(error => console.log(error))

    // fetch(`${baseURL}/categories`)
    // .then(response => response.json())
    // .then((responseJson)=> {
    //   this.setState({
    //    Categories: responseJson.data,
    //   });
    //   console.log("Cate-----------:",this.state.Categories);
    //   this.state.Categories.map( (x,i) =>
    //   {
    //     this.state.CategoryName.push(x.name);

    //     console.log("CatName:",this.state.CategoryName);  // value={x.id}  />
    //   })

    // })
    // .catch(error=>console.log(error)) //to catch the errors if any

    axios.get(`${baseURL}/cities`)
    .then(response => {
      this.setState({ Cities: response.data.data });

      this.fetchData();
    })
    .catch(error => console.log(error))

    // this.setState({
    //   searchURL:"https://www.cliquesdodia.com.br/public_html/api/api/search?category_id="+2+"&city_id="+1
    //  });
  }


  carausalImages() {
    const { city_id, selectedTabId } = this.state;
    // this.state.Images = [];

    // axios.get(`${baseURL}/featured-slider?category_id=${selectedTabId}&city_id=${city_id}`)
    // .then(response => response.json())
    // .then(responseJson => {
    //   // debugger;
    //   // console.log("Images-----------:",this.state.Images);

    //   responseJson.data.map((Item)=>{
    //     console.log("Images-----------:",Item);
    //     this.state.Images.push({
    //       title:'abc',
    //       subtitle:'Earlier this morning, NYC',
    //       id:Item.id,
    //       illustration:Item.image
    //     })
    //     this.setState({ Images: this.state.Images },
    //       () => { console.log("Images---araay--------:",this.state.Images) }
    //     );
    //   })
    // })
    // .catch(error => {
    //   // debugger;
    //   console.log(error)
    // })
    // .finally(response => {

    // })
  }

  handleOTP = (text) => {
    this.setState({
      searchText: text
        }, () => {
          this.fetchData();
        });
  }

TabSwitch = (index: number) =>
{
  this.setState(prevState => ({ ...prevState, selectedTab: index }))
  console.log("selected tab:",index);
  var id=index+2;
  if(id!=6)
  {
    this.setState({
      selectedTabId:id
        }, () => {
          this.fetchData();
        });
  }
  else{
    this.setState({
      selectedTabId:1
        }, () => {
          this.fetchData();
        });
  }

  // this.state.selectedTableId = index+1;
  // console.log("selected tab id-------::",this.state.selectedTabId)0

}

_renderItem ({item, index}) {
  return <CarouselItem data={item} even={(index + 1) % 2 === 0} />;
}
_renderItemWithParallax ({item, index}, parallaxProps) {
  return (
      <CarouselItem
        data={item}
        entryBorderRadius
        parallax={true}
        parallaxProps={parallaxProps}
      />
  );
}


CityList = () =>{
  return( this.state.Cities.map( (x,i) => {
        return( <Picker.Item label={x.name} key={i} value={x.id}  />)} ));
}

mainExample (number, title) {
  const { slider1ActiveSlide } = this.state;

  return (
      <View style={styles.marginT15}>
          <Carousel
            ref={c => this._slider1Ref = c}
            data={this.state.Images}
            renderItem={this._renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
          />

      </View>
  );
}

_onScroll = (event) => {
  const currentOffset = event.nativeEvent.contentOffset.y

  if (currentOffset > 1000) {
    this.setState({ isActionButtonVisible: false })
  } else {
    this.setState({ isActionButtonVisible: true })
  }
}



  render() {
    const example1 = this.mainExample(1, 'stack layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
// console.log("hello");
    const {selectedTab } = this.state
    if(IS_ANDROID){
      StatusBar.setBackgroundColor("rgba(0,0,0,0.2)")
      StatusBar.setBarStyle("light-content")
      StatusBar.setTranslucent(true)
    }


    // console.log(getStatusBarHeight());
    return (
      <Container>
           <View style={{backgroundColor:'#58b368',height:'5%'}}>
             <Text style={{color:'white'}}>Home</Text>
           </View>
         <ScrollView onScroll={this._onScroll}>

        
      

         

          <View style={[styles.SearchHeader]}>
               
          </View>



          

                   

        {/* Deal of the day */}



 



        {/* Offers for You */}
        {
          // this.state.isActionButtonVisible &&
          //   <View style={{ width: 60, height: 60, zIndex: 10000000, borderRadius: 30, backgroundColor: '#ee6e73', position: 'fixed', top: 50, right: 20, backgroundColor: "#f3f3f3" }}>
          //     <ActionButton
          //       buttonColor = 'rgba(231,76,60,1)'
          //       onPress={() => { console.log('hi')}}
          //     />
          //   </View>
        }
      




        {/* ---------End------- Offers for You */}


        </ScrollView>
        {/* <View style={{marginTop:'-40%'}}> */}
          {/* <Text>Comming soon</Text> */}
        {/* </View> */}

        <View>
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
          </View>

          {
          // <ActionButton
          //   buttonColor="rgba(231,76,60,1)"
          //   style={styles1.actionButtonIcon}
          //   onPress={()=> this.props.navigation.navigate('Coupons')}
          // />
        }
        </Container>

    );
  }
}
export default Dashboard;
