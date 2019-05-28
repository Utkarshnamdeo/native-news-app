/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
// import App Center Analytics at the top of the file.
import Analytics from 'appcenter-analytics';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});
import DeviceInfo from 'react-native-device-info';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      msg: 'Original',
      deviceName: '',
      deviceId: ''
    };
  }

  componentDidMount() {
    this.checkAnalyticsStatus();
    this.getDeviceInfo();
  }

  getDeviceInfo() {
    const deviceName = DeviceInfo.getDeviceName();
    const deviceId = DeviceInfo.getUniqueID();
    this.setState({ deviceName, deviceId });
  }

  async checkAnalyticsStatus() {
    const analyticsStatus = await Analytics.setEnabled(true);
    console.log('Appcenter Analytics Status: ', analyticsStatus);
    console.log('device Id: ', this.state.deviceId);
  }

  change() {
    this.setState(
      {
        msg: this.state.msg === 'Changed' ? 'Original' : 'Changed'
      },
      () => {
        Analytics.trackEvent('Toggle message button clicked');
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <View style={styles.welcome}>
          <Text>
            This is group{' '}
            {this.state.deviceId === '1512b1779fef3ba0' ? 'B' : 'A'}
          </Text>
        </View>
        <View style={styles.instructions}>
          {this.state.deviceId === '1512b1779fef3ba0' ? (
            <Button
              title='Click to toggle message'
              onPress={this.change.bind(this)}
            />
          ) :null}
        </View>
        <View style={styles.instructions}>
          <Text>{this.state.msg}</Text>
          <Text>Device Name : {this.state.deviceName}</Text>
          <Text>Device Id : {this.state.deviceId}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
