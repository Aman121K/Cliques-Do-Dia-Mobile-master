import React, { Component } from 'react';
import { TouchableOpacity, TextInput,StyleSheet,Image,ImageBackground } from 'react-native';
import styles from '../../../style/style';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { ScrollView } from 'react-native-gesture-handler';

class Tabs extends Component {
  constructor(props)
  {
    super();
    this.state = { hidePassword: true,
    
    }
  }


    render() {
      
      return (
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
        <SegmentedControlTab
        values={this.props.values}
        selectedIndex={this.props.selectedIndex}
        onTabPress={this.props.TabSwitch}
        borderRadius={0}
        tabsContainerStyle={{ width:'100%',height: 40, backgroundColor: 'white',  }}
        tabStyle={{ backgroundColor: 'white', borderWidth: 0, borderColor: 'transparent' }}
        activeTabStyle={{ backgroundColor: 'white', marginTop: 2,borderBottomWidth: 2, borderBottomColor: '#5cb85c' }}
        tabTextStyle={[styles.marginLR10,styles.colorGrey,styles.fontSize14,styles.fontWeight400]}
        activeTabTextStyle={[styles.colorGreen,styles.fontWeight500,styles.fontSize14]}
      />
      </ScrollView>
       );
    }
  }
export default Tabs;  