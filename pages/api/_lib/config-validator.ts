export function validatePresence(variable: string | undefined, env: string) {
  // Next sets NODE_ENV for tests
  if (process.env.NODE_ENV === 'test') {
    return 'test_env';
  }

  if (!variable) {
    throw new Error(
      `Expected to find environment variable ${env} but found '${JSON.stringify(
        variable
      )}'`
    );
  }

  return variable;
}
