import { Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: Platform.OS !== 'ios' ? '10.0.2.2' : 'localhost',
  })
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
