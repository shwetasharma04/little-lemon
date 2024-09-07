/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import BannerScreen from '../components/BannerScreen';
import FoodItem from '../components/FoodItem';
import { Image } from 'react-native-elements';

const HomeScreen = () => {

    const [data, setData] = useState([]);

   useEffect(() => {

    const fetchData = async () => {
        try {
          const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result.menu);

        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      fetchData();

   },[]);

    return(
        <View style = {{flex:1}}>
             <BannerScreen />
             <FlatList
                data={data}
                renderItem={({item}) => FoodItem(item)}
                ItemSeparatorComponent={<Image style = {{backgroundColor:'lightgray', height:1}}/>}
             />
        </View>
    );
};

export default HomeScreen;
