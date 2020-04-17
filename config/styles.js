import {StyleSheet} from 'react-native';
import {
  responsiveFontSize as RF,
  responsiveHeight as RH,
  responsiveScreenWidth as RW,
} from 'react-native-responsive-dimensions';
export const mainColor = '#3c723b';
export const backgroundColor1 = '#c3d5c5';
export const backgroundColor2 = '#E3F2FD';
export const primaryColor = '#fff';
export const disabledColor = '#ccc';

export const smallFont = RF(1.5);
export const meduimFont = RF(2.5);
export const largeFont = RF(4);

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  activityIndicator: {
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  loadFailContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadFailIcon: {
    color: 'gray',
    fontSize: RF(20),
  },
  reloadDataButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: backgroundColor1,
    borderRadius: 5,
    elevation: 100,
  },
  reloadDataText: {
    color: mainColor,
  },
});

export const AppContainerstyles = StyleSheet.create({
  bottomTapcontainer: {
    flexDirection: 'row',
  },
  bottomTabStyle: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: mainColor,
  },
  bottomTabTextStyle: {
    fontSize: RF(1.5),
    color: disabledColor,
  },
  bottomTabTextStyleActive: {
    textAlign: 'center',
    fontSize: RF(2),
    color: primaryColor,
    borderBottomWidth: 5,
    borderBottomColor: '#448746',
    width: '100%',
  },
});

export const ScreenHeaderStyle = StyleSheet.create({
  headerStyle: {
    backgroundColor: mainColor,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    color: primaryColor,
    fontSize: RF(5),
  },
  subView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  subViewText: {
    fontSize: meduimFont,
    color: primaryColor,
  },
});

export const TopTabsStyle = StyleSheet.create({
  container: {
    backgroundColor: '#FCF3DB',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Tab: {
    backgroundColor: 'transparent',
    width: RW(25),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  activeTabText: {
    color: mainColor,
  },
});

export const SuraPageStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: RW(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  itemContainerNum: {
    width: RW(10),
  },
  itemSubContainer: {
    width: RW(70),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  TextContainer: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  itemHeadText: {
    flex: 1,
    color: '#000',
    fontSize: meduimFont,
  },
  itemSubText: {
    color: 'gray',
    fontSize: smallFont,
  },
});
export const JuzListStyle = StyleSheet.create({
  JuzaItemContainer: {
    flex: 1,
  },
  JuzaItem: {
    flex: 1,
    width: '90%',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    margin: 10,
    fontSize: meduimFont,
    backgroundColor: backgroundColor2,
  },
});

export const SingleSuraPageStyle = StyleSheet.create({
  secondHeader: {
    backgroundColor: backgroundColor1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondHeaderText: {
    color: mainColor,
    fontSize: smallFont,
  },
  scrollContainer: {
    flex: 1,
    height: '100%',
    minHeight: 100,
  },
  suraNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  suraNameText: {
    fontSize: meduimFont,
    color: mainColor,
    marginVertical: 5,
  },
  revelationTypeContainer: {
    width: RW(80),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export const AyahStyle = StyleSheet.create({
  AyahContainer: {
    padding: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  AyahNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  AyahContainerBackground: {
    backgroundColor: backgroundColor2,
  },
  AyahText: {
    // color: mainColor,
    fontSize: meduimFont,
  },
});
