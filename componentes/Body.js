import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableHighlight, Alert, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Body(){

    
    const [modal, setModal] = useState(false)
    const [tarefaAtual, setTarefaAtual] = useState('')
    const [Tarefas, setTarefas] = useState([])

    useEffect(() => {

        (async () => {
            try{
                let tarefasAtual = await AsyncStorage.getItem('Tarefas');
                if(tarefasAtual == null)
                    setTarefas([]);
                else
                    setTarefas(JSON.parse(tarefasAtual));
                
            } catch (error){
                
            }
        })();
    },[])

    function deletarTarefa(id){
        
        let newTarefa = Tarefas.filter((val) => {
        return val.id != id
        })

        setTarefas(newTarefa);

        (async () => {
            try{
                await AsyncStorage.setItem('Tarefas', JSON.stringify(newTarefa))
                console.log('chamado')
            } catch(error){
                // Error saving data
            }
        })()

    }

    function addTarefa(){
        setModal(!modal);

        let id = 0
        if(Tarefas.length > 0){
            id = Tarefas[Tarefas.length-1].id + 1;
        }

        let tarefa = { id:id, tarefa:tarefaAtual };

        setTarefas([...Tarefas,tarefa]);

        (async () => {
            try{
                await AsyncStorage.setItem('Tarefas', JSON.stringify([...Tarefas,tarefa]))
            } catch(error){
                // Error saving data
            }
        })();

        setTarefaAtual('');

    }

    

    return(
        <View>
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
                    <TextInput style={styles.modalInput} onChangeText={text => setTarefaAtual(text)} autoFocus={true}></TextInput>

                    <TouchableHighlight
                    style={{...styles.openButton, backgroundColor: '#2196F3'}}
                    onPress={()=>addTarefa()}
                    >
                    <Text style={styles.textStyle}>Adicionar Tarefa</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>

            <View>
                <TouchableOpacity style={styles.addButton} onPress={()=>setModal(true)}>
                    <Text style={styles.textButton}>Adicionar Tarefa</Text>
                </TouchableOpacity>
            </View>

            {
                Tarefas.map((val) => {
                return(
                    <View style={styles.TarefaSingle}>
                        <View style={styles.textView}>
                            <Text style={{fontSize:15}}>{val.tarefa}</Text>
                        </View>
                        <View style={styles.deleteButton}>
                            <TouchableOpacity onPress={()=>deletarTarefa(val.id)}>
                            <AntDesign name="minuscircleo" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                })
            }

        </View>
    );

}

const styles = StyleSheet.create({
    modalInput:{
        backgroundColor:'blue',
        width:200,
        height:45,
        marginBottom:10,
        borderRadius:20,
        paddingLeft:15,
        backgroundColor:'rgba(0,0,0,0.1)'
    },  
    addButton:{
        width:'95%',
        backgroundColor:'#31456A',
        marginLeft:'auto',
        marginRight:'auto',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:15,
        paddingBottom:20,
        borderRadius:20
    },
    textButton:{
        color:'white',
        fontSize:18
    },
    TarefaSingle:{
        marginTop:10,
        width:'95%',
        marginLeft:'auto',
        marginRight:'auto',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        borderRadius:20,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
      },
    textView:{
        width:'75%',
        padding:20
    },  
    deleteButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#DD3838',
        width:'25%',
        height:'100%',
        borderRadius:20 
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

})