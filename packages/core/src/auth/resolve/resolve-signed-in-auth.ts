import type { InteractiveAuth } from '../../manifest';
import { AuthError } from '../auth-error';
import { signInOnce } from '../oauth/sign-in/sign-in-once';
import type { AuthContext } from '../types/auth-context';
import { createResolvedAuth } from './create-resolved-auth';

/** Runs the browser sign-in for one OAuth2 entry and stores the token in `tokens.json`. */
export const resolveSignedInAuth = async (serverName: string, auth: InteractiveAuth, context: AuthContext) => {
  const { onAuthorizationUrl } = context;
  if (!onAuthorizationUrl) {
    throw new AuthError(`${serverName}: sign-in needs a browser, which this caller does not provide`);
  }
  const { token } = await signInOnce(serverName, auth, { context, onAuthorizationUrl });
  return createResolvedAuth({ Authorization: `Bearer ${token.accessToken}` });
};
