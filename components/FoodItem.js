import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';

const  FoodItem = (props)  => {

    const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${props.image}?raw=true`;
    console.log(imageUrl);
  return (
    <View>
        <View style = {styles.container}> 
            <View style = {styles.itemContainer}>
                <Text style = {styles.title}>{props.name}</Text>
                <Text style = {styles.description}>The famous greek salad of cryspy lattuce, peppers, olives and our chicago</Text>
                <Text style = {styles.price}>{'$' + props.price}</Text>
            </View>
            <Image style = {styles.image} source={{uri:imageUrl}}/>
        </View>
      <Image style = {styles.searchIcon} />

    </View>
  );
}
const styles = StyleSheet.create({

   container:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    itemContainer:{
        width:'70%',
    },
    title:{
        fontSize:20,
        color: 'black',
        margin:10,
        fontWeight:'bold',
    },
    price:{
        fontSize:20,
        color: 'gray',
        margin:10,
        fontWeight:'bold',
    },
    description:{
        fontSize:16,
        color: 'gray',
        margin:10,
    },
    image:{
        width:100,
        height:100,
        borderRadius:5,
        borderStyle:'solid',
        marginRight:10,
        marginTop:20,
    },
});

export default FoodItem;