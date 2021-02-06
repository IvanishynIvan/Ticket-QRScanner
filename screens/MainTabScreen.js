import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import CheckListScreen from './CheckListScreen';


const HomeStack = createStackNavigator();
const ScanStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen =() =>(
    <Tab.Navigator
      activeColor="#fff"
      barStyle={{ backgroundColor: '#009387' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Event',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStackScreen}
        options={{
          tabBarLabel: 'Scan',
          headerTitle: 'Scan',
          tabBarIcon: ({ color }) => (
            <AntDesign name="scan1" color={color} size={26} 
              onPress={() => navigation.navigate("EventsListScreen")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Checklist"
        component={CheckListScreen}
        options={{
          headerTitle: 'Checklist',
          tabBarLabel: 'Checklist',
          tabBarIcon: ({ color }) => (
            <MCIcons name="clipboard-list-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle : {
        backgroundColor: '#009387'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        headerTitle: 'Event',
      }} />
    </HomeStack.Navigator>
);

const ScanStackScreen = ({navigation}) => (
<ScanStack.Navigator screenOptions={{
  headerStyle : {
    backgroundColor: '#009387'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  } 
}}>
  <ScanStack.Screen name="Scan" component={ScanScreen} options={{
    headerTitle: 'Scan',
  }} />
</ScanStack.Navigator>
);