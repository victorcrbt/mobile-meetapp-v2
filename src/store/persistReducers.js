import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistReducers = persistReducer(
    {
      key: 'meetapp',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistReducers;
};
