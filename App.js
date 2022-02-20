import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from "react-native";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Init } from './src/store/actions';

import { store } from './src/store';
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import VerificationScreen from "./src/screens/VerificationScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  )
} 

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const RootNavigation = () => {

  const token = useSelector(state => state.AuthReducers.accessToken);
  console.log(token);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setLoading(false);
  }

  useEffect(() => {
    init()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={"blue"} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {
        token === null ?
          <AuthStack/> : <MainStack/>
      }
    </NavigationContainer>
  )
}

function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  )
}

export default App;