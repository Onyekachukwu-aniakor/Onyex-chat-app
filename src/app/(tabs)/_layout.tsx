import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import {Ionicons} from '@react-native-vector-icons/ionicons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.onSurfaceVariant,
      tabBarStyle: {
        backgroundColor: Colors.surfaceLowest,
        borderTopColor: Colors.surfaceHigh,
        borderTopWidth: 1,
        height : 80,
        paddingBottom: 4,
        paddingTop: 1,
        marginBottom: 20
      },
      tabBarLabelStyle :{
        fontSize : 15,
        fontWeight: '600',
      }
    }}>
      <Tabs.Screen name='index' options={{title:'Messages',
        tabBarIcon : ({color, focused})=>(
          <Ionicons color={color}  name={focused? 'chatbubble' : 'chatbubble-outline'} size={22}/>
        )
      }}  />
      <Tabs.Screen name='search' options={{title: 'Search', tabBarIcon : ({color, focused})=>(
          <Ionicons color={color}  name={focused? 'search' : 'search-outline'} size={22}/>
        )}}  />
      <Tabs.Screen name='profile'  options={{title: 'Profile', tabBarIcon : ({color, focused})=>(
          <Ionicons color={color}  name={focused? 'person' : 'person-outline'} size={22}/>
        )}} />
    </Tabs>
  )
}