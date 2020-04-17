import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RE, {GetSurahs, SurahSchemaName} from '../../../db';
import {SuraPageStyle} from '../../../config/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import unistring from 'unistring';
import {connect} from 'react-redux';
import {changeActive} from '../../../Redux/quran/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class Sura extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    this.getAll();
  }
  getAll = async () => {
    let data = await GetSurahs();
    this.setState({data: data});
  };
  renderItemComp = ({item, index}) => {
    return (
      <TouchableOpacity
        key={'surah' + index}
        onPress={async () => {
          this.props.navigation.navigate('SuraPage');
          this.props.changeActive(item.ayahs);
        }}>
        <View style={SuraPageStyle.itemContainer}>
          <Text style={SuraPageStyle.itemContainerNum}>{index + 1}</Text>
          <View style={SuraPageStyle.itemSubContainer}>
            <View style={SuraPageStyle.TextContainer}>
              <Text style={[SuraPageStyle.itemHeadText]}>
                {item.englishName}
              </Text>
              <Text style={[SuraPageStyle.itemSubText]}>
                {item.englishNameTranslation}
              </Text>
            </View>
            {
              <FontAwesome5
                color="gray"
                size={15}
                style={SuraPageStyle.TextContainer}
                name={
                  item.revelationType === 'Meccan' ? 'kaaba' : 'mosque'
                }></FontAwesome5>
            }
            <Text
              style={[
                SuraPageStyle.TextContainer,
                SuraPageStyle.itemHeadText,
                {textAlign: 'right'},
              ]}>
              {unistring(item.name.split(' ').slice(1).join(' ')).toString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <ScrollView>
          {this.props.lastViewed && this.props.lastViewed.surah && (
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                borderRadius: 5,
                padding: 5,
                backgroundColor: '#eee',
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                color="gray"
                size={25}
                style={{marginHorizontal: 10}}
              />
              <Text>{`last read :${this.props.lastViewed.surah.englishName} ${this.props.lastViewed.ayah.page} : ${this.props.lastViewed.ayah.numberInSurah}`}</Text>
            </View>
          )}
          {this.props.data.map((item, index) =>
            this.renderItemComp({item, index}),
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
      changeActive: (ayat) => dispatch({type: changeActive, payload: ayat}),
    };
  },
)(Sura);
