import React, { StyleSheet ,Platform} from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height';
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
const statusBarHeight = getStatusBarHeight();
export default StyleSheet.create({

headerLogo:{
    height:45,
    width:153
},
header:{
    backgroundColor:'#5cb85c',
    paddingTop:IS_IOS?20:statusBarHeight,
    height:IS_IOS?55+20:55+statusBarHeight
},
tranparentCard:{
    width: '100%',
    marginTop:'35%',
    height: 96
},
TitleImg:{width: '100%', height: '90%'},

HorizontalScrollCard:{
 //   backgroundColor:'#F9FAFC',
    // marginTop:-50,
    // marginBottom:15,
    
},
CategoriesSec:{
    borderTopColor: '#f1f1f3',
    borderTopWidth: 2,
    paddingTop:15
},


});

