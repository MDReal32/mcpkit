import type { AuthSpec } from '../types/auth/auth-spec';
import { describeAuthType } from './describe-auth-type';
import { listAuthEnvNames } from './list-auth-env-names';

export const describeAuthSpec = (auth: AuthSpec) => {
  if (auth.type === 'none') {
    return 'no auth';
  }
  return [describeAuthType(auth), listAuthEnvNames(auth).join(', ')].filter(Boolean).join(' ');
};
