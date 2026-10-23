import type { UiTexts } from "../../../manifest";
import type { CredentialOption } from "./credential-option";
import type { DomainField } from "./domain-field";

/** Everything the credentials page shows, so the page itself holds no text. */
export interface CredentialRequest {
  serverName: string;
  texts: UiTexts;
  /** Present when the user may choose the domain. */
  domain?: DomainField;
  /** The domain in use when the form opened; the form's own domain field wins when it has one. */
  domainInUse?: string;
  options: readonly CredentialOption[];
  /** Whether the server offers an OAuth2 browser sign-in. */
  signIn: boolean;
}
