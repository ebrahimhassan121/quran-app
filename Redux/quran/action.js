import Axios from 'axios';
import {
  fetch_quran_loading,
  fetch_quran_success,
  fetch_quran_fail,
  changeLastViewedAyah,
  changeActive,
} from './types';
import Realm, {
  InsertQuranData,
  GetSurahs,
  InsertLastViewedAyah,
  GetlastViewedAyah,
  GetJuzByJuzNumber,
} from '../../db';
export const getData = () => {
  return async (dispatch) => {
    dispatch({type: fetch_quran_loading});
    if (!Realm.empty) {
      const realmObj = await GetSurahs();
      dispatch({type: fetch_quran_success, payload: realmObj});
      return;
    }
    Axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani')
      .then(async (result) => {
        await InsertQuranData(result.data.data.surahs);
        const realmObj = await GetSurahs();
        dispatch({type: fetch_quran_success, payload: realmObj});
      })
      .catch((error) => {
        dispatch({type: fetch_quran_fail});

        console.log(error);
      });
  };
};

export const ChangeJuzData = (juzNum) => {
  return async (dispatch) => {
    dispatch({type: changeActive, payload: []});
    GetJuzByJuzNumber(juzNum).then((JuzData) => {
      dispatch({type: changeActive, payload: JuzData});
    });
  };
};
export const ChangeActiveAyah = (ayah) => {
  return async (dispatch) => {
    if (!ayah || !ayah.number) return;
    await InsertLastViewedAyah(ayah.number);
    dispatch(lastViewedAyahs());
  };
};

export const lastViewedAyahs = () => {
  return async (dispatch) => {
    let lsViewedData = await GetlastViewedAyah();
    dispatch({type: changeLastViewedAyah, payload: lsViewedData});
  };
};
