import { NextApiResponse } from 'next';
import * as zod from 'zod';

export function withValidation<Request>(
  schema: zod.ZodSchema<Request>,
  fn: (req: Request, res: NextApiResponse) => void
): (req: unknown, res: NextApiResponse) => void {
  return function (req: unknown, res: NextApiResponse) {
    const a = schema.safeParse(req);

    if (!a.success) {
      res.writeHead(400);
      res.send({ error: a.error });
      res.end();
      return;
    } else {
      fn(a.data, res);
    }
  };
}
