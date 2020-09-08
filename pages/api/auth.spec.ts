import handle from './auth';
jest.mock('./_lib/oauth2');
jest.mock('./_lib/oauth2/authorize-url');
const { getAuthorizeURL } = require('./_lib/oauth2/authorize-url');
import { createMock } from 'ts-auto-mock';
import { NextApiResponse } from 'next';

describe('/auth endpoint', () => {
  const fakeRes = createMock<NextApiResponse>({
    writeHead: jest.fn(),
  });
  const request = {
    headers: {
      host: 'myhost',
    },
  };

  it('should work', () => {
    getAuthorizeURL.mockReturnValue('my_redirect_url');

    handle(request, fakeRes);

    // Response
    expect(fakeRes.writeHead).toHaveBeenCalledWith(301, {
      Location: 'my_redirect_url',
    });
  });
});
