import { Font } from 'expo';
import Axios from 'axios';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import Device from './Device';
import AddDevice from './AddDevice';
import styles from '../styles/HomeScreenStyles';
import * as actions from '../actions/actions';

const typoFont = require('../resources/Typo_Round_Regular.otf');
const fontAwesome = require('../resources/FontAwesome.ttf');

class HomeScreen extends React.Component {
  state = {
    fontLoaded: false,
    addDeviceModalVisible: false
  };

  async componentWillMount() {
    const resp = await Axios.get('http://192.168.1.117:3000/devices/');
    this.props.dispatch(actions.getDevices(resp.data));

    await Font.loadAsync({
      typo: typoFont,
      FontAwesome: fontAwesome
    });

    this.setState({ fontLoaded: true });
  }

  onAddDeviceClick = () => {
    this.setState({
      addDeviceModalVisible: true
    });
  }

  onDeviceTrashClick = (deviceId) => {
    Alert.alert(
      'Sure?',
      'Are you sure you want to remove this device?',
      [
        { text: 'Yes', onPress: () => this.props.dispatch(actions.removeDevice(deviceId)) },
        { text: 'No' }
      ]
    );
  }

  closeModal = () => {
    this.setState({
      addDeviceModalVisible: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#ADEBF6' }}>
        <View style={{ flex: 2 }}>
          <View style={styles.container}>
            <View style={styles.headlineView}>
              {
              this.state.fontLoaded ? (
                <Text style={styles.headlineViewText}>Devices</Text>
              ) : null
              }
            </View>
          </View>
        </View>

        <View style={{ flex: 9 }}>
          {
            this.state.fontLoaded ? (
              <FlatList
                style={{ marginTop: '2%' }}
                data={this.props.devicesIds}
                renderItem={({ item }) => (<Device
                  deviceId={item.key}
                  onDeviceTrashClick={this.onDeviceTrashClick}
                  navigate={navigate}
                />)}
              />
            ) : null
          }
        </View>

        <View style={styles.addDeviceContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.onAddDeviceClick}>
            {
              this.state.fontLoaded ? (
                <Text style={styles.plusButton}>
                  <FontAwesome>{Icons.plusSquareO}</FontAwesome>
                </Text>
              ) : null
            }
          </TouchableOpacity>
        </View>

        <AddDevice
          addDeviceModalVisible={this.state.addDeviceModalVisible}
          closeModal={this.closeModal}
        />

      </View>
    );
  }
}

export default connect(state => ({
  devicesIds: state.devices.map(device => ({ key: device.id }))
}))(HomeScreen);
