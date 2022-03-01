import React from 'react';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {

    let [fontsLoaded] = useFonts({
        Lato_400Regular
      });
    
      if(!fontsLoaded){
        return <AppLoading />;
      }

      return(
        <View style={styles.viewHeader}>
            <Text style={styles.textHeader}>App Tarefas</Text>
        </View>
      );

}

const styles = StyleSheet.create({

    viewHeader:{
        width:'95%',
        marginTop:10,
        marginBottom:10,
        marginLeft:'auto',
        marginRight:'auto',
        paddingTop:30,
        paddingBottom:30,
        height:100,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'#F3F3F3',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)'
    },

    textHeader:{
        textAlign:'center',
        fontFamily:'Lato_400Regular',
        color:'#31456A',
        fontSize:30
    },

    shadowWhite:{
        shadowOffset: {
            width: -6,
            height: -6
        },
        shadowColor:'white',
        shadowOpacity:0.7,
        shadowRadius:12
    },

    shadowGray:{
        shadowColor:'blue',
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity:0.4,
        shadowRadius:12
    }

});