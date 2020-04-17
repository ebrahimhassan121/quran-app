import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {AppHeader} from '../Header';
import {
  ScreenHeaderStyle,
  SingleSuraPageStyle,
  AyahStyle,
} from '../../config/styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import RenderItem from './RenderItem';
import {ChangeActiveAyah} from '../../Redux/quran/action';
import {changeLastViewedAyah} from '../../Redux/quran/types';
import {GetSurahByAyahNumber} from '../../db/index';
import {ActivityIndictor} from '../ActivityIndictor';
class AyatList extends Component {
  UpdateLastActiveAyah = async (activeAyah) => {
    GetSurahByAyahNumber(activeAyah.number).then((Sura) => {
      this.props.dispatch({
        type: changeLastViewedAyah,
        payload: {
          surah: Sura,
          ayah: activeAyah,
          number: activeAyah.number,
        },
      });
    });
  };
  onViewableItemsChanged = ({viewableItems, changed}) => {
    let activeAyah = viewableItems.filter((e) => e.isViewable == true);
    activeAyah = activeAyah[activeAyah.length - 1];
    if (!activeAyah || !activeAyah.item) return;
    this.UpdateLastActiveAyah(activeAyah.item);
  };
  async componentDidMount() {
    if (!this.props.realm_ayahs_Data) return;
    this.UpdateLastActiveAyah(this.props.realm_ayahs_Data[0]);
  }
  render() {
    const props = this.props;
    const {realm_ayahs_Data} = props;
    if (!realm_ayahs_Data || realm_ayahs_Data.length < 1) {
      return <ActivityIndictor />;
    }
    return (
      <View style={SingleSuraPageStyle.scrollContainer}>
        <FlatList
          data={realm_ayahs_Data}
          renderItem={({item, index}) => (
            <RenderItem ayah={item} index={index} />
          )}
          // onEndReachedThreshold={50}
          onViewableItemsChanged={this.onViewableItemsChanged}
          // viewabilityConfig={{
          //   itemVisiblePercentThreshold: 100,
          // }}
          keyExtractor={(item, index) => `ayah ${item.number}`}
          // removeClippedSubviews={true}
        />
      </View>
    );
  }
}
export default connect(
  (state) => {
    return {
      data: state.quran.data,
      active: state.quran.active,
      lastViewed: state.quran.lastViewed,
    };
  },
  (dispatch) => {
    return {
      ChangeActiveAyah,
      dispatch,
    };
  },
)(AyatList);
