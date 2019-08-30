import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Input } from './styles';

export default function TextInput({ icon, ...rest }) {
  return (
    <Container>
      {icon && <Icon name={icon} size={24} color="rgba(255, 255, 255, 0.6)" />}
      <Input {...rest} />
    </Container>
  );
}
