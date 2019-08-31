import React from 'react';
import { View } from 'react-native';

import { Container, Text } from './styles';

export default function Button({ children, style, onPress }) {
  return (
    <Container onPress={onPress} style={style}>
      <Text>{children}</Text>
    </Container>
  );
}
