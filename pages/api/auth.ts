import { NowRequest, NowResponse } from '@now/node';
import crypto from 'crypto';
import { create } from './_lib/oauth2';

export const randomString = () => crypto.randomBytes(4).toString(`hex`);

export default (req: NowRequest, res: NowResponse) => {
  console.log('received request');
  const { host } = req.headers;

  const oauth2 = create();

  const url = oauth2.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  });

  res.writeHead(301, { Location: url });
  res.end();
};
