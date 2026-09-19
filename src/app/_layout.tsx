import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import '../global.css'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
//import * as SplashScreen  from "expo-splash-screen";

//SplashScreen.preventAutoHideAsync()
/* Makes the native splash screen (configured in app.json) remain visible until hideAsync is called.Important note: It is recommended to call this in global scope without awaiting, rather than inside React components or hooks, because otherwise this might be called too late, when the splash screen is already hidden. */

function AuthGuard(){
const {isSignedIn} = {isSignedIn : true}

if(!isSignedIn){
  return <Redirect href='/(auth)'/>
}else if (isSignedIn){
  return <Redirect href='/(tabs)'/>
}
}


export default function RootLayout() {
  return <GestureHandlerRootView>
  <AuthGuard/>
  <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen  name="(auth)"/>
    <Stack.Screen  name="(tabs)"/>
    <Stack.Screen  name="chat/[id]" options={{animation: 'slide_from_right'}}/>
  </Stack>
  <StatusBar  style="dark"/>
  </GestureHandlerRootView>;
}
