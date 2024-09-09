/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Images from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dbInstance from './Database';

const db = dbInstance.initDB(); // Initialize the DB

const OnBoardingScreen = ({navigation}) => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');

  const onBoardingComplete = async () => {
    try {
      await AsyncStorage.setItem('onBoardingComplete', 'true');
      console.log(fname, email);
      saveProfile();
      navigation.replace('ProfileScreen');
    } catch (error) {
      console.log('Error in saving', error);
    }
  };

  const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          sql,
          params,
          (tx, result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };

  const saveProfile = () => {

    if(db){
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Profile (firstName, email) 
          VALUES (?, ?)`,
          [fname, email ],
          () => {
            console.log('Profile saved successfully');
          },
          error => {
            console.log('Error saving profile: ', error);
          }
        );
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Image style={styles.img} source={Images.little_lemon_image} />
        <Text style={styles.headerText}>LITTLE LEMON</Text>
      </View>
      <View style={styles.mainView}>
        <Text style={styles.text}>Let us get to know you</Text>
        <View style={styles.inputView}>
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={fname}
            onChangeText={setFname}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          disabled={!fname || !email}
          style={styles.buttonNext}
          onPress={() => {
            onBoardingComplete();
          }}>
          <Text style={{fontSize: 20}}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  headerView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  mainView: {
    flex: 6,
    backgroundColor: 'lightgray',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomView: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputView: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 60,
    marginRight: 10,
  },
  headerText: {
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderRadius: 5,
    borderStyle: 'solid',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    fontSize: 18,
  },
  buttonNext: {
    backgroundColor: 'lightgray',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
  },
});
