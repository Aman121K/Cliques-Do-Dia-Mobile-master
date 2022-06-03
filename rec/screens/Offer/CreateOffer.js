import React, { Component } from 'react';
import {
  AsyncStorage, Image, KeyboardAvoidingView,
  Platform, ScrollView, StatusBar,
  StyleSheet, TouchableOpacity, TextInput
} from 'react-native';
import axios from 'axios';
import {
  Body, Button, Container,
  Form, Header, Input, Icon,
  Item, Label, Picker,
  Text, Title, View
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import { ProgressDialog } from 'react-native-simple-dialogs';
import SelectMultiple from 'react-native-select-multiple';

import { baseURL } from '../../../app.config';
import styles from '../../style/style';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

const fruits = [
  { label: 'Segunda-feira', value: '1' },
  { label: 'Terça-feira', value: '2' },
  { label: 'Quarta-feira', value: '3' },
  { label: 'Quinta-feira', value: '4' },
  { label: 'Sexta-feira', value: '5' },
  { label: 'Sábado', value: '6' },
  { label: 'Domingo', value: '7' }
]

var d = new Date();

class CreateOffer extends Component {
  state = {
    hidePassword: true,
    Categories: [],
    CategoryName: [],
    Cities: [],
    title: '',
    short_desc: '',
    cat_id: '',
    address: '',
    city_id: 'Select',
    zip_code: '',
    phone: '',
    description: '',
    min_price: '',
    max_price: '',
    amenities: [],
    Selectedamenities: [],
    total_allowed_coupon: '',
    users_coupon_per_day: '',
    coupon_begin_hour: '08:00',
    coupon_end_hour: '20:00',
    coupon_start_date: moment(new Date()).format('YYYY-MM-DD'),
    coupon_end_date: moment(new Date()).add(60, 'days').format('YYYY-MM-DD'),
    result: '',
    ImgSource: '',
    selected: undefined,
    CatSelected: undefined
  }

  async componentDidMount() {
    let token = AsyncStorage.getItem('token');

    this.setState({
      token: await AsyncStorage.getItem('token')
    });

    if (token == null || token == '' || token == undefined) {
      this.props.navigation.navigate('Login');
    }

    axios.get(`${baseURL}/categories`)
      .then(response => {
        this.setState({
          Categories: response.data.data,
          CategoryName: response.data.data.map((r) => r.name)
        });
      })
      .catch(error => console.log(error))

    axios.get(`${baseURL}/cities`)
      .then(response => {
        this.setState({
          Cities: response.data.data,
        });
      })
      .catch(error => console.log(error))
  }

  cityList = _ => (
    this.state.Cities.map((city, index) => <Picker.Item label={city.name} key={index} value={city.id} /> )
  )

  categoriesList = _ => (
    this.state.Categories.map((category, index) => <Picker.Item label={category.name} key={index} value={category.id} /> )
  )

  uploadImg() {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          ImgSource: response.data
        });
      }
    });
  }

  onSubmitOffer() {
    const {
      title, short_desc, cat_id, address, city_id, zip_code, phone, description, min_price,
      max_price, Selectedamenities, total_allowed_coupon, users_coupon_per_day, coupon_begin_hour,
      coupon_end_hour, coupon_start_date, coupon_end_date
    } = this.state;

    this.setState({ progressVisible: true });

    // console.log('this.state.title:',this.state.title);
    // console.log('this.state.short_desc:',this.state.short_desc);
    // console.log('this.state.cat_id:',this.state.cat_id);
    // console.log('this.state.address:',this.state.address);
    // console.log('this.state.city_id:',this.state.city_id);
    // console.log('this.state.zip_code:',this.state.zip_code);
    // console.log('this.state.phone:',this.state.phone);
    // console.log('this.state.description:',this.state.description);
    // console.log('this.state.min_price:',this.state.min_price);
    // console.log('this.state.max_price:',this.state.max_price);
    // console.log('this.state.amenities:',this.state.Selectedamenities.toString());

    // console.log('this.state.total_allowed_coupon:',this.state.total_allowed_coupon);
    // console.log('this.state.users_coupon_per_day:',this.state.users_coupon_per_day);
    // console.log('this.state.coupon_begin_hour:',this.state.coupon_begin_hour);
    // console.log('this.state.coupon_end_hour:',this.state.coupon_end_hour);

    // console.log('this.state.coupon_start_date:',this.state.coupon_start_date);
    // console.log('this.state.coupon_end_date:',this.state.coupon_end_date);

    if (title == '' || short_desc == '' || cat_id == '' || address == '' || city_id == '' ||
      zip_code == '' || phone == '' || description == '' || min_price == '' ||
      max_price == '' || Selectedamenities == '' || total_allowed_coupon == '' ||
      users_coupon_per_day == '' || coupon_begin_hour == '' || coupon_end_hour == '' ||
      coupon_start_date == '' || coupon_end_date == ''
    ) {
      alert('Please fill all the details');
    } else {
      axios.post(`${baseURL}/user/create-ad`,
        JSON.stringify({
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
        }),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
          },
        }
      )
      .then(response => {
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
          Selectedamenities:[],
          total_allowed_coupon:'',
          users_coupon_per_day:'',
          coupon_begin_hour:'',
          coupon_end_hour:'',
          coupon_start_date:'',
          coupon_end_date:'',
          result:'',
          progressVisible: false,
          selected: undefined,
          CatSelected: undefined
        });
        alert('Offer Created Successfully.')
        this.props.navigation.navigate('offers');
      })
      .catch(error => {
        if (error.response.data.erros.short_desc) {
          alert(error.response.data.erros.short_desc.toString());
        }
      }) //to catch the errors if any
      .finally(() => {
        this.setState({ progressVisible: false })
      })
    }
  }

  onSelectionsChange = amenities => {
    this.setState({ amenities })

    amenities.map((amentity, index) => {
      this.setState({
        Selectedamenities: [...this.state.Selectedamenities, amentity.value]
      });
    })
  }

  render() {
    const { amenities, progressVisible } = this.state;

    if (IS_ANDROID) {
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)')
      StatusBar.setBarStyle('light-content')
      StatusBar.setTranslucent(true)
    }

    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container} enabled >
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <ProgressDialog
            visible={progressVisible}
            title='Buscando dados'
            message='por favor, espere...'
          />

          <View style={[styles.ValignCenter]} >
            <View style={[styles.flexRow, styles.marginT45]} >
              <Button style={[styles.marginT45, styles.marginLR30]} onPress={() => this.props.navigation.navigate('offers')} transparent>
                <Image style={{height:18, width:20}} source={require('./../../../assets/left.png')} />
              </Button>

              <Text style={[styles.fontSize25, styles.marginT45, styles.marginLR30, styles.alignLeft, styles.colorGreen]}>Criar Oferta</Text>
            </View>

            <View style={[styles.marginLR30, styles.marginT45]}>
              <Item>
                <Input
                  style={[styles.fontSize16]}
                  placeholder='Nome do Estabelecimento'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType='next'
                  value={this.state.title}
                  onChangeText={(title) => { this.setState({ title }) }}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30]}>
              <Item>
                <Input
                  style={[styles.fontSize16]}
                  placeholder='Título da oferta'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType='next'
                  value={this.state.short_desc}
                  onChangeText={(short_desc) => this.setState({ short_desc })}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15]}>
              <Item>
                <TextInput
                  style={[styles.textArea,styles.borderGrey]}
                  underlineColorAndroid='transparent'
                  placeholder='Descrição e regras da oferta'
                  placeholderTextColor='grey'
                  numberOfLines={10}
                  multiline={true}
                  value={this.state.description}
                  onChangeText={(description) => this.setState({ description })}
                />
              </Item>

              <Item>
                <DatePicker
                  style={[styles.width50p]}
                  date={this.state.coupon_start_date}
                  mode='date'
                  placeholder='Início de vigência'
                  format='YYYY-MM-DD'
                  minDate={new Date()}
                  maxDate='2025-12-12'
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  customStyles={{
                    dateIcon: {
                      height: 18,
                      width: 18,
                    },
                    dateInput: {
                      borderWidth: 0
                    }
                  }}
                  iconSource={require('../../../assets/calender.png')}
                  onDateChange={(coupon_start_date) => {
                    this.setState({ coupon_start_date: coupon_start_date })
                  }}
                />

                <DatePicker
                  style={[styles.width50p]}
                  date={this.state.coupon_end_date}
                  mode='date'
                  placeholder='Término de vigência'
                  format='YYYY-MM-DD'
                  minDate={ (this.state.coupon_start_date)?this.state.coupon_start_date:new Date()}
                  maxDate='2025-12-12'
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  customStyles={{
                    dateIcon: {
                      height: 18,
                      width: 18,
                    },
                    dateInput: {
                      borderWidth: 0
                    }
                  }}
                  iconSource={require('../../../assets/calender.png')}
                  onDateChange={(coupon_end_date) => {
                    if (this.state.coupon_start_date != '') {
                      this.setState({ coupon_end_date: coupon_end_date })
                    } else {
                      alert('Please select Start Date First...')
                    }
                  }}
                />
              </Item>

              <Item>
                <DatePicker
                  date={this.state.coupon_begin_hour}
                  style={[styles.width50p]}
                  mode='time'
                  placeholder='Horário de início'
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  customStyles={{
                    dateIcon: {
                      height: 18,
                      width: 18
                    },
                    dateInput: {
                      borderWidth: 0
                    }
                  }}
                  iconSource={require('../../../assets/clock.png')}
                  onDateChange={(coupon_begin_hour) => {
                    debugger;
                    this.setState({ coupon_begin_hour: coupon_begin_hour })
                  }}
                />

                <DatePicker
                  date={this.state.coupon_end_hour}
                  style={[styles.width50p]}
                  mode='time'
                  placeholder='Horário de término'
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  customStyles={{
                    dateIcon: {
                      height: 18,
                      width: 18
                    },
                    dateInput: {
                      borderWidth: 0
                    }
                  }}
                  iconSource={require('../../../assets/clock.png')}
                  onDateChange={(coupon_end_hour) => {
                    debugger;
                    this.setState({ coupon_end_hour: coupon_end_hour })
                  }}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15, styles.border1]}>
              <Item>
                <SelectMultiple
                  items={fruits}
                  selectedItems={amenities}
                  onSelectionsChange={this.onSelectionsChange}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15, styles.border1]}>
              <Item>
                {
                  this.state.CategoryName &&
                    <Picker
                      mode='dropdown'
                      placeholder='Categories'
                      placeholderIconColor={'#fff'}
                      placeholderStyle={{ color: '#fff' }}
                      placeholderIconColor='#fff'
                      style={{height: 30, width:200,color:'#676767'}}
                      selectedValue={this.state.CatSelected}
                      onValueChange={(value, itemIndex) =>
                        this.setState({
                          cat_id:value,
                          CatSelected: value,
                        })
                      }>
                      { this.categoriesList() }
                    </Picker>
                }
              </Item>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15, styles.border1]}>
              <Item>
                {
                  this.state.Cities &&
                    <Picker
                      mode='dropdown'
                      // iosIcon={<Icon style={[styles.colorGreen]} name='arrow-down' />}
                      placeholder='City'
                      placeholderIconColor={'#fff'}
                      placeholderStyle={{ color: '#fff' }}
                      placeholderIconColor='#fff'
                      style={{height: 30, width:200,color:'#676767'}}
                      // selectedValue={this.state.city_id}
                      selectedValue={this.state.selected}
                        onValueChange={(value, itemIndex) =>
                        this.setState({
                          city_id:value,
                          selected: value,
                            })
                      }>
                        { this.cityList() }
                    </Picker>
                }
              </Item>
            </View>

            <View  style={[styles.marginLR30, styles.marginTB15]}>
              <Item>
                <TextInput
                  style={[styles.textArea,styles.borderGrey]}
                  underlineColorAndroid='transparent'
                  placeholder='Endereço'
                  placeholderTextColor='#676767'
                  numberOfLines={5}
                  multiline={true}
                  value={this.state.address}
                  onChangeText={(address) => this.setState({ address })}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30]}>
              <Item>
                <Input
                  style={[styles.fontSize16]}
                  placeholder='CEP do Local'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='number-pad'
                  returnKeyType='next'
                  value={this.state.zip_code}
                  onChangeText={(zip_code) => this.setState({ zip_code })}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30]}>
              <Item>
                <Input
                  style={[styles.fontSize16]}
                  placeholder='Telefone do Local'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='number-pad'
                  returnKeyType='next'
                  value={this.state.phone}
                  onChangeText={(phone) => this.setState({ phone })}
                />
              </Item>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15]}>
              <Item>
                <Input
                  placeholder='Preço original'
                  value={this.state.min_price}
                  onChangeText={(min_price) => this.setState({ min_price })}
                  keyboardType='number-pad'
                />
              </Item>


              <Item>
                <Input
                  placeholder='Preço da oferta'
                  value={this.state.max_price}
                  onChangeText={(max_price) => this.setState({ max_price })}
                  keyboardType='number-pad'
                />
              </Item>

              <Item>
                <Input
                  placeholder='Números de cupons permitidos'
                  value={this.state.total_allowed_coupon}
                  onChangeText={(total_allowed_coupon) => this.setState({ total_allowed_coupon })}
                  keyboardType='number-pad'
                />
              </Item>

              <Item>
                <Input
                  placeholder='Números de coupons por dia'
                  value={this.state.users_coupon_per_day}
                  onChangeText={(users_coupon_per_day) => this.setState({ users_coupon_per_day })}
                  keyboardType='number-pad'
                />
              </Item>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15]}>
              {
                this.state.ImgSource ?
                  <Image
                    style={{height:100,width:'100%'}}
                    source={{uri:'data:image/jpeg;base64,' + this.state.ImgSource}}
                  /> :
                  null
              }

              <Button onPress={()=>this.uploadImg()}  block style={[styles.marginTB10, styles.BackgroundGreen]} >
                 <Text uppercase={false} >Selecionar imagem</Text>
               </Button>

               <Button onPress={()=>this.onSubmitOffer()}  block style={styles.BackgroundGreen} >
                 <Text uppercase={false} >Criar Oferta</Text>
               </Button>
            </View>

            <View style={[styles.marginLR30, styles.marginTB15]} >

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateOffer;
