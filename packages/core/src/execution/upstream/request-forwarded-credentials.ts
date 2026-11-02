import { AuthError } from "../../auth/auth-error";
import { requestCredentialsOnce } from "../../auth/credentials/request/request-credentials-once";
import { toCredentialField } from "../../auth/credentials/request/to-credential-field";
import { trimValues } from "../../auth/credentials/response/trim-values";
import { validateCredentialResponse } from "../../auth/credentials/response/validate-credential-response";
import type { CredentialOption } from "../../auth/types/credentials/credential-option";
import type { CredentialRequest } from "../../auth/types/credentials/credential-request";
import { buildUiTexts } from "../../auth/ui/build-ui-texts";
import { toOptionActions } from "../../auth/ui/to-option-actions";
import type { Manifest, StdioUpstream } from "../../manifest";
import type { CallContext } from "../types/call-context";

const FORWARDED_OPTION_INDEX = 0;

/** Asks the user in the credentials form for `names`, the credentials of a stdio upstream that nothing provided. */
export const requestForwardedCredentials = async (
  manifest: Manifest,
  upstream: StdioUpstream,
  names: readonly string[],
  requestCredentials: NonNullable<CallContext["requestCredentials"]>,
) => {
  const texts = buildUiTexts(manifest);
  const { request, response } = await requestCredentialsOnce(
    manifest.name,
    async () => {
      const fields = names.map((name) => toCredentialField(name, name, true, texts, upstream.ui?.inputs?.[name]));
      const option: CredentialOption = {
        index: FORWARDED_OPTION_INDEX,
        label: texts.credentialLegend,
        fields,
        actions: toOptionActions(upstream.ui, manifest.name, fields.length),
      };
      const created: CredentialRequest = { serverName: manifest.name, texts, options: [option], signIn: false };
      return created;
    },
    requestCredentials,
  );
  const errors = validateCredentialResponse(request, response);
  if (errors.length > 0 || response.method !== "token") {
    throw new AuthError(`${manifest.name}: invalid credentials form answer: ${errors.join("; ")}`);
  }
  return trimValues(response.values);
};
