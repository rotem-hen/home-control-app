import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from '../styles/DeviceStyles';
import * as actions from '../actions/actions';

const offImage = require('../resources/off.png');
const offDisabledImage = require('../resources/offDisabled.png');
const onImage = require('../resources/on.png');
const onDisabledImage = require('../resources/onDisabled.png');
const wifi0 = require('../resources/wifi0.png');
const wifi1 = require('../resources/wifi1.png');
const wifi2 = require('../resources/wifi2.png');
const wifi3 = require('../resources/wifi3.png');
const wifi4 = require('../resources/wifi4.png');

const wifiIcons = [wifi0, wifi1, wifi2, wifi3, wifi4];
const rssiSignalMap = [{ start: 0, end: -30, signal: 4 },
  { start: -31, end: -60, signal: 3 },
  { start: -61, end: -90, signal: 2 },
  { start: -91, end: -Infinity, signal: 1 }];

class Device extends React.Component {
  normalizeSignal = (rssi) => {
    if (!this.state.isOnline) return 0;
    const i = rssiSignalMap.findIndex(e => _.inRange(rssi, e.start, e.end));
    return i !== undefined ? rssiSignalMap[i].signal : 0;
  }

  state = {
    deviceName: this.props.name,
    rssi: this.props.rssi,
    isOnline: this.props.isOnline,
    wifiStrength: 0
  }

  componentWillMount = () => {
    this.setState({
      wifiStrength: this.normalizeSignal(this.state.rssi)
    });
  }

  onToggleSwitchClick = () => this.props.dispatch(actions.toggleSwitchClick(this.props.deviceId));

  onSettingsClick = () => this.props.navigate('Settings', { deviceId: this.props.deviceId });

  changeDeviceNameInDB = _.debounce((newName) => {
    this.props.dispatch(actions.changeDeviceName(this.props.deviceId, newName));
  }, 1000);

  changeDeviceName = (newName) => {
    this.setState({ deviceName: newName });
    if (newName.length > 0) this.changeDeviceNameInDB(newName);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 5, alignItems: 'center' }}>
          {
            (this.state.isOnline) ?
              <TouchableOpacity activeOpacity={0.5} onPress={this.onToggleSwitchClick}>
                <Image source={this.props.toggleSwitch === 'off' ? offImage : onImage} />
              </TouchableOpacity> :
              <Image source={this.props.toggleSwitch === 'off' ? offDisabledImage : onDisabledImage} />
          }
        </View>

        <View style={{ flex: 12 }}>
          <TextInput
            style={styles.nameText}
            onChangeText={this.changeDeviceName}
            value={this.state.deviceName}
          />
        </View>

        <View style={{ flex: 8 }}>

          <View style={{ flex: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.wifiImage} source={wifiIcons[this.state.wifiStrength]} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.onDeviceTrashClick(this.props.deviceId)}
              >
                <Text style={styles.fa}><FontAwesome>{Icons.trashO}</FontAwesome></Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity
                disabled={!this.state.isOnline}
                activeOpacity={0.5}
                onPress={this.onSettingsClick}
              >
                <Text style={!this.state.isOnline ? styles.faDisabled : styles.fa}>
                  <FontAwesome>{Icons.cog}</FontAwesome>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
    );
  }
}

export default connect((state, props) => {
  const device = state.devices.find(item => item.id === props.deviceId);
  return {
    name: device.name,
    toggleSwitch: device.state.switch,
    rssi: device.state.rssi,
    isOnline: device.isOnline
  };
})(Device);
