import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';

import Background from '~/components/Background';
import Header from '~/components/Header';

// import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Header />

      <Text>Dashboard</Text>
    </Background>
  );
}

Dashboard.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
