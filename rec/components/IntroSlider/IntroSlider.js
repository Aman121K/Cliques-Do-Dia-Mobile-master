import React, { Component } from 'react';
import { TouchableOpacity,Alert, TextInput, StyleSheet,KeyboardAvoidingView, Image, ImageBackground } from 'react-native';
import styles from '../../style/style';
import AppIntroSlider from 'react-native-app-intro-slider';
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
     Footer,
    FooterTab,
  } from 'native-base';

  
class IntroSlider extends Component {
  
    // _onDone = () => {
    //     // User finished the introduction. Show real app through
    //     // navigation or simply by controlling state
    //     this.setState({ showRealApp: true });
    //     this.props.navigation.navigate('Login');
    //     alert("Done");
    //   }
    
      _onSkip = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
      
      }
      _renderItem = props => (
        <View
          style={[styles.mainContent, {
            width: props.width,
            backgroundColor: 'transparent',
            height: props.height,
          }]}
        >
          
          <View style={[styles.ValignCenter,styles.alignCenter]}> 
          <Image style={[styles.image,styles.ValignCenter,styles.alignCenter]} source={props.icon} size={200} />
            <Text style={[styles.title]}>{props.title}</Text>
            <Text style={styles.text}>{props.text}</Text>
          </View>
        </View>
      );
    
      _renderNextButton = () => {
        return (
          <View
          style={[{
            // backgroundColor: '#fff',
            borderRadius:30,
            paddingLeft:10,
            paddingRight:10
          }]}
        >
          
          <Button  transparent style={[styles.ValignCenter]} >
                <Text style={[styles.fontSize18,{color:'#fff'}]}>NEXT</Text>
              </Button>
        </View>
        );
      }
    constructor(props)
  {
    super();
    this.state = { hidePassword: true,
        showRealApp: false
    }
  }


    render() {
      
      return (
        <AppIntroSlider
            slides={this.props.slides}
            showSkipButton
            renderNextButton={this._renderNext}
            renderItem={this._renderItem}
            dotStyle={{backgroundColor:'#676767'}}
            doneLabel={'LOGIN'}
            nextLabel={'NEXT'}
            skipLabel={'SKIP'}
            onDone={this.props._onDone}
         
          />
       );
    }
  }
export default IntroSlider;  