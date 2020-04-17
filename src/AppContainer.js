import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Quran from './Quran';
import States from './States';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  AppContainerstyles,
  meduimFont,
  smallFont,
  largeFont,
} from '../config/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SuragePage from './SuragePage';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={AppContainerstyles.bottomTapcontainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const Icon = options.tabBarIcon ? options.tabBarIcon : View;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={AppContainerstyles.bottomTabStyle}>
              <Icon />
              <Text
                style={
                  isFocused
                    ? AppContainerstyles.bottomTabTextStyleActive
                    : AppContainerstyles.bottomTabTextStyle
                }>
                {label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Quran"
        component={Quran}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              color={'white'}
              size={largeFont}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={States}
        options={{
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="chart" color={'white'} size={largeFont} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // initialRouteName="SuraPage"
        drawerType="slide"
        drawerContent={() => <View />}>
        <Drawer.Screen name="Main" component={AppTabs} />
        <Drawer.Screen
          name="SuraPage"
          key="SuraPage"
          component={SuragePage}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default AppDrawer;
