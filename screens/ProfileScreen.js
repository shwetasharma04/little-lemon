import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

let db;

let base64Encoded = '';

const ProfileScreen = () => {

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [checkedState, setCheckedState] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const handleCheckboxPress = key => {
    setCheckedState({
      ...checkedState,
      [key]: !checkedState[key],
    });
  };
  const convertImageToBase64 = (imageUri) => {
    RNFS.readFile(imageUri, 'base64')
      .then(base64String => {
       base64Encoded = base64String;  // Save Base64 string to SQLite
      })
      .catch(error => {
        console.log('Error converting image to base64: ', error);
      });
  };
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        convertImageToBase64(imageUri);
        setSelectedImage(imageUri);
      }
    });
  };

  useEffect(() => {
    const openDatabaseAndCreateTable = () => {
      db = SQLite.openDatabase(
        { name: 'profileDB', location: 'default' },
        () => {
          console.log('Database opened successfully');
          if(db){
            createTable(); // Call createTable after database is opened
            getProfile();
          }
        },
        error => {
          console.log('Error opening database: ', error);
        }
      );
    };
    openDatabaseAndCreateTable();
  }, []);

  const createTable = () => {

    if(db !== null){

      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT,lastName TEXT, email TEXT, phone TEXT, image TEXT)',
          [],
          () => {
            console.log('Table created successfully');
          },
          error => {
            console.log('Error in creating table: ', error);
          }
        );
      });
    }
  };

  const getProfile = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Profile',  // Query to fetch all data from the Profile table
        [],  // No parameters
        (tx, results) => {
          // Success callback function when query execution is successful
          console.log('Query completed:', results);
  
          // Check if there are rows (profile data)
          if (results.rows.length > 0) {
            const profileData = results.rows.item(0);  // Get the first profile
             setFName(profileData.firstName);
              setLName(profileData.lastName);
              setEmail(profileData.email);
              setPhone(profileData.phone);
              base64Encoded = profileData.image;
              setSelectedImage(`data:image/png;base64,${base64Encoded}`);
            } else {
            console.log('No profile found');
          }
        },
        error => {
          // Error callback if the query fails
          console.log('Error fetching profile:', error);
        }
      );
    });
  };

  const saveProfile = () => {

    if(db){
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Profile (firstName, lastName, email, phone, image) 
          VALUES (?, ?, ?, ?, ?)`,
          [fname, lname, email, phone, base64Encoded],
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Personal Information</Text>
        <View style={styles.innerView}>
          <View style={styles.avtarContainer}>
            <Image style={styles.avtar} source={{uri:selectedImage}}/>
            <TouchableOpacity style={styles.btnChange} onPress={openImagePicker}>
              <Text>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRemove} onPress={() => {setSelectedImage(null)}}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={fname}
              onChangeText={setFName}
            />
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lname}
              onChangeText={setLName}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType={'email-address'}
            />
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType={'phone-pad'}
            />
            <Text style={styles.text}>Email Notification</Text>
            <CheckBox
              label="Order Statuses"
              isChecked={checkedState.option1}
              onPress={() => handleCheckboxPress('option1')}
            />
            <CheckBox
              label="Password Changes"
              isChecked={checkedState.option2}
              onPress={() => handleCheckboxPress('option2')}
            />
            <CheckBox
              label="Special Offers"
              isChecked={checkedState.option3}
              onPress={() => handleCheckboxPress('option3')}
            />
            <CheckBox
              label="News Letter"
              isChecked={checkedState.option4}
              onPress={() => handleCheckboxPress('option4')}
            />

            <TouchableOpacity style={styles.logoutButton}>
              <Text >Logout</Text>
            </TouchableOpacity>
            <View style={styles.bottomView}>
              <TouchableOpacity style={styles.btnRemove}>
                <Text>Discard Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnChange}>
                <Text onPress={saveProfile}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  avtarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerView: {
    justifyContent: 'center',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures content takes full scrollable space
  },
  avtar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'red',
    borderColor: 'black',
    marginRight: 20,
  },
  btnChange: {
    height: 40,
    backgroundColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'green',
    marginRight: 20,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnRemove: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    marginRight: 20,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderStyle: 'solid',
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    fontSize: 18,
  },
  logoutButton: {
    width: '90%',
    height: 35,
    backgroundColor: 'yellow',
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {},
});
