import React, { StyleSheet } from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height';
export default StyleSheet.create({

headerLogo:{
    height:45,
    width:153
},
header:{
    paddingTop:getStatusBarHeight(),
    height:60+getStatusBarHeight(),
    
    backgroundColor:'#4db554',

    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,    
    shadowRadius: 16.00,
    elevation: 24,
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


thumbnail:{
    height:50,width:80,marginRight:20
}


});

