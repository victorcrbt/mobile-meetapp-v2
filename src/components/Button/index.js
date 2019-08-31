import React from 'react';
import { View } from 'react-native';

import { Container, Text } from './styles';

export default function Button({ children, onPress }) {
  return (
    <Container onPress={onPress}>
      <Text>{children}</Text>
    </Container>
  );
}
