import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {commonStyle} from '../config/styles';

export class ActivityIndictor extends Component {
  render() {
    return this.props.loading ? (
      <View style={commonStyle.activityIndicatorContainer}>
        <ActivityIndicator size="large" style={commonStyle.activityIndicator} />
      </View>
    ) : (
      <View />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.quran.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityIndictor);
