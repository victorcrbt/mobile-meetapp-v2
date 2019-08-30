import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';

const Routes = createAppContainer(
  createSwitchNavigator({
    SignIn,
  })
);

export default Routes;
