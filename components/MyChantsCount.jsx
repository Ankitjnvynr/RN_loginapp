import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons'; // Grouped imports for icons
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../components/helper/colors';
import {
  chantHistory,
  getcurrentcountStatus,
  liveChants,
  setPreviousChant,
  targetChantData
} from '../../redux/actions';
import Constants from '../components/utills.js/Constants';
import { useTranslation } from '../components/utills.js/translation-hook';
import { ms } from 'react-native-size-matters';
// Assuming you have a Loader component, import it.
import Loader from '../components/Loader';

const MyChantsCount = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { Translation, handleLoader, isLoading } = useTranslation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState(0);
  const [modalPickerVisible, setModalPickerVisible] = useState(false);
  const [localImage, setLocalImage] = useState('');
  const [localImagePath, setLocalImagePath] = useState('');

  const previousChant = useSelector(state => state.AppReducers.previousChant); // Fixed typo
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  useEffect(() => {
    if (isFocused && previousChant) {
      setNumber(parseInt(previousChant.count));
    } else {
      setNumber(0);
      dispatch(setPreviousChant(null));
    }
  }, [isFocused, previousChant]);

  const requestPermission = async (type) => {
    let permissionResult;
    if (type === 'camera') {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else if (type === 'gallery') {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (!permissionResult.granted) {
      alert(`Permission to access ${type} is required!`);
      return false;
    }
    return true;
  };

  const handleCamera = async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
      setLocalImagePath(result.assets[0]);
      setModalPickerVisible(false);
    }
  };

  const handleGallery = async () => {
    const hasPermission = await requestPermission('gallery');
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
      setLocalImagePath(result.assets[0]);
      setModalPickerVisible(false);
    }
  };

  const onSubmit = () => {
    if (!localImagePath || !localImagePath.uri) {
      alert('Please select an image first.');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var formData = new FormData();
    formData.append("id", previousChant?.id);
    formData.append("count", number);
    formData.append('photo', {
      uri: localImagePath.uri,
      name: localImagePath.fileName || 'photo.jpg', // Added fallback for name
      type: localImagePath.type || 'image/jpeg', // Added fallback for type
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    handleLoader(true);
    fetch(`${Constants.BASE_URL}events-history/update`, requestOptions)
      .then(response => response.text())
      .then(result => {
        handleLoader(false);
        dispatch(setPreviousChant(null));
        navigation.navigate('MyChantsHistory');
      })
      .catch(error => {
        handleLoader(false);
        console.error('Error:', error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading && <Loader />} {/* Ensure Loader component is available */}

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          {localImage && <Image source={{ uri: localImage }} style={styles.bigImageContainer} />}
          {/* Counter and Form */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigImageContainer: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default MyChantsCount;
