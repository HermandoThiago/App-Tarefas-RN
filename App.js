import { StatusBar } from 'expo-status-bar';
import { 
        StyleSheet, Text, View, ImageBackground, 
        TouchableOpacity, ScrollView, Modal, TouchableHighlight,
        Alert, TextInput,
        } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';

export default function App() {

  const image = { uri:'./resources/bg.jpg' };
  const [modal, setModal] = useState(true)

  const [Tarefas, setTarefa] = useState([
    {
      id: 1,
      tarefa: 'Minha tarefa n° 1'
    },
    {
      id: 2,
      tarefa: 'Minha outra tarefa'
    }
  ])

  function deletarTarefa(id){
    
    let newTarefa = Tarefas.filter((val) => {
      return val.id != id
    })

    setTarefa(newTarefa)

  }

  let [fontsLoaded] = useFonts({
    Lato_400Regular
  });

  if(!fontsLoaded){
    return <AppLoading />;
  }

  //<AntDesign name="minuscircleo" size={24} color="black" />

  return (
    <ScrollView style={{flex:1}}>
      <StatusBar hidden />

      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
        onRequestClose={()=>{
          Alert.alert("Modal has been closed.")
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.ModalView}>
            <TextInput autoFocus={true}></TextInput>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModal(!modal)
              }}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ImageBackground 
      source={image}
      style={styles.image}
      >
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Lista de Tarefas</Text>
        </View>
      </ImageBackground>

      {
        Tarefas.map((val) => {
          return(
            <View style={styles.TarefaSingle}>
              <View style={{flex:1, width:'100%', padding:10}}>
                <Text>{val.tarefa}</Text>
              </View>
              <View style={{alignItems:'flex-end', flex:1, padding:10}}>
                <TouchableOpacity onPress={() => deletarTarefa(val.id)}>
                  <AntDesign name="minuscircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image:{
    width:'100%',
    height:100,
  },
  textHeader:{
    color:'white',
    textAlign:'center',
    fontSize:20,
    fontFamily:'Lato_400Regular'
  },
  coverView:{
    width:'100%',
    height:85,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  TarefaSingle:{
    marginTop:30,
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'black',
    flexDirection:'row',
    paddingBottom:10
  },
  centeredView:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  ModalView:{
    margin: 20,
    backgroundColor:'white',
    borderRadius:20,
    padding:35,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height:0
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
    zIndex:5
  },
  openButton:{
    backgroundColor:"#F194FF",
    borderRadius:20,
    padding:10,
    elevation:2
  },
  textStyle:{
    color:'white',
    fontWeight:"bold",
    textAlign:"center"
  },
  modalText:{
    marginBottom:15,
    textAlign:"center"
  }
  
});
