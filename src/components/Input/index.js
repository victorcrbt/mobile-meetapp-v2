import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Input } from './styles';

function TextInput({ icon, ...rest }, ref) {
  return (
    <Container>
      {icon && <Icon name={icon} size={24} color="rgba(255, 255, 255, 0.6)" />}
      <Input {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(TextInput);
