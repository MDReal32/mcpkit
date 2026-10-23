import type { InteractiveAuth } from '../../../manifest';
import { toAuthKey } from '../../secrets/to-auth-key';
import type { SignInOptions } from '../../types/oauth/sign-in-options';
import { pendingSignIns } from './pending-sign-ins';
import { signIn } from './sign-in';

export const signInOnce = (serverName: string, auth: InteractiveAuth, options: SignInOptions) => {
  const key = `${serverName} ${toAuthKey(auth)}`;
  const pending = pendingSignIns.get(key);
  if (pending) {
    return pending;
  }
  const signingIn = signIn(serverName, auth, options).finally(() => {
    pendingSignIns.delete(key);
  });
  pendingSignIns.set(key, signingIn);
  return signingIn;
};
