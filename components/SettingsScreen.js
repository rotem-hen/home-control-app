import FontAwesome, { Icons } from 'react-native-fontawesome';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import TimerEntry from './TimerEntry';
import Timer from './Timer';
import styles from '../styles/SettingsScreenStyles';
import * as actions from '../actions/actions';

const on3Image = require('../resources/on3.png');
const last3Image = require('../resources/last3.png');
const off3Image = require('../resources/off3.png');

const stateToImage = { on: on3Image, last: last3Image, off: off3Image };

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerModalVisible: false,
      currTimer: {}
    };
  }

  onToggleSwitchClick = () => {
    this.props.dispatch(actions.settingsToggleSwitchClick(this.props.deviceId));
  }

  onAddTimerClick = () => {
    this.setState({
      timerModalVisible: true,
      currTimer: {}
    });
  }

  onTimerTrashClick = (id) => {
    this.props.dispatch(actions.timerTrashClick(this.props.deviceId, id));
  }

  onEditTimerClick = (id) => {
    this.setState({
      timerModalVisible: true,
      currTimer: this.props.state.timers.find(elem => elem.id === id)
    });
  }

  closeModal = () => {
    this.setState({
      timerModalVisible: false,
      currTimer: {}
    });
  }

  saveTimer = (id, formattedDate, doSwitch, repeat) => {
    let newTimers = this.props.state.timers;
    const timerIndex = this.props.state.timers.findIndex(timer => timer.id === id);
    if (timerIndex === -1) {
      newTimers = [...newTimers, {
        do: { switch: doSwitch },
        at: formattedDate,
        type: repeat ? 'repeat' : 'once',
        id
      }];
    } else {
      newTimers[timerIndex] = {
        ...newTimers[timerIndex],
        do: { switch: doSwitch },
        at: formattedDate,
        type: repeat ? 'repeat' : 'once'
      };
    }

    this.props.dispatch(actions.updateTimers(this.props.deviceId, newTimers));

    this.closeModal();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.headlineView}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.backButton}>
                  <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 10 }}>
              <Text style={styles.headlineViewText}>
                {this.props.name}‘s Settings
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 7 }}>
          <View style={styles.entry}>
            <Text style={styles.label}>Firmware Version: {this.props.version}</Text>
          </View>

          <View style={[styles.entry, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={styles.label}>Initial State:</Text>
            <TouchableOpacity style={{ margin: '3%' }} activeOpacity={0.5} onPress={this.onToggleSwitchClick}>
              <Image source={stateToImage[this.props.state.startup]} />
            </TouchableOpacity>
          </View>

          <View style={[styles.entry, { justifyContent: 'space-between', height: '55%' }]}>
            <Text style={styles.label}>Timers</Text>
            {
              this.props.state.timers.length !== 0 ?
                <FlatList
                  data={this.props.state.timers}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (<TimerEntry
                    name={item.id}
                    onTimerTrashClick={this.onTimerTrashClick}
                    onEditTimerClick={() => this.onEditTimerClick(item.id)}
                  />)}
                /> :
                <Text style={styles.noTimers}>No Timers to Show</Text>
            }
            <View style={styles.addTimerContainer}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.onAddTimerClick}>
                <Text style={{ fontSize: 40, color: 'white' }}><FontAwesome>{Icons.plusSquareO}</FontAwesome></Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Timer
          timerModalVisible={this.state.timerModalVisible}
          onSaveClick={this.saveTimer}
          closeModal={this.closeModal}
          currTimer={this.state.currTimer}
        />
      </View>
    );
  }
}

export default connect((state, props) => {
  const { deviceId } = props.navigation.state.params;
  const device = state.devices.find(dev => dev.id === deviceId);
  return {
    name: device.name,
    deviceId,
    version: device.version,
    state: device.state
  };
})(SettingsScreen);
