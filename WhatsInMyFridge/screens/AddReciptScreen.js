import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

const AddReciptScreen = () => {
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const [category, setCategory] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [expiryFlag, setExpiryFlag] = useState(null);
  const [itemName, setItemName] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    firestore()
      .collection('Inventory')
      .add({
        category: category,
        expiryDate: firestore.Timestamp.fromDate(new Date()),
        expiryFlag: false,
        itemName: itemName,
        purchaseDate: firestore.Timestamp.fromDate(new Date()),
        quantity: quantity,
        userId: user.uid,
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Item Added to Inventory'
        );
        setPost(null);
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={styles.container}>
        <InputWrapper>
          <FormInput
            labelValue={itemName}
            onChangeText={itemName => setItemName(itemName)}
            placeholderText="Item Name"
            iconType="food"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={category}
            onChangeText={category => setCategory(category)}
            placeholderText="Category"
            iconType="fridge"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <FormInput
            labelValue={quantity}
            onChangeText={quantity => setQuantity(quantity)}
            placeholderText="Quantity"
            iconType="weight-pound"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {image != null ? <AddImage source={{uri: image}} /> : null}
          {uploading ? (
            <StatusWrapper>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </StatusWrapper>
          ) : (
            <SubmitBtn onPress={submitPost}>
              <SubmitBtnText>Upload</SubmitBtnText>
            </SubmitBtn>
          )}
        </InputWrapper>
        <ActionButton buttonColor="#2e64e5">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Take Photo"
            onPress={takePhotoFromCamera}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Photo"
            onPress={choosePhotoFromLibrary}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </SafeAreaView>
  );
};

export default AddReciptScreen;

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    marginBottom: 40,
    marginTop: -50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
