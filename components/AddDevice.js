
import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_IP, SERVER_PORT, SERVER_URI, SONOFF_URL } from 'react-native-dotenv';
import { Text, View, Modal, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import styles from '../styles/AddDeviceStyles';

const m = Object.freeze({
  INSTRUCTIONS: 0,
  ENTER_CREDENTIALS: 1,
  SENDING_DATA: 2,
  CONNECT_TO_WIFI: 3,
  DONE: 4
});

let interval = 0;

class AddDevice extends Component {
  state = {
    message: m.INSTRUCTIONS,
    wifiNameInput: '',
    wifiPassInput: '',
    deviceId: 'device',
    deviceName: 'device'
  }

  componentWillReceiveProps = (props) => {
    if (props.addDeviceModalVisible) {
      interval = setInterval(() => {
        Axios.get(`${SONOFF_URL}/device`).then((resp) => {
          this.setState({
            deviceId: resp.data.deviceid,
            deviceName: resp.data.deviceid
          });
          clearInterval(interval);
          this.onDeviceWifiConnected();
        }).catch(() => { });
      }, 500);
    }
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
    this.sendDataToDevice();
  }

  sendDataToDevice = () => {
    Axios.post(`${SONOFF_URL}/ap`, {
      json: {
        version: 4,
        ssid: this.state.wifiNameInput,
        password: this.state.wifiPassInput,
        serverName: SERVER_IP,
        port: parseInt(SERVER_PORT, 10)
      }
    }).then(this.onDataSent)
      .catch(() => { });
  }

  onDataSent = () => {
    this.setState({
      message: m.CONNECT_TO_WIFI
    });
    interval = setInterval(() =>
      Axios.get(`${SERVER_URI}/devices`).then(() => {
        this.setState({
          message: m.DONE
        });
        clearInterval(interval);
      }).catch(() => { }), 1000);
  }

  getMessage = () => {
    switch (this.state.message) {
      case m.INSTRUCTIONS:
        return (
          <View>
            <Text style={styles.label}>{
      `1.  Turn on your Sonoff device.

2.  Press the button located on the device, for 5 seconds.

3.  Connect to the device's WiFi (starts with 'ITEAD-10', password 1-8).

4.  Go back here.`}
            </Text>
          </View>
        );
      case m.ENTER_CREDENTIALS:
        return (
          <View>
            <Text style={styles.label}>{`Connected to ${this.state.deviceId}.\n`}</Text>
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
      case m.CONNECT_TO_WIFI:
        return (
          <View>
            <Text style={styles.label}>
                Please connect to your home WiFi...
            </Text>
            <ActivityIndicator style={{ margin: '4%' }} size="large" color="white" />
          </View>
        );
      case m.DONE:
        return (
          <View>
            <Text style={styles.label}>
              {'You\'re All Set!\n\nYou may choose a new name:'}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={deviceNameInput => this.setState({ deviceName: deviceNameInput })}
              value={this.state.deviceName}
            />
            <Text style={styles.label}>
              Please connect back to your home WiFi.
            </Text>
          </View>);
      default:
        return <View />;
    }
  }

  onCancelClick = () => {
    this.setState({
      message: m.INSTRUCTIONS
    });
    clearInterval(interval);
    this.props.closeModal();
  }

  onDoneClick = () => {
    this.setState({
      message: m.INSTRUCTIONS
    });
    clearInterval(interval);
    this.props.createNewDevice(this.state.deviceId, this.state.deviceName);
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        visible={this.props.addDeviceModalVisible}
        animationType="slide"
        onRequestClose={this.cancel}
      >
        <View style={styles.container}>
          <View style={styles.headlineView}>
            <Text style={styles.headlineViewText}>Add New Device</Text>
          </View>
          <View style={styles.entry}>
            {this.getMessage()}
          </View>
          <View style={styles.footer}>
            {this.state.message === m.DONE ?
              <TouchableOpacity activeOpacity={0.5} onPress={this.onDoneClick}>
                <Text style={styles.footerText}>Done</Text>
              </TouchableOpacity> :
              <TouchableOpacity activeOpacity={0.5} onPress={this.onCancelClick}>
                <Text style={styles.footerText}>Cancel</Text>
              </TouchableOpacity>
          }
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddDevice;
