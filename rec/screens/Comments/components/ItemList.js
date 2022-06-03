import React, { Component } from 'react';
import { TouchableOpacity, TextInput,StyleSheet,Image,ImageBackground } from 'react-native';
import styles from '../../../style/style';
import DashboardStyle from '../style/DashboardStyle';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Col, Row, Grid } from "react-native-easy-grid";
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
  Card,
  CardItem,
  cardBody,
  Input,  
  List,
  ListItem,
  Label,
  Left, Right,
  Title,
  Content,
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

class ItemList extends Component {
  
    render() {
      return (
        <List>
        <ListItem avatar>
          <Left>
            {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Doing what you like will always keep you happy . .</Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
      </List>

       );
    }
  }
export default ItemList;  