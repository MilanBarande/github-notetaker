import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Badge from './badge';
import Separator from '../helpers/separator';

type Props = {}; // TODO

class Profile extends Component<Props> {
  getRowTitle = (userInfo, item) => {
    const formattedItem = item === 'public_repos' ? item.replace('_', ' ') : item;
    return formattedItem[0] ? formattedItem[0].toUpperCase() + item.slice(1) : formattedItem;
  };
  render() {
    const { userInfo } = this.props;
    const { rowContainer, rowTitle, rowContent } = styles;
    console.log('userInfo', userInfo);
    const topicArray = [
      'company',
      'location',
      'followers',
      'following',
      'email',
      'bio',
      'public_repos'
    ];
    const list = topicArray.map((item, index) => {
      if (!userInfo[item]) {
        console.log(`item ${item} not found`);
        return <View key={index} />;
      }
      console.log(`item ${item} has been found`);
      return (
        <View key={item}>
          <View style={rowContainer}>
            <Text style={rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
            <Text style={rowContent}>{userInfo[item]}</Text>
          </View>
          <Separator />
        </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16,
    fontWeight: 'bold'
  },
  rowContent: {
    fontSize: 19
  }
});

export default Profile;
