// @flow
import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';

type Props = {
  url: string
};

class WebViewComponent extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.props.url }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

export default WebViewComponent;
