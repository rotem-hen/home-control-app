import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADEBF6',
    justifyContent: 'space-between'
  },
  headlineView: {
    backgroundColor: '#F77A54',
    alignItems: 'center',
    marginTop: '15%'
  },
  headlineViewText: {
    fontSize: 25,
    color: '#475059',
    margin: '3%',
    fontFamily: 'typo'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '12%',
    backgroundColor: '#F77A54'
  },
  footerText: {
    fontSize: 30,
    color: '#475059',
    fontFamily: 'typo'
  },
  label: {
    color: 'white',
    margin: '4%',
    fontSize: 23,
    fontFamily: 'typo'
  },
  entry: {
    backgroundColor: '#475059',
    marginTop: '3%'
  },
  days: {
    fontFamily: 'typo',
    fontSize: 20,
    color: 'white'
  },
  selectedDays: {
    fontFamily: 'typo',
    fontSize: 20,
    color: '#A1B600'
  },
  disabledDays: {
    fontFamily: 'typo',
    fontSize: 20,
    color: 'grey'
  }
});
