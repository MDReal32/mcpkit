import type { CredentialRequest } from '@mcpkit/core';
import { keepInstalledCliActions } from './cli-detection/keep-installed-cli-actions';
import { CREDENTIALS_FORM_TIMEOUT_MS } from './const';
import { startFormServer } from './server/start-form-server';
import type { CredentialsFormOptions } from './types/credentials-form-options';

/** Returns a `requestCredentials` hook that asks through a one-off local page. */
export const createCredentialsForm =
  ({ page, onUrl, timeoutMs = CREDENTIALS_FORM_TIMEOUT_MS }: CredentialsFormOptions) =>
  async (request: CredentialRequest) => {
    const formServer = await startFormServer(await keepInstalledCliActions(request), page);
    let timer: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('the credentials form timed out')), timeoutMs);
    });
    try {
      onUrl(formServer.url);
      return await Promise.race([formServer.response, timeout]);
    } finally {
      clearTimeout(timer);
      await formServer.close();
    }
  };
