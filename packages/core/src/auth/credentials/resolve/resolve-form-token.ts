import type { Manifest } from "../../../manifest";
import { isInteractiveAuth } from "../../../manifest";
import { AuthError } from "../../auth-error";
import { resolveStaticAuth } from "../../resolve/resolve-static-auth";
import type { AuthContext } from "../../types/auth-context";
import type { AuthResolution } from "../../types/auth-resolution";
import type { TokenCredentialResponse } from "../../types/credentials/token-credential-response";
import { trimValues } from "../response/trim-values";
import { saveFormAnswer } from "./save-form-answer";

export const resolveFormToken = (manifest: Manifest, response: TokenCredentialResponse, context: AuthContext) => {
  const auth = manifest.auth?.[response.option];
  if (!auth || isInteractiveAuth(auth)) {
    throw new AuthError(`${manifest.name}: auth[${response.option}] does not take credentials`);
  }
  const values = trimValues(response.values);
  const resolution: AuthResolution = {
    auth: resolveStaticAuth(auth, manifest.name, values),
    manifest,
    commit: () => saveFormAnswer(manifest, values, response.domain, context),
  };
  return resolution;
};
