import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Test from '~/Teste';

const Routes = createAppContainer(
  createSwitchNavigator({
    Test,
  })
);

export default Routes;
