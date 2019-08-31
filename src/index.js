import React from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import App from './App';
import { store, persistor } from './store';

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={{ flex: 1, backgroundColor: '#22202c' }}>
          <App />
          <StatusBar barStyle="light-content" backgroundColor="#22202c" />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default Index;
