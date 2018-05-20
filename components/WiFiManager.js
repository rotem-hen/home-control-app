import { NativeModules } from 'react-native';

const { IOSWifiManager } = NativeModules;

export const wifiConnect = ssid => IOSWifiManager.connectToSSID(ssid);
export const wifiConnectProtected = (ssid, password, isWep) =>
  IOSWifiManager.connectToProtectedSSID(ssid, password, isWep);
export const wifiDisconnect = ssid => IOSWifiManager.disconnectFromSSID(ssid);
export const wifiCurrentSSID = () => IOSWifiManager.currentSSID();
export const wifiSettingsURL = IOSWifiManager.settingsURL;
