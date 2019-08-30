import React from 'react';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Logo, Link, LinkText } from './styles';

import logo from '~/assets/logo.png';

export default function SignUp({ navigation }) {
  return (
    <Background>
      <Container>
        <Logo source={logo} />

        <Input icon="person" placeholder="Digite seu nome" />
        <Input icon="email" placeholder="Digite seu e-mail" />
        <Input icon="lock" placeholder="Digite sua senha" />

        <Button>Entrar</Button>

        <Link onPress={() => navigation.navigate('SignIn')}>
          <LinkText>Já tenho conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
