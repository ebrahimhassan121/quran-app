import {
  fetch_quran_loading,
  fetch_quran_success,
  fetch_quran_fail,
  changeActive,
  changeLastViewedAyah,
} from './types';

const initialState = {
  data: [],
  loading: false,
  activeAyats: [],
  lastViewed: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case fetch_quran_loading:
      return {...state, loading: true};
    case fetch_quran_success:
      return {data: action.payload, loading: false};
    case fetch_quran_fail:
      return {...state, loading: false};
    case changeActive:
      return {
        ...state,
        activeAyats: action.payload,
      };
    case changeLastViewedAyah:
      return {
        ...state,
        lastViewed: action.payload,
      };
    default:
      return state;
  }
};
