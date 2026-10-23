import type { OAuthAuth } from '../../../manifest';
import type { AuthorizationRequest } from '../../types/oauth/authorization-request';

export const buildAuthorizationUrl = (auth: OAuthAuth, { redirectUri, challenge, state }: AuthorizationRequest) => {
  const url = new URL(auth.authorizationUrl);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', auth.clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('state', state);
  if (auth.scopes && auth.scopes.length > 0) {
    url.searchParams.set('scope', auth.scopes.join(' '));
  }
  return url.toString();
};
