import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { signUpRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Logo, Link, LinkText } from './styles';

import logo from '~/assets/logo.png';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSubmit() {
    if (password !== confirmPassword) {
      return Alert.alert(
        'Erro',
        'As senhas não coincidem. Favor, verifique as senhas digitadas e tente novamente.'
      );
    }

    return dispatch(
      signUpRequest(name, email, password, {
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        navigation,
      })
    );
  }

  return (
    <Background>
      <Container>
        <Logo source={logo} />

        <Input
          autoCapitalize="words"
          returnKeyType="next"
          icon="person"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => emailRef.current.focus()}
        />

        <Input
          ref={emailRef}
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
          returnKeyType="next"
          autoCapitalize="none"
          icon="lock"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />

        <Input
          ref={confirmPasswordRef}
          secureTextEntry
          returnKeyType="send"
          autoCapitalize="none"
          icon="lock"
          placeholder="Digite sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onSubmitEditing={handleSubmit}
        />

        <Button onPress={handleSubmit}>Entrar</Button>

        <Link onPress={() => navigation.navigate('SignIn')}>
          <LinkText>Já tenho conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
