// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import * as firebase from './firebase';
// import Registration from './screens/RegistrationScreen';
// import Welcome from './screens/WelcomeScreen';
// import Login from './screens/LoginScreen';
// import Home from './screens/HomeScreen';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Registration" component={Registration} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({});

// export default App;

import React from 'react';
import Providers from './navigation';

const App = () => {
  return <Providers />;
}

export default App;