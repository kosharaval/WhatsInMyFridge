import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, Button,Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    return (
        <Onboarding
            onSkip={()=>navigation.replace("Login")}
            onDone={()=>navigation.replace("Login")}
            pages={[
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/circle.jpg')} />,
                title: 'Sreen1',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/square.jpg')} />,
                title: 'Screen2',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/triangle.jpg')} />,
                title: 'Screen3',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
        ]}
        />
    )
}

const styles = StyleSheet.create({})
