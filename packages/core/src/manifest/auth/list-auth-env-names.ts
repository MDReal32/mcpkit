import type { AuthSpec } from '../types/auth/auth-spec';

export const listAuthEnvNames = (auth: AuthSpec) => {
  switch (auth.type) {
    case 'none':
      return [];
    case 'basic':
      return [auth.usernameEnv, auth.passwordEnv];
    case 'oauth':
      return auth.clientSecretEnv ? [auth.clientSecretEnv] : [];
    case 'bearer':
    case 'header':
    case 'query':
      return [auth.env];
    default: {
      const unsupported: never = auth;
      return unsupported;
    }
  }
};
