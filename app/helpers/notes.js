// @flow
import React, { Component } from 'react';
import { View, Text, ListView, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { api } from '../utils/api';
import Badge, { type UserInfo } from '../components/badge';
import Separator from './separator';

type Props = {
  userInfo: UserInfo,
  notes: Object // TODO
};

type State = {
  dataSource: any, // TODO
  note: string,
  error: string
};

class Notes extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    };
  }

  handleChange = event => {
    this.setState({
      note: event.nativeEvent.text
    });
  };

  handleSubmit = () => {
    const { login } = this.props.userInfo;
    const { note } = this.state;
    this.setState({ note: '' });
    api
      .addNote(login, note)
      .then(() => {
        api.getNotes(login).then(res => {
          this.setState({
            dataSource: this.ds.cloneWithRows(res)
          });
        });
      })
      .catch(err => {
        console.warning('Error on note submit: ', err);
        this.setState({ error: err });
      });
  };

  footer = () => (
    <View style={styles.footerContainer}>
      <TextInput
        style={styles.searchInput}
        value={this.state.note}
        onChange={this.handleChange}
        placeholder="New note"
      />
      <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor="#88D4A5">
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableHighlight>
    </View>
  );

  renderRow = rowData => (
    <View>
      <View style={styles.rowContainer}>
        <Text>{rowData}</Text>
      </View>
      <Separator />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo} />}
        />

        {this.footer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default Notes;
