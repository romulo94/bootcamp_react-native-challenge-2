import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  activeFilter: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: 'bold',
  },

  author: {
    color: colors.regular,
    fontSize: 14,
  },

  avatar: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },

  buttonContainer: {
    alignItems: 'center',
    flex: 1,
  },

  buttonText: {
    color: colors.regular,
    fontSize: 14,
  },

  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },

  containerFilter: {
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    flexDirection: 'row',
    marginBottom: metrics.basePadding / 2,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.basePadding,
    padding: metrics.basePadding / 2,
  },

  containerIssueItem: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    flexDirection: 'row',
    marginBottom: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin * 2,
    padding: metrics.basePadding,
  },

  containerIssues: {
    flex: 1,
  },

  empty: {
    color: colors.dark,
    marginTop: metrics.baseMargin * 2,
    textAlign: 'center',
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  icon: {
    color: colors.light,
    marginLeft: metrics.baseMargin,
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: metrics.baseMargin,
  },

  listContainer: {
    // paddingHorizontal: metrics.basePadding * 2,
  },

  loading: {
    marginTop: metrics.baseMargin * 2,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default styles;
