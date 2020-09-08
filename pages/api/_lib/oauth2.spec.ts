import { getAuthorizeURL, URLAuthorizer } from './oauth2';
import { createMock } from 'ts-auto-mock';
import { On, method } from 'ts-auto-mock/extension';

describe('oauth2', () => {
  describe('getAuthorizeURL', () => {
    const randomString = () => 'mystring';
    const URLAuthorizerMock = createMock<URLAuthorizer>();
    const authorizeURLFn = On(URLAuthorizerMock).get(
      method((mock) => mock.authorizeURL)
    );

    it('works', () => {
      authorizeURLFn.mockReturnValue('myurl');
      const url = getAuthorizeURL('myhost', URLAuthorizerMock, randomString);
      expect(url).toBe('myurl');

      expect(authorizeURLFn).toHaveBeenCalledWith({
        redirect_uri: 'https://myhost/api/callback',
        scope: 'repo,user',
        state: 'mystring',
      });
    });
  });
});
