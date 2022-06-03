import React from 'react';
import {View,Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
const ForgotPassword=({navigtion})=>{
    return(
        <View style={styles.mainScreen}>
            <View style={styles.whiteBoard}>
                <View>
            <Text>Esqueceu a senha</Text>
            </View>
            <View>
                <TextInput placeholder='Email' placeholderTextColor='gray' style={{backgroundColor:'#eeeeee',borderRadius:10,marginLeft:'5%'}}>
                </TextInput>
            </View>
            <View style={styles.saveButtonDesign}>
                <Text>Enviar código</Text>
            </View>
            <View style={styles.hintText}>
                <Text>Voltar a </Text>
                <TouchableOpacity onPress={()=>navigtion.naviagte('Login')}>
                <Text style={{color:'green'}}>Página de Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lastButton}>
                <Text> Voltar a página inicial</Text>
            </View>
            </View>
        </View>
    )
}
export default ForgotPassword;
const styles=StyleSheet.create({
    mainScreen:{
        backgroundColor:'green',
        height:'100%',
        width:"100%"
    },
    whiteBoard:{
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:10,
        height:'50%',
        width:'90%',
        padding:10,
        marginTop:'35%'
    },
    saveButtonDesign:{
        backgroundColor:'green',
        padding:10
    },
    hintText:{
        flexDirection:'row',
        alignSelf:'center'
    },
    lastButton:{
        padding:10,
        borderWidth:1,
        borderColor:'black',
        width:'60%'
    }
})