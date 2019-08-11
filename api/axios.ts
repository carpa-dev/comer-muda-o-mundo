import Axios from 'axios';

export const axios = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://office:3333/',
});
