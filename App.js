import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import React from 'react';
import Header from './componentes/Header';
import Body from './componentes/Body';

export default function App() {
  console.disableYellowBox = true
  return (
    <ScrollView style={{flex:1, backgroundColor:'#F3F3F3'}}>
      <StatusBar hidden />
      <Header />
      <Body />
    </ScrollView>
  );
}
