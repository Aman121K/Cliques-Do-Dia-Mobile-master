import React, { Component } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';
import styles from '../style/style';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Col, Row, Grid } from "react-native-easy-grid";
import CalendarStrip from 'react-native-calendar-strip';
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
  Input,
  Label,
  Left, Right,
  Title,
  Thumbnail,
  Content,
} from 'native-base';


class MainHeader extends Component {

  constructor(props)
  {
    super();
    this.state = {

    }
    this.openDrawer = this.openDrawer.bind(this);
    //this.props.navigation.setParams({ tabBarVisible: false });
  }

  openDrawer() {
    this.props.navigation.toggleDrawer();
}
    render() {

      return (
        <Header style={[styles.Mainheader]} >
        <Left style={[styles.headerLeft]}>
          <Button  onPress={()=>this.openDrawer} transparent>
          <Image style={{height:15,width:15}} source={require('./../../assets/menu.png')} />
          </Button>
        </Left>
        <Body style={[styles.headerBody]}>
          <View style={[styles.ValignCenter,styles.width100p]}>
            <Text style={[styles.fontSize20,styles.colorWhite,styles.alignCenter]}>{this.props.ScreenName}</Text>
          </View>
        </Body>
        <Right style={[styles.headerRight]}>
          <Button small transparent>
          <Image style={{height:15,width:15}} source={require('./../../assets/cart.png')} />
          </Button>
        </Right>
      </Header>
       );
    }
  }
export default MainHeader;
