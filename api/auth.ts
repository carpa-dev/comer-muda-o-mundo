import axios from 'axios';

export function login(data: { uid: string; password: string }) {
  return axios.post('/api/v1/auth/login', data);
}
