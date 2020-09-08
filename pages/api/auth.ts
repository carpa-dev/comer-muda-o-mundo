import { create, getAuthorizeURL } from './_lib/oauth2';
import * as zod from 'zod';
import { withValidation } from './_lib/validator';
import { NextApiResponse } from 'next';
import { randomString } from './_lib/random';

// Schema to validate request
const RequestSchema = zod
  .object({
    headers: zod.object({ host: zod.string() }).nonstrict(),
  })
  .nonstrict();

function handle(req: zod.infer<typeof RequestSchema>, res: NextApiResponse) {
  const oauth2 = create();

  const url = getAuthorizeURL(req.headers.host, oauth2, randomString);

  res.writeHead(301, { Location: url });
  res.end();
}

export default withValidation(RequestSchema, handle);
