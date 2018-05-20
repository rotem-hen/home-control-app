
import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import styles from '../styles/AddDeviceStyles';

const m = Object.freeze({
  INSTRUCTIONS: 0,
  ENTER_CREDENTIALS: 1,
  SENDING_DATA: 2,
  DONE: 3
});

class AddDevice extends Component {
  state = {
    message: m.INSTRUCTIONS,
    wifiNameInput: '',
    wifiPassInput: ''
  }

  onSaveDeviceClick = () => {
    this.props.closeModal();
  }

  onDeviceWifiConnected = () => {
    this.setState({
      message: m.ENTER_CREDENTIALS
    });
  }

  onSendClick = () => {
    this.setState({
      message: m.SENDING_DATA
    });
  }

  onDataSent = () => {
    this.setState({
      message: m.DONE
    });
  }

  getMessage = () => {
    switch (this.state.message) {
      case m.INSTRUCTIONS:
        return (
          <View>
            <Text style={styles.label}>{
      `1.  Turn on device.
2.  Press button for 5 seconds.
3.  Connect to WiFi.
4.  Go back here.`}
            </Text>
          </View>
        );
      case m.ENTER_CREDENTIALS:
        return (
          <View>
            <Text style={styles.label}>Home WiFi Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={wifiNameInput => this.setState({ wifiNameInput })}
              value={this.state.wifiNameInput}
            />
            <Text style={styles.label}>Home WiFi Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={wifiPassInput => this.setState({ wifiPassInput })}
              value={this.state.wifiPassInput}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.onSendClick}
            >
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        );
      case m.SENDING_DATA:
        return (
          <View>
            <Text style={styles.label}>
                Sending data to the device...
            </Text>
            <ActivityIndicator style={{ margin: '4%' }} size="large" color="white" />
          </View>
        );
      case m.DONE:
        return (
          <View>
            <Text style={styles.label}>
              {'You\'re All Set!\n\nPlease connect to your home WiFi.'}
            </Text>
          </View>);
      default:
        return <View />;
    }
  }

  cancel = () => {
    this.setState({
      message: m.INSTRUCTIONS
    });
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        visible={this.props.addDeviceModalVisible}
        animationType="slide"
        onRequestClose={this.closeModal}
      >
        <View style={styles.container}>
          <View style={styles.headlineView}>
            <Text style={styles.headlineViewText}>Add New Device</Text>
          </View>
          <View style={styles.entry}>
            {this.getMessage()}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.cancel}>
              <Text style={styles.footerText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddDevice;
