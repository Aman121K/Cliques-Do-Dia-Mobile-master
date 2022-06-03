import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './../style/style';
import {NavigationActions} from 'react-navigation';


import { AsyncStorage, ScrollView,TouchableOpacity,Image,Platform} from 'react-native';
import { baseURL } from '../../app.config';
import axios from 'axios';

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
    Picker,
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
  } from 'native-base';
  const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

class NavigationContent extends Component {
  state = {
    result: {},
    token: ''
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  async componentDidMount() {
    this.setState({
      token: await AsyncStorage.getItem('token')
    }, () => {
      this.fetchData(this.state.token)
    });
  }

  fetchData = token => {
    axios.get(`${baseURL}/user/me`, {
      'headers': {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      this.setState({ result: response.data.user });
    })
    .catch(error => {
      console.log(error)
    })
  }


  render () {
    const { result } = this.state;

    return (
      <View>
        {
          (result && result.id) &&
          <ScrollView>
                    <View style={[styles.drawerContainer,styles.minHeight130,styles.paddingStatusBar]}>
                            <TouchableOpacity onPress={this.navigateToScreen('Account')} style={[styles.flexRow,styles.ValignCenter,styles.marginLR15]}>
                                <View style={[styles.ValignCenter,styles.alignLeft,styles.marginL10]}>
                                     <Image style={[styles.Icon50,styles.borderRadius40]} source={{uri:'https://randomuser.me/api/portraits/med/men/85.jpg'}} />
                                </View>
                                <View style={[styles.ValignCenter,styles.alignLeft]}>
                                    <Text style={[styles.fontSize18,styles.marginB10]}>{result.first_name} {result.last_name} </Text>
                                    <Text style={[styles.fontSize14,styles.colorDarkGrey]}>{result.email}</Text>
                                </View>
                            </TouchableOpacity>

                     </View>

                <View style={[styles.flexColumn]}>


                    <View style={[styles.borderBottom]}></View>

                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Home.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Dashboard')}>
                             Dashboard
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>


                     <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Home.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Account')}>
                             Restaurant
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>

                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/MyWorkout.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Coupons')}>
                               Meus Coupons
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>

                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/MyWorkout.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Comments')}>
                               Reviews
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>

                    {/* <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/RoutineTrack.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Account')}>
                                Track Routine
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View> */}
{/*
                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Feed.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Feed')}>
                               Feed
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>

                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Notification.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Notifications')}>
                                 Notifications
                        </Text>
                    </View>

                    <View style={[styles.borderBottom]}></View>

                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                        <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Analysis.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('BodyMeasurements')}>
                                Body Measurements
                        </Text>
                    </View>


                    <View style={[styles.borderBottom]}></View>


                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/TrackPlan.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Track')}>
                                Track Plan
                        </Text>
                    </View>



                    <View style={[styles.borderBottom]}></View>


                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Analysis.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Statistics')}>
                                 Workout Statistics
                        </Text>
                    </View> */}

{/*
                    <View style={[styles.borderBottom]}></View>
                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Account.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Account')}>
                        My Account
                        </Text>
                    </View>

                    <View style={[styles.borderBottom]}></View> */}



                    {/* <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/FAQ.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('FAQ')}>
                                FAQ
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>

                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/ContactUs.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('ContactUs')}>
                               Contact Us
                        </Text>
                    </View>
                    <View style={[styles.borderBottom]}></View> */}

                    {/* <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/AboutUs.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('FAQ')}>
                              About Us
                        </Text>
                    </View>

                    <View style={[styles.borderBottom]}></View> */}


{/*
                    <View style={[styles.marginT15,styles.alignLeft,styles.marginL20,styles.paddingB10,styles.flexRow,styles.paddingLR10]}>
                         <Image style={[styles.icon20,styles.marginR10,styles.ValignCenter]}source={require('./../../assets/sidebar/Logout.png')}/>
                          <Text style={[styles.colorDarkGrey,styles.ValignCenter,styles.marginL10]}  onPress={this.navigateToScreen('Login')}>
                              Logout
                        </Text>
                    </View> */}
                    {/* <View style={[styles.borderBottom]}></View> */}

                </View>
                </ScrollView>
        }
      </View>
    );
  }
}

NavigationContent.propTypes = {
  navigation: PropTypes.object
};

export default NavigationContent;
