import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADEBF6',
    justifyContent: 'space-between'
  },
  headlineView: {
    position: 'relative',
    backgroundColor: '#F77A54',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 50
  },
  headlineViewText: {
    fontSize: 30,
    color: '#475059',
    margin: '2.5%',
    alignSelf: 'center',
    fontFamily: 'typo'
  },
  footer: {
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
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
