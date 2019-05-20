/* eslint-disable import/no-unresolved */
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Issues from '~/pages/Issues';
import Repositories from '~/pages/Repositories';
import { colors } from '~/styles';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Repositories,
      Issues,
    },
    {
      initialRouteName: 'Repositories',
      defaultNavigationOptions: {
        headerTintColor: colors.dark,
        headerBackTitle: null,
      },
    },
  ),
);

export default Routes;
