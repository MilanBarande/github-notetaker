// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import Dashboard from './dashboard';

import { api } from '../utils/api';

type Props = {};

type State = {
  username: string,
  isLoading: boolean,
  error: boolean | string
};

class Main extends Component<Props, State> {
  state = {
    username: '',
    isLoading: false,
    error: false
  };

  handleChange = event => {
    this.setState({ username: event.nativeEvent.text });
  };

  handleSubmit = () => {
    this.setState({ isLoading: true });
    api
      .getBio(this.state.username)
      .then(res => {
        if (res.message === 'Not found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          });
        } else {
          this.props.navigator.push({
            title: res.name || 'Select an option',
            component: Dashboard,
            passProps: { userInfo: res }
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
      })
      .catch(err => console.log('Error on Promise resolution of handleSubmit:', err));
  };

  render() {
    const { error, isLoading } = this.state;
    const showError = error ? <Text>{error}</Text> : <View />;
    const showLoader = isLoading ? <ActivityIndicator size="large" color="#111" /> : <View />;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Github user</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor="white">
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        {showLoader}
        {showError}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default Main;
