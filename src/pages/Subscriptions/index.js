import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

import Header from '~/components/Header';

// import { Container } from './styles';

export default function Subscriptions() {
  return (
    <View>
      <Header />

      <Text>Subscriptions</Text>
    </View>
  );
}

Subscriptions.navigationOptions = {
  title: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-paper" size={20} color={tintColor} />
  ),
};
