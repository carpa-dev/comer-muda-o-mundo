// TODO: use a config service
if (!process.env.APP_KEY) {
  throw new Error('Missing env APP_KEY');
}

export const jwtConstants = {
  secret: process.env.APP_KEY,
};
