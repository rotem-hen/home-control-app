import { createStore, applyMiddleware } from 'redux';
import Axios from 'axios';
import update from 'immutability-helper';
import thunk from 'redux-thunk';
import { SERVER_URI } from 'react-native-dotenv';

const defaultState = {
  devices: []
};

const updateState = (id, newData) => {
  Axios.patch(`${SERVER_URI}/devices/${id}`, newData)
    .catch(e => console.log(`Failed patching device id ${id}\n${e.response.data.message}`));
};

const handleActions = (state = defaultState, action) => {
  let newData;
  let deviceID;
  let deviceIndex;
  let timerID;
  let timerIndex;
  let temp;
  if (action.data && action.data.deviceId) {
    deviceID = action.data.deviceId;
    deviceIndex = state.devices.findIndex(dev => dev.id === deviceID);
    if (action.data.timerId) {
      timerID = action.data.timerId;
      timerIndex = state.devices[deviceIndex].state.timers
        .findIndex(timer => timer.id === timerID);
    }
  }

  switch (action.type) {
    case 'GET_DEVICES':
      newData = update(state, { devices: { $set: action.data } });
      return newData;

    case 'REMOVE_DEVICE':
    {
      newData = update(state, { devices: { $splice: [[deviceIndex, 1]] } });
      Axios.delete(`${SERVER_URI}/devices/${deviceID}`)
        .catch(e => console.log(`Failed removing ${newData.devices[deviceIndex].name}\n${e}`));
      return newData;
    }

    case 'ADD_DEVICE_RESPONSE':
      newData = update(state, { devices: { $push: [action.data] } });
      return newData;
    case 'TOGGLE_SWITCH_CLICK':
      temp = state.devices[deviceIndex].state.switch === 'on' ? 'off' : 'on';
      newData = update(state, { devices: { [deviceIndex]: { state: { switch: { $set: temp } } } } });
      updateState(newData.devices[deviceIndex].id, { state: { switch: temp } });
      break;

    case 'CHANGE_DEVICE_NAME':
      temp = action.data.newName;
      newData = update(state, { devices: { [deviceIndex]: { name: { $set: temp } } } });
      updateState(deviceID, { name: temp });
      break;

    case 'SETTINGS_TOGGLE_SWITCH_CLICK':
    {
      const toggleStates = ['on', 'keep', 'off'];
      temp = toggleStates[(toggleStates.indexOf(state.devices[deviceIndex].state.startup) + 1) % 3];
      newData = update(state, { devices: { [deviceIndex]: { state: { startup: { $set: temp } } } } });
      updateState(deviceID, { state: { startup: temp } });
      break;
    }

    case 'TIMER_TRASH_CLICK':
      newData = update(
        state,
        { devices: { [deviceIndex]: { state: { timers: { $splice: [[timerIndex, 1]] } } } } }
      );
      Axios.delete(`${SERVER_URI}/devices/${deviceID}/timers/${timerID}`)
        .catch(e => console.log(`Failed deleting timer id ${timerID}\n${e.response.data.message}`));
      break;

    case 'ADD_TIMER_RESPONSE':
      newData = update(
        state,
        { devices: { [deviceIndex]: { state: { timers: { $push: [action.data.resp.data] } } } } }
      );
      return newData;
    case 'UPDATE_TIMER_RESPONSE':
      temp = action.data.updatedData;
      newData = update(
        state,
        { devices: { [deviceIndex]: { state: { timers: { [timerIndex]: { $set: action.data.resp.data } } } } } }
      );

      break;

    default:
      return state;
  }

  return newData;
};

const store = createStore(
  handleActions,
  applyMiddleware(thunk)
);

export default store;

