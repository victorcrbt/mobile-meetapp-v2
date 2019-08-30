import React from 'react';
import { View } from 'react-native';

import { Container, Text } from './styles';

export default function Button({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}
