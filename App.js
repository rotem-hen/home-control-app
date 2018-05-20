import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import store from './stores/configureStore';

const Nav = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen }
  },
  { headerMode: 'hidden' },
);

class App extends React.Component {
  render() {
    return <Provider store={store}><Nav /></Provider>;
  }
}

export default App;
