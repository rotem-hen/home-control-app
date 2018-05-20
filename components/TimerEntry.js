import React from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/TimerEntryStyles';

class TimerEntry extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.text}><FontAwesome>{Icons.clockO}</FontAwesome></Text>
        </View>

        <View style={{ flex: 6 }}>
          <Text style={styles.text}>{this.props.name}</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.props.onEditTimerClick}>
            <Text style={styles.text}><FontAwesome>{Icons.edit}</FontAwesome></Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.onTimerTrashClick(this.props.name)}
          >
            <Text style={styles.text}><FontAwesome>{Icons.trashO}</FontAwesome></Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default TimerEntry;
