// @flow
import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import Badge, { type UserInfo } from './badge';
import Separator from '../helpers/separator';
import WebViewComponent from '../helpers/webViewComponent';

type Repo = {}; // TODO

type Props = {
  userInfo: UserInfo,
  repos: Array<Repo>
};

class Repositories extends Component<Props> {
  openPage = url => {
    console.log('open this url:', url);
    this.props.navigator.push({
      component: WebViewComponent,
      title: 'WebViewComponent',
      passProps: { url }
    });
  };
  render() {
    const { repos, userInfo } = this.props;
    const list = repos.map((item, index) => {
      const { description, name, stargazers_count, html_url } = repos[index];
      const desc = description ? <Text style={styles.description}>{description}</Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={() => {
                this.openPage(html_url);
              }}
              underlayColor="transparent"
            >
              <Text style={styles.name}>{name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: {stargazers_count}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

export default Repositories;
