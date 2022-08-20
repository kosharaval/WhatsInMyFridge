import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Inventory from '../screens/InventoryScreen';
import RecipeSearch from '../screens/RecipeSearchScreen';
import ShoppingList from '../screens/ShoppingListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddRecipt from '../screens/AddReciptScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import RecipeDetails from '../screens/RecipeDetails';
import LoginScreen from '../screens/LoginScreen';
import WishListScreen from '../screens/WishList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const InvetoryStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Inventory"
      component={Inventory}
    />
  </Stack.Navigator>
);

const RecipeSearchDetailStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RecipeSearch"
      component={RecipeSearch}
    />
    <Stack.Screen
      name="RecipeDetails"
      component={RecipeDetails}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Recipe Detail',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const FavoritesStack =({navigation})=> (

  <Stack.Navigator>
    <Stack.Screen
      name="WishListScreen"
      component={WishListScreen}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Your Favourites',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="RecipeDetails"
      component={RecipeDetails}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Recipe Detail',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AddNewReciptStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Add New Recipt"
      component={AddRecipt}
    />
  </Stack.Navigator>
);

const ShoppingListStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Shopping List"
      component={ShoppingList}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
    />
    <Stack.Screen
      name="Edit Profile"
      component={EditProfileScreen}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Edit Profile',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="Favourites"
      component={FavoritesStack}
      options={{
        headerShown:false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName="InventoryStack"
      activeColor="#fff"
      barStyle={{backgroundColor: 'tomato'}}
      screenOptions={{
        activeColor: '#2e64e5',
        tabBarStyle: {position: 'absolute'},
        headerShown: false
      }}>
      <Tab.Screen
        name="InventoryStack"
        component={InvetoryStack}
        options={{
          tabBarLabel: 'Inventory',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="playlist-edit"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchRecipeStack"
        component={RecipeSearchDetailStack}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: '#00A9FF',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNewReciptStack"
        component={AddNewReciptStack}
        options={{
          tabBarLabel: 'Add Recipt',
          tabBarColor: '#C94D4D',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingListStack"
        component={ShoppingListStack}
        options={{
          tabBarLabel: 'Shopping List',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cart-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#EB8092',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
