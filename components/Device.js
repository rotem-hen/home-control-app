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

class Device extends React.Component {
  state = {
    deviceName: this.props.name,
    wifiStrength: 4
  }

  componentDidMount = () => setInterval(this.setWifiStrength, 3000);

  onToggleSwitchClick = () => this.props.dispatch(actions.toggleSwitchClick(this.props.deviceId));

  onSettingsClick = () => this.props.navigate('Settings', { deviceId: this.props.deviceId });

  setWifiStrength = () => this.setState({ wifiStrength: _.random(0, 4) });

  isOnline = () => this.state.wifiStrength !== 0;

  changeDeviceNameInDB = _.debounce((newName) => {
    this.props.dispatch(actions.changeDeviceName(this.props.deviceId, newName));
  }, 1000);

  changeDeviceName = (newName) => {
    if (newName.length < 1) return;
    this.setState({ deviceName: newName });
    this.changeDeviceNameInDB(newName);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 5, alignItems: 'center' }}>
          {
            (this.isOnline()) ?
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
                disabled={!this.isOnline()}
                activeOpacity={0.5}
                onPress={this.onSettingsClick}
              >
                <Text style={!this.isOnline() ? styles.faDisabled : styles.fa}>
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
    toggleSwitch: device.state.switch
  };
})(Device);
