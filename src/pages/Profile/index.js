import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Input from '~/components/Input';

import {
  Container,
  Form,
  Separator,
  SubmitButton,
  LogoutButton,
} from './styles';

import validationSchema from '~/validators/userUpdate';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile ? profile.name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleSubmit() {
    const data = {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
    };

    try {
      await validationSchema.validate(data, { abortEarly: false });

      dispatch(
        updateProfileRequest(data, {
          setOldPassword,
          setPassword,
          setConfirmPassword,
        })
      );
    } catch (err) {
      Alert.alert('Falha na validação', err.inner[0].message);
    }
  }

  return (
    <Background>
      <Header />

      <Container>
        <Form>
          <Input
            autoCapitalize="words"
            returnKeyType="next"
            autoCorrect={false}
            icon="person"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <Input
            ref={emailRef}
            autoCapitalize="none"
            returnKeyType="next"
            autoCorrect={false}
            keyboardType="email-address"
            icon="mail"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />

          <Separator />

          <Input
            ref={oldPasswordRef}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="next"
            autoCorrect={false}
            placeholder="Sua senha atual"
            icon="lock"
            value={oldPassword}
            onChangeText={setOldPassword}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            ref={passwordRef}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="next"
            autoCorrect={false}
            placeholder="Sua nova senha"
            icon="lock"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <Input
            ref={confirmPasswordRef}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="send"
            autoCorrect={false}
            icon="lock"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirme a nova senha"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit}>Salvar pefil</SubmitButton>
          <LogoutButton onPress={() => dispatch(signOut())}>
            Sair do Meetapp
          </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  title: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
