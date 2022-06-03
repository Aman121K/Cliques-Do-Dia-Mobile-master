import { getStatusBarHeight } from 'react-native-status-bar-height';  
import React, { StyleSheet, Dimensions, Platform } from 'react-native';
const statusBarHeight = getStatusBarHeight();
export default StyleSheet.create({


loginTitleView:{
    paddingTop:statusBarHeight,

},
LoginTitleText:{
    marginTop: 'auto',
    marginBottom: 'auto',

}



})