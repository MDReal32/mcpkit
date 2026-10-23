import type { Env } from '../../../env';
import type { Manifest } from '../../../manifest';
import { isInteractiveAuth } from '../../../manifest';
import type { CredentialRequest } from '../../types/credentials/credential-request';
import { buildUiTexts } from '../../ui/build-ui-texts';
import { buildDomainField } from './build-domain-field';
import { toCredentialOptions } from './to-credential-options';

export const buildCredentialRequest = (manifest: Manifest, domain: string | undefined, env: Env) => {
  const auth = manifest.auth ?? [];
  const texts = buildUiTexts(manifest);
  const domainField = buildDomainField(manifest, domain, env, texts);
  const request: CredentialRequest = {
    serverName: manifest.name,
    texts,
    ...(domainField ? { domain: domainField } : {}),
    ...(domain === undefined ? {} : { domainInUse: domain }),
    options: auth.flatMap((entry, index) => toCredentialOptions(entry, index, manifest.name, texts)),
    signIn: auth.some(isInteractiveAuth),
  };
  return request;
};
