// import { applyMiddleware, createStore } from 'redux';
import { createStore } from 'redux';
import Axios from 'axios';
// import logger from 'redux-logger';
import update from 'immutability-helper';

const defaultState = {
  devices: []
};

const updateState = (newData, index) => {
  const { id } = newData.devices[index];
  Axios.patch(`http://192.168.1.117:3000/devices/${id}`, newData.devices[index]);
};

const handleActions = (state = defaultState, action) => {
  let newData;
  let index;
  let timerIndex;
  if (action.data && action.data.deviceId) {
    index = state.devices.findIndex(dev => dev.id === action.data.deviceId);
    if (action.data.timerId) {
      timerIndex = state.devices[index].state.timers.findIndex(t => t.id === action.data.timerId);
    }
  }

  switch (action.type) {
    case 'GET_DEVICES':
      newData = update(state, { devices: { $set: action.data } });
      return newData;

    case 'REMOVE_DEVICE':
    {
      const { id } = state.devices[index];
      newData = update(state, { devices: { $splice: [[index, 1]] } });
      Axios.delete(`http://192.168.1.117:3000/devices/${id}`);
      return newData;
    }

    case 'TOGGLE_SWITCH_CLICK':
      newData = update(state, { devices: { [index]: { state: { switch: { $apply: s => (s === 'on' ? 'off' : 'on') } } } } });
      break;

    case 'CHANGE_DEVICE_NAME':
      newData = update(state, { devices: { [index]: { name: { $set: action.data.newName } } } });
      break;

    case 'SETTINGS_TOGGLE_SWITCH_CLICK':
    {
      const toggleStates = ['on', 'last', 'off'];
      newData = update(
        state,
        {
          devices: {
            [index]: {
              state: { startup: { $apply: s => toggleStates[(toggleStates.indexOf(s) + 1) % 3] } }
            }
          }
        }
      );
      break;
    }

    case 'TIMER_TRASH_CLICK':
      newData = update(
        state,
        { devices: { [index]: { state: { timers: { $splice: [[timerIndex, 1]] } } } } }
      );
      break;

    case 'UPDATE_TIMERS':
      newData = update(
        state,
        { devices: { [index]: { state: { timers: { $set: action.data.newTimers } } } } }
      );
      break;

    default:
      return state;
  }

  updateState(newData, index);
  return newData;
};

const store = createStore(handleActions);

export default store;
