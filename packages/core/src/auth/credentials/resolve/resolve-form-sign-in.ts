import type { Manifest } from "../../../manifest";
import { isInteractiveAuth } from "../../../manifest";
import { AuthError } from "../../auth-error";
import { resolveSignedInAuth } from "../../resolve/resolve-signed-in-auth";
import type { AuthContext } from "../../types/auth-context";
import type { AuthResolution } from "../../types/auth-resolution";
import type { SignInCredentialResponse } from "../../types/credentials/sign-in-credential-response";
import { saveFormAnswer } from "./save-form-answer";

export const resolveFormSignIn = async (
  manifest: Manifest,
  response: SignInCredentialResponse,
  context: AuthContext,
) => {
  const oauth = manifest.auth?.find(isInteractiveAuth);
  if (!oauth) {
    throw new AuthError(`${manifest.name}: this server has no sign-in`);
  }
  const resolution: AuthResolution = {
    auth: await resolveSignedInAuth(manifest.name, oauth, context),
    manifest,
    commit: () => saveFormAnswer(manifest, {}, response.domain, context),
  };
  return resolution;
};
