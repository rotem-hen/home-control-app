export const getDevices = data => ({ type: 'GET_DEVICES', data });
export const toggleSwitchClick = deviceId => ({ type: 'TOGGLE_SWITCH_CLICK', data: { deviceId } });
export const changeDeviceName = (deviceId, newName) => ({ type: 'CHANGE_DEVICE_NAME', data: { deviceId, newName } });
export const removeDevice = deviceId => ({ type: 'REMOVE_DEVICE', data: { deviceId } });
export const settingsToggleSwitchClick = deviceId => ({ type: 'SETTINGS_TOGGLE_SWITCH_CLICK', data: { deviceId } });
export const timerTrashClick = (deviceId, id) => ({ type: 'TIMER_TRASH_CLICK', data: { deviceId, timerId: id } });
export const updateTimers = (deviceId, newTimers) => ({ type: 'UPDATE_TIMERS', data: { deviceId, newTimers } });
