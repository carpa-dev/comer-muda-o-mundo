import { NowRequest, NowResponse } from '@now/node';
import { create, renderBody } from './_lib/oauth2';

export default async (req: NowRequest, res: NowResponse) => {
  const code = req.query.code as string;
  const { host } = req.headers;

  const oauth2 = create();

  try {
    const accessToken = await oauth2.getToken({
      code,
      redirect_uri: `https://${host}/api/callback`,
    });
    const { token } = oauth2.createToken(accessToken);

    console.log('created token', token.token);

    res.status(200).send(
      renderBody('success', {
        token: token.token.access_token,
        provider: 'github',
      })
    );
  } catch (e) {
    console.log('error', e);
    res.status(200).send(renderBody('error', e));
  }
};
