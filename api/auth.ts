import { axios } from './axios';
import { Maybe } from 'true-myth';
import Cookie from 'js-cookie';

/**
 * We must store the JWT in a cookie
 * since nextjs runs in the server as well
 */
const TOKEN_NAME = 'token';

interface Token {
  token: string;
  type: 'Bearer';
}

export function login(data: { uid: string; password: string }) {
  return axios.post('/api/v1/auth/login', data);
}

interface AuthHeader {
  Authorization: string;
}

export function saveAuthToken(data: Token) {
  // window.localStorage.setItem(TOKEN_NAME, JSON.stringify(data));
  Cookie.set(TOKEN_NAME, data);
}

export function getAuthToken(): Maybe<Token> {
  // TODO:
  // validate token contents
  return Maybe.of(Cookie.getJSON(TOKEN_NAME));
}

export function getAuthorizationHeader() {
  // since unwrapOr only applies to type T
  // and map is creating an object with type { Authorization: string }
  // we create a custom type that can be an empty object
  // an optional would be to make Authorization optional in AuthHeader
  type responseType = AuthHeader | {};
  return getAuthToken()
    .map(token => {
      return {
        Authorization: `${token.type} ${token.token}`,
      } as responseType;
    })
    .unwrapOr({});
}

export function logout() {
  // TODO:
  // tell the backend that user is no more logged in
  Cookie.remove(TOKEN_NAME);

  // broadcast to all tabs
  window.localStorage.setItem('logout', '');
}

export function isLoggedIn(): boolean {
  return getAuthToken()
    .map(() => true)
    .unwrapOr(false);
}
