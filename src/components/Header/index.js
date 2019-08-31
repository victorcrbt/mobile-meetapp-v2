import React from 'react';
import { SafeAreaView } from 'react-native';

import { Container, Logo } from './styles';

import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <SafeAreaView>
      <Container>
        <Logo source={logo} />
      </Container>
    </SafeAreaView>
  );
}
