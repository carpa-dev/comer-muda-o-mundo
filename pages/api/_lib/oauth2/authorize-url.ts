export interface URLAuthorizer {
  authorizeURL(params: {
    redirect_uri: string;
    scope: string;
    state: string;
  }): string;
}

// getAuthorizeURL returns the endpoint
// client should call to initiate oauth flow
export function getAuthorizeURL(
  host: string,
  authorizer: URLAuthorizer,
  randomString: () => string
): string {
  return authorizer.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  });
}
