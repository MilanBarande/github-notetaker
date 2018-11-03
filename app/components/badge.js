// @flow
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export type UserInfo = {}; // TODO: describe UserInfo

type Props = {
  userInfo: UserInfo
};

class Badge extends Component<Props> {
  render() {
    const { avatar_url, name, login } = this.props.userInfo;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: avatar_url }} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.handle}>{login}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default Badge;
