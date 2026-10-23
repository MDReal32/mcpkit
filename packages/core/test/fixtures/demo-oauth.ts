import type { OAuthAuth } from '../../src/main';

export const DEMO_TOKEN_URL = 'https://auth.example.com/token';

export const demoOAuth: OAuthAuth = {
  type: 'oauth',
  authorizationUrl: 'https://auth.example.com/authorize',
  tokenUrl: DEMO_TOKEN_URL,
  clientId: 'client-1',
  scopes: ['repo', 'user'],
  redirectPort: 0,
};
