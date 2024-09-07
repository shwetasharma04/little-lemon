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
} from 'react-native';
import Images from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = ({navigation}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const onBoardingComplete = async () => {
    try {
      await AsyncStorage.setItem('onBoardingComplete', 'true');
      console.log(fname, lname);
      navigation.replace('ProfileScreen');
    } catch (error) {
      console.log('Error in saving', error);
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
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lname}
            onChangeText={setLname}
          />
        </View>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          disabled={!fname || !lname}
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
