import React from 'react';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Logo, Link, LinkText } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Logo source={logo} />

        <Input icon="email" placeholder="Digite seu e-mail" />
        <Input icon="lock" placeholder="Digite sua senha" />

        <Button>Entrar</Button>

        <Link>
          <LinkText>Criar conta grátis</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
