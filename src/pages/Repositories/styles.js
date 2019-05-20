/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  author: {
    color: colors.regular,
    fontSize: 14,
  },

  avatar: {
    height: 50,
    width: 50,
  },

  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },

  containerRepository: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: metrics.baseMargin,
    padding: metrics.basePadding,
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
    marginTop: metrics.basePadding,
    textAlign: 'center',
  },

  form: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    padding: metrics.basePadding,
  },

  formIcon: {
    color: colors.dark,
  },

  formInput: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    color: colors.darker,
    flex: 1,
    fontSize: 14,
    marginRight: metrics.baseMargin,
    padding: metrics.basePadding / 2,
  },

  icon: {
    color: colors.light,
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: metrics.baseMargin,
  },

  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  listContainer: {
    padding: metrics.basePadding,
  },

  loading: {
    marginTop: metrics.baseMargin * 2,
  },

  placeholderColor: {
    color: colors.regular,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default styles;
