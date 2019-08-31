import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

Profile.navigationOptions = {
  title: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
