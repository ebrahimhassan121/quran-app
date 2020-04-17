import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {AppHeader} from '../../Components/Header';
import {
  ScreenHeaderStyle,
  SingleSuraPageStyle,
  AyahStyle,
} from '../../config/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {ChangeActiveAyah} from '../../Redux/quran/action';
import AyatList from '../../Components/AyatList';
class SuragePage extends Component {
  render() {
    const ayats = this.props.activeAyats;
    const lastViewedAyah = this.props.lastViewed && this.props.lastViewed.ayah;
    const lastViewedSura = this.props.lastViewed && this.props.lastViewed.surah;
    return (
      <View style={{flex: 1}}>
        <AppHeader back>
          <View style={[ScreenHeaderStyle.subView]}>
            <Text style={[ScreenHeaderStyle.subViewText]}>
              {lastViewedSura &&
                `${lastViewedSura.number || ''}. ${
                  lastViewedSura.englishName || ''
                } `}
            </Text>
            <Ionicons name="md-arrow-dropdown" size={25} color="#fff" />
          </View>
        </AppHeader>
        <View style={SingleSuraPageStyle.secondHeader}>
          <Text style={SingleSuraPageStyle.secondHeaderText}>
            {lastViewedAyah
              ? `Juz ${lastViewedAyah.juz} Page ${lastViewedAyah.page} `
              : ''}
          </Text>
        </View>

        {ayats && (
          <View style={SingleSuraPageStyle.scrollContainer}>
            <AyatList realm_ayahs_Data={ayats} />
          </View>
        )}
      </View>
    );
  }
}
export default connect(
  (state) => {
    return {
      data: state.quran.data,
      activeAyats: state.quran.activeAyats,
      lastViewed: state.quran.lastViewed,
    };
  },
  (dispatch) => {
    return {
      ChangeActiveAyah,
      dispatch,
    };
  },
)(SuragePage);
