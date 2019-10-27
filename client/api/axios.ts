import Axios, { AxiosInstance } from 'axios';
import { getAuthorizationHeader, refreshToken, getAuthToken } from './auth';

export const axiosV1 = Axios.create({
  //  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://office:3333/',
});

export const axiosV2 = Axios.create({
  baseURL: '/api/v2',
});

function addReqIntercept() {
  return axiosV1.interceptors.request.use(req => {
    req.headers = {
      ...req.headers,
      ...getAuthorizationHeader(),
    };

    return req;
  });
}
export function registerInterceptors(
  axios: AxiosInstance,
  {
    onError,
    onNotLoggedIn,
  }: {
    onError: (error: Error) => void;
    onNotLoggedIn: () => void;
  }
) {
  let errorInterceptor = addResIntercept();
  const authInterceptor = addReqIntercept();

  function addResIntercept() {
    return axios.interceptors.response.use(
      res => res,
      async error => {
        if (error.response && error.response.status === 401) {
          const authToken = getAuthToken();
          if (authToken.isJust()) {
            // renew token
            // and redo last request

            // current interceptor must be stopped
            // otherwise a 401 would provoke an infinite loop
            axios.interceptors.response.eject(errorInterceptor);

            try {
              await refreshToken(authToken.value.refreshToken);

              errorInterceptor = addResIntercept();

              // retry last request
              return axios(error.config);
            } catch (err) {
              onNotLoggedIn();
              // failed to refresh token
              return Promise.reject(error);
            }
          } else {
            // not logged in
            onNotLoggedIn();

            return Promise.reject(
              'You are not authorized to access this resource.'
            );
          }
        } else {
          onError(error);

          return Promise.reject(error);
        }
      }
    );
  }
}
