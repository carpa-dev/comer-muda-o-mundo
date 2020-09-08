import handle from './auth';
jest.mock('./_lib/oauth2');
const { create } = require('./_lib/oauth2');
import { createMock } from 'ts-auto-mock';
import { NextApiResponse } from 'next';
jest.mock('./_lib/random');
const { randomString } = require('./_lib/random');

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
    const createObj = {
      authorizeURL: jest.fn().mockReturnValue('my_redirect_url'),
    };
    create.mockReturnValue(createObj);
    randomString.mockReturnValue('my_random_string');

    handle(request, fakeRes);

    expect(createObj.authorizeURL).toHaveBeenCalledWith({
      redirect_uri: 'https://myhost/api/callback',
      scope: 'repo,user',
      state: 'my_random_string',
    });

    // Response
    expect(fakeRes.writeHead).toHaveBeenCalledWith(301, {
      Location: 'my_redirect_url',
    });
  });

  it('should return status 400 when host header is not available', () => {
    handle({}, fakeRes);

    expect(fakeRes.writeHead).toHaveBeenCalledWith(400);
  });
});
