// @flow
import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS } from 'react-native';
import Main from './app/components/main';

type Props = {};

export default class githubNotetaker extends Component<Props> {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: 'Github Notetaker'
        }}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});
