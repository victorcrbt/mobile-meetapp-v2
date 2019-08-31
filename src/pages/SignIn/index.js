import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Logo, Link, LinkText } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signInRequest(email, password, { setEmail, setPassword }));
  }

  return (
    <Background>
      <Container>
        <Logo source={logo} />

        <Input
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          icon="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <Input
          ref={passwordRef}
          secureTextEntry
          returnKeyType="send"
          autoCapitalize="none"
          icon="lock"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
        />

        <Button onPress={handleSubmit}>Entrar</Button>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar conta grátis</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
