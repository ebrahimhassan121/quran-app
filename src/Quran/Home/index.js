import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Sura from './Sura';
import Page from './Page';
import Juz from './Juz';
import Hizb from './Hizb';
import {
  TopTabsStyle,
  mainColor,
  primaryColor,
  disabledColor,
} from '../../../config/styles';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={TopTabsStyle.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[TopTabsStyle.Tab, isFocused && TopTabsStyle.activeTab]}>
            <Text style={[isFocused && TopTabsStyle.activeTabText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TopTabs() {
  return (
    <Tab.Navigator
      // initialRouteName="Juz"
      sceneContainerStyle={{backgroundColor: '#fff'}}
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Sura" component={Sura} />
      <Tab.Screen name="Page" component={Page} />
      <Tab.Screen name="Juz" component={Juz} />
      <Tab.Screen name="Hizb" component={Hizb} />
    </Tab.Navigator>
  );
}
