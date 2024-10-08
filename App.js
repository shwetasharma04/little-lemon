/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import { Button } from 'react-native-elements';
import dbInstance from './screens/Database';


const Stack = createNativeStackNavigator();

function App(){

  const [isOnBoardingComplete, setIsOnBoardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

      dbInstance.initDB(); // This will initialize the DB and create the tables

      const checkOnBoardingStatus = async () => {

          try {

              const onBoardingStatus =  await AsyncStorage.getItem('onBoardingComplete');

              if(onBoardingStatus === 'true'){

                  setIsOnBoardingComplete(true);
              }else{
                  setIsOnBoardingComplete(false);

              }
          } catch (error) {
              console.error('Error checking onboarding status:', error);
          } finally {

              setIsLoading(false);

          }
      };

      checkOnBoardingStatus();
  },[]);

  if (isLoading) {
      // Show splash screen while loading
      return <SplashScreen />;
    }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isOnBoardingComplete ? 'ProfileScreen' : 'OnBoardingScreen'}>
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{headerShown:false}} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={({ navigation }) => ({
            title: 'Profile',
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('HomeScreen')}
                title="Back"
              />
            ),
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
