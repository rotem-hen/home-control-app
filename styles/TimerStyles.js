import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADEBF6',
    justifyContent: 'space-between'
  },
  headlineView: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#F77A54',
    justifyContent: 'center',
    marginTop: 50
  },
  headlineViewText: {
    fontSize: 30,
    color: '#475059',
    margin: '2.5%',
    fontFamily: 'typo',
    alignSelf: 'center'
  },
  footer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-around',
    marginBottom: 50,
    backgroundColor: '#F77A54'
  },
  footerText: {
    fontSize: 25,
    color: '#475059',
    margin: '2.5%',
    alignSelf: 'center',
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
    color: 'white',
    lineHeight: 40
  },
  selectedDays: {
    fontFamily: 'typo',
    fontSize: 20,
    color: '#A1B600',
    lineHeight: 40
  },
  disabledDays: {
    fontFamily: 'typo',
    fontSize: 20,
    color: 'grey',
    lineHeight: 40
  }
});
