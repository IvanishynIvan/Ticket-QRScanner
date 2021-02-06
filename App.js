
import React, { useEffect, useContext } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './screens/MainTabScreen';
import EventsListScreen from './screens/EventsListScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const App = () => {


  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN' :
        return {
          ... prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);
  
  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e) {
          console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT'});
      
    },
  }), []);
  

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);
  //const {signOut} = useContext(AuthContext);
 
  
  if ( loginState.isLoading ) {
    return(
      <View style={{flex:1, justifyContext:'center', alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
    
    <NavigationContainer>
      { loginState.userToken != null ? (
        <Stack.Navigator initialRouteName="EventsListScreen" screenOptions={{
            headerStyle : {
              backgroundColor: '#009387'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'  
            }
          }}>
              <Stack.Screen name="Home" component={MainTabScreen} 
                      options={{
                        headerTitle: 'Some event'}}/>
              <Stack.Screen name="EventsListScreen" component={EventsListScreen} 
                      options={{
                        headerTitle: 'List of events',
                        headerLeft: () => (
                          <TouchableOpacity
                          onPress={() => {(authContext.signOut())}}
                          >
                            <MaterialCommunityIcons style={{
                              marginLeft:20
                                  }}
                                    name="logout"
                                    color='white'
                                    size={23}
                                  />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                          <TouchableOpacity
                          onPress={() => {}}
                          >
                            <MaterialCommunityIcons style={{
                              marginRight:25
                                  }}
                                    name="update"
                                    color='white'
                                    size={25}
                                  />
                            </TouchableOpacity>
                        ),
                      }}/>
        </Stack.Navigator>
      )
    :
      <RootStackScreen/>
  }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
