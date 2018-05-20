import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ADEBF6'
  },
  headlineView: {
    position: 'relative',
    backgroundColor: '#F77A54',
    alignItems: 'center',
    flexDirection: 'row'
  },
  backButton: {
    fontSize: 26,
    color: '#475059',
    marginLeft: '50%'
  },
  headlineViewText: {
    fontSize: 25,
    color: '#475059',
    margin: '2.5%',
    fontFamily: 'typo',
    alignSelf: 'center'
  },
  addTimerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '5%'
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
  noTimers: {
    alignSelf: 'center',
    color: 'grey',
    fontFamily: 'typo',
    fontSize: 20
  }
});
