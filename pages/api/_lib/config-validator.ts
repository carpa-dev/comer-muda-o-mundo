export function validatePresence(
  variable: string | undefined,
  key: string,
  env: string = process.env.NODE_ENV
) {
  // Next sets NODE_ENV for tests
  if (env === 'test') {
    return 'test_env';
  }

  if (!variable) {
    throw new Error(
      `Expected to find environment variable ${key} but found '${JSON.stringify(
        variable
      )}'`
    );
  }

  return variable;
}
