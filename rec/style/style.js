import React, { StyleSheet, Dimensions, Platform,StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');




function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const statusBarHeight = getStatusBarHeight();

const slideHeight = viewportHeight * 0.30;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 0;

const entryBorderRadius = 1;

export default StyleSheet.create({

 
  Excercise_Header:{
    marginTop:IS_IOS ? 20 : 50,
  },



smallTiles:{
  width: 93,
  height: 93, 
  resizeMode: 'cover',
},




  // ------------Carousal --------------
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic'
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  },

  // ------End------Carousal --------------





  card_col: {
    flexDirection: "column",
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: 'rgba(2,166,223,0.65)',
    margin: 2
  },

  card_row: {
    flexDirection: "row",
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: 'rgba(2,166,223,0.65)',
  },

  container: {
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  drawerContainer: {
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  titleContainer: {
    // borderRadius: 1,
    // borderWidth: 1,
    // borderColor: 'rgba(2,166,223,0.65)',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    // borderRadius: 1,
    // borderWidth: 1,
    // borderColor: 'rgba(2,166,223,0.65)',
    flex: 1,
    color: '#2a2f43',
    fontWeight: 'bold',
    marginBottom: 5
  },



  justifyCenter: {
    justifyContent: 'center',
  },

  justifySpaceBetween: {
    justifyContent: 'space-between',
  },


  buttonImage: {
    width: 17,
    height: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  body: {
    padding: 5,
    paddingTop: 0
  },
  minWidth: {
    minWidth: '100%'
  },
  icon16: {
    height: 16,
    width: 16,
  },
  icon18: {
    height: 18,
    width: 18,
  },
  icon20: {
    height: 20,
    width: 20,
  },
  icon24: {
    height: 24,
    width: 24,
  },
  borderRadius2: {
    borderRadius: 2
  },
  borderRadius5: {
    borderRadius: 5
  },
  borderRadius7: {
    borderRadius: 7
  },
  borderRadius10: {
    borderRadius: 10
  },
  borderRadius20: {
    borderRadius: 20
  },
  borderRadius30: {
    borderRadius: 30
  },
  borderRadius40: {
    borderRadius: 40
  },
  cardCollapseIconSec: {
    marginLeft: 'auto'
    // justifyContent: 'flex-end',
  },
  alignLeft: {
    marginRight: 'auto'
    // justifyContent: 'flex-end',
  },
  alignRight: {
    marginLeft: 'auto'
    // justifyContent: 'flex-end',
  },
  alignCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // justifyContent: 'flex-end',
  },
  textCenter:{
    textAlign: 'center'
  },
  textRight:{
    textAlign: 'right'
  },
  allCenter:{
    justifyContent: 'center', 
alignItems: 'center' 
  },
  ValignCenter: {
    marginTop: 'auto',
    marginBottom: 'auto'
    // justifyContent: 'flex-end',
  },
  ValignBottom: {
    marginTop: 'auto',
    // justifyContent: 'flex-end',
  },
  ValignTop: {
    marginBottom: 'auto'
    // justifyContent: 'flex-end',
  },
  marginTBLR3: {
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  marginTBLR5: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom:5
  },
  paddingT5: {
    paddingTop: 5,
  },
  paddingT3: {
    paddingTop: 3,
  },

  paddingT10: {
    paddingTop: 10,
  },

  paddingTB5: {
    paddingTop: 5,
    paddingBottom: 5
  },


  paddingTBLR3: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3
  },
  paddingTBLR5: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  },
  paddingLR3: {
    paddingLeft: 3,
    paddingRight: 3
  },
  paddingLR5: {
    paddingLeft: 5,
    paddingRight: 5
  },
  paddingLR10: {
    paddingLeft: 10,
    paddingRight: 10
  },
  paddingLR15: {
    paddingLeft: 15,
    paddingRight: 15
  },
  paddingLR20: {
    paddingLeft: 20,
    paddingRight: 20
  },
  paddingLR40: {
    paddingLeft: 40,
    paddingRight: 40
  },
  paddingR20: {
    paddingRight: 20
  },
  paddingB3: {

    paddingBottom: 3
  },
  paddingB5: {

    paddingBottom: 5
  },
  paddingB7: {

    paddingBottom: 7
  },
  paddingB10: {

    paddingBottom: 10
  },
  paddingB15: {

    paddingBottom: 15
  },
  paddingB20: {
    paddingBottom: 20
  },
  paddingTB3: {
    paddingTop: 3,
    paddingBottom: 3
  },
  paddingTB5: {
    paddingTop: 5,
    paddingBottom: 5
  },
  paddingTB7: {
    paddingTop: 7,
    paddingBottom: 7
  },
  paddingTB10: {
    paddingTop: 10,
    paddingBottom: 10
  },
  paddingTB15: {
    paddingTop: 15,
    paddingBottom: 15
  },
  paddingTB20: {
    paddingTop: 20,
    paddingBottom: 20
  },
 

// colors

colorYellow:{
  color:'#FCC442'
},
colorLightBlue: {
  color: '#4184EF'
},
colorRed:{
  color:'#F84242'
},

  colorGreen: {
    color: '#5cb85c'
  },


  colorWhite: {
    color: '#ffffff'
  },

  colorDarkRed:{
    color:'#9B1D20'
  },
  
  colorOrange: {
    color: '#dd6b4d'
  },

  colorLightOrange: {
    color: '#ee7869'
  },
  
  colorLightBlue2: {
    color: '#30a8e1'
  },
  
  colorBlue: {
    color: '#0c084c'
  },


  bgcolorLightBlue: {
    backgroundColor: '#1596A3'
  },  
  
  bgcolorLightRed: {
    backgroundColor: '#FEF3F3'
  },  
  
  bgcolorLightGreen: {
    backgroundColor: '#5cb85c',
  },  
  
  bgcolorLightViolate: {
    backgroundColor: '#EBE3F3'
  },  
  





bgcolorDarkGray: {
  backgroundColor: '#515A5A'
},  

bgcolorDarkGreen: {
  backgroundColor: '#00796B'
},  



  bgcolorGray: {
    backgroundColor: '#E5E7E9'
  },
  bgcolorWhite: {
    backgroundColor: '#ffffff'
  },

  bgcolorBlue: {
    backgroundColor: '#263859'
  },

  BlueBorder: {
    borderWidth:2,
    borderColor: '#E5E7E9'
  },

  bgColorRed: {
    backgroundColor: '#900048'
  },
  bgColorOrange:{
    backgroundColor:'#FF7F50'
  },
  BackgroundGreen: {
    backgroundColor: '#58b368',
  },

  greenBorder: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#4db554',
  },

  colorGrey: {
    color: '#676767'
  },
  colorBlack:{
    color: '#000'
  },
  bgColorGrey: {
    backgroundColor: 'transparent'
  },
  bgColorBlack: {
    backgroundColor: '#00000070'
  },
  bgColorLightGrey: {
    backgroundColor: '#676767'
  },
  bgColorWhite: {
    backgroundColor: '#fff'
  },
  bgColorDarkWhite: {
    backgroundColor: '#F9F9F9'
  },
  bgColorTransparent: {
    backgroundColor: 'transparent'
  },

  colorDarkGrey: {
    color: '#666666'
  },
  borderOrange: {
    borderColor: '#f0ad4e',
    borderWidth: 1
  },



// fonts

fontPoppinsBold:{
  fontFamily:'Poppins-SemiBold'
},

fontOswaldMedium:{
  fontFamily:'Oswald-Medium'
},
fontPoppins:{
  fontFamily:'Poppins-Regular'
},

fontMontserrat:{
  fontFamily:'Montserrat-ExtraBold'
},





  spaceBetween: {
    justifyContent: 'space-between',
  },

  marginLR5: {
    marginLeft: 5,
    marginRight: 5,
  },
  marginLR3: {
    marginLeft: 3,
    marginRight: 3,
  },

  radioSec: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  tabBtn: {
    backgroundColor: '#fff',
    color: '#8C8C8C',
    // segmentActiveBackgroundColor:"#fff",
    // segmentTextColor:"#fff",
    // segmentActiveTextColor:"rgba(2,166,223,0.65)",
    // segmentBorderColor:"#fff",
    // segmentBorderColorMain:"#3F51B5",

  },
  activeTabBtn: {
    backgroundColor: '#8C8C8C',
    color: '#fff',
    // segmentActiveBackgroundColor:"#fff",
    // segmentTextColor:"#fff",
    // segmentActiveTextColor:"rgba(2,166,223,0.65)",
    // segmentBorderColor:"#fff",
    // segmentBorderColorMain:"#3F51B5",

  },

  AddAmountFormItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    minWidth: '50%', height: 35,

  },

  AddAmountFormItemFullWidth: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    minWidth: '90%', height: 35,

  },





  BackgroundbBlue: {
    backgroundColor: '#02A6DF'
  },
  btnView: {
    backgroundColor: '#02A6DF',
    width: '50%',
    paddingBottom: 5
  },
  btnView30: {
    backgroundColor: '#02A6DF',
    width: '30%',
    paddingBottom: 5
  },

  btnView100: {
    backgroundColor: '#02A6DF',
    width: '100%',
    paddingBottom: 5
  },
  btnAdd: {
    backgroundColor: '#66BD48',
    width: '50%',
    paddingBottom: 5
  },
  icondoubleBtn: {
    height: 20,
    width: 10,
    marginRight: 5
  },
  viewAddIcon: {
    height: 20,
    width: 20
  },
  Icon20: {
    height: 20,
    width: 20
  },
  Icon30: {
    height: 30,
    width: 30
  },
  Icon25:{height:20,width:25},
  Icon35: {
    height: 35,
    width: 35
  },
  Icon40: {
    height: 40,
    width: 40
  },
  Icon45: {
    height: 45,
    width: 45
  },
  Icon50: {
    height: 50,
    width: 50
  },
  Icon60: {
    height: 60,
    width: 60
  },
  viewAddIcon20: {
    height: 20,
    width: 16
  },
  CalcIcon: {
    height: 35,
    width: 26
  },
  iconBtn: {
    height: 16,
    width: 16
  },
  viconBtn: {
    height: 16,
    width: 12
  },
  viconBtn20: {
    height: 20,
    width: 16
  },

  cardIcon: {
    fontSize: 16,
    margin: 5
  },
  marginT3: {
    marginTop: 3
  },
  marginT5: {
    marginTop: 5
  },
  marginT10: {
    marginTop: 10
  },
  marginT15: {
    marginTop: 15
  },
  marginT20: {
    marginTop: 20
  },
  marginT25: {
    marginTop: 25
  },
  marginT30: {
    marginTop: 30
  },
  marginT35: {
    marginTop: 35
  },
  marginT40: {
    marginTop: 40
  },
  marginT80: {
    marginTop: 80
  },
  marginT45: {
    marginTop: 45
  },

  marginT20P: {
    marginTop: '20%'
  },




  marginB2: {
    marginBottom: 2
  },
  marginB5: {
    marginBottom: 5
  },
  marginB10: {
    marginBottom: 10
  },
  marginB15: {
    marginBottom: 15
  },
  marginB20: {
    marginBottom: 20
  },
  marginB25: {
    marginBottom: 25
  },
  marginB30: {
    marginBottom: 30
  },
  marginTB3: {
    marginTop: 3,
    marginBottom: 3,

  },
  marginTB5: {
    marginTop: 5,
    marginBottom: 5,

  },


  marginTB10: {
    marginTop: 10,
    marginBottom: 10,

  },
  marginTB15: {
    marginTop: 15,
    marginBottom: 15,

  },
  marginTB20: {
    marginTop: 20,
    marginBottom: 20,

  },
  marginTB25: {
    marginTop: 25,
    marginBottom: 25,

  },
  marginTB30: {
    marginTop: 30,
    marginBottom: 30,

  },
  marginTB35: {
    marginTop: 35,
    marginBottom: 35,

  },
  marginTB45: {
    marginTop: 45,
    marginBottom: 45,

  },
  marginTB40: {
    marginTop: 40,
    marginBottom: 40,

  },
  marginLR20: {
    marginLeft: 20,
    marginRight: 20,

  },
  marginLR25: {
    marginLeft: 25,
    marginRight: 25,

  },
  marginLR30: {
    marginLeft: 30,
    marginRight: 30,

  },
  marginLR15: {
    marginLeft: 15,
    marginRight: 15,
    // flexDirection:'row'

  },

  marginLR10: {
    marginLeft: 10,
    marginRight: 10,

  },
  marginL3: {
    marginLeft: 3,
  },
  marginL5: {
    marginLeft: 5,
  },
  marginL10: {
    marginLeft: 10,
  },
  marginL15: {
    marginLeft: 15,
  },
  marginL20: {
    marginLeft: 20,
  },
  marginL25: {
    marginLeft: 25,
  },
  marginL30: {
    marginLeft: 30,
  },
  marginL35: {
    marginLeft: 35,
  },
  marginL50: {
    marginLeft: 50,
  },
  marginL60: {
    marginLeft: 60,
  },
  marginL70: {
    marginLeft: 70,
  },
  marginL80: {
    marginLeft: 80,
  },
  marginR3: {
    marginRight: 3,
  },
  marginR5: {
    marginRight: 5,
  },
  marginR10: {
    marginRight: 10,
  },
  marginR15: {
    marginRight: 15,
  },
  marginTBLR15: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15
  },
  marginTBLR10: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  marginR0: {
    marginRight: 0,

  },
  justifyCenter: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  alignItemsCenter: {
    justifyContent: 'center',
     alignItems: 'center',
  },
  border1: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#B1B1B1',

  },
  borderGrey: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#efefef',

  },

  cardCheckboxSubSec: {
    justifyContent: 'center'
  },

  borderBottom: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 3,
  },
  borderTop: {
    borderTopColor: '#efefef',
    borderTopWidth: 1,
  },
  borderRight:{
    borderRightColor: '#efefef',
    borderRightWidth: 1,
  },
 
  switchName: {
    fontSize: 17,
    color: '#464646',
    fontWeight: '100',
    marginTop: 8,
    marginBottom: 12
  },
  cardName: {
    fontSize: 18,
    color: '#676767',
    fontWeight: '500',
  },
 
  fontWeight500: {
    fontWeight: '500'
  },
  fontWeight400: {
    fontWeight: '400'
  },
  fontSize17: { fontSize: 17 },
  fontSize18: { fontSize: 18 },
  fontSize16: { fontSize: 16 },
  fontSize20: { fontSize: 20 },
  fontSize22: { fontSize: 22 },
  fontSize25: { fontSize: 25 },
  fontSize30: { fontSize: 30 },
  fontSize40: { fontSize: 40 },
  fontSize50: { fontSize: 50 },
  fontSize60: { fontSize: 60 },
  fontSize14: { fontSize: 14 },
  fontSize13: { fontSize: 13 },
  fontSize12: { fontSize: 12 },
  fontSize10: { fontSize: 10 },

  fontSize8: { fontSize: 8 },

flex:{flex:1},
  cardValue: {
    fontSize: 18,
    color: '#8C8C8C'
  },
  cardCheckboxSec: {
    marginLeft: '25%',
    marginRight: 1,
    justifyContent: 'flex-end',
  },
  CardCheckbox: {
    fontSize: 12,
    margin: 3,
    color: '#8C8C8C',
  },
  DateSec: {
    backgroundColor: '#EFEFEF',
  },
  bigDate: {
    fontSize: 26,
    color: '#777777',
    marginLeft: 7,
    marginRight: 7,
  },
  smallDate: {
    fontSize: 15,
    color: '#777777',
    marginLeft: 7,
    marginRight: 7,
  },
  radioName: {
    fontSize: 14,
    color: '#8C8C8C',
  },

  leftIcon: {
    flex: 0.3,
    paddingLeft: 6,
    // borderRadius: 4,
    // borderWidth: 2,
    // borderColor: 'rgba(2,166,223,0.65)',
  },
  BackIcon: {
    backgroundColor: '#8CC63F',

  },

  padding15:{
    padding:15
  },

  RightIcon: {
    flex: 0.1,
    paddingLeft: 0,
    // borderRadius: 4,
    // borderWidth: 2,
    // borderColor: 'rgba(2,166,223,0.65)',
  },
  HW80: {
     height: 70, width: 80 ,
  marginLeft:3,
  marginRight:3
  },
  HW90: {
    height: 60, width: 90 ,

 },
 
  HW95: { height: 95, width: 95 },
  // HW90: { height: 90, width: 90 },
  HW100: { height: 100, width: 100 },
  HW60: { height: 60, width: 60 },
  HW70: { height: 70, width: 90 },
  HW120: { height: 120, width: 90 },
  HightWidth120: { height: 120, width: 120 },
  maxWidth50: {
    maxWidth: '50%'
  },
  maxWidth60: {
    maxWidth: '60%'
  },
  maxWidth70: {
    maxWidth: '70%'
  },

  w60: { width: 60 },
  maxWidth80: {
    maxWidth: '80%'
  },
  w80: { width: 80 },
  w70: { width: 70 },

  maxWidth90: {
    maxWidth: '90%'
  },

  Width50: {
    width: '50%'
  },
  Width60: {
    width: '60%'
  },
  Width70: {
    width: '70%'
  },

  Width80: {
    width: '80%'
  },
  Width90: {
    width: '90%'
  },
  Width100p: {
    width: '100%'
  },

  height100p: {
    height: '100%'
  },

  height50p: {
    height: '50%'
  },
  maxHeight120: {
    maxHeight: '100%'

  },

  maxHeight50: {
    maxHeight: 50
  },
  maxHeight60: {
    maxHeight: 60
  },
  maxHeight100: {
    maxHeight: 100
  },

  minHeight20: {
    minHeight: 20
  },
  minHeight30: {
    minHeight: 30
  },
  minHeight40: {
    minHeight: 40
  },
width120:{width:'auto'},
  minHeight50: {
    minHeight: 50
  },
  minHeight60: {
    minHeight: 60
  },
  minHeight80: {
    minHeight: 80
  },
  minHeight100: {
    minHeight: 100
  },
  minHeight130: {
    minHeight: 130
  },
  minHeight160: {
    minHeight: 160
  },
  minHeight230: {
    minHeight: 230
  },
  height10: {
    height: 10
  },
  Height60: {
    height: 60
  },

  HumanBody: {
    height: 520,
    width:'100%'
  },

  Header_tittle: {
    justifyContent: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
  },


  Mainheader: {
    paddingTop:IS_IOS?20:statusBarHeight,
    height:IS_IOS?55+20:55+statusBarHeight,
    backgroundColor: '#5cb85c',
    color: '#fff',
  },


  Header: {
    backgroundColor: '#5cb85c',
    color: '#fff',
    paddingTop:30,
    height:95,
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  headerBody: {
    height:35,
        flex: 3,
        // borderRadius: 4,
        // borderWidth: 2,
        // borderColor: 'rgba(2,166,223,0.65)',
      },
  SearchHeader: {
    height:45,
      backgroundColor: '#5cb85c',
      // borderWidth: 1,
      // borderColor: 'blue',
    },

  humburger:{
    height:15,
    width:18,
    marginLeft:IS_IOS?10:0
  },


  

  marginBtm: { marginBottom: 50 },

  Container: {
    backgroundColor: 'rgba(2,166,223,0.65)'
  },
  Card_Item: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(2,166,224,0.65)',
  },
  TextIcon: {
    height: 24.22,
    width: 15.6,
    marginRight: 10
  },

  plogo: {
    height: 20,
    width: 10.63,
    marginTop: 0,
    marginLeft: 8,
    position: 'absolute',
    left: 10,
    top: 17,
  },
  input: {
    paddingLeft: 40,
    height: 55,
    marginTop: 0,
  },
  minWidth: {
    minWidth: '100%'
  },

  padding0: { padding: 0 },
  margin0: { margin: 0 },


  addCheckbox: {
    flex: 1,
    padding: 5
  },


  checkboxGroup: {
    color: 'green',
  },
  checkboxGroupText: {
    color: '#8C8C8C',
  },

  cardButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2.41,

    elevation: 2,
  },
  lightCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }








  // expandable
  ,
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10
  },

  btnText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20
  },

  // btnTextHolder: {
  //   borderWidth: 1,
  //   borderColor: 'rgba(0,0,0,0.5)'
  // },

  Btn: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff'
  }

  ,
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },





  height10: {
    height: 10
  },
  height12: {
    height: 12
  },
  height14: {
    height: 14
  },
  height16: {
    height: 16
  },
  height18: {
    height: 18
  },

  height20: {
    height: 20
  },

  height22: {
    height: 22
  },

  height24: {
    height: 24
  },

  height26: {
    height: 26
  },



  height28: {
    height: 28
  },
  height30: {
    height: 30
  },

  height32: {
    height: 32
  },

  height34: {
    height: 34
  },

  height36: {
    height: 36
  },
  height38: {
    height: 38
  },
  height40: {
    height: 40
  },
  height42: {
    height: 42
  },
  height44: {
    height: 44
  },
  height46: {
    height: 46
  },
  height48: {
    height: 48
  },
  height50: {
    height: 50
  },
  width10: {
    width: 10
  },
  width12: {
    width: 12
  },
  width14: {
    width: 14
  },
  width16: {
    width: 16
  },
  width18: {
    width: 18
  }
  ,


  // checkbox

  selectedArrayItemsBtn:
  {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch'
  },

  btnText:
  {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 18
  },

  checkBoxButton:
  {
    marginVertical: 10
  },

  // checkBoxHolder:
  // {
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },

  checkedView:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkedImage:
  {
    height: '50%',
    width: '50%',
    tintColor: 'white',
    resizeMode: 'contain'
  },

  uncheckedView:
  {
    flex: 1,
    backgroundColor: 'white'
  },

  checkBoxLabel:
  {
    fontSize: 17,
    paddingLeft: 10
  }

  ,
  textBox:
  {
    fontSize: 16,
    alignSelf: 'stretch',
    height: 40,
    paddingRight: 45,
    paddingLeft: 5,
    paddingVertical: 0,

  },

  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 30,
    width: 35,
    padding: 2
  },

  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  HeaderLogo: {
    height: 130,
    width: 'auto',
    // marginLeft:15,
    // marginRight:15,
  },
  HeaderLogo2: {
    height: '30%',
    width: '10%',
    // marginLeft:15,
    // marginRight:15,
  },
  RequiredIcon: {
    height: 11,
    width: 11,
    marginRight: 10
  }



  , flexRow: {
    flexDirection: 'row'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexWrap: {
    flexWrap: 'wrap',
  },


  height50p: {
    height: '50%'
  },
  height60p: {
    height: '60%'
  },
  height70p: {
    height: '70%'
  },
  height80p: {
    height: '80%'
  },
  height40p: {
    height: '40%'
  },
  height30p: {
    height: '30%'
  },
  height70p: {
    height: '70%'
  },
  width49p: {
    width: '48%'
  },
  width50p: {
    width: '50%'
  },
  width40p: {
    width: '40%'
  },
  width30p: {
    width: '30%'
  },
  width23p: {
    width: '23.33%'
  },
  width33p: {
    width: '33.33%'
  },
  width20p: {
    width: '20%'
  },
  width15p: {
    width: '15%'
  },
  width10p: {
    width: '10%'
  },
  width60p: {
    width: '60%'
  },
  width70p: {
    width: '70%'
  },
  width80p: {
    width: '80%'
  },
  width100p: {
    width: '100%'
  },
  widthAuto: {
    width: 'auto'
  },
  height230: {
    height: 230
  },
  currencyIcon: {
    height: 12,
    width: 9
  },
  loadMoreIcon: {
    height: 33,
    width: 33
  },

  // textDecoration
  LineThrough: { textDecorationLine: 'line-through' },
  Underline: { textDecorationLine: 'underline' },

  headerLeft: {
    flex: 0.6,
    borderRadius: 4,
    paddingRight:IS_IOS?0:10,
    marginLeft:IS_IOS?10:0
    // borderWidth: 2,
    // borderColor: 'rgba(2,166,223,0.65)',
  },

  headerRight: {
    flex: 0,
    borderRadius: 4,
    marginRight:10,
    height:35,
    // borderWidth: 1,
    // borderColor: 'rgba(2,166,223,0.65)',
  },

Radius2:{
  borderRadius: 2,
},

  SubscriptionLeft: {
    flex: 0.6,
    paddingLeft: 6,
    // borderRadius: 4,
    // borderWidth: 2,
    // borderColor: 'rgba(2,166,223,0.65)',
  },
  SubscriptionBody: {
    flex: 2,
    paddingLeft: 6,
    // borderRadius: 4,
    // borderWidth: 2,
    // borderColor: 'rgba(2,166,223,0.65)',
  },
  SubscriptionRight: {
    flex: 1.2,
    paddingRight: 6,
    // borderRadius: 4,
    // borderWidth: 2,
    // borderColor: 'rgba(2,166,223,0.65)',
  },

  colorLightGrey: {
    color: '#B4B4B4'
  },


  backgroundImage: {
    height: viewportHeight,
    width: '100%'
  },

  ProductBG:{
    height:viewportHeight/2.5,
    width:'100%'
  },
  bodyBackgroundImage: {
    height: '100%',
    width: '100%',
    marginTop:'auto',
    marginBottom:'auto',
    // borderWidth:1,
    // borderColor:'#000'
  },
  paddingStatusBar: {
    paddingTop: statusBarHeight
  },

  containerMain: {
    marginTop:'auto',
    marginBottom:'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },





  textStyle: {
    color: '#676767',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'contain'
  },
  smallImage: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    // marginTop: 100,
  },

  inputComment: {
    // backgroundColor: 'rgba(128, 128, 128, 0.4)', // 40% opaque
    backgroundColor: '#ffffff30',
    color: '#000',
    height:45,
    width:'auto'
},

inputSearch: {
    // backgroundColor: 'rgba(128, 128, 128, 0.4)', // 40% opaque
    backgroundColor: '#ffffff30',
    color: 'white',
    height:45,
    width:200
},
otpHeading:{
  marginLeft:20,
  marginRight:20,
  marginTop:IS_IOS ? 100 : 20
}

,
tiles:{
  height:165,
  width:'100%',

  },
 

  flexEnd:{
    alignSelf: 'flex-end'
  },

  HW93: { 
    //  height: 80,
    //  width:'29%', 
     flex:1,
     flexDirection: "column",
      margin:10,
      height:80,
    //  flex:'1 0 calc(25% - 10px)',
    // margin: 5
},


counter: {
  fontSize: 60,
  textAlign: 'center',
  height: 60,
  margin: 10,
},
miniCounter: {
    fontSize:20,
    position: 'relative',
    top: -32,
    right: -50
},

backgroundVideo: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},
Timeline:{
  width: '100%',
   height: 230, 
   resizeMode: 'cover'
},




inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderRadius:30,
  borderBottomWidth: 1,
  width:250,
  height:45,
  marginBottom:20,
  flexDirection: 'row',
  alignItems:'center'
},
inputs:{
  height:45,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
},
inputIcon:{
width:30,
height:30,
marginLeft:15,
justifyContent: 'center'
},
buttonContainer: {
height:45,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginBottom:20,
width:250,
borderRadius:30,
},
loginButton: {
backgroundColor: "#5cb85c",
},
loginText: {
color: 'white',
}
,

textArea: {
  height: 80,
  paddingLeft:10,
  textAlignVertical: 'top',
  width:'100%',

},
versionText:{
  fontSize:15,
  fontWeight:'400',
  
}
});

