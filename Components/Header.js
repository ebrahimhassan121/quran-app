import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ScreenHeaderStyle} from '../config/styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export function AppHeader(props) {
  const navigation = useNavigation();
  const {title, drawer, back, children} = props;
  return (
    <View style={ScreenHeaderStyle.headerStyle}>
      {drawer && (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <MaterialCommunityIcons
            name="menu"
            style={ScreenHeaderStyle.menuIcon}
          />
        </TouchableWithoutFeedback>
      )}
      {back && (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons
            name="arrow-left"
            style={ScreenHeaderStyle.menuIcon}
          />
        </TouchableWithoutFeedback>
      )}
      {children && <View style={{flex: 1}}>{children}</View>}
    </View>
  );
}
