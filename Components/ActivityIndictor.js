import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {commonStyle} from '../config/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getData} from '../Redux/quran/action';

export class ActivityIndictor extends Component {
  render() {
    if (!this.props.loading && this.props.data && this.props.data.length < 1) {
      return (
        <View style={[commonStyle.loadFailContainer]}>
          <MaterialIcons name="warning" style={commonStyle.loadFailIcon} />
          <Text>Failed to load quran </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.getData();
            }}
            style={commonStyle.reloadDataButton}>
            <Text style={commonStyle.reloadDataText}>Press to Reload Data</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
  data: state.quran.data,
});

const mapDispatchToProps = {getData};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityIndictor);
