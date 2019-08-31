import { Platform } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL:
    Platform.OS === 'ios' ? 'http://localhost:3333' : 'http://10.0.0.102:3333',
});

export default api;
