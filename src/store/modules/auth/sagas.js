import { Alert } from 'react-native';
import { takeLatest, call, all, put } from 'redux-saga/effects';

import { signInRequest, signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;
  const { setEmail, setPassword } = payload.functions;

  try {
    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    setEmail('');
    setPassword('');
  } catch (err) {
    Alert.alert(
      'Falha ao realizar login',
      'Favor, verifique suas credenciais e tente novamente.'
    );
    yield put(signFailure());

    setPassword('');
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;
  const {
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    navigation,
  } = payload.functions;

  try {
    yield call(api.post, '/users', { name, email, password });

    Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso!');

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigation.navigate('SignIn');
  } catch (err) {
    Alert.alert(
      'Falha ao realizar cadastro',
      'Favor, verifique seus dados e tente novamente.'
    );

    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken),
]);
