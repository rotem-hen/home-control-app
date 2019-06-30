
import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Text, View, Modal, DatePickerIOS, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import _ from 'lodash';
import DateConversion from './DateConversion';
import styles from '../styles/TimerStyles';

const offImage = require('../resources/off.png');
const onImage = require('../resources/on.png');

const dateConversion = new DateConversion();

class Timer extends Component {
  state = {
    id: '',
    chosenDate: new Date(),
    doSwitch: 'on',
    repeat: false,
    days: []
  }

  componentWillReceiveProps = (props) => {
    const t = props.currTimer;
    const isNew = _.isEmpty(t);

    this.setState({
      id: isNew ? '' : t.id,
      chosenDate: isNew ? new Date() : dateConversion.processDateFormat(t.at),
      doSwitch: isNew ? 'on' : t.do.switch,
      repeat: isNew ? false : t.type === 'repeat',
      days: isNew ? [] : dateConversion.cronFormatToDays(t.at)
    });
  }

  onToggleSwitchClick = () => {
    this.setState({
      doSwitch: this.state.doSwitch === 'off' ? 'on' : 'off'
    });
  }

  onSaveTimerClick = () => {
    if (this.state.repeat && _.isEmpty(this.state.days)) {
      Alert.alert(
        'No Days',
        'No days were chosen.',
        [
          { text: 'OK' }
        ]
      );
      return;
    }
    this.props.onSaveClick(
      this.state.id,
      dateConversion.processDateObj(this.state.repeat, this.state.chosenDate, this.state.days),
      this.state.doSwitch,
      this.state.repeat
    );
  }

  onRepeatClick = () => {
    this.setState({
      days: this.state.repeat ? [] : this.state.days,
      repeat: !this.state.repeat
    }, () => {
      this.updateDate(this.state.chosenDate);
    });
  }

  onDayClick = (id) => {
    if (!this.state.repeat) return;
    const newDays = this.state.days;
    if (newDays.length === _.pull(newDays, id).length) {
      newDays.push(id);
    }
    this.setState({
      days: newDays.sort()
    });
  }

  getDaysStyle = (item) => {
    if (!this.state.repeat) {
      return styles.disabledDays;
    }
    return _.indexOf(this.state.days, item.key) > -1 ? styles.selectedDays : styles.days;
  }

  updateDate = (date) => {
    const today = new Date();
    this.setState({
      chosenDate: this.state.repeat ?
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          date.getHours(),
          date.getMinutes()
        ) :
        date
    });
  }

  render() {
    return (
      <Modal
        visible={this.props.timerModalVisible}
        animationType="slide"
        onRequestClose={this.closeModal}
      >
        <View style={styles.container}>
          <View style={styles.headlineView}>
            <Text style={styles.headlineViewText}>Set a Timer</Text>
          </View>

          <View style={styles.entry}>
            <DatePickerIOS
              date={this.state.chosenDate}
              onDateChange={this.updateDate}
            />
          </View>

          <View style={[styles.entry, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={styles.label}>Turn:</Text>
            <TouchableOpacity style={{ margin: '4%' }} activeOpacity={0.5} onPress={this.onToggleSwitchClick}>
              <Image source={this.state.doSwitch === 'off' ? offImage : onImage} />
            </TouchableOpacity>
          </View>

          <View style={[styles.entry, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={styles.label}>Repeat?</Text>
            <TouchableOpacity style={{ margin: '4%' }} activeOpacity={0.5} onPress={this.onRepeatClick}>
              <Text style={{ fontSize: 40, color: 'white' }}>
                {
                    this.state.repeat ?
                      <FontAwesome>{Icons.checkSquareO}</FontAwesome> :
                      <FontAwesome>{Icons.squareO}</FontAwesome>
                  }
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.entry, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
            <FlatList
              horizontal
              data={[
                      { key: '0', title: 'Sun' },
                      { key: '1', title: 'Mon' },
                      { key: '2', title: 'Tue' },
                      { key: '3', title: 'Wed' },
                      { key: '4', title: 'Thu' },
                      { key: '5', title: 'Fri' },
                      { key: '6', title: 'Sat' }
                    ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ margin: 10 }}
                  activeOpacity={0.5}
                  onPress={() => this.onDayClick(item.key)}
                >
                  <Text style={this.getDaysStyle(item)}>
                    {item.title}
                  </Text>
                </TouchableOpacity>)}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.onSaveTimerClick}>
              <Text style={styles.footerText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.props.closeModal}>
              <Text style={styles.footerText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Timer;
