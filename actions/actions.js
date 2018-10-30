import { SERVER_URI } from 'react-native-dotenv';
import Axios from 'axios';

export const getDevices = data => ({ type: 'GET_DEVICES', data });
export const addDevice = (deviceId, deviceName) => (dispatch) => {
  const newDevice = {
    id: deviceId,
    name: deviceName
  };
  Axios.post(`${SERVER_URI}/devices`, newDevice)
    .then(({ data }) => dispatch({ type: 'ADD_DEVICE_RESPONSE', data }));
};
export const toggleSwitchClick = deviceId => ({ type: 'TOGGLE_SWITCH_CLICK', data: { deviceId } });
export const changeDeviceName = (deviceId, newName) => ({ type: 'CHANGE_DEVICE_NAME', data: { deviceId, newName } });
export const removeDevice = deviceId => ({ type: 'REMOVE_DEVICE', data: { deviceId } });
export const settingsToggleSwitchClick = deviceId => ({ type: 'SETTINGS_TOGGLE_SWITCH_CLICK', data: { deviceId } });
export const timerTrashClick = (deviceId, id) => ({ type: 'TIMER_TRASH_CLICK', data: { deviceId, timerId: id } });
export const updateTimer = (deviceId, timerId, updatedData) => (dispatch) => {
  Axios.patch(`${SERVER_URI}/devices/${deviceId}/timers/${timerId}`, updatedData)
    .then(resp => dispatch({ type: 'UPDATE_TIMER_RESPONSE', data: { deviceId, timerId, resp } }))
    .catch(e => console.log(`Failed patching timer id ${timerId}\n${e.response.data.message}`));
};
export const addTimer = (deviceId, newTimer) => (dispatch) => {
  Axios.post(`${SERVER_URI}/devices/${deviceId}/timers`, newTimer)
    .then(resp => dispatch({ type: 'ADD_TIMER_RESPONSE', data: { resp, deviceId } }));
};
