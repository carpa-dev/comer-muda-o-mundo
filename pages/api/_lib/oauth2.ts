import { AuthorizationCode } from 'simple-oauth2';

export const create = () => {
  console.log('OAUTH_CLIENT_ID', process.env.OAUTH_CLIENT_ID);
  console.log('OAUTH_CLIENT_SECRET', process.env.OAUTH_CLIENT_SECRET);

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
export const renderBody: RenderBody = (status, content) => `
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
