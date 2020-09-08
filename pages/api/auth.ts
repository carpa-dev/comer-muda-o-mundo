import { create } from './_lib/oauth2';
import * as zod from 'zod';
import { withValidation } from './_lib/validator';
import { NextApiResponse } from 'next';
import { randomString } from './_lib/random';

const Schema = zod
  .object({
    headers: zod
      .object({
        host: zod.string(),
      })
      .nonstrict(),
  })
  .nonstrict();

function handle(req: zod.infer<typeof Schema>, res: NextApiResponse) {
  const oauth2 = create();

  const url = oauth2.authorizeURL({
    redirect_uri: `https://${req.headers.host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  });

  res.writeHead(301, { Location: url });
  res.end();
}

export default withValidation(Schema, handle);
