import { AuthorizationCode } from 'simple-oauth2';
import { oauthId, oauthSecret } from './config';

export const authorizationCode = new AuthorizationCode({
  client: {
    id: oauthId,
    secret: oauthSecret,
  },
  auth: {
    tokenHost: `https://github.com`,
    tokenPath: `/login/oauth/access_token`,
    authorizePath: `/login/oauth/authorize`,
  },
});

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
