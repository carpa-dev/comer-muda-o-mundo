import axios from 'axios';

export function login(data: { uid: string; password: string }) {
  return axios.post('http://office:3333/api/v1/auth/login', data);
}
