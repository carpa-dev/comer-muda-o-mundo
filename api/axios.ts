import Axios from 'axios';
import { getAuthorizationHeader } from './auth';

export const axios = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://office:3333/',
});

// add token if exists
axios.interceptors.request.use(req => {
  req.headers = {
    ...req.headers,
    ...getAuthorizationHeader(),
  };

  return req;
});
