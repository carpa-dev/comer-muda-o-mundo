import { AuthorizationCode } from 'simple-oauth2';

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

export const create = () => {
  return new AuthorizationCode({
    client: {
      id: process.env.OAUTH_CLIENT_ID || 'failed',
      secret: process.env.OAUTH_CLIENT_SECRET || 'failed',
    },
    auth: {
      tokenHost: `https://github.com`,
      tokenPath: `/login/oauth/access_token`,
      authorizePath: `/login/oauth/authorize`,
    },
  });
};

type RenderBody = {
  (status: 'success', content: { token: string; provider: 'github' }): string;
  (status: 'error', content: Object): string;
};

// TODO: type
export const renderBody: RenderBody = (status: string, content: any) => `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  
  window.opener.postMessage("authorizing:github", "*");
</script>
`;
