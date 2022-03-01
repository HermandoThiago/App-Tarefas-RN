import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import React from 'react';
import Header from './componentes/Header';
import Body from './componentes/Body';

export default function App() {

  //<AntDesign name="minuscircleo" size={24} color="black" />

  return (
    <ScrollView style={{flex:1, backgroundColor:'#F3F3F3'}}>
      <StatusBar hidden />
      <Header />
      <Body />
    </ScrollView>
  );
}
