import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../assets/styles/global';
import Card from '../components/Card';

export default function ItemDetailsScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
        <Card>
          <Text style={globalStyles.titleText}>
            { navigation.getParam('title') }
          </Text>
          <Text>{ navigation.getParam('body') }</Text>
          <Text>{ navigation.getParam('rating') }</Text>
        </Card>
      </View>
    )
}

const styles = StyleSheet.create({})
