import React, {Component, PureComponent, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AyahStyle, SingleSuraPageStyle} from '../../config/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import unistring from 'unistring';
import {GetSurahByAyahNumber} from '../../db';

const RenderSuraHead = ({ayah}) => {
  /* wroted to fix slow updating useing redux */
  const [surah, set_surah] = useState();
  useEffect(() => {
    GetSurahByAyahNumber(ayah.number).then((surah) => {
      set_surah(surah);
    });
  }, []);
  if (!surah) return <View />;
  return (
    <View style={SingleSuraPageStyle.suraNameContainer}>
      <Text style={SingleSuraPageStyle.suraNameText}>{surah.name}</Text>
      <Text style={SingleSuraPageStyle.suraNameText}>
        {surah.englishNameTranslation}
      </Text>
      <View style={SingleSuraPageStyle.revelationTypeContainer}>
        <FontAwesome5Icon
          color="gray"
          size={30}
          name={
            surah.revelationType === 'Meccan' ? 'kaaba' : 'mosque'
          }></FontAwesome5Icon>
        <Text>{`Ayhas ${surah.ayahs.length}`}</Text>
      </View>
    </View>
  );
};
export default class RenderItem extends PureComponent {
  render() {
    const {ayah, index} = this.props;
    return (
      <View key={'ayah' + ayah.number}>
        {(ayah.numberInSurah == 1 || index == 0) && (
          <RenderSuraHead ayah={ayah} />
        )}
        <View
          style={[
            AyahStyle.AyahContainer,
            index % 2 == 0 && AyahStyle.AyahContainerBackground,
          ]}>
          <View style={[AyahStyle.AyahNumberContainer]}>
            <Text>{ayah.numberInSurah}</Text>
            <MaterialCommunityIcons
              size={20}
              name="dots-horizontal"
              color="black"
            />
          </View>
          <Text style={AyahStyle.AyahText}>
            {unistring(ayah.text).toString()}
          </Text>
        </View>
      </View>
    );
  }
}
