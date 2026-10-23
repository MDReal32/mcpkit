import { isJsonObject } from '../../json';
import { validateAuth } from './auth/validate-auth';
import { validateDomainSpec } from './server/validate-domain-spec';
import { validateEditions } from './server/validate-editions';
import { validateServerFields } from './server/validate-server-fields';
import { validateTools } from './tool/validate-tools';
import { validateServerUi } from './ui/validate-server-ui';

/** Manifests can be downloaded at runtime, so they are treated as untrusted input. */
export const validateManifest = (manifest: unknown) => {
  if (!isJsonObject(manifest)) {
    return ['manifest must be a JSON object'];
  }
  const editionNames = new Set(isJsonObject(manifest.editions) ? Object.keys(manifest.editions) : []);
  return [
    ...validateServerFields(manifest),
    ...validateDomainSpec(manifest),
    ...validateEditions(manifest.editions),
    ...validateAuth(manifest.auth, manifest.domain !== undefined),
    ...validateServerUi(manifest),
    ...validateTools(manifest.tools, editionNames),
  ];
};
