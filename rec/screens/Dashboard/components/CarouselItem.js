import React, { Component } from 'react';
import { TouchableOpacity, TextInput, StyleSheet,Dimensions, Platform,Image,ImageBackground } from 'react-native';
import styles from '../../../style/style';
import DashboardStyle from '../style/DashboardStyle';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Col, Row, Grid } from "react-native-easy-grid";
import {ParallaxImage} from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';

import PropTypes from 'prop-types';
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


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export class CarouselItem extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              resizeMode="cover"
              parallaxFactor={0.4}
              entryBorderRadius={0}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              resizeMode="cover"
              style={styles.image}
            />
        );
    }


    render () {

        const { data: { title, subtitle,id }, even } = this.props;
        const { navigate } = this.props.navigation;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { 
                //   alert(`You've clicked '${id}'`);
                        this.props.navigation.navigate('OfferDetail',{itemId:id})
                   }}
              >
                {/* <View style={styles.shadow} /> */}
                <View style={[styles.imageContainer,styles.imageContainerEven]}>
                    { this.image }
                    {/* <View style={[styles.radiusMask,  styles.radiusMaskEven ]} /> */}
                </View>
                {/* <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View> */}
            </TouchableOpacity>
        );
    }
}
export default withNavigation(CarouselItem);  