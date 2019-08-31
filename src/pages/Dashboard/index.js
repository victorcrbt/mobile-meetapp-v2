import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}

Dashboard.navigationOptions = {
  title: 'Dashboard',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};
