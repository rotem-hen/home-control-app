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
    textAlign: 'center',
    color: 'white',
    margin: '4%',
    fontSize: 30,
    fontFamily: 'typo'
  },
  entry: {
    alignItems: 'center',
    backgroundColor: '#475059',
    marginTop: '3%'
  },
  send: {
    textAlign: 'center',
    color: '#F77A54',
    margin: '4%',
    fontSize: 25,
    fontFamily: 'typo'
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    textAlign: 'center',
    color: 'white',
    margin: '4%',
    fontSize: 27,
    fontFamily: 'typo'
  }
});
