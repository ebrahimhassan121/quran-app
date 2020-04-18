import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RE, {
  GetSurahs,
  SurahSchemaName,
  GetJuzs,
  GetJuzByJuzNumber,
} from '../../../db';
import {SuraPageStyle, JuzListStyle} from '../../../config/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import unistring from 'unistring';
import {connect} from 'react-redux';
import {changeActive} from '../../../Redux/quran/types';
import {ChangeJuzData} from '../../../Redux/quran/action';
class Juz extends Component {
  renderItemComp = ({item, index}) => {
    return (
      <TouchableOpacity
        key={'Juza' + index}
        onPress={async () => {
          this.props.navigation.navigate('SuraPage');
          this.props.changeActive({index: index + 1, type: 'juz'}); // fix slow navigation
        }}
        style={JuzListStyle.JuzaItemContainer}>
        <Text style={JuzListStyle.JuzaItem}>{`Juza ${index + 1}`}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <ScrollView>
          {[...Array(30)].map((v, index) =>
            this.renderItemComp({item: null, index}),
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {
      data: state.quran.data,
      lastViewed: state.quran.lastViewed,
    };
  },
  (dispatch) => {
    return {
      changeActive: (active) => dispatch({type: changeActive, payload: active}),
    };
  },
)(Juz);
