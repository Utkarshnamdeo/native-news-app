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

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      msg: 'Original'
    };
  }

  componentDidMount() {
    this.checkAnalyticsStatus();
  } 

  async checkAnalyticsStatus()  {
    const analyticsStatus = await Analytics.setEnabled(true);
    console.log('Appcenter Analytics Status: ', analyticsStatus);
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
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <View style={styles.instructions}>
          <Button
            title='Click to toggle message'
            onPress={this.change.bind(this)}
          />
        </View>
        <View style={styles.instructions}>
          <Text>{this.state.msg}</Text>
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
