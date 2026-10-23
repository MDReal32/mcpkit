import { AuthError } from '../../auth-error';

export const readAuthorizationCode = (params: URLSearchParams, expectedState: string, serverName: string) => {
  const error = params.get('error');
  if (error) {
    throw new AuthError(`${serverName}: authorization denied: ${params.get('error_description') ?? error}`);
  }
  if (params.get('state') !== expectedState) {
    throw new AuthError(`${serverName}: authorization state mismatch, sign-in aborted`);
  }
  const code = params.get('code');
  if (!code) {
    throw new AuthError(`${serverName}: authorization callback has no code`);
  }
  return code;
};
