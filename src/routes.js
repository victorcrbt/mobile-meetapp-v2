import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Subscriptions from '~/pages/Subscriptions';
import Profile from '~/pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            tabBarOptions: {
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
              style: {
                backgroundColor: '#402845',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Auth',
      }
    )
  );
