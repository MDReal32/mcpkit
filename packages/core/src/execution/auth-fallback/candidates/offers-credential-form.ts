import type { Manifest } from "../../../manifest";
import { isInteractiveAuth } from "../../../manifest";
import type { CallContext } from "../../types/call-context";

/** The form is shown when the user can enter a credential, or choose a domain to sign in to. */
export const offersCredentialForm = (manifest: Manifest, context: CallContext) => {
  const auth = manifest.auth ?? [];
  const takesCredentials = auth.some((entry) => !isInteractiveAuth(entry) && entry.type !== "none");
  const choosesSignInDomain = manifest.domain !== undefined && auth.some(isInteractiveAuth);
  return context.requestCredentials !== undefined && (takesCredentials || choosesSignInDomain);
};
