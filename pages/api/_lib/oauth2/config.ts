import { validatePresence } from '../config-validator';
// unfortunately, due to some next magic
// environment variables can't be accessed dynamically
export const oauthId = validatePresence(
  process.env.OAUTH_CLIENT_ID,
  'OAUTH_CLIENT_ID'
);
export const oauthSecret = validatePresence(
  process.env.OAUTH_CLIENT_SECRET,
  'OAUTH_CLIENT_SECRET'
);
