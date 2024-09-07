import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';

export default function BannerScreen() {

  const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true`;
  console.log(imageUrl);
  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>Little Lemon</Text>
      <Text style = {styles.location}>Chicago</Text>
      <View style={styles.desContainer}>
        <Text style = {styles.description}>We are a family owned mediterranean restorant, focused on traditional recipes served with a modern twist</Text>
        <Image style = {styles.image} source={{uri:imageUrl}}/>
      </View>
      <Image style = {styles.searchIcon} />

    </View>
  );
}
const styles = StyleSheet.create({

    container:{
        backgroundColor:'darkgreen',
    },
    desContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    title:{
        fontSize:35,
        color: 'yellow',
        margin:10,
    },
    location:{
        fontSize:20,
        color: 'white',
        margin:10,
    },
    description:{
        fontSize:16,
        color: 'white',
        margin:10,
        width:'50%'
    },
    image:{
        width:150,
        height:150,
        borderRadius:5,
        borderStyle:'solid',
        marginRight:10
    },
    searchIcon:{
        width:50,
        height:50,
    },

});