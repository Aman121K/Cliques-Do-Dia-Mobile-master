import React, { Component } from 'react';
import { TouchableOpacity, TextInput,StyleSheet,ScrollView,Image,AsyncStorage,Platform,StatusBar,KeyboardAvoidingView } from 'react-native';
import styles from '../../style/style';
import { ProgressDialog } from 'react-native-simple-dialogs';
import DatePicker from 'react-native-datepicker'

import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

import SelectMultiple from 'react-native-select-multiple'
import {
  Container,
  Header,
  Button,
  View,
  Item,
  Text,
  Body,
  Icon,
  Picker,
  Form,
  Input,  
  Label,
  Title,
} from 'native-base';
// import { ScrollView } from 'react-native-gesture-handler';
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
// const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
const fruits = [
  { label: 'Segunda-feira', value: '1' },
  { label: 'Terça-feira', value: '2' },
  { label: 'Quarta-feira', value: '3' },
  { label: 'Quinta-feira', value: '4' },
  { label: 'Sexta-feira', value: '5' },
  { label: 'Sábado', value: '6' },
  { label: 'Domingo', value: '7' }
]

class UpdateOffer extends Component {
  constructor()
  {
    super();
    this.state = { hidePassword: true,
      Categories:[],
      CategoryName:[],
      Cities:[],
      
      title:'', 
      short_desc:'', 
      cat_id:'',
      address:'', 
      city_id:'Select',
      zip_code:'', 
      phone:'', 
      description:'', 
      min_price:'',
      max_price:'',
      amenities:[], 
      Selectedamenities:[],
      total_allowed_coupon:'',
      users_coupon_per_day:'',
      coupon_begin_hour:'', 
      coupon_end_hour:'', 
      coupon_start_date:'', 
      coupon_end_date:'', 
      result:'',

      selected:undefined,
      CatSelected:undefined,
      itemId:'',
      ImgSource:'',
    }
  }



  async componentDidMount() {

    const { navigation } = this.props;
   
    this.setState({
      token:  await AsyncStorage.getItem("token"),
      itemId : navigation.getParam('itemId')
    });
console.log("itemId",this.state.itemId);

     
    const url="https://www.cliquesdodia.com.br/api/offer/"+this.state.itemId;
        
  
fetch(url)
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   Result: responseJson.data,

   title:responseJson.data.title, 
   short_desc:responseJson.data.short_desc, 
   cat_id:responseJson.data.category,
   address:responseJson.data.address, 
   city_id:responseJson.data.city,
   zip_code:responseJson.data.zip_code, 
   phone:responseJson.data.phone, 
   description:responseJson.data.description, 
   min_price:responseJson.data.min_price,
   max_price:responseJson.data.max_price,
   amenitiesItems:responseJson.data.amenities, 
   total_allowed_coupon:responseJson.data.total_allowed_coupon,
   users_coupon_per_day:responseJson.data.users_coupon_per_day,
   coupon_begin_hour:responseJson.data.coupon_begin_hour, 
   coupon_end_hour:responseJson.data.coupon_end_hour, 
   coupon_start_date:responseJson.data.coupon_start_date, 
   coupon_end_date:responseJson.data.coupon_end_date, 
   ImgSource:responseJson.data.images
  });
  console.log("Single Post: ",responseJson.data);

  var temp;
  this.state.amenitiesItems.map( (x,i) => 
  
    { 
      temp=x.value
      this.setState({ Selectedamenities: [...this.state.Selectedamenities, temp] }, function () {
        console.log("eminites.....:",this.state.Selectedamenities);
    });

    })




  // console.log("image: ",this.state.Result.images);
   console.log("cat_id: ",this.state.cat_id);



  // this.state.Result.map( (x,i) => 
  // {  
  //   console.log("Tittle:",x.title);  // value={x.id}  />
  //  console.log("images type---------------:",x.images.toString());
  //   console.log("min_price:",x.min_price);
  //   console.log("short_desc:",x.short_desc); 
  //   console.log("id:",x.id);
  //   console.log("Tittle:",x.title);
  //})
  this.setState({
    progressVisible: false,
  });

})
.catch(error=>console.log(error)) //to catch the errors if any


    // console.log("token in My Account:",token);
  
    // fetch(`https://www.cliquesdodia.com.br/api/user/create-ad`, 
    // {
    //   method: 'POST',  
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + this.state.token,
    //   },
    //   body: JSON.stringify({
    //     title:'This is title2',
    //     short_desc:'short desc1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //     cat_id:1,
    //     address:'address1',
    //     city_id:1,
    //     zip_code:'385320',
    //     phone:'123456789',
    //     description:'description1',
    //     min_price:100,
    //     max_price:200,
    //     amenities:'1,2,3',
    //     total_allowed_coupon:10,
    //     users_coupon_per_day:1,
    //     coupon_begin_hour:'05:10',
    //     coupon_end_hour:'6:00',
    //     coupon_start_date:'2019-03-06',
    //     coupon_end_date:'2019-03-10',
    //   })
    // })
    // .then(response => response.json())
    // .then((responseJson)=> {
    //   this.setState({
    //    Result: responseJson,
    //   });
    //   console.log("result-----------:",this.state.Result);
    // })
    // .catch(error=>console.log(error)) //to catch the errors if any
  
    
  
  
  
  
  
  
    
    if(this.state.token==null||this.state.token==''||this.state.token==undefined)
    {
      this.props.navigation.navigate("Login");
    } 

    
    console.log("did mount");
    fetch("https://www.cliquesdodia.com.br/api/categories")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       Categories: responseJson.data,
      });
      console.log("Cate-----------:",this.state.Categories);
      this.state.Categories.map( (x,i) => 
      { 
        this.state.CategoryName.push(x.name);
          
        console.log("CatName:",this.state.CategoryName);  // value={x.id}  />
      })
   
    })
    .catch(error=>console.log(error)) //to catch the errors if any

    

    fetch("https://www.cliquesdodia.com.br/api/cities")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       Cities: responseJson.data,
      });
      
      console.log(this.state.Cities);

      // this.fetchData();

    })
    .catch(error=>console.log(error)) //to catch the errors if any

    // this.setState({
    //   searchURL:"https://www.cliquesdodia.com.br/public_html/api/api/search?category_id="+2+"&city_id="+1
    //  });
   
  }

  CityList = () =>{
    return( this.state.Cities.map( (x,i) => { 
          return( <Picker.Item label={x.name} key={i} value={x.id}  />)} ));
  }

  CategoriesList = () =>{
    return( this.state.Categories.map( (x,i) => { 
          return( <Picker.Item label={x.name} key={i} value={x.id}  />)} ));
  }
  

  UploadImg(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        console.log('path------------',source);

        // You can also display the image using data:
        this.setState({
          ImgSource:response.data
         });

        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
       
      }
    });
  }


  onSubmitOffer() {

    this.setState({progressVisible: true});

console.log("this.state.title:",this.state.title);
console.log("this.state.short_desc:",this.state.short_desc);
console.log("this.state.cat_id:",this.state.cat_id);
console.log("this.state.address:",this.state.address);
console.log("this.state.city_id:",this.state.city_id);
console.log("this.state.zip_code:",this.state.zip_code);
console.log("this.state.phone:",this.state.phone);
console.log("this.state.description:",this.state.description);
console.log("this.state.min_price:",this.state.min_price);
console.log("this.state.max_price:",this.state.max_price);
console.log("this.state.amenities:",this.state.Selectedamenities.toString());

console.log("this.state.total_allowed_coupon:",this.state.total_allowed_coupon);
console.log("this.state.users_coupon_per_day:",this.state.users_coupon_per_day);
console.log("this.state.coupon_begin_hour:",this.state.coupon_begin_hour);
console.log("this.state.coupon_end_hour:",this.state.coupon_end_hour);

console.log("this.state.coupon_start_date:",this.state.coupon_start_date);
console.log("this.state.coupon_end_date:",this.state.coupon_end_date);
console.log("this.state.ImgSource:",this.state.ImgSource);

// if(this.state.ImgSource==''){

//   console.log("blank");
//   this.state.ImgSource=this.state.ImgSource;
//   console.log("blank",this.state.ImgSource);
// }

    if(this.state.title=="" || this.state.short_desc==""|| this.state.cat_id=="" ||
    this.state.address=="" || this.state.city_id==""|| this.state.zip_code=="" ||
    this.state.phone=="" || this.state.description==""|| this.state.min_price=="" ||
    this.state.max_price=="" || this.state.total_allowed_coupon=="" ||
    this.state.users_coupon_per_day=="" || this.state.coupon_begin_hour==""|| this.state.coupon_end_hour=="" ||
    this.state.coupon_start_date=="" || this.state.coupon_end_date==""
    )
    {
      alert("Please fill all the details");
    }
    else{
      const updateurl="https://www.cliquesdodia.com.br/api/user/update-ad/"+this.state.itemId;
      fetch(updateurl, 
      {
        method: 'POST',  
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify({
          title:this.state.title, 
          short_desc:this.state.short_desc, 
          cat_id:this.state.cat_id,
          address:this.state.address, 
          city_id:this.state.city_id,
          zip_code:this.state.zip_code, 
          phone:this.state.phone, 
          description:this.state.description, 
          min_price:this.state.min_price,
          max_price:this.state.max_price,
          amenities:this.state.Selectedamenities.toString(), 
          total_allowed_coupon:this.state.total_allowed_coupon,
          users_coupon_per_day:this.state.users_coupon_per_day,
          coupon_begin_hour:this.state.coupon_begin_hour, 
          coupon_end_hour:this.state.coupon_end_hour, 
          coupon_start_date:this.state.coupon_start_date, 
          coupon_end_date:this.state.coupon_end_date, 
          image:this.state.ImgSource
        })
      })
      .then(response => response.json())
      .then((responseJson)=> {
        console.log("after update-----------:",responseJson);
        alert("Successfully updated.");

        this.setState({
         title:'', 
         short_desc:'', 
         cat_id:'',
         address:'', 
         city_id:'Select',
         zip_code:'', 
         phone:'', 
         description:'', 
         min_price:'',
         max_price:'',
         amenities:[], 
         amenitiesItems:[],
         total_allowed_coupon:'',
         users_coupon_per_day:'',
         coupon_begin_hour:'', 
         coupon_end_hour:'', 
         coupon_start_date:'', 
         coupon_end_date:'', 
         result:'',
         selected:undefined,
         CatSelected:undefined,
         progressVisible: false
        });
        
        this.props.navigation.navigate('offers')
      // this.props.navigate("offers", {fetchData: () => this.fetchData()});

      })
      .catch(error=>console.log(error)) //to catch the errors if any
    
      
    }



  }



  onSelectionsChange = (amenities) => {
    this.setState({ amenities })
    var temp;
    amenities.map( (x,i) => 
  
    { 
      temp=x.value
      this.setState({ Selectedamenities: [...this.state.Selectedamenities, temp] }, function () {
        console.log("eminites.....:",this.state.Selectedamenities);
    });

    })

  }


managePasswordVisibility = () =>
{
  this.setState({ hidePassword: !this.state.hidePassword });
}
    render() {
console.log(fruits)

    if(IS_ANDROID){
      StatusBar.setBackgroundColor("rgba(0,0,0,0.2)")
      StatusBar.setBarStyle("light-content")
      StatusBar.setTranslucent(true)
    }

      return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container} enabled>
      
      <ScrollView keyboardShouldPersistTaps={'always'}>
                  <ProgressDialog
          visible={this.state.progressVisible}
          title=" Fetching Data"
          message="Please wait..."
        />
             
                  
            <View style={[styles.ValignCenter]}>
              <View style={[styles.flexRow,styles.marginT45]}>
                <Button style={[styles.marginT45,styles.marginLR30]} onPress={()=> this.props.navigation.navigate('offers')} transparent>
                 <Image style={{height:18,width:20}} source={require('./../../../assets/left.png')} />
                </Button>

                <Text style={[styles.fontSize25,styles.marginT45,styles.marginLR30,styles.alignLeft,styles.colorGreen]}>Atualizar Oferta</Text>
                
              </View>
       <View  style={[styles.marginLR30,styles.marginT45]}>
                  
                     <Item >
                      <Input style={[styles.fontSize16]} placeholder="Nome do Estabelecimento" 
                       autoCapitalize="none" 
                       autoCorrect={false} 
                       keyboardType='email-address' 
                       returnKeyType="next"
                       value={this.state.title}
                       onChangeText={(title) => this.setState({ title })}
                      
                      />
                    </Item>
                </View>

                <View  style={[styles.marginLR30]}>
                     <Item >
                     <Input style={[styles.fontSize16]} placeholder="Título da oferta" 
                       autoCapitalize="none" 
                       autoCorrect={false} 
                       keyboardType='email-address' 
                       returnKeyType="next"
                       value={this.state.short_desc}
                       onChangeText={(short_desc) => this.setState({ short_desc })}
                      
                      />
                    </Item>

                    <Item >
                    <TextInput
                          style={[styles.textArea,styles.borderGrey]}
                          underlineColorAndroid="transparent"
                          placeholder="Descrição e regras da oferta"
                          placeholderTextColor="grey"
                          numberOfLines={10}
                          multiline={true}
                          value={this.state.description}
                          onChangeText={(description) => this.setState({ description })}
                        />
              </Item>
              

              <Item >
                            {/* <Input placeholder="Coupon Start Date" 
                            value={this.state.coupon_start_date}
                            onChangeText={(coupon_start_date) => this.setState({ coupon_start_date })}
                            secureTextEntry={true}
                            />   */}

                            <DatePicker

                            style={[styles.width50p]}
                            date={this.state.coupon_start_date}
                            mode="date"
                            placeholder="Início de vigência"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            maxDate="2025-12-12"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                            height: 18,
                            width: 18,
                              
                              },

                              dateInput: {
                                borderWidth: 0

                              }
                              // ... You can check the source to find the other keys.
                            }}
                            iconSource={require('../../../assets/calender.png')}
                            onDateChange={(coupon_start_date) => {
                              this.setState({ coupon_start_date: coupon_start_date })
                            }}
                            />


                          <DatePicker

                          style={[styles.width50p]}
                          date={this.state.coupon_end_date}
                          mode="date"
                          placeholder="Término de vigência"
                          format="YYYY-MM-DD"
                          minDate={ (this.state.coupon_start_date)?this.state.coupon_start_date:new Date()}
                          maxDate="2025-12-12"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                          dateIcon: {
                          height: 18,
                          width: 18,
                             
                            },

                            dateInput: {
                              borderWidth: 0

                            }
                            // ... You can check the source to find the other keys.
                          }}
                          iconSource={require('../../../assets/calender.png')}
                          onDateChange={(coupon_end_date) => {
                            this.setState({ coupon_end_date: coupon_end_date })
                          }}
                          />
                   </Item>

                         


                    <Item >
                          <DatePicker
                          date={this.state.coupon_begin_hour}
                          style={[styles.width50p]}
                          mode="time"
                          placeholder="Horário de início"
                          // format="YYYY-MM-DD"
                          // minDate="2016-05-01"
                          // maxDate={new Date()}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              height: 18,
                              width: 18
                            },

                            dateInput: {
                              borderWidth: 0

                            }
                            // ... You can check the source to find the other keys.
                          }}
                          iconSource={require('../../../assets/clock.png')}
                          onDateChange={(coupon_begin_hour) => {
                            this.setState({ coupon_begin_hour: coupon_begin_hour })
                          }}
                          />
                       
                          <DatePicker
                          date={this.state.coupon_end_hour}
                          style={[styles.width50p]}
                          mode="time"
                          placeholder="Horário de término"
                          // format="YYYY-MM-DD"
                          // minDate="2016-05-01"
                          // maxDate={new Date()}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              height: 18,
                              width: 18
                            },

                            dateInput: {
                              borderWidth: 0

                            }
                            // ... You can check the source to find the other keys.
                          }}
                          iconSource={require('../../../assets/clock.png')}
                          onDateChange={(coupon_end_hour) => {
                            this.setState({ coupon_end_hour: coupon_end_hour })
                          }}
                          />
                          </Item>
              
                </View>


                 <View  style={[styles.marginLR30,styles.marginTB15,styles.border1]}>
                    
                    <Item >

                          <SelectMultiple
                          items={fruits}
                          selectedItems={this.state.amenitiesItems}
                          onSelectionsChange={this.onSelectionsChange} />

                      </Item>
                </View>

                <View  style={[styles.marginLR30,styles.marginTB15,styles.border1]}>
                    
                    <Item >

             


{
              (this.state.CategoryName)?
                <Picker
                  mode="dropdown"
                  // iosIcon={<Icon style={[styles.colorGreen]} name="arrow-down" />}
                  placeholder="Categories"
                  placeholderIconColor={'#fff'}
                  placeholderStyle={{ color: "#fff" }}
                  placeholderIconColor="#fff"
                  style={{height: 30, width:200,color:'#676767'}}
                  // selectedValue={this.state.city_id}
                  selectedValue={2}
                  onValueChange={(value, itemIndex) =>
                    this.setState({
                      cat_id:value,
                      CatSelected: value,
                        })
                  }>
                    { this.CategoriesList() }
               
                </Picker>
            :null
            }


        </Item>
                        </View>

              

              

                <View  style={[styles.marginLR30,styles.marginTB15,styles.border1]}>
                    
                    <Item >

             
                    {
                      (this.state.Cities)?
                        <Picker
                          mode="dropdown"
                          // iosIcon={<Icon style={[styles.colorGreen]} name="arrow-down" />}
                          placeholder="City"
                          placeholderIconColor={'#fff'}
                          placeholderStyle={{ color: "#fff" }}
                          placeholderIconColor="#fff"
                          style={{height: 30, width:200,color:'#676767'}}
                          // selectedValue={this.state.city_id}
                          selectedValue={this.state.city_id}
                            onValueChange={(value, itemIndex) =>
                            this.setState({
                              city_id:value,
                              selected: value,
                                })
                          }>
                            { this.CityList() }
                      
                        </Picker>
                    :null
                    }



                    </Item>
                </View>


                <View  style={[styles.marginLR30,styles.marginTB15]}>
                    
                    <Item >
                        <TextInput
                              style={[styles.textArea,styles.borderGrey]}
                              underlineColorAndroid="transparent"
                              placeholder="Endereço"
                              placeholderTextColor="#676767"
                              numberOfLines={5}
                              multiline={true}
                              value={this.state.address}
                           onChangeText={(address) => this.setState({ address })}
                            />
                  </Item>
                    </View>

                <View  style={[styles.marginLR30]}>
                     <Item >
                      <Input style={[styles.fontSize16]} placeholder="CEP do Local" 
                       autoCapitalize="none" 
                       autoCorrect={false} 
                       keyboardType='number-pad' 
                       returnKeyType="next"
                       value={this.state.zip_code}
                       onChangeText={(zip_code) => this.setState({ zip_code })}
                      
                      />
                    </Item>
                </View>

                <View  style={[styles.marginLR30]}>
                     <Item >
                      <Input style={[styles.fontSize16]} placeholder="Telefone do Local"  
                       autoCapitalize="none" 
                       autoCorrect={false} 
                       keyboardType='number-pad' 
                       returnKeyType="next"
                       value={this.state.phone}
                       onChangeText={(phone) => this.setState({ phone })}
                      
                      />
                    </Item>
                </View>
        
                <View  style={[styles.marginLR30,styles.marginTB15]}>

               

          <Item >

                      <Input placeholder="Preço original" 
                        value={this.state.min_price}
                        onChangeText={(min_price) => this.setState({ min_price })}
                         keyboardType='number-pad' 
                        />

                        </Item>


                        <Item >

                        <Input placeholder="Preço da oferta" 
                          value={this.state.max_price}
                          onChangeText={(max_price) => this.setState({ max_price })}
                           keyboardType='number-pad' 
                          />  

                          </Item>

                          <Item >

                          <Input placeholder="Números de cupons permitidos" 
                          value={this.state.total_allowed_coupon}
                          onChangeText={(total_allowed_coupon) => this.setState({ total_allowed_coupon })}
                          keyboardType='number-pad' 
                          />  

                          </Item>


                          <Item >
                          <Input placeholder="Números de coupons por dia" 
                            value={this.state.users_coupon_per_day}
                            onChangeText={(users_coupon_per_day) => this.setState({ users_coupon_per_day })}
                            keyboardType='number-pad' 
                          />  
                          </Item>

                         

                           </View>
               
                    <View style={[styles.marginLR30,styles.marginTB15]}>
                       {
                         (this.state.ImgSource)?
                         <Image style={{height:100,width:'100%'}} 
                         source={{uri:'data:image/jpeg;base64,'+this.state.ImgSource}}
                       />  
                         :null
  
                       }
                      
                    
                  </View>

                  <View  style={[styles.marginLR30,styles.marginTB15]}>
                   
                          <Button  onPress={()=>this.UploadImg()}  block style={[styles.BackgroundGreen]}>
                              <Text  uppercase={false}> Selecionar imagem</Text>
                      </Button>

                </View>
                <View  style={[styles.marginLR30,styles.marginTB15]}>
                   
                        <Button  onPress={()=>this.onSubmitOffer()}  block style={[styles.BackgroundGreen,styles.marginT10]}>
                    <Text  uppercase={false}>Atualizar oferta</Text>
                  </Button>
                  
              
                </View>

                <View  style={[styles.marginLR30,styles.marginTB15]}>
                   
                  
         
           </View>
          
         
          </View>
          
          </ScrollView>
      </KeyboardAvoidingView>
      );
    }
  }
  export default UpdateOffer;