import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Search from './pages/Search';
import HomeNavigator from './navigation/home';

const Tab = createMaterialBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator
      sceneAnimationEnabled
      initialRouteName="Home"
      activeColor="#1DB954"
      inactiveColor="#FFF"
      barStyle={{backgroundColor: '#000'}}>
      <Tab.Screen
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
        }}
        name="Home"
        component={HomeNavigator}
        initialParams={{anime: false}}
      />
      <Tab.Screen
        options={{
          title: 'Busca',
          tabBarIcon: ({color}) => (
            <Icon name="search" size={25} color={color} />
          ),
        }}
        name="Search"
        component={Search}
        initialParams={{anime: false}}
      />
    </Tab.Navigator>
  );
}

export default Routes;
