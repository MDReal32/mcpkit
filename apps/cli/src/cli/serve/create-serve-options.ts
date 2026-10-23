import type { ExecuteOptions } from '@mcpkit/core';
import { createFileSecretStore } from '@mcpkit/core';
import { createCredentialsForm } from '@mcpkit/credentials-form';
import { credentialsFormPage } from '../browser/credentials-form-page';
import { announceAuthorizationUrl } from '../output/announce-authorization-url';
import { announceCredentialsFormUrl } from '../output/announce-credentials-form-url';

export const createServeOptions = () => {
  const requestCredentials = createCredentialsForm({ page: credentialsFormPage, onUrl: announceCredentialsFormUrl });
  const options: ExecuteOptions = {
    onAuthorizationUrl: announceAuthorizationUrl,
    secretStore: createFileSecretStore(),
    requestCredentials,
  };
  return options;
};
