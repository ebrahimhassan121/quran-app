import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {AppHeader} from '../../Components/Header';
import {ScreenHeaderStyle, SingleSuraPageStyle} from '../../config/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {ChangeActiveAyah} from '../../Redux/quran/action';
import AyatList from '../../Components/AyatList';
import {GetSurahs, GetJuzByJuzNumber} from '../../db';
class SuragePage extends Component {
  state = {
    ayaht: [],
  };
  handlePerformanceLoad = async () => {
    const {index, type} = this.props.activeAyats;
    switch (type) {
      case 'surah':
        GetSurahs().then((result) => {
          this.setState({ayaht: result[index].ayahs});
        });
        break;
      case 'juz':
        GetJuzByJuzNumber(index).then((result) => {
          this.setState({ayaht: result});
        });
      default:
        break;
    }
  };
  async componentDidMount() {
    setTimeout(this.handlePerformanceLoad, 0);
  }
  render() {
    const lastViewedAyah = this.props.lastViewed && this.props.lastViewed.ayah;
    const lastViewedSura = this.props.lastViewed && this.props.lastViewed.surah;

    return (
      <View style={{flex: 1}}>
        <AppHeader back>
          {this.state.ayaht.length > 0 && (
            <View style={[ScreenHeaderStyle.subView]}>
              <Text style={[ScreenHeaderStyle.subViewText]}>
                {lastViewedSura &&
                  `${lastViewedSura.number || ''}. ${
                    lastViewedSura.englishName || ''
                  } `}
              </Text>
              <Ionicons name="md-arrow-dropdown" size={25} color="#fff" />
            </View>
          )}
        </AppHeader>
        {this.state.ayaht.length > 1 && (
          <View style={SingleSuraPageStyle.secondHeader}>
            <Text style={SingleSuraPageStyle.secondHeaderText}>
              {lastViewedAyah
                ? `Juz ${lastViewedAyah.juz} Page ${lastViewedAyah.page} `
                : ''}
            </Text>
          </View>
        )}

        <View style={SingleSuraPageStyle.scrollContainer}>
          <AyatList realm_ayahs_Data={this.state.ayaht} />
        </View>
      </View>
    );
  }
}
export default connect(
  (state) => {
    return {
      loading: state.quran.loading,
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
