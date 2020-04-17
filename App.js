import React from 'react';
import AppContainer from './src/AppContainer';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import Store from './Redux/index';
import ActivityIndictor from './Components/ActivityIndictor';
import {commonStyle} from './config/styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let oldRender = Text.render;
    Text.render = function (...args) {
      let origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [
          {
            fontFamily: 'KufiBold',
            fontWeight: 'bold',
          },
          origin.props.style,
        ],
      });
    };
  }
  render() {
    return (
      <Provider store={Store}>
        <View style={commonStyle.container}>
          <AppContainer />
          <ActivityIndictor />
        </View>
      </Provider>
    );
  }
}
