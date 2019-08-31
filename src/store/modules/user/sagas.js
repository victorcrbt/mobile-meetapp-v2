import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  const { name, email, ...rest } = payload.data;

  const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

  try {
    const response = yield call(api.put, '/users', profile);

    yield put(updateProfileSuccess(response.data));
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');
  } catch (err) {
    Alert.alert('Falha ao atualizar perfil', err.response.data.error);
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
