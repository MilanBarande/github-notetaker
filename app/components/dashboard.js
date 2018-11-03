// @flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Profile from './profile';
import Repositories from './repositories';
import { api } from '../utils/api';
import Notes from '../helpers/notes';

class Dashboard extends Component {
  goToProfile = () => {
    this.props.navigator.push({
      title: 'Profile Page',
      component: Profile,
      passProps: { userInfo: this.props.userInfo }
    });
  };
  goToRepos = () => {
    api.getRepos(this.props.userInfo.login).then(res => {
      this.props.navigator.push({
        title: 'Repositories',
        component: Repositories,
        passProps: { userInfo: this.props.userInfo, repos: res }
      });
    });
  };
  goToNotes = () => {
    const { userInfo } = this.props;
    api.getNotes(userInfo.login).then(res => {
      const data = res || {};
      this.props.navigator.push({
        component: Notes,
        title: 'Notes',
        passProps: {
          notes: data,
          userInfo
        }
      });
    });
  };

  makeBackground = button => {
    const styleObject = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };
    if (button === 0) {
      styleObject.backgroundColor = '#48BBEC';
    } else if (button === 1) {
      styleObject.backgroundColor = '#E77AAE';
    } else {
      styleObject.backgroundColor = '#758BF4';
    }
    return styleObject;
  };
  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: userInfo.avatar_url }} style={styles.image} />
        <TouchableHighlight
          onPress={this.goToProfile}
          underlayColor="#88D4F5"
          style={this.makeBackground(0)}
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToRepos}
          underlayColor="#88D4F5"
          style={this.makeBackground(1)}
        >
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToNotes}
          underlayColor="#88D4F5"
          style={this.makeBackground(2)}
        >
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default Dashboard;
