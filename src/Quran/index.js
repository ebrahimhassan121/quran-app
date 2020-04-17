import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
const Stack = createStackNavigator();
import {AppHeader} from '../../Components/Header';
import {connect} from 'react-redux';
import {getData, lastViewedAyahs} from '../../Redux/quran/action';
import Splash from 'react-native-splash-screen';
import SuragePage from '../SuragePage';
class MyStack extends Component {
  componentDidMount() {
    this.props.getData();
    this.props.lastViewedAyahs();
    Splash.hide();
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: (props) => <AppHeader drawer {...props} />,
          }}
        />
        <Stack.Screen
          name="SuraPage"
          component={SuragePage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

const MapDisToProps = {getData, lastViewedAyahs};
export default connect(null, MapDisToProps)(MyStack);
