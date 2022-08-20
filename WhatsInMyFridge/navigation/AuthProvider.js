import React, {createContext, useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
              firestore().collection('Users')
              .where('userId', auth().currentUser.uid)
              .get()
              .then(querySnapshot => {
                        
              })
            });
          } catch (e) {
            console.log(e);
          }
        },
        register: async (userName,email, password,phone) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              firestore().collection('Users')
              .add({
                  createdOn: firestore.Timestamp.fromDate(new Date()),
                  email: email,
                  fullName: userName,
                  password: password,
                  phone: phone,
                  profilePic: 'user profile image',
                  updatedOn: firestore.Timestamp.fromDate(new Date()),
                  userId: auth().currentUser.uid,
                                    
              })
              .then(()=>{
                console.log('User Added!');
              })
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
            })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};