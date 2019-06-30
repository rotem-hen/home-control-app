import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#475059',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    paddingTop: '1%',
    paddingBottom: '10%'
  },
  nameText: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'typo',
    borderBottomWidth: 0
  },
  fa: {
    color: 'white',
    fontSize: 30
  },
  faDisabled: {
    color: 'grey',
    fontSize: 30
  },
  wifiImage: {
    height: '80%',
    width: '40%'
  }
});
