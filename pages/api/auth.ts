import { getAuthorizeURL } from './_lib/oauth2/authorize-url';
import { authorizationCode } from './_lib/oauth2';
import * as zod from 'zod';
import { withValidation } from './_lib/request-validator';
import { NextApiResponse } from 'next';
import { randomString } from './_lib/random';

// Schema to validate request
const RequestSchema = zod
  .object({
    headers: zod.object({ host: zod.string() }).nonstrict(),
  })
  .nonstrict();

function handle(req: zod.infer<typeof RequestSchema>, res: NextApiResponse) {
  const url = getAuthorizeURL(
    req.headers.host,
    authorizationCode,
    randomString
  );

  res.writeHead(301, { Location: url });
  res.end();
}

export default withValidation(RequestSchema, handle);
