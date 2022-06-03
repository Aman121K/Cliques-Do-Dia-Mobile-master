import React, { Component } from 'react';
import { TouchableOpacity, TextInput,StyleSheet,Image } from 'react-native';
import styles from '../style/style';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Container,
  Header,
  Button,
  View,
  Item,
  Text,
  Body,
  Form,
  Input,  
  Label,
  Left, Right,
  Title,
} from 'native-base';
import Icon from '@expo/vector-icons/Ionicons';

class Notifications extends Component {
  
    render() {
      console.log(getStatusBarHeight());
      return (
        <Container>
                  
      <Header style={{marginTop:getStatusBarHeight()}} >
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>

        <Text>Notifications</Text>
     
        
       </Container>
       );
    }
  }
export default Notifications;  