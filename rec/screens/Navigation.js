import React, { Component } from 'react';
import {  Image } from 'react-native';

import styles from '../style/style';
import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator
  } from 'react-navigation';

  import Login from './../screens/Login/Login';
  import Register from './../screens/Login/Register';
  import CreateOffer from './../screens/Offer/CreateOffer';
  import UpdateOffer from './../screens/Offer/UpdateOffer';
  import ForgotPassword from './Login/ForgotPassword';

  import offers from './Coupons/offers';
  import Comments from './Comments/Comments';
  import Coupons from './Coupons/Coupons';
  import OfferDetail from './../screens/OfferDetail/OfferDetail';
  import Account1 from './../screens/Account/Account1';
  import Dashboard from './../screens/Dashboard/Dashboard';
  import CarouselItem from './../screens/Dashboard/components/CarouselItem';
  import NavigationContent from './NavigationContent'

  // const DashboardTabNavigator = createBottomTabNavigator(
  //   {
  //     Dashboard:{
  //       screen:Dashboard,
  //       navigationOptions: {
  //         tabBarLabel:" ",
  //         tabBarVisible: true,
  //         tabBarIcon: ({ tintColor }) => (
  //         <Image style={[styles.icon20,styles.marginT20]} source={require('./../../assets/home.png')} />
  //         )
  //       },
  //     } ,
  //     Coupons:{
  //       screen:Coupons,
  //       navigationOptions: {
  //         tabBarLabel:" ",
  //         tabBarVisible: false,
  //         tabBarIcon: ({ tintColor }) => (
  //         <Image style={[styles.icon20,styles.marginT20]} source={require('./../../assets/coupon.png')} />
  //         )
  //       },
  //     } ,
  //     Account:{
  //       screen:Account,
  //       navigationOptions: {
  //         tabBarLabel:" ",
  //         tabBarVisible: false,
  //         tabBarIcon: ({ tintColor }) => (
  //         <Image style={[styles.icon20,styles.marginT20]} source={require('./../../assets/user.png')} />
  //         )
  //       },
  //     } ,

  //   },{tabBarOptions: {
  //     activeTintColor: '#8CC63F',
  //     inactiveTintColor: 'gray',
  //   }}
  // );


  const DashboardStackNavigator = createStackNavigator(
    {
      Dashboard:{screen: Dashboard} ,
      OfferDetail: {screen: OfferDetail},
      Account1:{screen:Account1},
      offers:{screen:offers},
      CreateOffer:{screen:CreateOffer},
      UpdateOffer:{screen:UpdateOffer},
      Comments:{screen:Comments},
      Coupons:{screen:Coupons},
      CarouselItem:{screen:CarouselItem}
    },
    {
      headerMode: 'none'
    }
  );

  const AppDrawerNavigator = createDrawerNavigator({

    Dashboard: {screen: DashboardStackNavigator},
    Coupons:{screen:Coupons},
    OfferDetail: {screen: OfferDetail},
  },
  {
    contentComponent: NavigationContent,
    drawerWidth: 300
  }
  );

  const AppSwitchNavigator = createSwitchNavigator({


    Login:{screen:Login},
    ForgotPassword:{screen:ForgotPassword},
    Dashboard: { screen: AppDrawerNavigator },
    offers:{screen:offers},
    UpdateOffer:{screen:UpdateOffer},
    CreateOffer:{screen:CreateOffer},
    Coupons:{screen:Coupons},
    Register:{screen:Register},
    Account1: {screen: Account1},
    OfferDetail: {screen: OfferDetail},
    Comments:{screen:Comments},
  });

  export default  AppContainer = createAppContainer(AppSwitchNavigator);
