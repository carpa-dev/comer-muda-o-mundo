import handle from './auth';
jest.mock('./_lib/oauth2');
const { create, getAuthorizeURL } = require('./_lib/oauth2');
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
    create.mockReturnValue({});
    getAuthorizeURL.mockReturnValue('my_redirect_url');

    handle(request, fakeRes);

    // Response
    expect(fakeRes.writeHead).toHaveBeenCalledWith(301, {
      Location: 'my_redirect_url',
    });
  });
});
