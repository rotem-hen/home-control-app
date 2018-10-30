import { Font } from 'expo';
import Axios from 'axios';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Text, View, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { SERVER_URI } from 'react-native-dotenv';
import Device from './Device';
import AddDevice from './AddDevice';
import styles from '../styles/HomeScreenStyles';
import * as actions from '../actions/actions';

const typoFont = require('../resources/Typo_Round_Regular.otf');
const fontAwesome = require('../resources/FontAwesome.ttf');

class HomeScreen extends React.Component {
  state = {
    refreshing: false,
    fontLoaded: false,
    addDeviceModalVisible: false
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
    this.setState({ refreshing: false });
  }

  async componentWillMount() {
    this.fetchData();

    await Font.loadAsync({
      typo: typoFont,
      FontAwesome: fontAwesome
    });

    this.setState({ fontLoaded: true });
  }

  async fetchData() {
    const resp = await Axios.get(`${SERVER_URI}/devices/`)
      .catch(e => console.log(`Failed getting devices\n${e}`));

    this.props.dispatch(actions.getDevices(resp.data));
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

  createNewDevice = (deviceId, deviceName) => {
    this.props.dispatch(actions.addDevice(deviceId, deviceName));
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
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
              }
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
          createNewDevice={this.createNewDevice}
        />

      </View>
    );
  }
}

export default connect(state => ({
  devicesIds: state.devices.map(device => ({ key: device.id }))
}))(HomeScreen);
